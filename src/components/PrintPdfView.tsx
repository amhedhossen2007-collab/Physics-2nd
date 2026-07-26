import React from 'react';
import { Chapter } from '../types';
import { courseInfo } from '../data/chapters';

interface PrintPdfViewProps {
  chapters: Chapter[];
  onClosePrint: () => void;
}

export const PrintPdfView: React.FC<PrintPdfViewProps> = ({ chapters, onClosePrint }) => {
  return (
    <div className="bg-slate-100 min-h-screen py-8 px-4 print:p-0 print:bg-white text-slate-900 font-sans">
      
      {/* Top Action Bar when viewed on screen before printing */}
      <div className="max-w-4xl mx-auto mb-6 bg-slate-900 text-white p-4 rounded-xl flex items-center justify-between shadow-lg print:hidden">
        <div>
          <h2 className="font-extrabold text-base">A4 প্রিন্ট / PDF প্রিভিউ মডাল</h2>
          <p className="text-xs text-slate-300">
            নিচের বোতামে চাপ দিয়ে সরাসরি 'Save as PDF' নির্বাচন করে সেভ করুন।
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => window.print()}
            className="px-5 py-2 bg-emerald-500 hover:bg-emerald-600 font-bold text-xs text-white rounded-lg shadow cursor-pointer transition-all"
          >
            🖨️ এখনই প্রিন্ট / PDF সেভ করুন
          </button>
          <button
            onClick={onClosePrint}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 font-semibold text-xs text-slate-200 rounded-lg border border-slate-700 cursor-pointer"
          >
            বন্ধ করুন ✕
          </button>
        </div>
      </div>

      {/* Printable Document Sheet Container */}
      <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-none p-8 sm:p-12 border border-slate-300 print:shadow-none print:border-none print:p-0">
        
        {/* Document Cover Header */}
        <div className="border-b-4 border-slate-900 pb-6 mb-8 text-center">
          <div className="inline-block px-3 py-1 bg-slate-900 text-white font-bold text-xs rounded uppercase mb-2">
            HSC & ADMISSION MASTER NOTE
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            {courseInfo.subjectBn}
          </h1>
          <p className="text-sm font-semibold text-slate-600 mt-1">
            {courseInfo.subjectEn} — সম্পূর্ণ অধ্যায়ভিত্তিক সাজেশন, মূল তথ্য ও বোর্ড প্রশ্ন সমাধান
          </p>
          <div className="mt-3 inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-100 text-emerald-900 font-extrabold text-sm rounded-full border border-emerald-300">
            Prepared by - {courseInfo.preparedBy}
          </div>
        </div>

        {/* Chapters Iterate */}
        <div className="space-y-12">
          {chapters.map((ch) => (
            <div key={ch.id} className="break-after-page page-break space-y-6">
              
              {/* Chapter Title Box */}
              <div className="bg-slate-900 text-white p-5 rounded-lg flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block">
                    CHAPTER 0{ch.number}
                  </span>
                  <h2 className="text-2xl font-black text-white">
                    {ch.titleBn}
                  </h2>
                  <p className="text-xs text-slate-300 italic">{ch.titleEn}</p>
                </div>
                <div className="text-right text-xs text-slate-300">
                  <span>Part {ch.part}</span>
                </div>
              </div>

              {/* Overview */}
              <div className="bg-slate-50 border-l-4 border-slate-900 p-4 text-xs sm:text-sm text-slate-800 leading-relaxed">
                <strong className="block text-slate-900 font-bold mb-1">সংক্ষেপণ:</strong>
                {ch.overview}
              </div>

              {/* Theory Sections */}
              <div className="space-y-4">
                <h3 className="text-base font-extrabold text-slate-900 border-b border-slate-300 pb-1">
                  ১. মূল থিওরি ও সমীকরণ
                </h3>
                {ch.theories.map((t, tIdx) => (
                  <div key={t.id} className="space-y-2 break-inside-avoid">
                    <h4 className="font-bold text-sm text-indigo-950">
                      ১.{tIdx + 1} {t.title}
                    </h4>
                    <ul className="list-disc list-inside text-xs text-slate-800 space-y-1 pl-2">
                      {t.bullets.map((b, bIdx) => (
                        <li key={bIdx}>{b}</li>
                      ))}
                    </ul>
                    {t.formulas && t.formulas.length > 0 && (
                      <div className="grid grid-cols-2 gap-2 my-2">
                        {t.formulas.map((f) => (
                          <div key={f.id} className="p-2.5 bg-slate-100 rounded border border-slate-300 text-xs font-mono font-bold text-slate-900">
                            <div className="text-[10px] text-slate-600 font-sans">{f.title}:</div>
                            <div className="text-sm text-indigo-900 my-0.5">{f.expression}</div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Knowledge (ক) & Comprehension (খ) */}
              <div className="space-y-4 pt-4 border-t border-slate-200">
                <h3 className="text-base font-extrabold text-slate-900 border-b border-slate-300 pb-1">
                  ২. জ্ঞানমূলক (ক) ও অনুধাবনমূলক (খ) বোর্ড প্রশ্ন
                </h3>
                <div className="space-y-3">
                  {ch.knowledgeQuestions.map((kq) => (
                    <div key={kq.id} className="text-xs bg-slate-50 p-3 rounded border border-slate-200 break-inside-avoid">
                      <div className="font-bold text-slate-900 mb-1">
                        (ক) {kq.question} <span className="text-[10px] text-amber-800 font-semibold">{kq.boardRef}</span>
                      </div>
                      <div className="text-slate-700"><strong>উত্তর:</strong> {kq.answer}</div>
                    </div>
                  ))}

                  {ch.comprehensionQuestions.map((cq) => (
                    <div key={cq.id} className="text-xs bg-slate-50 p-3 rounded border border-slate-200 break-inside-avoid">
                      <div className="font-bold text-slate-900 mb-1">
                        (খ) {cq.question} <span className="text-[10px] text-amber-800 font-semibold">{cq.boardRef}</span>
                      </div>
                      <div className="text-slate-700"><strong>উত্তর:</strong> {cq.answer}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Creative Questions (CQ - গ ও ঘ) */}
              <div className="space-y-4 pt-4 border-t border-slate-200">
                <h3 className="text-base font-extrabold text-slate-900 border-b border-slate-300 pb-1">
                  ৩. বোর্ড সৃজনশীল প্রশ্ন (CQ - গ ও ঘ সমাধান)
                </h3>
                {ch.creativeQuestions.map((cq) => (
                  <div key={cq.id} className="border border-slate-300 rounded p-4 space-y-3 break-inside-avoid text-xs">
                    <div className="font-bold text-sm text-slate-900 flex justify-between">
                      <span>{cq.title}</span>
                      <span className="text-xs text-amber-800">{cq.boardRef}</span>
                    </div>
                    <div className="bg-amber-50 p-2.5 rounded border-l-2 border-amber-500 italic text-slate-800">
                      <strong>উদ্দীপক:</strong> {cq.stimulus}
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 mb-1">(গ) {cq.partG.question}</div>
                      <pre className="whitespace-pre-wrap font-sans bg-slate-100 p-2.5 rounded text-slate-800 text-[11px] leading-relaxed">
                        {cq.partG.solution}
                      </pre>
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 mb-1">(ঘ) {cq.partGh.question}</div>
                      <pre className="whitespace-pre-wrap font-sans bg-slate-100 p-2.5 rounded text-slate-800 text-[11px] leading-relaxed">
                        {cq.partGh.solution}
                      </pre>
                    </div>
                  </div>
                ))}
              </div>

              {/* MCQs */}
              <div className="space-y-4 pt-4 border-t border-slate-200">
                <h3 className="text-base font-extrabold text-slate-900 border-b border-slate-300 pb-1">
                  ৪. বোর্ড বহুনির্বাচনী প্রশ্ন (MCQ Bank)
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  {ch.mcqs.map((mcq) => (
                    <div key={mcq.id} className="p-3 bg-slate-50 border border-slate-200 rounded break-inside-avoid">
                      <div className="font-bold text-slate-900 mb-2">
                        {mcq.number}. {mcq.question}
                      </div>
                      <div className="grid grid-cols-2 gap-1 mb-2 text-slate-700">
                        {mcq.options.map((opt) => (
                          <div
                            key={opt.key}
                            className={`p-1 rounded ${opt.key === mcq.correctAnswer ? 'bg-emerald-100 font-bold text-emerald-900' : ''}`}
                          >
                            ({opt.key}) {opt.text}
                          </div>
                        ))}
                      </div>
                      <div className="text-[10px] text-emerald-700 font-bold border-t border-slate-200 pt-1">
                        সঠিক উত্তর: ({mcq.correctAnswer.toUpperCase()}) — {mcq.explanation}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Page Mandatory Footer */}
              <div className="border-t border-slate-300 pt-2 mt-8 text-center text-xs text-slate-500 flex justify-between items-center font-mono">
                <span>HSC Physics 2nd Paper Master Sheet</span>
                <span className="font-bold text-slate-800">Prepared by - {courseInfo.preparedBy}</span>
                <span>Page {ch.number} of {chapters.length}</span>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
