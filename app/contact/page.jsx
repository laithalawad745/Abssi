import React from 'react';
import Link from 'next/link';

export default function Contact() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 md:p-8 select-none">
      <div className="max-w-4xl mx-auto">
        {/* Header with back button */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-pink-400">
            Absi
          </h1>
          <Link 
            href="/"
            className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white px-4 md:px-6 py-2 md:py-3 rounded-xl font-bold text-sm md:text-base shadow-lg transition-all duration-300"
          >
            ← العودة للرئيسية
          </Link>
        </div>

        {/* Main content */}
        <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-6 md:p-8 shadow-2xl border border-slate-700">
          <h2 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-pink-400 text-center mb-8">
            للتواصل
          </h2>
          
          <div className="space-y-6 md:space-y-8">
            {/* Email */}
            <div className="bg-slate-700/50 backdrop-blur-lg rounded-xl p-4 md:p-6 border border-slate-600 hover:border-blue-400 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25">
              <div className="flex items-center gap-4">
                <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-3 rounded-full">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-slate-100 mb-1">البريد الإلكتروني</h3>
                  <a 
                    href="mailto:your-email@example.com" 
                    className="text-blue-400 hover:text-blue-300 transition-colors duration-200 text-sm md:text-base"
                  >
                    laith755laith@gmail.com
                  </a>
                </div>
              </div>
            </div>

            {/* Telegram */}
            <div className="bg-slate-700/50 backdrop-blur-lg rounded-xl p-4 md:p-6 border border-slate-600 hover:border-blue-400 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25">
              <div className="flex items-center gap-4">
                <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-3 rounded-full">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.374 0 0 5.373 0 12s5.374 12 12 12 12-5.373 12-12S18.626 0 12 0zm5.568 8.16c-.169 1.858-.896 6.728-.896 6.728-.896 6.728-1.268 8.671-1.268 8.671-.168.896-.622 1.048-.622 1.048s-.896.336-1.792-.336c-.448-.336-2.24-1.344-2.688-1.68-.224-.168-.448-.504-.056-.84.392-.336 3.584-3.248 3.584-3.248s.224-.224-.224-.336c-.448-.112-4.032 2.464-4.032 2.464s-.672.392-1.904.056c-1.232-.336-2.688-.896-2.688-.896s-1.008-.616.728-1.288c1.736-.672 7.728-2.912 7.728-2.912s3.248-1.288 3.248-1.288 1.232-.448 1.232.56z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-slate-100 mb-1">تليجرام</h3>
                  <a 
                    href="https://t.me/your_username" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 transition-colors duration-200 text-sm md:text-base"
                  >
                    laith755laith
                  </a>
                </div>
              </div>
            </div>
          </div>


        </div>
      </div>
    </div>
  );
}