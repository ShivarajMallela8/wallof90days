import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')

  if (code) {
    const supabase = createRouteHandlerClient({ cookies })
    try {
      const { data, error } = await supabase.auth.exchangeCodeForSession(code)

      if (error) {
        console.error('Error exchanging code for session:', error)
        return NextResponse.redirect(`${requestUrl.origin}/auth-error?error=${encodeURIComponent(error.message)}`)
      }

      if (data.session) {
        const { data: { user }, error: getUserError } = await supabase.auth.getUser()

        if (getUserError) {
          console.error('Error getting user:', getUserError)
          return NextResponse.redirect(`${requestUrl.origin}/auth-error?error=${encodeURIComponent(getUserError.message)}`)
        }

        if (user) {
          console.log('User authenticated:', user)

          // Check if the user already exists in the users table
          const { data: existingUser, error: fetchError } = await supabase
            .from('users')
            .select()
            .eq('uid', user.id)
            .single()

          if (fetchError && fetchError.code !== 'PGRST116') {
            console.error('Error fetching user:', fetchError)
          }

          if (!existingUser) {
            console.log('Inserting new user into users table')
            // If the user doesn't exist, insert them into the users table
            const { error: insertError } = await supabase
              .from('users')
              .insert({
                uid: user.id,
                email: user.email,
                encrypted_password: '', // OAuth users won't have a password, set it to empty
                full_name: user.user_metadata.full_name || user.user_metadata.name || user.email?.split('@')[0],
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
              })

            if (insertError) {
              console.error('Error inserting user:', insertError)
            } else {
              console.log('User successfully inserted')
            }
          } else {
            console.log('User already exists in the database')
          }
        } else {
          console.error('No user data after authentication')
          return NextResponse.redirect(`${requestUrl.origin}/auth-error?error=No user data`)
        }
      } else {
        console.error('No session data after authentication')
        return NextResponse.redirect(`${requestUrl.origin}/auth-error?error=No session data`)
      }
    } catch (error) {
      console.error('Error in authentication process:', error)
      return NextResponse.redirect(`${requestUrl.origin}/auth-error?error=${encodeURIComponent('Authentication process failed')}`)
    }
  } else {
    console.error('No code provided in the callback')
    return NextResponse.redirect(`${requestUrl.origin}/auth-error?error=No code provided`)
  }

  // URL to redirect to after sign in process completes
  return NextResponse.redirect(`${requestUrl.origin}/dashboard`)
}