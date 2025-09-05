// components/TeamScoresOnly.jsx
import React from 'react';

export default function TeamScoresOnly({ 
  teams, 
  currentTurn
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-6 mb-4 md:mb-8">
      <div className={`p-4 md:p-6 rounded-2xl text-center transition-all duration-500 ${
        currentTurn === 'red'
          ? 'bg-gradient-to-br from-red-500 to-pink-500 shadow-2xl shadow-red-500/25 ring-4 ring-red-400/50'
          : 'bg-gradient-to-br from-red-500/70 to-pink-500/70 shadow-lg'
      }`}>
        <h2 className="text-lg md:text-2xl font-bold text-white mb-1 md:mb-2">{teams[0].name}</h2>
        <p className="text-3xl md:text-5xl font-bold text-white">{teams[0].score}</p>
      </div>
      <div className={`p-4 md:p-6 rounded-2xl text-center transition-all duration-500 ${
        currentTurn === 'blue'
          ? 'bg-gradient-to-br from-blue-500 to-indigo-500 shadow-2xl shadow-blue-500/25 ring-4 ring-blue-400/50'
          : 'bg-gradient-to-br from-blue-500/70 to-indigo-500/70 shadow-lg'
      }`}>
        <h2 className="text-lg md:text-2xl font-bold text-white mb-1 md:mb-2">{teams[1].name}</h2>
        <p className="text-3xl md:text-5xl font-bold text-white">{teams[1].score}</p>
      </div>
    </div>
  );
}