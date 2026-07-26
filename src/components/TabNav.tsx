import React from 'react';
import { ContentTab } from '../types';
import { BookOpen, HelpCircle, FileText, CheckSquare, Zap, Bookmark, Layers, GraduationCap } from 'lucide-react';

interface TabNavProps {
  activeTab: ContentTab | 'bookmarks';
  onSelectTab: (tab: ContentTab | 'bookmarks') => void;
  counts: {
    cq: number;
    knowledge: number;
    comprehension: number;
    mcq: number;
    theories: number;
  };
}

export const TabNav: React.FC<TabNavProps> = ({ activeTab, onSelectTab, counts }) => {
  const tabs = [
    { id: 'all', label: 'সব বিষয়', icon: Layers },
    { id: 'theory', label: 'মূল থিওরি', icon: BookOpen, count: counts.theories },
    { id: 'cq', label: 'সৃজনশীল (গ ও ঘ)', icon: GraduationCap, count: counts.cq, highlight: true },
    { id: 'knowledge', label: 'জ্ঞানমূলক (ক)', icon: HelpCircle, count: counts.knowledge },
    { id: 'comprehension', label: 'অনুধাবন (খ)', icon: FileText, count: counts.comprehension },
    { id: 'mcq', label: 'MCQ ব্যাংক', icon: CheckSquare, count: counts.mcq },
    { id: 'cheatsheet', label: 'সূত্রাবলি', icon: Zap },
  ];

  return (
    <div className="bg-slate-900 text-slate-200 border-b border-slate-800 print:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-1 sm:space-x-2 overflow-x-auto py-2.5 scrollbar-thin scrollbar-thumb-slate-700">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onSelectTab(tab.id as any)}
                className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-indigo-500 to-blue-600 text-white shadow-md font-bold'
                    : tab.highlight
                    ? 'bg-indigo-950/60 text-indigo-300 border border-indigo-800/80 hover:bg-indigo-900/80'
                    : 'bg-slate-800/70 text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : tab.highlight ? 'text-indigo-400' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span className={`px-1.5 py-0.2 text-[10px] rounded-full font-bold ${
                    isActive ? 'bg-white/20 text-white' : 'bg-slate-700 text-slate-300'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
