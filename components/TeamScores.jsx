// components/TeamScores.jsx
import React from 'react';

export default function TeamScores({ 
  teams, 
  currentTurn, 
  usingPitHelper, 
  isAbsiMode,
  // ✅ إضافة props التوقيت
  timer,
  timerActive,
  toggleTimer,
  resetTimer,
  currentChoiceQuestion
}) {
  
  // تحويل الثواني إلى تنسيق mm:ss
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <>
      {/* ✅ دمج التوقيت مع دور الفريق */}
      <div className="text-center mb-4 md:mb-6">
        <div className={`inline-flex items-center px-4 md:px-8 py-2 md:py-4 rounded-2xl font-bold text-lg md:text-2xl shadow-lg transition-all duration-500 ${
          currentTurn === 'red' 
            ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-red-500/25' 
            : 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-blue-500/25'
        }`}>
          
          {/* معلومات الفريق */}
          <div className="flex flex-col items-center">
            <span className="text-sm md:text-base opacity-90">دور</span>
            <span>{currentTurn === 'red' ? 'الفريق الأحمر' : 'الفريق الأزرق'}</span>
          </div>

          {/* ✅ التوقيت في المنتصف */}
          <div className="mx-4 md:mx-8 flex flex-col items-center">
            <div className={`text-2xl md:text-3xl font-mono font-bold px-3 py-1 rounded-lg ${
              currentChoiceQuestion 
                ? 'bg-purple-600/50 text-purple-100'
                : 'bg-black/30 text-white'
            }`}>
              {currentChoiceQuestion ? 'اختيارات' : formatTime(timer)}
            </div>
            
            {/* أزرار التحكم بالتوقيت */}
            {!currentChoiceQuestion && (
              <div className="flex gap-2 mt-2">
                <button
                  onClick={toggleTimer}
                  className={`px-2 md:px-3 py-1 rounded-md text-xs md:text-sm font-bold transition-all duration-300 ${
                    timerActive 
                      ? 'bg-orange-500 hover:bg-orange-600 text-white' 
                      : 'bg-green-500 hover:bg-green-600 text-white'
                  }`}
                >
                  {timerActive ? '⏸️ إيقاف' : '▶️ تشغيل'}
                </button>
                <button
                  onClick={resetTimer}
                  className="px-2 md:px-3 py-1 rounded-md text-xs md:text-sm font-bold bg-slate-600 hover:bg-slate-700 text-white transition-all duration-300"
                >
                  🔄 إعادة
                </button>
              </div>
            )}
          </div>

          {/* المؤشرات الإضافية */}
          <div className="flex flex-col items-center gap-1">
            {usingPitHelper && (
              <span className="px-2 md:px-3 py-1 bg-orange-500 rounded-full text-xs md:text-sm animate-pulse">
                الحفرة مُفعلة
              </span>
            )}
            {isAbsiMode && (
              <span className="px-2 md:px-3 py-1 bg-yellow-500 rounded-full text-xs md:text-sm">
               ss 🏆 مباراة كاملة
              </span>
            )}
          </div>
        </div>
      </div>

      {/* شريط معلومات الفقرات */}
      {isAbsiMode && (
        <div className="text-center mb-4 md:mb-6">
          <div className="inline-flex items-center gap-2 md:gap-4 px-4 md:px-6 py-2 md:py-3 bg-slate-800/50 backdrop-blur-lg rounded-xl border border-slate-600">
            <div className="flex items-center gap-1">
              <span className="text-blue-400">🎬</span>
              <span className="text-slate-300 text-xs md:text-sm">لايفات عبسي</span>
            </div>
            <div className="w-px h-4 bg-slate-600"></div>
            <div className="flex items-center gap-1">
              <span className="text-purple-400">🎯</span>
              <span className="text-slate-300 text-xs md:text-sm">الاختيارات</span>
            </div>
            <div className="w-px h-4 bg-slate-600"></div>
            <div className="flex items-center gap-1">
              <span className="text-green-400">📱</span>
              <span className="text-slate-300 text-xs md:text-sm">ولا كلمة</span>
            </div>
          </div>
        </div>
      )}

      {/* بطاقات النقاط */}
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
    </>
  );
}