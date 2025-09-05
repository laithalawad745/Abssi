// components/GameFinished.jsx
import React from 'react';

export default function GameFinished({ teams, isAbsiMode, resetGame }) {
  const getWinner = () => {
    if (teams[0].score > teams[1].score) {
      return { team: teams[0], message: `${teams[0].name} هو الفائز!` };
    } else if (teams[1].score > teams[0].score) {
      return { team: teams[1], message: `${teams[1].name} هو الفائز!` };
    } else {
      return { team: null, message: 'تعادل بين الفريقين!' };
    }
  };

  const winner = getWinner();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-4 md:p-8 text-center shadow-2xl border border-slate-700">
          <h1 className="text-3xl md:text-6xl font-bold mb-6 md:mb-8 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
            انتهت اللعبة! 
          </h1>
          
          {/* عرض نوع المباراة */}
          {isAbsiMode && (
            <div className="mb-6">
              <span className="inline-block px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold rounded-full">
                🏆 مباراة عبسي + الاختيارات 🏆
              </span>
            </div>
          )}
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-8 mb-6 md:mb-8">
            <div className={`p-4 md:p-8 rounded-xl transition-all duration-500 ${
              teams[0].score > teams[1].score 
                ? 'bg-gradient-to-br from-yellow-400 to-orange-500 ring-4 ring-yellow-400/50 shadow-2xl shadow-yellow-500/25' 
                : 'bg-gradient-to-br from-red-500 to-pink-500 shadow-lg'
            }`}>
              <h2 className="text-xl md:text-3xl font-bold text-white mb-2 md:mb-3">{teams[0].name}</h2>
              <p className="text-3xl md:text-5xl font-bold text-white">{teams[0].score}</p>
              {teams[0].score > teams[1].score && <p className="text-yellow-200 font-bold mt-2 md:mt-3 text-lg md:text-xl">الفائز</p>}
            </div>
            <div className={`p-4 md:p-8 rounded-xl transition-all duration-500 ${
              teams[1].score > teams[0].score 
                ? 'bg-gradient-to-br from-yellow-400 to-orange-500 ring-4 ring-yellow-400/50 shadow-2xl shadow-yellow-500/25' 
                : 'bg-gradient-to-br from-blue-500 to-indigo-500 shadow-lg'
            }`}>
              <h2 className="text-xl md:text-3xl font-bold text-white mb-2 md:mb-3">{teams[1].name}</h2>
              <p className="text-3xl md:text-5xl font-bold text-white">{teams[1].score}</p>
              {teams[1].score > teams[0].score && <p className="text-yellow-200 font-bold mt-2 md:mt-3 text-lg md:text-xl">الفائز</p>}
            </div>
          </div>
          
          <div className="mb-6 md:mb-8">
            <h2 className="text-2xl md:text-4xl font-bold mb-3 md:mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-violet-400">
              {winner.message}
            </h2>
            {teams[0].score === teams[1].score ? (
              <p className="text-lg md:text-xl text-slate-300">كلا الفريقين أدوا أداءً ممتازاً!</p>
            ) : (
              <p className="text-lg md:text-xl text-slate-300">
                الفارق في النقاط: {Math.abs(teams[0].score - teams[1].score)} نقطة
              </p>
            )}
          </div>
          
          <div className="flex justify-center gap-4">
            <button
              onClick={() => resetGame(false)}
              className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-6 md:px-10 py-3 md:py-4 rounded-xl font-bold text-lg md:text-xl shadow-lg transition-all duration-300"
            >
              لعبة جديدة
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}