import React from 'react';
import { BookOpen, Printer, Sparkles, Bookmark, Award, Layers } from 'lucide-react';
import { courseInfo } from '../data/chapters';

interface HeaderProps {
  onOpenAiModal: () => void;
  onPrint: () => void;
  savedCount: number;
  activeTab: string;
  onSelectTab: (tab: any) => void;
  selectedChapterId: string;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenAiModal,
  onPrint,
  savedCount,
  activeTab,
  onSelectTab,
}) => {
  return (
    <header className="bg-slate-900 text-white border-b border-slate-800 shadow-xl print:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          
          {/* Main Title & Subtitle */}
          <div className="flex items-start space-x-3.5">
            <div className="p-3 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-xl shadow-lg flex-shrink-0 text-white mt-1">
              <BookOpen className="w-7 h-7" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-full flex items-center gap-1">
                  <Award className="w-3.5 h-3.5 text-indigo-400" /> HSC & Admission Special
                </span>
                <span className="px-2.5 py-0.5 text-xs font-medium bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full">
                  Prepared by - {courseInfo.preparedBy}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white font-sans">
                {courseInfo.subjectBn} <span className="text-slate-400 font-light text-xl">({courseInfo.subjectEn})</span>
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
                {courseInfo.prepType} — ১১টি সম্পূর্ণ অধ্যায়ের মূল থিওরি, সূত্রাবলি, ক, খ, গ, ঘ এবং ব্যাখ্যাসহ MCQ শিট।
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5 pt-2 md:pt-0 border-t border-slate-800 md:border-0">
            <button
              onClick={onOpenAiModal}
              className="px-3.5 py-2 text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 rounded-lg shadow-md hover:shadow-indigo-500/25 transition-all flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <Sparkles className="w-4 h-4 text-yellow-300 animate-pulse" />
              <span>AI প্রশ্ন সমাধানকারী</span>
            </button>

            <button
              onClick={onPrint}
              className="px-3.5 py-2 text-xs sm:text-sm font-semibold text-slate-100 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg shadow transition-all flex items-center gap-2 cursor-pointer active:scale-95"
              title="A4 পেপারে প্রিন্ট বা PDF ডাউনলোড করুন"
            >
              <Printer className="w-4 h-4 text-emerald-400" />
              <span>PDF / প্রিন্ট</span>
            </button>

            {savedCount > 0 && (
              <button
                onClick={() => onSelectTab('bookmarks')}
                className={`px-3 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer border ${
                  activeTab === 'bookmarks'
                    ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold'
                    : 'bg-slate-800 text-amber-300 border-slate-700 hover:bg-slate-750'
                }`}
              >
                <Bookmark className="w-4 h-4 fill-current text-amber-400" />
                <span>বুকমার্ক ({savedCount})</span>
              </button>
            )}
          </div>
        </div>

        {/* Course Highlights Bar */}
        <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between text-xs text-slate-400 gap-y-2">
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <span className="flex items-center gap-1.5 text-slate-300">
              <Layers className="w-3.5 h-3.5 text-indigo-400" /> মোট অধ্যায়: <strong className="text-white">১১টি (Part 1 & 2)</strong>
            </span>
            <span className="hidden sm:inline-block text-slate-600">•</span>
            <span>বোর্ড কভারেজ: <strong className="text-slate-200">২০১৫ – ২০২৫ সালের সকল বোর্ড CQ ও MCQ</strong></span>
          </div>
          <div className="text-right text-indigo-300/90 font-mono text-[11px]">
            HSC Physics Master Note • All Rights Reserved
          </div>
        </div>

      </div>
    </header>
  );
};
