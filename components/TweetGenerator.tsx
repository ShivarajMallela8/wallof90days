import React, { useState } from 'react';
import { Send, Edit2, Eye } from 'lucide-react';

interface TweetGeneratorProps {
  onGenerate: (prompt: string, tone: string) => Promise<string>;
 
}

export const TweetGenerator: React.FC<TweetGeneratorProps> = ({ onGenerate }) => {
  const [prompt, setPrompt] = useState('');
  const [tone, setTone] = useState('casual');
  const [generatedTweet, setGeneratedTweet] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const tweet = await onGenerate(prompt, tone);
      setGeneratedTweet(tweet);
      setIsEditing(true);
    } catch (error) {
      console.error('Error generating tweet:', error);
      setGeneratedTweet('Error generating tweet. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

 

  return (
    <div className="bg-gray-800 text-gray-100 p-6 rounded-lg shadow-lg space-y-4">
      <h2 className="text-xl font-semibold mb-4">Tweet Generator</h2>
      <div className="space-y-2">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter tweet prompt"
          className="w-full p-2 rounded-md bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-emerald-500 focus:ring focus:ring-emerald-500 focus:ring-opacity-50"
        />
        <select 
          value={tone} 
          onChange={(e) => setTone(e.target.value)}
          className="w-full p-2 rounded-md bg-gray-700 border-gray-600 text-white focus:border-emerald-500 focus:ring focus:ring-emerald-500 focus:ring-opacity-50"
        >
          <option value="casual">Casual</option>
          <option value="formal">Formal</option>
          <option value="humorous">Humorous</option>
        </select>
        <button 
          onClick={handleGenerate}
          disabled={isGenerating}
          className="w-full p-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 disabled:bg-emerald-800 disabled:cursor-not-allowed flex items-center justify-center"
        >
          <Send size={18} className="mr-2" />
          {isGenerating ? 'Generating...' : 'Generate Tweet'}
        </button>
      </div>
      
      {generatedTweet && (
        <div className="space-y-2 mt-4">
          {isEditing ? (
            <textarea
              value={generatedTweet}
              onChange={(e) => setGeneratedTweet(e.target.value)}
              className="w-full p-2 rounded-md bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-emerald-500 focus:ring focus:ring-emerald-500 focus:ring-opacity-50 h-32"
              placeholder="Edit your tweet here"
            />
          ) : (
            <div className="w-full p-2 border border-gray-600 rounded-md h-32 overflow-auto bg-gray-700">
              {generatedTweet}
            </div>
          )}
          <div className="flex space-x-2">
            <button 
              onClick={() => setIsEditing(!isEditing)}
              className="flex-1 p-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 flex items-center justify-center"
            >
              {isEditing ? <Eye size={18} className="mr-2" /> : <Edit2 size={18} className="mr-2" />}
              {isEditing ? 'Preview' : 'Edit'}
            </button>
         
          </div>
        </div>
      )}
    </div>
  );
};