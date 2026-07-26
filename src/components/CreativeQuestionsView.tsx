import React, { useState } from 'react';
import { Chapter, CreativeQuestion } from '../types';
import { GraduationCap, Bookmark, CheckCircle2, ChevronDown, ChevronUp, FileText, Zap, Award } from 'lucide-react';

interface CreativeQuestionsViewProps {
  chapters: Chapter[];
  bookmarkedCqIds: string[];
  onToggleBookmark: (cqId: string) => void;
}

export const CreativeQuestionsView: React.FC<CreativeQuestionsViewProps> = ({
  chapters,
  bookmarkedCqIds,
  onToggleBookmark,
}) => {
  const [expandedSolutions, setExpandedSolutions] = useState<Record<string, boolean>>({});

  const toggleSolution = (cqId: string) => {
    setExpandedSolutions((prev) => ({ ...prev, [cqId]: !prev[cqId] }));
  };

  const allCqs = chapters.flatMap((c) =>
    c.creativeQuestions.map((cq) => ({ ...cq, chapterNumber: c.number, chapterTitle: c.titleBn }))
  );

  if (allCqs.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
        <GraduationCap className="w-12 h-12 text-slate-400 mx-auto mb-3" />
        <h3 className="text-lg font-bold text-slate-800">কোনো সৃজনশীল প্রশ্ন পাওয়া যায়নি</h3>
        <p className="text-sm text-slate-500 mt-1">অন্য কোনো অধ্যায় নির্বাচন করুন অথবা ফিল্টার সরান।</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-indigo-900 to-slate-900 text-white rounded-2xl p-6 shadow-md border border-indigo-800">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-indigo-600 rounded-xl">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-white">বোর্ড সৃজনশীল প্রশ্ন ও সমাধান (CQ Master Sheet)</h2>
            <p className="text-xs sm:text-sm text-indigo-200 mt-0.5">
              বোর্ড পরীক্ষার (গ) প্রয়োগমূলক ৩ নম্বর এবং (ঘ) উচ্চতর দক্ষতামূলক ৪ নম্বরের নিখুঁত ব্যাখ্যা ও গাণিতিক সমাধান।
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {allCqs.map((cq) => {
          const isBookmarked = bookmarkedCqIds.includes(cq.id);
          const isExpanded = expandedSolutions[cq.id] ?? true; // Default open for ease of reading

          return (
            <div
              key={cq.id}
              className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:border-indigo-300 transition-all"
            >
              {/* Card Header Bar */}
              <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center space-x-2">
                  <span className="px-2.5 py-1 bg-indigo-600 text-white font-bold text-xs rounded-md">
                    অধ্যায় 0{cq.chapterNumber}
                  </span>
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                    {cq.title}
                  </h3>
                </div>

                <div className="flex items-center space-x-2">
                  {cq.boardRef && (
                    <span className="px-2.5 py-1 bg-amber-100 text-amber-800 border border-amber-300/80 rounded-md text-xs font-semibold flex items-center gap-1">
                      <Award className="w-3.5 h-3.5 text-amber-600" /> {cq.boardRef}
                    </span>
                  )}

                  <button
                    onClick={() => onToggleBookmark(cq.id)}
                    className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                      isBookmarked
                        ? 'bg-amber-100 border-amber-300 text-amber-600'
                        : 'bg-white border-slate-300 text-slate-400 hover:text-slate-600 hover:bg-slate-100'
                    }`}
                    title={isBookmarked ? 'বুকমার্ক সরান' : 'বুকমার্ক করুন'}
                  >
                    <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
                  </button>
                </div>
              </div>

              {/* Stimulus Box (উদ্দীপক) */}
              <div className="p-6">
                <div className="bg-amber-50/70 border-l-4 border-amber-500 rounded-r-xl p-4 text-slate-800 text-sm leading-relaxed mb-6 font-sans">
                  <span className="text-amber-800 font-bold block text-xs uppercase tracking-wider mb-1">
                    📖 উদ্দীপক (Stimulus):
                  </span>
                  {cq.stimulus}
                </div>

                {/* Questions Section */}
                <div className="space-y-4 text-sm font-semibold text-slate-800 mb-6">
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-start gap-2">
                    <span className="text-indigo-600 font-extrabold whitespace-nowrap">(গ)</span>
                    <span>{cq.partG.question}</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-start gap-2">
                    <span className="text-indigo-600 font-extrabold whitespace-nowrap">(ঘ)</span>
                    <span>{cq.partGh.question}</span>
                  </div>
                </div>

                {/* Toggle Solution Button */}
                <button
                  onClick={() => toggleSolution(cq.id)}
                  className="w-full py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-indigo-600" />
                  <span>{isExpanded ? 'সমাধান ও গাণিতিক ব্যাখ্যা লুকান' : 'সম্পূর্ণ উত্তর ও গাণিতিক সমাধান দেখুন'}</span>
                  {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>

                {/* Expanded Solution Box */}
                {isExpanded && (
                  <div className="mt-6 space-y-6 pt-6 border-t border-slate-100">
                    
                    {/* Part G Solution */}
                    <div className="bg-slate-900 text-slate-100 rounded-xl p-5 border border-slate-800 shadow-sm">
                      <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
                        <span className="font-extrabold text-indigo-400 text-xs sm:text-sm flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" /> (গ) এর প্রয়োগমূলক সমাধান:
                        </span>
                        {cq.partG.formulaUsed && (
                          <span className="px-2.5 py-0.5 text-[11px] bg-indigo-950 text-indigo-300 border border-indigo-800 rounded font-mono">
                            সূত্র: {cq.partG.formulaUsed}
                          </span>
                        )}
                      </div>
                      <pre className="whitespace-pre-wrap font-sans text-xs sm:text-sm text-slate-200 leading-relaxed">
                        {cq.partG.solution}
                      </pre>
                    </div>

                    {/* Part Gh Solution */}
                    <div className="bg-slate-900 text-slate-100 rounded-xl p-5 border border-slate-800 shadow-sm">
                      <div className="border-b border-slate-800 pb-2 mb-3">
                        <span className="font-extrabold text-indigo-400 text-xs sm:text-sm flex items-center gap-1.5">
                          <Zap className="w-4 h-4 text-amber-400" /> (ঘ) এর উচ্চতর দক্ষতার বিশ্লেষণ ও সিদ্ধান্ত:
                        </span>
                      </div>
                      <pre className="whitespace-pre-wrap font-sans text-xs sm:text-sm text-slate-200 leading-relaxed mb-4">
                        {cq.partGh.solution}
                      </pre>
                      
                      {/* Conclusion */}
                      {cq.partGh.conclusion && (
                        <div className="bg-emerald-950/60 border border-emerald-800/80 rounded-lg p-3 text-xs text-emerald-200">
                          <strong className="text-emerald-400 block mb-0.5">✅ চুড়ান্ত সিদ্ধান্ত / মন্তব্য:</strong>
                          {cq.partGh.conclusion}
                        </div>
                      )}
                    </div>

                  </div>
                )}

              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
