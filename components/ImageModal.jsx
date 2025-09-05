// components/ImageModal.jsx
import React from 'react';

export function ImageModal({ zoomedImage, closeZoomedImage }) {
  if (!zoomedImage) return null;

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={closeZoomedImage}
    >
      <div className="relative max-w-full max-h-full">
        <img 
          src={zoomedImage}
          alt="صورة مكبرة"
          className="max-w-full max-h-full object-contain rounded-xl shadow-2xl cursor-pointer"
          onClick={closeZoomedImage} 
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/800x600/6366F1/FFFFFF?text=صورة+السؤال';
          }}
        />
      </div>
    </div>
  );
}

// components/ConfirmModal.jsx
export function ConfirmModal({ showConfirmReset, setShowConfirmReset, resetGame }) {
  if (!showConfirmReset) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-800 border border-slate-600 rounded-2xl p-4 md:p-6 max-w-md w-full mx-4 text-center shadow-2xl">
        <h2 className="text-xl md:text-2xl text-white font-bold mb-3 md:mb-4">هل أنت متأكد؟</h2>

        <div className="flex flex-col gap-3 md:gap-4">
          <button
            onClick={() => {
              resetGame(false);
              setShowConfirmReset(false);
            }}
            className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white px-4 md:px-6 py-2 rounded-lg font-bold shadow text-sm md:text-base"
          >
            إعادة تشغيل 
          </button>
          <button
            onClick={() => setShowConfirmReset(false)}
            className="bg-slate-600 hover:bg-slate-700 text-white px-4 md:px-6 py-2 rounded-lg font-bold shadow text-sm md:text-base"
          >
            إلغاء
          </button>
        </div>
      </div>
    </div>
  );
}