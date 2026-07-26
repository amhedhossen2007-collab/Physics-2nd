import React, { useState } from 'react';
import { Chapter, KnowledgeQuestion, ComprehensionQuestion } from '../types';
import { HelpCircle, FileText, ChevronDown, ChevronUp, Award, Bookmark, CheckCircle2 } from 'lucide-react';

interface KnowledgeComprehensionViewProps {
  chapters: Chapter[];
  mode: 'knowledge' | 'comprehension' | 'both';
  bookmarkedIds: string[];
  onToggleBookmark: (id: string) => void;
}

export const KnowledgeComprehensionView: React.FC<KnowledgeComprehensionViewProps> = ({
  chapters,
  mode,
  bookmarkedIds,
  onToggleBookmark,
}) => {
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({});

  const toggleOpen = (id: string) => {
    setOpenIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const showKnowledge = mode === 'knowledge' || mode === 'both';
  const showComprehension = mode === 'comprehension' || mode === 'both';

  return (
    <div className="space-y-8">
      
      {/* Knowledge Section (ক) */}
      {showKnowledge && (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white rounded-2xl p-5 shadow-sm border border-blue-800">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-blue-600 rounded-xl">
                <HelpCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-extrabold text-white">জ্ঞানমূলক প্রশ্ন ও উত্তর (ক-অংশ - ১ নম্বর)</h2>
                <p className="text-xs text-blue-200 mt-0.5">
                  বিগত ১০ বছরের বোর্ড পরীক্ষায় সবচেয়ে বেশি আসা সংজ্ঞা ও ১ বাক্যের সঠিক জ্ঞানমূলক উত্তর।
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {chapters.flatMap((c) =>
              c.knowledgeQuestions.map((kq) => {
                const isOpen = openIds[kq.id] ?? true;
                const isSaved = bookmarkedIds.includes(kq.id);

                return (
                  <div
                    key={kq.id}
                    className="bg-white rounded-xl border border-slate-200 shadow-xs hover:border-indigo-300 transition-all overflow-hidden flex flex-col justify-between"
                  >
                    <div className="p-4">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <span className="px-2 py-0.5 bg-indigo-100 text-indigo-800 text-[11px] font-extrabold rounded">
                          অধ্যায় 0{c.number}
                        </span>
                        {kq.boardRef && (
                          <span className="px-2 py-0.5 bg-amber-50 text-amber-800 border border-amber-200 rounded text-[11px] font-semibold flex items-center gap-1">
                            <Award className="w-3 h-3 text-amber-600" /> {kq.boardRef}
                          </span>
                        )}
                      </div>

                      <h3 className="font-bold text-slate-900 text-sm mb-3">
                        {kq.question}
                      </h3>

                      {isOpen && (
                        <div className="p-3 bg-slate-50 border-l-3 border-indigo-500 rounded-r-lg text-slate-700 text-xs sm:text-sm leading-relaxed font-sans">
                          <strong className="text-indigo-700 block text-[11px] uppercase tracking-wider mb-0.5">
                            উত্তর:
                          </strong>
                          {kq.answer}
                        </div>
                      )}
                    </div>

                    <div className="bg-slate-50 px-4 py-2 border-t border-slate-100 flex items-center justify-between">
                      <button
                        onClick={() => toggleOpen(kq.id)}
                        className="text-xs text-indigo-600 font-semibold hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        {isOpen ? 'উত্তর লুকান' : 'উত্তর দেখুন'}
                        {isOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                      </button>

                      <button
                        onClick={() => onToggleBookmark(kq.id)}
                        className={`text-xs px-2 py-1 rounded flex items-center gap-1 cursor-pointer transition-all ${
                          isSaved ? 'text-amber-600 bg-amber-50 font-bold' : 'text-slate-400 hover:text-slate-600'
                        }`}
                      >
                        <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
                        <span>{isSaved ? 'সংরক্ষিত' : 'সংরক্ষণ'}</span>
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* Comprehension Section (খ) */}
      {showComprehension && (
        <div className="space-y-4 pt-4">
          <div className="bg-gradient-to-r from-emerald-900 to-teal-900 text-white rounded-2xl p-5 shadow-sm border border-emerald-800">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-emerald-600 rounded-xl">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-extrabold text-white">অনুধাবনমূলক প্রশ্ন ও উত্তর (খ-অংশ - ২ নম্বর)</h2>
                <p className="text-xs text-emerald-200 mt-0.5">
                  পদার্থবিজ্ঞানের মূল ধারণা, 'কেন' ও 'কীভাবে' সম্পর্কিত ২ নম্বরের বৈজ্ঞানিক ব্যাখ্যা।
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {chapters.flatMap((c) =>
              c.comprehensionQuestions.map((cq) => {
                const isOpen = openIds[cq.id] ?? true;
                const isSaved = bookmarkedIds.includes(cq.id);

                return (
                  <div
                    key={cq.id}
                    className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:border-emerald-300 transition-all overflow-hidden"
                  >
                    <div className="p-5">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                        <div className="flex items-center space-x-2">
                          <span className="px-2.5 py-0.5 bg-emerald-600 text-white text-xs font-bold rounded">
                            অধ্যায় 0{c.number}
                          </span>
                          <span className="text-xs text-slate-500 font-medium">{c.titleBn}</span>
                        </div>

                        <div className="flex items-center space-x-2">
                          {cq.boardRef && (
                            <span className="px-2.5 py-0.5 bg-amber-50 text-amber-800 border border-amber-200 rounded text-xs font-semibold flex items-center gap-1">
                              <Award className="w-3.5 h-3.5 text-amber-600" /> {cq.boardRef}
                            </span>
                          )}

                          <button
                            onClick={() => onToggleBookmark(cq.id)}
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

                      <h3 className="font-bold text-slate-900 text-base mb-3">
                        {cq.question}
                      </h3>

                      {isOpen && (
                        <div className="p-4 bg-slate-900 text-slate-100 rounded-xl border border-slate-800 text-xs sm:text-sm leading-relaxed font-sans mt-3">
                          <span className="text-emerald-400 font-bold block text-xs uppercase tracking-wider mb-1 flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" /> বৈজ্ঞানিক ব্যাখ্যা ও উত্তর:
                          </span>
                          {cq.answer}
                        </div>
                      )}

                      <button
                        onClick={() => toggleOpen(cq.id)}
                        className="mt-3 text-xs text-emerald-700 font-semibold hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        {isOpen ? 'ব্যাখ্যা লুকান' : 'ব্যাখ্যা দেখুন'}
                        {isOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

    </div>
  );
};
