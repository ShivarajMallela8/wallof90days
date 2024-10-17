import { HfInference } from '@huggingface/inference';

const Hf = new HfInference(process.env.HUGGINGFACE_API_KEY);

export async function generateTweet(topic: string) {
  const prompt = `Create a single, engaging tweet about ${topic}. The tweet should be:
  1. Concise and impactful (max 280 characters)
  2. Relevant to the given topic
  3. Witty or thought-provoking
  4. Written in a natural, conversational tone
  5. Include 1-2 relevant hashtags if appropriate
  6. Do not include any text like "Tweet:", "Here's a tweet:", or similar prefixes
  7. Do not include any explanations or additional text beyond the tweet itself

  Generate only the tweet text, without any additional explanations or formatting.`;
  const response = Hf.textGenerationStream({
    model: 'meta-llama/Llama-3.2-1B-Instruct',
    inputs: prompt,
    parameters: {
      max_new_tokens: 280,
      temperature: 0.7,
      top_p: 0.95,
      repetition_penalty: 1.1,
    },
  });

  let tweet = '';
  for await (const chunk of response) {
    tweet += chunk.token.text;
  }

  // Clean up the tweet
  tweet = tweet.trim()
               .replace(/^["']|["']$/g, '')  // Remove leading/trailing quotes if present
               .replace(/\n+/g, ' ')  // Replace multiple newlines with a single space

  return new Response(tweet);
}