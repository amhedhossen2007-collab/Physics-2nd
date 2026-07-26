import React from 'react';
import { Chapter } from '../types';
import { Zap, BookOpen, Layers } from 'lucide-react';

interface FormulaCheatsheetViewProps {
  chapters: Chapter[];
}

export const FormulaCheatsheetView: React.FC<FormulaCheatsheetViewProps> = ({ chapters }) => {
  const allFormulas = chapters.flatMap((c) =>
    c.theories.flatMap((t) =>
      (t.formulas || []).map((f) => ({
        ...f,
        chapterNumber: c.number,
        chapterTitle: c.titleBn,
        theoryTitle: t.title,
      }))
    )
  );

  return (
    <div className="space-y-6">
      
      {/* Formula Header */}
      <div className="bg-gradient-to-r from-amber-900 via-amber-950 to-slate-900 text-white rounded-2xl p-6 shadow-md border border-amber-800">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-amber-500 rounded-xl text-slate-950 font-black">
            <Zap className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-white">ফিজিক্স ২য় পত্রের সূত্রাবলি (Quick Revision Cheatsheet)</h2>
            <p className="text-xs sm:text-sm text-amber-200 mt-0.5">
              সকল অধ্যায়ের প্রধান গাণিতিক সূত্র, সংকেত, রাশি এবং এস আই (SI) এককের একঝলক মাস্টার তালিকা।
            </p>
          </div>
        </div>
      </div>

      {/* Grid of Formulas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {allFormulas.map((form, idx) => (
          <div
            key={idx}
            className="bg-slate-900 text-white rounded-2xl p-5 border border-slate-800 shadow-sm flex flex-col justify-between hover:border-amber-500/50 transition-all"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="px-2.5 py-0.5 bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded text-xs font-bold">
                  অধ্যায় 0{form.chapterNumber}: {form.chapterTitle}
                </span>
              </div>

              <h3 className="font-bold text-slate-100 text-sm mb-2 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-yellow-400" /> {form.title}
              </h3>

              {/* Formula Display Box */}
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-center font-mono font-extrabold text-amber-300 text-lg my-3 tracking-wide">
                {form.expression}
              </div>

              {/* Symbol & Variable List */}
              <div className="bg-slate-800/60 rounded-xl p-3 border border-slate-700/60 text-xs space-y-1.5 my-2">
                {form.variables.map((v, vIdx) => (
                  <div key={vIdx} className="flex justify-between items-center">
                    <span className="font-mono text-indigo-300 font-bold">{v.symbol}</span>
                    <span className="text-slate-300">{v.name} {v.unit ? <strong className="text-amber-400 font-mono">({v.unit})</strong> : ''}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
