import React from 'react';
import { Chapter, TheorySection } from '../types';
import { BookOpen, Zap, Info, Star, Bookmark } from 'lucide-react';

interface TheoryViewProps {
  chapters: Chapter[];
}

export const TheoryView: React.FC<TheoryViewProps> = ({ chapters }) => {
  return (
    <div className="space-y-10">
      {chapters.map((chapter) => (
        <div key={chapter.id} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          
          {/* Chapter Header Banner */}
          <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
              <div className="flex items-center space-x-2">
                <span className="px-3 py-1 bg-indigo-500 text-white font-black text-xs rounded-lg uppercase tracking-wider">
                  অধ্যায় 0{chapter.number}
                </span>
                <span className="px-2.5 py-0.5 text-xs bg-slate-800 text-slate-300 rounded-md font-medium border border-slate-700">
                  Part {chapter.part}
                </span>
              </div>
              <div className="flex items-center text-amber-400 gap-1 text-xs font-semibold bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
                <span>পরীক্ষার জন্য গুরুত্ব:</span>
                <span className="flex">
                  {Array.from({ length: chapter.importanceStars }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </span>
              </div>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              {chapter.titleBn}
            </h2>
            <p className="text-slate-400 text-sm italic font-sans mb-4">
              {chapter.titleEn}
            </p>

            <div className="bg-slate-800/80 rounded-xl p-4 border border-slate-700/80 text-xs sm:text-sm text-slate-200 leading-relaxed">
              <strong className="text-indigo-300 block mb-1">📌 সংক্ষেপন ও গুরুত্বকথা:</strong>
              {chapter.overview}
            </div>

            {/* Board Topic Analysis Table */}
            {chapter.topicsAnalysis && chapter.topicsAnalysis.length > 0 && (
              <div className="mt-5 pt-4 border-t border-slate-800">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  📊 বোর্ড পরীক্ষা ও ভর্তি পরীক্ষা টপিক এনালাইসিস:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 text-xs">
                  {chapter.topicsAnalysis.map((topic, idx) => (
                    <div key={idx} className="bg-slate-900/90 rounded-lg p-2.5 border border-slate-800">
                      <div className="font-semibold text-slate-100 truncate" title={topic.name}>
                        {topic.name}
                      </div>
                      <div className="text-[11px] text-slate-400 mt-1 flex justify-between">
                        <span>গ/ঘ: <strong className="text-indigo-400">{topic.totalG + topic.totalGh}টি</strong></span>
                        <span>MCQ: <strong className="text-emerald-400">{topic.totalMCQ}টি</strong></span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Theory Sections */}
          <div className="p-6 sm:p-8 space-y-8 divide-y divide-slate-100">
            {chapter.theories.map((theory, idx) => (
              <div key={theory.id} className={idx > 0 ? 'pt-8' : ''}>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm">
                    {idx + 1}
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                    {theory.title}
                  </h3>
                </div>

                {/* Bullets */}
                <ul className="space-y-2.5 text-slate-700 text-sm leading-relaxed mb-6">
                  {theory.bullets.map((bullet, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 flex-shrink-0" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                {/* Formulas in Theory */}
                {theory.formulas && theory.formulas.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
                    {theory.formulas.map((form) => (
                      <div key={form.id} className="bg-slate-900 text-white rounded-xl p-4 border-l-4 border-indigo-500 shadow-sm">
                        <div className="text-xs text-indigo-300 font-bold uppercase tracking-wider mb-1 flex items-center gap-1.5">
                          <Zap className="w-3.5 h-3.5 text-yellow-400" /> {form.title}
                        </div>
                        <div className="text-lg font-mono font-bold text-amber-300 my-2 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800 tracking-wide">
                          {form.expression}
                        </div>
                        <div className="space-y-1 text-xs text-slate-300 border-t border-slate-800 pt-2">
                          {form.variables.map((v, vIdx) => (
                            <div key={vIdx} className="flex justify-between items-center">
                              <span className="font-mono text-indigo-300 font-semibold">{v.symbol}</span>
                              <span className="text-slate-400">{v.name} {v.unit ? `(${v.unit})` : ''}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

              </div>
            ))}
          </div>

        </div>
      ))}
    </div>
  );
};
