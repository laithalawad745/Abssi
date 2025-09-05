// components/QuestionDisplay.jsx
import React from 'react';

export default function QuestionDisplay({ 
  currentQuestion, 
  showAnswer, 
  usingPitHelper, 
  finishAnswering, 
  awardPoints, 
  noCorrectAnswer,
  zoomImage 
}) {
  if (!currentQuestion) return null;

  return (
    <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-4 md:p-8 mb-4 md:mb-8 shadow-2xl border border-slate-700">
      <div className="text-center mb-4 md:mb-6">
        <span className={`inline-block px-4 md:px-6 py-2 md:py-3 rounded-full text-white font-bold text-base md:text-lg ${
          currentQuestion.difficulty === 'easy' ? 'bg-gradient-to-r from-emerald-500 to-teal-500' :
          currentQuestion.difficulty === 'medium' ? 'bg-gradient-to-r from-yellow-500 to-orange-500' : 
          'bg-gradient-to-r from-red-500 to-pink-500'
        }`}>
          {currentQuestion.points} نقطة
        </span>
        {usingPitHelper && (
          <div className="mt-3">
            <span className="inline-block px-3 md:px-4 py-1 md:py-2 bg-orange-500/80 text-white font-bold rounded-full animate-pulse text-sm md:text-base">
              وسيلة الحفرة مُفعلة - تأثير خاص!
            </span>
          </div>
        )}
      </div>
      
      <h3 className="text-lg md:text-2xl font-bold text-center mb-4 md:mb-8 text-slate-100">{currentQuestion.question}</h3>
      
      {/* ✅ عرض QR Code إذا كان السؤال من نوع QR */}
      {currentQuestion.hasQR && (
        <div className="flex justify-center mb-4 md:mb-8">
          <div className="bg-white p-4 rounded-xl shadow-2xl border-4 border-blue-400/50">
            <img 
              src={currentQuestion.qrImageUrl} 
              alt="QR Code" 
              className="max-w-full max-h-64 md:max-h-80 lg:max-h-96 object-contain cursor-pointer hover:opacity-90 transition-opacity duration-300"
              onClick={() => zoomImage(currentQuestion.qrImageUrl)}
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/300x300/000000/FFFFFF?text=QR+CODE';
              }}
            />
            <p className="text-center mt-2 text-slate-800 font-bold text-sm">امسح الكود لرؤية السؤال</p>
          </div>
        </div>
      )}
      
      {/* عرض الصور العادية */}
      {currentQuestion.hasImage && !currentQuestion.hasQR && (
        <div className="flex justify-center mb-4 md:mb-8">
          <img 
            src={currentQuestion.imageUrl} 
            alt="صورة السؤال" 
            className="max-w-full max-h-64 md:max-h-80 lg:max-h-96 object-contain rounded-xl shadow-2xl border-4 border-purple-400/50 cursor-pointer hover:opacity-90 transition-opacity duration-300"
            onClick={() => zoomImage(currentQuestion.imageUrl)}
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/400x250/6366F1/FFFFFF?text=صورة+السؤال';
            }}
          />
        </div>
      )}
      
      {/* عرض الفيديو */}
      {currentQuestion.hasVideo && (
        <div className="flex justify-center mb-4 md:mb-8">
          <video 
            src={currentQuestion.videoUrl} 
            controls
            className="max-w-full max-h-64 md:max-h-80 lg:max-h-96 rounded-xl shadow-2xl border-4 border-purple-400/50"
            onError={(e) => {
              console.error('فشل في تحميل الفيديو:', currentQuestion.videoUrl);
            }}
            preload="metadata"
          >
            متصفحك لا يدعم تشغيل الفيديو
          </video>
        </div>
      )}
      
      {/* عرض الصوت */}
      {currentQuestion.hasAudio && (
        <div className="flex justify-center mb-4 md:mb-8">
          <audio 
            controls
            src={currentQuestion.audioUrl}
            className="w-full max-w-md"
            onError={(e) => {
              console.error('فشل في تحميل الصوت:', currentQuestion.audioUrl);
            }}
          >
            متصفحك لا يدعم تشغيل الصوت
          </audio>
        </div>
      )}
      
      {!showAnswer ? (
        <div className="text-center">
          <button
            onClick={finishAnswering}
            className="bg-gradient-to-r from-purple-500 to-violet-500 hover:from-purple-600 hover:to-violet-600 text-white px-6 md:px-8 py-2 md:py-3 rounded-xl font-bold text-base md:text-lg shadow-lg transition-all duration-300"
          >
            انتهينا من الإجابات
          </button>
        </div>
      ) : (
        <div className="text-center">
          <div className="bg-emerald-500/20 border border-emerald-400/50 rounded-xl p-4 md:p-6 mb-4 md:mb-8 backdrop-blur-sm">
            <h4 className="text-base md:text-lg font-bold text-emerald-400 mb-2 md:mb-3">الإجابة الصحيحة:</h4>
            <p className="text-lg md:text-2xl text-white font-semibold mb-4">{currentQuestion.answer}</p>
            
            {/* ✅ عرض صورة الجواب إذا كان السؤال من نوع QR */}
            {currentQuestion.hasQR && currentQuestion.answerImageUrl && (
              <div className="flex justify-center mt-4">
                <img 
                  src={currentQuestion.answerImageUrl} 
                  alt="صورة الجواب" 
                  className="max-w-full max-h-48 md:max-h-64 object-contain rounded-xl shadow-lg border-2 border-emerald-400/50 cursor-pointer hover:opacity-90 transition-opacity duration-300"
                  onClick={() => zoomImage(currentQuestion.answerImageUrl)}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/300x200/10B981/FFFFFF?text=صورة+الجواب';
                  }}
                />
              </div>
            )}
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center gap-2 md:gap-6">
            <button
              onClick={() => awardPoints(0)}
              className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-4 md:px-6 py-2 md:py-3 rounded-xl font-bold text-sm md:text-base shadow-lg transition-all duration-300"
            >
              الفريق الأحمر أجاب صح
            </button>
            <button
              onClick={noCorrectAnswer}
              className="bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 text-white px-4 md:px-6 py-2 md:py-3 rounded-xl font-bold text-sm md:text-base shadow-lg transition-all duration-300"
            >
              لا أحد أجاب صح
            </button>
            <button
              onClick={() => awardPoints(1)}
              className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white px-4 md:px-6 py-2 md:py-3 rounded-xl font-bold text-sm md:text-base shadow-lg transition-all duration-300"
            >
              الفريق الأزرق أجاب صح
            </button>
          </div>
        </div>
      )}
    </div>
  );
}