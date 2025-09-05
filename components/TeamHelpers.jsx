// components/TeamHelpers.jsx
import React from 'react';

export default function TeamHelpers({ 
  helpers, 
  currentTurn, 
  currentQuestion, 
  currentChoiceQuestion,
  useNumber2Helper,
  usePitHelper 
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-6 mb-4 md:mb-6">
      {/* وسائل الفريق الأحمر */}
      <div className="bg-red-500/20 backdrop-blur-lg rounded-xl p-3 md:p-4 border border-red-500/30">
        <h3 className="text-sm md:text-lg font-bold text-red-400 mb-2 md:mb-3 text-center">وسائل الفريق الأحمر</h3>
        <div className="flex justify-center gap-2 md:gap-3">
          <button
            onClick={() => useNumber2Helper('red')}
            disabled={!helpers.red.number2 || currentTurn !== 'red' || currentQuestion !== null || currentChoiceQuestion !== null}
            className={`px-3 md:px-4 py-2 rounded-lg font-bold transition-all duration-300 text-sm md:text-base ${
              helpers.red.number2 && currentTurn === 'red' && currentQuestion === null && currentChoiceQuestion === null
                ? 'bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white shadow-lg'
                : 'bg-gray-600 text-gray-400 cursor-not-allowed'
            }`}
          >
            2️⃣
          </button>
          <button
            onClick={() => usePitHelper('red')}
            disabled={!helpers.red.pit || currentTurn !== 'red' || currentQuestion !== null || currentChoiceQuestion !== null}
            className={`px-3 md:px-4 py-2 rounded-lg font-bold transition-all duration-300 text-sm md:text-base ${
              helpers.red.pit && currentTurn === 'red' && currentQuestion === null && currentChoiceQuestion === null
                ? 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-lg'
                : 'bg-gray-600 text-gray-400 cursor-not-allowed'
            }`}
          >
            حفرة
          </button>
        </div>
      </div>
      
      {/* وسائل الفريق الأزرق */}
      <div className="bg-blue-500/20 backdrop-blur-lg rounded-xl p-3 md:p-4 border border-blue-500/30">
        <h3 className="text-sm md:text-lg font-bold text-blue-400 mb-2 md:mb-3 text-center">وسائل الفريق الأزرق</h3>
        <div className="flex justify-center gap-2 md:gap-3">
          <button
            onClick={() => useNumber2Helper('blue')}
            disabled={!helpers.blue.number2 || currentTurn !== 'blue' || currentQuestion !== null || currentChoiceQuestion !== null}
            className={`px-3 md:px-4 py-2 rounded-lg font-bold transition-all duration-300 text-sm md:text-base ${
              helpers.blue.number2 && currentTurn === 'blue' && currentQuestion === null && currentChoiceQuestion === null
                ? 'bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white shadow-lg'
                : 'bg-gray-600 text-gray-400 cursor-not-allowed'
            }`}
          >
            2️⃣
          </button>
          <button
            onClick={() => usePitHelper('blue')}
            disabled={!helpers.blue.pit || currentTurn !== 'blue' || currentQuestion !== null || currentChoiceQuestion !== null}
            className={`px-3 md:px-4 py-2 rounded-lg font-bold transition-all duration-300 text-sm md:text-base ${
              helpers.blue.pit && currentTurn === 'blue' && currentQuestion === null && currentChoiceQuestion === null
                ? 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-lg'
                : 'bg-gray-600 text-gray-400 cursor-not-allowed'
            }`}
          >
            حفرة
          </button>
        </div>
      </div>
    </div>
  );
}