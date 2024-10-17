// lib/twitter.ts
import { UserSettings } from '@/types';
import { TwitterApi } from 'twitter-api-v2';

export async function postTweet(content: string, userSettings: UserSettings): Promise<string> {
  try {
    const client = new TwitterApi({
      appKey: userSettings.twitter_api_key!,
      appSecret: userSettings.twitter_api_secret!,
      accessToken: userSettings.twitter_access_token!,
      accessSecret: userSettings.twitter_access_token_secret!,
    });

    const v2Client = client.v2;

    const { data } = await v2Client.tweet(content);

    return data.id;
  } catch (error) {
    console.error('Error posting tweet:', error);
    throw new Error('Failed to post tweet');
  }
}