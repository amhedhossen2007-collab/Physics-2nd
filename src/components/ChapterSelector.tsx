import React from 'react';
import { Chapter } from '../types';
import { Star, BookMarked, Search, Filter } from 'lucide-react';

interface ChapterSelectorProps {
  chapters: Chapter[];
  selectedChapterId: string;
  onSelectChapter: (chapterId: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  boardFilter: string;
  onBoardFilterChange: (board: string) => void;
}

export const ChapterSelector: React.FC<ChapterSelectorProps> = ({
  chapters,
  selectedChapterId,
  onSelectChapter,
  searchQuery,
  onSearchChange,
  boardFilter,
  onBoardFilterChange,
}) => {
  const boardsList = ['All', 'DB', 'RB', 'Ctg.B', 'CB', 'JB', 'BB', 'SB', 'Din.B', 'MB'];

  return (
    <div className="bg-white border-b border-slate-200 shadow-xs sticky top-0 z-20 print:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        
        {/* Top controls: Chapter selection pills + Search & Board Filter */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          
          {/* Chapter Horizontal Scroll List */}
          <div className="flex items-center space-x-1.5 overflow-x-auto pb-1.5 lg:pb-0 scrollbar-thin scrollbar-thumb-slate-300">
            <button
              onClick={() => onSelectChapter('all')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedChapterId === 'all'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              সকল অধ্যায় (All 11)
            </button>

            {chapters.map((ch) => {
              const isSelected = selectedChapterId === ch.id;
              return (
                <button
                  key={ch.id}
                  onClick={() => onSelectChapter(ch.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-indigo-600 text-white shadow-md ring-2 ring-indigo-300'
                      : 'bg-slate-100 text-slate-800 hover:bg-indigo-50 hover:text-indigo-700'
                  }`}
                >
                  <span className={`w-4 h-4 rounded-full text-[10px] flex items-center justify-center font-bold ${
                    isSelected ? 'bg-indigo-800 text-indigo-100' : 'bg-slate-200 text-slate-700'
                  }`}>
                    {ch.number}
                  </span>
                  <span>{ch.titleBn}</span>
                  {ch.importanceStars === 3 && (
                    <span className="flex text-amber-400">
                      <Star className="w-3 h-3 fill-amber-400" />
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Search & Board Filter Controls */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Search Input */}
            <div className="relative flex-1 sm:w-64">
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="প্রশ্ন, সূত্র বা কি-ওয়ার্ড খুঁজুন..."
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white text-slate-800 placeholder-slate-400"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-2 top-1.5 text-xs text-slate-400 hover:text-slate-600"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Board Filter Dropdown */}
            <div className="flex items-center space-x-1 bg-slate-50 border border-slate-300 rounded-lg px-2 py-1 text-xs text-slate-700">
              <Filter className="w-3 h-3 text-slate-500" />
              <span className="text-[11px] text-slate-500 hidden sm:inline">বোর্ড:</span>
              <select
                value={boardFilter}
                onChange={(e) => onBoardFilterChange(e.target.value)}
                className="bg-transparent font-medium focus:outline-none cursor-pointer text-xs"
              >
                <option value="All">সকল বোর্ড</option>
                <option value="DB">ঢাকা (DB)</option>
                <option value="RB">রাজশাহী (RB)</option>
                <option value="Ctg.B">চট্টগ্রাম (Ctg.B)</option>
                <option value="CB">কুমিল্লা (CB)</option>
                <option value="JB">যশোর (JB)</option>
                <option value="BB">বরিশাল (BB)</option>
                <option value="SB">সিলেট (SB)</option>
                <option value="Din.B">দিনাজপুর (Din.B)</option>
                <option value="MB">ময়মনসিংহ (MB)</option>
              </select>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
