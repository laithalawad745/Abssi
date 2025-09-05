// components/GameTimer.jsx
import React from 'react';

export default function GameTimer({ timer, currentChoiceQuestion }) {
  if (!timer && !currentChoiceQuestion) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-lg border-b border-slate-700 p-3">
      <div className="text-center">
        <div className={`inline-flex items-center px-4 md:px-6 py-2 md:py-3 rounded-xl font-bold text-base md:text-xl shadow-lg transition-all duration-300 ${
          currentChoiceQuestion 
            ? 'bg-gradient-to-r from-purple-500 to-violet-500 text-white'
            : timer <= 10 
            ? 'bg-gradient-to-r from-red-600 to-red-700 text-white animate-pulse' 
            : timer <= 20
            ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white'
            : 'bg-gradient-to-r from-green-500 to-green-600 text-white'
        }`}>
          {currentChoiceQuestion ? 'سؤال اختيارات' : `الوقت المتبقي: ${timer} ثانية`}
        </div>
      </div>
    </div>
  );
}