import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';

export function useTweetGeneration() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { session } = useAuth();

  const generateTweet = async (prompt: string) => {
    setIsLoading(true);
    setError(null);

    if (!session) {
      setError('User not authenticated');
      setIsLoading(false);
      return null;
    }

    try {
      const response = await fetch('/api/tweets/generate', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error(`Failed to generate tweet: ${response.statusText}`);
      }

      const data = await response.json();
      return data.tweet;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { generateTweet, isLoading, error };
}