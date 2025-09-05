'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { sampleTopics } from '../app/data/gameData';

export default function QuizGame() {
  const [gameState, setGameState] = useState('setup');
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [showConfirmReset, setShowConfirmReset] = useState(false);
  const [currentTurn, setCurrentTurn] = useState('red');
  const [teams, setTeams] = useState([
    { name: 'الفريق الأحمر', color: 'red', score: 0 },
    { name: 'الفريق الأزرق', color: 'blue', score: 0 }
  ]);

  const [zoomedImage, setZoomedImage] = useState(null);

  const [timer, setTimer] = useState(60);
  const [timerActive, setTimerActive] = useState(false);
  const [timerInterval, setTimerInterval] = useState(null);

  const [helpers, setHelpers] = useState({
    red: {
      number2: true,
      pit: true
    },
    blue: {
      number2: true,
      pit: true
    }
  });

  const [usingPitHelper, setUsingPitHelper] = useState(null);
  const [teamQuestionMap, setTeamQuestionMap] = useState({});
  const [usedQuestions, setUsedQuestions] = useState(new Set());
  const [isAbsiMode, setIsAbsiMode] = useState(false); // إضافة متغير لتتبع وضع عبسي

  const zoomImage = (imageUrl) => {
    setZoomedImage(imageUrl);
  };

  const closeZoomedImage = () => {
    setZoomedImage(null);
  };

useEffect(() => {
  try {
    const savedUsedQuestions = localStorage.getItem('quiz-used-questions');
    const savedTeamQuestionMap = localStorage.getItem('quiz-team-question-map');
    const savedTeams = localStorage.getItem('quiz-teams');
    const savedHelpers = localStorage.getItem('quiz-helpers');
    
    if (savedUsedQuestions) {
      setUsedQuestions(new Set(JSON.parse(savedUsedQuestions)));
    }
    if (savedTeamQuestionMap) {
      setTeamQuestionMap(JSON.parse(savedTeamQuestionMap));
    }
    if (savedTeams) {
      setTeams(JSON.parse(savedTeams));
    }
    if (savedHelpers) {
      setHelpers(JSON.parse(savedHelpers));
    }
  } catch (error) {
    console.log('localStorage      ');
  }
}, []);

useEffect(() => {
  try {
    localStorage.setItem('quiz-used-questions', JSON.stringify([...usedQuestions]));
  } catch (error) {
  }
}, [usedQuestions]);

useEffect(() => {
  try {
    localStorage.setItem('quiz-team-question-map', JSON.stringify(teamQuestionMap));
  } catch (error) {
  }
}, [teamQuestionMap]);

useEffect(() => {
  try {
    localStorage.setItem('quiz-teams', JSON.stringify(teams));
  } catch (error) {
  }
}, [teams]);

useEffect(() => {
  try {
    localStorage.setItem('quiz-helpers', JSON.stringify(helpers));
  } catch (error) {
  }
}, [helpers]);

  const startTimer = () => {
    setTimer(60);
    setTimerActive(true);
    const interval = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) {
          setTimerActive(false);
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    setTimerInterval(interval);
  };

  const stopTimer = () => {
    setTimerActive(false);
    if (timerInterval) {
      clearInterval(timerInterval);
      setTimerInterval(null);
    }
  };

  const resetTimer = () => {
    stopTimer();
    setTimer(45);
  };

  useEffect(() => {
    return () => {
      if (timerInterval) {
        clearInterval(timerInterval);
      }
    };
  }, [timerInterval]);

  const handleTopicSelection = (topic) => {
    if (selectedTopics.length < 6 && !selectedTopics.find(t => t.id === topic.id)) {
      setSelectedTopics([...selectedTopics, topic]);
    }
  };

  const removeTopicSelection = (topicId) => {
    setSelectedTopics(selectedTopics.filter(t => t.id !== topicId));
  };

  const startGame = () => {
    if (selectedTopics.length === 6) {
      const questionMap = {};
      
      selectedTopics.forEach(topic => {
        questionMap[topic.id] = {
          red: { easy: false, medium: false, hard: false },
          blue: { easy: false, medium: false, hard: false }
        };
      });
      
      setTeamQuestionMap(questionMap);
      setGameState('playing');
    }
  };

  // دالة جديدة لبدء مباراة عبسي
  const startAbsiMatch = () => {
    const absiTopic = sampleTopics.find(topic => topic.id === 'absi');
    if (absiTopic) {
      setSelectedTopics([absiTopic]);
      setIsAbsiMode(true);
      
      const questionMap = {};
      questionMap[absiTopic.id] = {
        red: { easy: false, medium: false, hard: false },
        blue: { easy: false, medium: false, hard: false }
      };
      
      setTeamQuestionMap(questionMap);
      setGameState('playing');
    }
  };

  const useNumber2Helper = (team) => {
    if (helpers[team].number2) {
      const newHelpers = { ...helpers };
      newHelpers[team].number2 = false;
      setHelpers(newHelpers);
    }
  };

  const usePitHelper = (team) => {
    if (helpers[team].pit) {
      const newHelpers = { ...helpers };
      newHelpers[team].pit = false;
      setHelpers(newHelpers);
      setUsingPitHelper(team);
    }
  };

  const isQuestionAvailable = (topicId, difficulty, team) => {
    const topic = selectedTopics.find(t => t.id === topicId);
    if (!topic) return false;

    const hasTeamUsedThisLevel = teamQuestionMap[topicId]?.[team]?.[difficulty] === true;
    if (hasTeamUsedThisLevel) return false;

    const availableQuestions = topic.questions.filter(q => 
      q.difficulty === difficulty && 
      !usedQuestions.has(q.id)
    );

    return availableQuestions.length > 0;
  };

  const getAvailableQuestionsCount = (topicId, difficulty, team) => {
    const topic = selectedTopics.find(t => t.id === topicId);
    if (!topic) return 0;

    const availableQuestions = topic.questions.filter(q => 
      q.difficulty === difficulty && 
      !usedQuestions.has(q.id)
    );

    return availableQuestions.length;
  };

  const selectRandomQuestionForTeam = (topicId, difficulty, team) => {
    if (team !== currentTurn) {
      return;
    }

    const topic = selectedTopics.find(t => t.id === topicId);
    if (!topic) return;

    const hasTeamUsedThisLevel = teamQuestionMap[topicId]?.[team]?.[difficulty] === true;
    if (hasTeamUsedThisLevel) {
      console.log(`الفريق ${team} اختار هذا المستوى من قبل`);
      return;
    }

    const availableQuestions = topic.questions.filter(q => 
      q.difficulty === difficulty && 
      !usedQuestions.has(q.id)
    );

    if (availableQuestions.length === 0) {
      console.log(`لا توجد أسئلة متاحة للفريق ${team} في موضوع ${topicId} مستوى ${difficulty}`);
      return;
    }

    const randomIndex = Math.floor(Math.random() * availableQuestions.length);
    const selectedQuestion = availableQuestions[randomIndex];

    const newTeamQuestionMap = { ...teamQuestionMap };
    if (!newTeamQuestionMap[topicId]) {
      newTeamQuestionMap[topicId] = {
        red: { easy: false, medium: false, hard: false },
        blue: { easy: false, medium: false, hard: false }
      };
    }
    newTeamQuestionMap[topicId][team][difficulty] = true;
    setTeamQuestionMap(newTeamQuestionMap);

    setUsedQuestions(prev => new Set([...prev, selectedQuestion.id]));

    setCurrentQuestion(selectedQuestion);
    setShowAnswer(false);
    startTimer();
  };

  const finishAnswering = () => {
    setShowAnswer(true);
    stopTimer();
  };

  const awardPoints = (teamIndex) => {
    if (currentQuestion) {
      const newTeams = [...teams];
      const questionPoints = currentQuestion.points;
      
      if (usingPitHelper) {
        const pitTeamIndex = usingPitHelper === 'red' ? 0 : 1;
        const otherTeamIndex = pitTeamIndex === 0 ? 1 : 0;
        
        if (teamIndex === pitTeamIndex) {
          newTeams[pitTeamIndex].score += questionPoints;
          newTeams[otherTeamIndex].score -= questionPoints;
          if (newTeams[otherTeamIndex].score < 0) {
            newTeams[otherTeamIndex].score = 0;
          }
        } else {
          newTeams[teamIndex].score += questionPoints;
        }
        
        setUsingPitHelper(null);
      } else {
        newTeams[teamIndex].score += questionPoints;
      }
      
      setTeams(newTeams);
      
      setCurrentTurn(currentTurn === 'red' ? 'blue' : 'red');
      
      setCurrentQuestion(null);
      setShowAnswer(false);
      resetTimer();
      
      setTimeout(() => {
        checkGameEnd();
      }, 100);
    }
  };

  const noCorrectAnswer = () => {
    if (currentQuestion) {
      if (usingPitHelper) {
        setUsingPitHelper(null);
      }
      
      setCurrentTurn(currentTurn === 'red' ? 'blue' : 'red');
      
      setCurrentQuestion(null);
      setShowAnswer(false);
      resetTimer();
      
      setTimeout(() => {
        checkGameEnd();
      }, 100);
    }
  };

  const checkGameEnd = () => {
    let totalAnsweredQuestions = 0;
    const totalPossibleQuestions = selectedTopics.length * 2 * 3; 

    selectedTopics.forEach(topic => {
      ['red', 'blue'].forEach(team => {
        ['easy', 'medium', 'hard'].forEach(difficulty => {
          if (teamQuestionMap[topic.id]?.[team]?.[difficulty] === true) {
            totalAnsweredQuestions += 1;
          }
        });
      });
    });

    if (totalAnsweredQuestions >= totalPossibleQuestions) {
      setGameState('finished');
      resetTimer();
    }
  };

  const hasUsedQuestionsInLevel = (topicId, difficulty, team) => {
    return teamQuestionMap[topicId]?.[team]?.[difficulty] === true;
  };

  const getWinner = () => {
    if (teams[0].score > teams[1].score) {
      return { team: teams[0], message: ` ${teams[0].name} هو الفائز!` };
    } else if (teams[1].score > teams[0].score) {
      return { team: teams[1], message: ` ${teams[1].name} هو الفائز!` };
    } else {
      return { team: null, message: ' تعادل بين الفريقين!' };
    }
  };

  const resetGame = (clearUsedQuestions = false) => {
    setGameState('setup');
    setSelectedTopics([]);
    setCurrentQuestion(null);
    setShowAnswer(false);
    setCurrentTurn('red');
    setTeamQuestionMap({});
    setUsingPitHelper(null);
    setZoomedImage(null);
    setIsAbsiMode(false); // إعادة تعيين وضع عبسي
    resetTimer();
    setHelpers({
      red: { number2: true, pit: true },
      blue: { number2: true, pit: true }
    });
    setTeams([
      { name: 'الفريق الأحمر', color: 'red', score: 0 },
      { name: 'الفريق الأزرق', color: 'blue', score: 0 }
    ]);

    // مسح الأسئلة المستخدمة إذا طُلب ذلك
    if (clearUsedQuestions) {
      setUsedQuestions(new Set());
      try {
        localStorage.removeItem('quiz-used-questions');
      } catch (error) {
        // تجاهل الأخطاء إذا كان localStorage غير متاح
      }
    }

    // مسح بيانات localStorage الأخرى
    try {
      localStorage.removeItem('quiz-team-question-map');
      localStorage.removeItem('quiz-teams');
      localStorage.removeItem('quiz-helpers');
    } catch (error) {
      // تجاهل الأخطاء إذا كان localStorage غير متاح
    }
  };

  const getUsedQuestionsStats = () => {
    const totalQuestions = sampleTopics.reduce((total, topic) => total + topic.questions.length, 0);
    const usedCount = usedQuestions.size;
    return { used: usedCount, total: totalQuestions, percentage: ((usedCount / totalQuestions) * 100).toFixed(1) };
  };

  useEffect(() => {
    if (showConfirmReset || zoomedImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [showConfirmReset, zoomedImage]);

  if (gameState === 'setup') {
    const stats = getUsedQuestionsStats();
    
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
          
          {/* زر مباراة عبسي */}
          <div className="space-y-4">
            <button
              onClick={startAbsiMatch}
              className="bg-gradient-to-r cursor-pointer from-purple-600 via-pink-500 to-blue-500 hover:from-purple-700 hover:via-pink-600 hover:to-blue-600 text-white px-8 md:px-12 lg:px-16 py-4 md:py-6 lg:py-8 rounded-2xl font-bold text-xl md:text-3xl lg:text-4xl shadow-2xl shadow-purple-500/30 transition-all duration-300 hover:scale-105 transform border-2 border-purple-400/50 hover:border-pink-400/70"
            >
              مباراة عبسي 
            </button>
            <p className="text-slate-300 text-sm md:text-base lg:text-lg max-w-md mx-auto">
              ابدأ مباراة سريعة بأسئلة لايفات عبسي فقط
            </p>
          </div>
        </div>
      </div>
    </div>
    );
  }

  if (gameState === 'finished') {
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
                  🏆 مباراة عبسي 🏆
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
                {teams[0].score > teams[1].score && <p className="text-yellow-200 font-bold mt-2 md:mt-3 text-lg md:text-xl"> الفائز</p>}
              </div>
              <div className={`p-4 md:p-8 rounded-xl transition-all duration-500 ${
                teams[1].score > teams[0].score 
                  ? 'bg-gradient-to-br from-yellow-400 to-orange-500 ring-4 ring-yellow-400/50 shadow-2xl shadow-yellow-500/25' 
                  : 'bg-gradient-to-br from-blue-500 to-indigo-500 shadow-lg'
              }`}>
                <h2 className="text-xl md:text-3xl font-bold text-white mb-2 md:mb-3">{teams[1].name}</h2>
                <p className="text-3xl md:text-5xl font-bold text-white">{teams[1].score}</p>
                {teams[1].score > teams[0].score && <p className="text-yellow-200 font-bold mt-2 md:mt-3 text-lg md:text-xl"> الفائز</p>}
              </div>
            </div>
            
            <div className="mb-6 md:mb-8">
              <h2 className="text-2xl md:text-4xl font-bold mb-3 md:mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-violet-400">
                {winner.message}
              </h2>
              {teams[0].score === teams[1].score ? (
                <p className="text-lg md:text-xl text-slate-300">كلا الفريقين أدوا أداءً ممتازاً! </p>
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-2 md:p-4 select-none">
      {currentQuestion && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-lg border-b border-slate-700 p-3">
          <div className="text-center">
            <div className={`inline-flex items-center px-4 md:px-6 py-2 md:py-3 rounded-xl font-bold text-base md:text-xl shadow-lg transition-all duration-300 ${
              timer <= 10 
                ? 'bg-gradient-to-r from-red-600 to-red-700 text-white animate-pulse' 
                : timer <= 20
                ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white'
                : 'bg-gradient-to-r from-green-500 to-green-600 text-white'
            }`}>
              الوقت المتبقي: {timer} ثانية
            </div>
          </div>
        </div>
      )}

      <div className={`max-w-7xl mx-auto ${currentQuestion ? 'pt-16 md:pt-20' : ''}`}>
        <div className="text-center mb-4 md:mb-6">
          <div className={`inline-flex items-center px-4 md:px-8 py-2 md:py-4 rounded-2xl font-bold text-lg md:text-2xl shadow-lg transition-all duration-500 ${
            currentTurn === 'red' 
              ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-red-500/25' 
              : 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-blue-500/25'
          }`}>
             دور {currentTurn === 'red' ? 'الفريق الأحمر' : 'الفريق الأزرق'}
            {usingPitHelper && (
              <span className="ml-2 md:ml-4 px-2 md:px-3 py-1 bg-orange-500 rounded-full text-xs md:text-sm animate-pulse">
                 الحفرة مُفعلة
              </span>
            )}
            {isAbsiMode && (
              <span className="ml-2 md:ml-4 px-2 md:px-3 py-1 bg-yellow-500 rounded-full text-xs md:text-sm">
                🏆 مباراة عبسي
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-6 mb-4 md:mb-6">
          {/* وسائل الفريق الأحمر */}
          <div className="bg-red-500/20 backdrop-blur-lg rounded-xl p-3 md:p-4 border border-red-500/30">
            <h3 className="text-sm md:text-lg font-bold text-red-400 mb-2 md:mb-3 text-center">وسائل الفريق الأحمر</h3>
            <div className="flex justify-center gap-2 md:gap-3">
              <button
                onClick={() => useNumber2Helper('red')}
                disabled={!helpers.red.number2 || currentTurn !== 'red' || currentQuestion !== null}
                className={`px-3 md:px-4 py-2 rounded-lg font-bold transition-all duration-300 text-sm md:text-base ${
                  helpers.red.number2 && currentTurn === 'red' && currentQuestion === null
                    ? 'bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white shadow-lg'
                    : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                }`}
              >
                2️⃣
              </button>
              <button
                onClick={() => usePitHelper('red')}
                disabled={!helpers.red.pit || currentTurn !== 'red' || currentQuestion !== null}
                className={`px-3 md:px-4 py-2 rounded-lg font-bold transition-all duration-300 text-sm md:text-base ${
                  helpers.red.pit && currentTurn === 'red' && currentQuestion === null
                    ? 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-lg'
                    : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                }`}
              >
                 حفرة
              </button>
            </div>
          </div>
          
          <div className="bg-blue-500/20 backdrop-blur-lg rounded-xl p-3 md:p-4 border border-blue-500/30">
            <h3 className="text-sm md:text-lg font-bold text-blue-400 mb-2 md:mb-3 text-center">وسائل الفريق الأزرق</h3>
            <div className="flex justify-center gap-2 md:gap-3">
              <button
                onClick={() => useNumber2Helper('blue')}
                disabled={!helpers.blue.number2 || currentTurn !== 'blue' || currentQuestion !== null}
                className={`px-3 md:px-4 py-2 rounded-lg font-bold transition-all duration-300 text-sm md:text-base ${
                  helpers.blue.number2 && currentTurn === 'blue' && currentQuestion === null
                    ? 'bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white shadow-lg'
                    : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                }`}
              >
                2️⃣
              </button>
              <button
                onClick={() => usePitHelper('blue')}
                disabled={!helpers.blue.pit || currentTurn !== 'blue' || currentQuestion !== null}
                className={`px-3 md:px-4 py-2 rounded-lg font-bold transition-all duration-300 text-sm md:text-base ${
                  helpers.blue.pit && currentTurn === 'blue' && currentQuestion === null
                    ? 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-lg'
                    : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                }`}
              >
                 حفرة
              </button>
            </div>
          </div>
        </div>

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

        {currentQuestion && (
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
            
            {currentQuestion.hasImage && (
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
                  <h4 className="text-base md:text-lg font-bold text-emerald-400 mb-2 md:mb-3"> الإجابة الصحيحة:</h4>
                  <p className="text-lg md:text-2xl text-white font-semibold">{currentQuestion.answer}</p>
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
        )}

        <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-3 md:p-8 shadow-2xl border border-slate-700">
          <div className={`grid gap-2 md:gap-6 ${isAbsiMode ? 'grid-cols-1 max-w-md mx-auto' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6'}`}>
            {selectedTopics.map(topic => (
              <div key={topic.id} className="text-center">
                <h3 className="font-bold mb-2 md:mb-4 p-2 md:p-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl shadow-lg text-xs md:text-sm">
                  {topic.name}
                </h3>
                <div className="grid grid-cols-2 gap-1 md:gap-2">
                  <div className="space-y-1 md:space-y-2">
                    <div className="text-xs font-bold text-red-400 mb-1">أحمر</div>
                    {['easy', 'medium', 'hard'].map(difficulty => {
                      const points = difficulty === 'easy' ? 200 : difficulty === 'medium' ? 400 : 600;
                      const hasTeamUsedThisLevel = hasUsedQuestionsInLevel(topic.id, difficulty, 'red');
                      const isAvailable = isQuestionAvailable(topic.id, difficulty, 'red');
                      const availableCount = getAvailableQuestionsCount(topic.id, difficulty, 'red');
                      
                      const isDisabled = !isAvailable || currentQuestion !== null || currentTurn !== 'red' || hasTeamUsedThisLevel;
                      
                      return (
                        <button
                          key={`${topic.id}-red-${difficulty}`}
                          onClick={() => selectRandomQuestionForTeam(topic.id, difficulty, 'red')}
                          disabled={isDisabled}
                          className={`w-full p-2 md:p-3 text-xs md:text-sm rounded-lg font-bold transition-all duration-300 border-2 ${
                            hasTeamUsedThisLevel
                              ? 'bg-red-800/60 text-red-200 border-red-600/40 opacity-80 cursor-not-allowed' 
                              : !isAvailable
                              ? 'bg-slate-700/70 text-slate-400 cursor-not-allowed border-slate-500/50 opacity-60'
                              : currentTurn === 'red' && currentQuestion === null
                              ? 'bg-gradient-to-br from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white shadow-md hover:shadow-lg border-red-400 hover:scale-105'
                              : 'bg-red-500/30 text-red-300 cursor-not-allowed border-red-500/30 opacity-75'
                          }`}
                          title={hasTeamUsedThisLevel ? 'تم استخدامه' : `أسئلة متاحة: ${availableCount}`}
                        >
                          {hasTeamUsedThisLevel ? '✓' : !isAvailable ? '🚫' : `${points}`}
                        </button>
                      );
                    })}
                  </div>
                  
                  <div className="space-y-1 md:space-y-2">
                    <div className="text-xs font-bold text-blue-400 mb-1">أزرق</div>
                    {['easy', 'medium', 'hard'].map(difficulty => {
                      const points = difficulty === 'easy' ? 200 : difficulty === 'medium' ? 400 : 600;
                      const hasTeamUsedThisLevel = hasUsedQuestionsInLevel(topic.id, difficulty, 'blue');
                      const isAvailable = isQuestionAvailable(topic.id, difficulty, 'blue');
                      const availableCount = getAvailableQuestionsCount(topic.id, difficulty, 'blue');
                      
                      const isDisabled = !isAvailable || currentQuestion !== null || currentTurn !== 'blue' || hasTeamUsedThisLevel;
                      
                      return (
                        <button
                          key={`${topic.id}-blue-${difficulty}`}
                          onClick={() => selectRandomQuestionForTeam(topic.id, difficulty, 'blue')}
                          disabled={isDisabled}
                          className={`w-full p-2 md:p-3 text-xs md:text-sm rounded-lg font-bold transition-all duration-300 border-2 ${
                            hasTeamUsedThisLevel
                              ? 'bg-blue-800/60 text-blue-200 border-blue-600/40 opacity-80 cursor-not-allowed'
                              : !isAvailable
                              ? 'bg-slate-700/70 text-slate-400 cursor-not-allowed border-slate-500/50 opacity-60'
                              : currentTurn === 'blue' && currentQuestion === null
                              ? 'bg-gradient-to-br from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white shadow-md hover:shadow-lg border-blue-400 hover:scale-105'
                              : 'bg-blue-500/30 text-blue-300 cursor-not-allowed border-blue-500/30 opacity-75'
                          }`}
                          title={hasTeamUsedThisLevel ? 'تم استخدامه' : `أسئلة متاحة: ${availableCount}`}
                        >
                          {hasTeamUsedThisLevel ? '✓' : !isAvailable ? '🚫' : `${points}`}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          
                    </div>

        </div>

        <div className="text-center mt-4 md:mt-8">
          <button
            onClick={() => setShowConfirmReset(true)}
            className="bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 text-white px-6 md:px-8 py-2 md:py-3 rounded-xl font-bold text-sm md:text-base shadow-lg transition-all duration-300"
          >
             إعادة تشغيل اللعبة
          </button>
        </div>
      </div>

      {zoomedImage && (
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
      )}

      {showConfirmReset && (
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
      )}
    </div>
  );
}



  //     <h1 className="text-2xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-pink-400 text-center mb-6 md:mb-8">
  //           الى هنا تنتهي لعبتنا ان شاء الله تكون عجبتكم
  // </h1> 
  //       <h1 className="text-2xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-pink-400 text-center mb-6 md:mb-8">
  //           اذا ما عجبتكم لطيزي
  // </h1> 