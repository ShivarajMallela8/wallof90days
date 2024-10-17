import React from 'react';

const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-emerald-500"></div>
        <h2 className="mt-4 text-xl font-semibold text-white">Loading...</h2>
        <p className="mt-2 text-sm text-gray-400">Please wait while we prepare your dashboard</p>
      </div>
    </div>
  );
};

export default Loading;