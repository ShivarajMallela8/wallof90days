import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import { TwitterApi } from 'twitter-api-v2';

export async function POST(req: Request) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return new Response('Unauthorized', { status: 401 });
  }

  const { tweetId } = await req.json();

  // Fetch the tweet from Supabase
  const { data: tweet, error: fetchError } = await supabase
    .from('tweets')
    .select('*')
    .eq('id', tweetId)
    .single();

  if (fetchError || !tweet) {
    return new Response(JSON.stringify({ error: 'Tweet not found' }), { status: 404 });
  }

  // Fetch user's Twitter API credentials from Supabase
  const { data: credentials, error: credentialsError } = await supabase
    .from('user_settings')
    .select('twitter_api_key, twitter_api_secret, twitter_access_token, twitter_access_token_secret')
    .eq('user_id', user.id)
    .single();

  if (credentialsError || !credentials) {
    return new Response(JSON.stringify({ error: 'Twitter credentials not found' }), { status: 400 });
  }

  // Initialize Twitter client
  const twitterClient = new TwitterApi({
    appKey: credentials.twitter_api_key,
    appSecret: credentials.twitter_api_secret,
    accessToken: credentials.twitter_access_token,
    accessSecret: credentials.twitter_access_token_secret,
  });

  try {
    // Post the tweet
    const postedTweet = await twitterClient.v2.tweet(tweet.content);

    // Update the tweet status in Supabase
    await supabase
      .from('tweets')
      .update({ posted: true, posted_at: new Date().toISOString() })
      .eq('id', tweetId);

    return new Response(JSON.stringify({ success: true, tweetId: postedTweet.data.id }));
  } catch (error) {
    console.error('Error posting tweet:', error);
    return new Response(JSON.stringify({ error: 'Failed to post tweet' }), { status: 500 });
  }
}