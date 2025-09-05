// components/ChoiceQuestion.jsx
import React from 'react';

export default function ChoiceQuestion({ 
  currentChoiceQuestion, 
  showChoiceAnswers, 
  selectedAnswers,
  finishChoiceAnswering,
  awardChoicePoints,
  awardChoicePointsBoth,
  closeChoiceQuestion 
}) {
  if (!currentChoiceQuestion) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-800/95 backdrop-blur-lg rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-slate-600 shadow-2xl">
        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">{currentChoiceQuestion.question}</h2>
          <span className="inline-block px-4 py-2 bg-gradient-to-r from-purple-500 to-violet-500 text-white font-bold rounded-full">
            سؤال رقم {currentChoiceQuestion.order}
          </span>
        </div>

        {!showChoiceAnswers ? (
          // المرحلة الأولى: عرض مربعات فارغة مرقمة فقط
          <div className="space-y-4 mb-6">
            {currentChoiceQuestion.answers.map((answer, index) => (
              <div key={index} className="bg-slate-700/50 backdrop-blur-lg rounded-xl p-6 border border-slate-600">
                <div className="text-center">
                  <span className="text-white font-bold text-2xl">{index + 1}</span>
                </div>
              </div>
            ))}
            
            <div className="text-center mt-8">
              <button
                onClick={finishChoiceAnswering}
                className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-8 py-3 rounded-xl font-bold text-lg shadow-lg transition-all duration-300"
              >
                انتهاء
              </button>
            </div>
          </div>
        ) : (
          // المرحلة الثانية: عرض النقاط والأزرار
          <div className="space-y-4 mb-6">
            {currentChoiceQuestion.answers.map((answer, index) => {
              const answerKey = `answer_${index}`;
              const isSelected = selectedAnswers[answerKey];
              
              return (
                <div key={index} className="bg-slate-700/50 backdrop-blur-lg rounded-xl p-4 border border-slate-600">
                  <div className="text-center mb-4">
                    <span className="text-white font-semibold text-lg">{answer.text}</span>
                    <div className="mt-2">
                      <span className="inline-block px-3 py-1 bg-yellow-500 text-black font-bold rounded-full">
                        {answer.points} نقطة
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    <button
                      onClick={() => awardChoicePoints(index, 'red')}
                      disabled={isSelected}
                      className={`px-3 py-2 rounded-lg font-bold text-sm transition-all duration-300 ${
                        isSelected === 'red'
                          ? 'bg-red-700 text-red-200 cursor-not-allowed opacity-75' 
                          : isSelected
                          ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                          : 'bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white'
                      }`}
                    >
                      الفريق الأحمر {isSelected === 'red' && '✓'}
                    </button>
                    <button
                      onClick={() => awardChoicePoints(index, 'blue')}
                      disabled={isSelected}
                      className={`px-3 py-2 rounded-lg font-bold text-sm transition-all duration-300 ${
                        isSelected === 'blue'
                          ? 'bg-blue-700 text-blue-200 cursor-not-allowed opacity-75' 
                          : isSelected
                          ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                          : 'bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white'
                      }`}
                    >
                      الفريق الأزرق {isSelected === 'blue' && '✓'}
                    </button>
                    <button
                      onClick={() => awardChoicePointsBoth(index)}
                      disabled={isSelected}
                      className={`px-3 py-2 rounded-lg font-bold text-sm transition-all duration-300 ${
                        isSelected === 'both'
                          ? 'bg-purple-700 text-purple-200 cursor-not-allowed opacity-75' 
                          : isSelected
                          ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                          : 'bg-gradient-to-r from-purple-500 to-violet-500 hover:from-purple-600 hover:to-violet-600 text-white'
                      }`}
                    >
                      كليهما {isSelected === 'both' && '✓'}
                    </button>
                    <button
                      disabled={isSelected}
                      className={`px-3 py-2 rounded-lg font-bold text-sm transition-all duration-300 ${
                        isSelected
                          ? 'bg-gray-700 text-gray-400 cursor-not-allowed opacity-75'
                          : 'bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 text-white'
                      }`}
                    >
                      لا أحد
                    </button>
                  </div>
                </div>
              );
            })}
            
            <div className="text-center mt-8">
              <button
                onClick={closeChoiceQuestion}
                className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-8 py-3 rounded-xl font-bold text-lg shadow-lg transition-all duration-300"
              >
                إغلاق
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}