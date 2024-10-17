import { generateTweet } from '@/lib/huggingface';
import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
  const { prompt } = await req.json();
  
  try {
    // Check for the Authorization header
    const authHeader = req.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return new Response('Unauthorized', { status: 401 });
    }

    const token = authHeader.split(' ')[1];
    
    // Verify the token and get the user
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    
    const { data: { user }, error } = await supabase.auth.getUser(token);
    if (error || !user) {
      return new Response('Unauthorized', { status: 401 });
    }

    const response = await generateTweet(prompt);
    const stream = response.body;
    if (!stream) {
      return new Response('Failed to generate tweet', { status: 500 });
    }

    let tweetContent = '';
    const reader = stream.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      tweetContent += decoder.decode(value);
    }

    // Clean up the tweet content
    tweetContent = tweetContent.trim();

    // Save the generated tweet to Supabase
    const {  error: saveError } = await supabase
      .from('tweets')
      .insert({ user_id: user.id, content: tweetContent });

    if (saveError) {
      console.error('Error saving tweet:', saveError);
      return new Response('Error saving tweet', { status: 500 });
    }

    return new Response(JSON.stringify({ tweet: tweetContent }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Unexpected error:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}