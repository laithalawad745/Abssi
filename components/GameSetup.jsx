// components/GameSetup.jsx
import React from 'react';

export default function GameSetup({ startAbsiMatch }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 select-none flex flex-col">
      {/* Header */}
      <div className='flex justify-between p-4 md:p-8'>
        <h1 className="text-2xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-pink-400">
          Absi
        </h1>
        <a 
          href="/contact" 
          className="text-2xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-pink-400 hover:scale-105 transition-transform duration-300 cursor-pointer"
        >
          Contact
        </a>
      </div>

      {/* Main Content - Centered */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 md:px-8">
        <div className="text-center space-y-8">
          {/* العنوان الرئيسي */}
          <h1 className="text-3xl md:text-6xl lg:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-pink-400">
            قومبز جيم 
          </h1>
          
          {/* ✅ تحديث وصف المباراة */}
          <div className="space-y-4">
            <button
              onClick={startAbsiMatch}
              className="bg-gradient-to-r cursor-pointer from-purple-600 via-pink-500 to-blue-500 hover:from-purple-700 hover:via-pink-600 hover:to-blue-600 text-white px-8 md:px-12 lg:px-16 py-4 md:py-6 lg:py-8 rounded-2xl font-bold text-xl md:text-3xl lg:text-4xl shadow-2xl shadow-purple-500/30 transition-all duration-300 hover:scale-105 transform border-2 border-purple-400/50 hover:border-pink-400/70"
            >
              مباراة كاملة
            </button>
            <p className="text-slate-300 text-sm md:text-base lg:text-lg max-w-md mx-auto">
              {/* ✅ تحديث الوصف ليشمل فقرة "ولا كلمة" */}
              ابدأ مباراة تحتوي على:
              <br />
              🎬 لايفات عبسي
              <br />
              🎯 أسئلة الاختيارات  
              <br />
              📱 ولا كلمة (QR codes)
            </p>
          </div>

          {/* ✅ إضافة معلومات إضافية */}
          <div className="mt-8 p-4 bg-slate-800/50 backdrop-blur-lg rounded-xl border border-slate-600 max-w-2xl">
            <h3 className="text-lg md:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400 mb-3">
              ميزات اللعبة:
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-slate-300 text-sm md:text-base">
              <div className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                <span>حفظ الأسئلة المستخدمة</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                <span>وسائل خاصة لكل فريق</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                <span>صور وفيديوهات وأصوات</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                <span>أكواد QR تفاعلية</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}