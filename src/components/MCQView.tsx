import React, { useState } from 'react';
import { Chapter, MCQQuestion } from '../types';
import { CheckSquare, Check, X, HelpCircle, Award, Bookmark, RotateCcw } from 'lucide-react';

interface MCQViewProps {
  chapters: Chapter[];
  bookmarkedMcqIds: string[];
  onToggleBookmark: (mcqId: string) => void;
}

export const MCQView: React.FC<MCQViewProps> = ({
  chapters,
  bookmarkedMcqIds,
  onToggleBookmark,
}) => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, 'a' | 'b' | 'c' | 'd'>>({});
  const [showExplanations, setShowExplanations] = useState<Record<string, boolean>>({});

  const allMcqs = chapters.flatMap((c) =>
    c.mcqs.map((m) => ({ ...m, chapterNumber: c.number, chapterTitle: c.titleBn }))
  );

  const handleSelectOption = (mcqId: string, optionKey: 'a' | 'b' | 'c' | 'd') => {
    setSelectedAnswers((prev) => ({ ...prev, [mcqId]: optionKey }));
    // Automatically show explanation when answered
    setShowExplanations((prev) => ({ ...prev, [mcqId]: true }));
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setShowExplanations({});
  };

  // Score calculation
  const totalAnswered = Object.keys(selectedAnswers).length;
  const correctCount = allMcqs.reduce((acc, mcq) => {
    if (selectedAnswers[mcq.id] === mcq.correctAnswer) {
      return acc + 1;
    }
    return acc;
  }, 0);

  return (
    <div className="space-y-6">
      
      {/* MCQ Banner & Score Card */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl p-6 shadow-md border border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-indigo-600 rounded-xl">
              <CheckSquare className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-white">বহুনির্বাচনী প্রশ্ন ব্যাংক (MCQ Master Sheet)</h2>
              <p className="text-xs text-slate-300 mt-0.5">
                বোর্ড পরীক্ষা ও মেডিকেল/ইঞ্জিনিয়ারিং ভর্তি পরীক্ষার ব্যাখ্যাসহ গুরুত্বপূর্ণ MCQ সমাহার।
              </p>
            </div>
          </div>

          {/* Live Score Counter */}
          <div className="flex items-center gap-3 bg-slate-800/90 border border-slate-700/80 px-4 py-2.5 rounded-xl">
            <div className="text-right">
              <div className="text-xs text-slate-400">অনলাইন স্কোর:</div>
              <div className="text-sm font-black text-emerald-400">
                {correctCount} / {totalAnswered} সঠিক <span className="text-xs text-slate-400">({allMcqs.length} টির মধ্যে)</span>
              </div>
            </div>
            {totalAnswered > 0 && (
              <button
                onClick={handleReset}
                className="p-2 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-lg text-xs font-semibold cursor-pointer transition-all"
                title="উত্তর পুনরায় সেট করুন"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* MCQs List */}
      <div className="space-y-4">
        {allMcqs.map((mcq, idx) => {
          const userAnswer = selectedAnswers[mcq.id];
          const isAnswered = userAnswer !== undefined;
          const isCorrect = userAnswer === mcq.correctAnswer;
          const isSaved = bookmarkedMcqIds.includes(mcq.id);
          const showExp = showExplanations[mcq.id];

          return (
            <div
              key={mcq.id}
              className={`bg-white rounded-2xl border transition-all p-5 shadow-xs ${
                isAnswered
                  ? isCorrect
                    ? 'border-emerald-300 bg-emerald-50/20'
                    : 'border-rose-300 bg-rose-50/20'
                  : 'border-slate-200 hover:border-indigo-300'
              }`}
            >
              {/* MCQ Header */}
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <div className="flex items-center space-x-2">
                  <span className="w-6 h-6 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <span className="px-2 py-0.5 bg-indigo-100 text-indigo-800 text-[11px] font-extrabold rounded">
                    অধ্যায় 0{mcq.chapterNumber}
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  {mcq.boardRef && (
                    <span className="px-2 py-0.5 bg-amber-50 text-amber-800 border border-amber-200 rounded text-[11px] font-semibold flex items-center gap-1">
                      <Award className="w-3 h-3 text-amber-600" /> {mcq.boardRef}
                    </span>
                  )}

                  <button
                    onClick={() => onToggleBookmark(mcq.id)}
                    className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                      isSaved
                        ? 'bg-amber-100 border-amber-300 text-amber-600'
                        : 'bg-white border-slate-300 text-slate-400 hover:text-slate-600'
                    }`}
                  >
                    <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
                  </button>
                </div>
              </div>

              {/* MCQ Question Text */}
              <h3 className="font-bold text-slate-900 text-sm sm:text-base mb-4 leading-snug">
                {mcq.question}
              </h3>

              {/* Options Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-4">
                {mcq.options.map((opt) => {
                  const isThisSelected = userAnswer === opt.key;
                  const isThisCorrect = mcq.correctAnswer === opt.key;

                  let btnStyle = 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100';

                  if (isAnswered) {
                    if (isThisCorrect) {
                      btnStyle = 'bg-emerald-600 text-white border-emerald-600 font-bold shadow-xs';
                    } else if (isThisSelected && !isThisCorrect) {
                      btnStyle = 'bg-rose-600 text-white border-rose-600 font-bold';
                    } else {
                      btnStyle = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
                    }
                  }

                  return (
                    <button
                      key={opt.key}
                      onClick={() => handleSelectOption(mcq.id, opt.key)}
                      disabled={isAnswered}
                      className={`p-3 rounded-xl text-xs sm:text-sm border text-left transition-all flex items-center justify-between cursor-pointer ${btnStyle}`}
                    >
                      <div className="flex items-center space-x-2.5">
                        <span className={`w-5 h-5 rounded-full text-[11px] font-extrabold flex items-center justify-center uppercase ${
                          isAnswered && (isThisCorrect || isThisSelected) ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
                        }`}>
                          {opt.key}
                        </span>
                        <span>{opt.text}</span>
                      </div>

                      {isAnswered && isThisCorrect && <Check className="w-4 h-4 text-white flex-shrink-0" />}
                      {isAnswered && isThisSelected && !isThisCorrect && <X className="w-4 h-4 text-white flex-shrink-0" />}
                    </button>
                  );
                })}
              </div>

              {/* Explanation section */}
              {mcq.explanation && (
                <div className="mt-3">
                  {!showExp ? (
                    <button
                      onClick={() => setShowExplanations((prev) => ({ ...prev, [mcq.id]: true }))}
                      className="text-xs text-indigo-600 font-semibold hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <HelpCircle className="w-3.5 h-3.5" />
                      <span>গাণিতিক ব্যাখ্যা দেখুন</span>
                    </button>
                  ) : (
                    <div className="p-3.5 bg-slate-900 text-slate-200 rounded-xl text-xs sm:text-sm font-sans border border-slate-800">
                      <strong className="text-amber-400 block mb-1">💡 ব্যাখ্যা ও কারণ:</strong>
                      {mcq.explanation}
                    </div>
                  )}
                </div>
              )}

            </div>
          );
        })}
      </div>
    </div>
  );
};
