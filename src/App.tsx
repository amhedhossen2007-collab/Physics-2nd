import React, { useState, useEffect } from 'react';
import { allChapters } from './data/chapters';
import { ContentTab, Chapter } from './types';
import { Header } from './components/Header';
import { ChapterSelector } from './components/ChapterSelector';
import { TabNav } from './components/TabNav';
import { TheoryView } from './components/TheoryView';
import { CreativeQuestionsView } from './components/CreativeQuestionsView';
import { KnowledgeComprehensionView } from './components/KnowledgeComprehensionView';
import { MCQView } from './components/MCQView';
import { FormulaCheatsheetView } from './components/FormulaCheatsheetView';
import { PrintPdfView } from './components/PrintPdfView';
import { AiSolverModal } from './components/AiSolverModal';
import { Bookmark, Sparkles, BookOpen, Layers } from 'lucide-react';

export default function App() {
  const [selectedChapterId, setSelectedChapterId] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<ContentTab | 'bookmarks'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [boardFilter, setBoardFilter] = useState<string>('All');
  const [isPrintMode, setIsPrintMode] = useState<boolean>(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState<boolean>(false);

  // Bookmarks State in LocalStorage
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('hsc_physics_bookmarks');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('hsc_physics_bookmarks', JSON.stringify(bookmarkedIds));
    } catch (e) {
      console.error('Failed to persist bookmarks:', e);
    }
  }, [bookmarkedIds]);

  const toggleBookmark = (id: string) => {
    setBookmarkedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Filter Chapters & Items based on Selected Chapter, Search Query, and Board Filter
  const filteredChapters = allChapters
    .filter((ch) => selectedChapterId === 'all' || ch.id === selectedChapterId)
    .map((ch) => {
      // Filter MCQs
      const filteredMcqs = ch.mcqs.filter((m) => {
        const matchesSearch =
          !searchQuery ||
          m.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          m.options.some((o) => o.text.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (m.explanation && m.explanation.toLowerCase().includes(searchQuery.toLowerCase()));

        const matchesBoard =
          boardFilter === 'All' ||
          (m.boardRef && m.boardRef.toLowerCase().includes(boardFilter.toLowerCase()));

        return matchesSearch && matchesBoard;
      });

      // Filter CQs
      const filteredCqs = ch.creativeQuestions.filter((cq) => {
        const matchesSearch =
          !searchQuery ||
          cq.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          cq.stimulus.toLowerCase().includes(searchQuery.toLowerCase()) ||
          cq.partG.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          cq.partGh.question.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesBoard =
          boardFilter === 'All' ||
          (cq.boardRef && cq.boardRef.toLowerCase().includes(boardFilter.toLowerCase()));

        return matchesSearch && matchesBoard;
      });

      // Filter Knowledge Questions (ক)
      const filteredKnowledge = ch.knowledgeQuestions.filter((kq) => {
        const matchesSearch =
          !searchQuery ||
          kq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          kq.answer.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesBoard =
          boardFilter === 'All' ||
          (kq.boardRef && kq.boardRef.toLowerCase().includes(boardFilter.toLowerCase()));

        return matchesSearch && matchesBoard;
      });

      // Filter Comprehension Questions (খ)
      const filteredComprehension = ch.comprehensionQuestions.filter((cq) => {
        const matchesSearch =
          !searchQuery ||
          cq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          cq.answer.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesBoard =
          boardFilter === 'All' ||
          (cq.boardRef && cq.boardRef.toLowerCase().includes(boardFilter.toLowerCase()));

        return matchesSearch && matchesBoard;
      });

      return {
        ...ch,
        mcqs: filteredMcqs,
        creativeQuestions: filteredCqs,
        knowledgeQuestions: filteredKnowledge,
        comprehensionQuestions: filteredComprehension,
      };
    });

  // Global Counts
  const totalCounts = {
    cq: filteredChapters.reduce((acc, c) => acc + c.creativeQuestions.length, 0),
    knowledge: filteredChapters.reduce((acc, c) => acc + c.knowledgeQuestions.length, 0),
    comprehension: filteredChapters.reduce((acc, c) => acc + c.comprehensionQuestions.length, 0),
    mcq: filteredChapters.reduce((acc, c) => acc + c.mcqs.length, 0),
    theories: filteredChapters.reduce((acc, c) => acc + c.theories.length, 0),
  };

  if (isPrintMode) {
    return (
      <PrintPdfView
        chapters={filteredChapters}
        onClosePrint={() => setIsPrintMode(false)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 font-sans flex flex-col selection:bg-indigo-500 selection:text-white">
      
      {/* Top Header */}
      <Header
        onOpenAiModal={() => setIsAiModalOpen(true)}
        onPrint={() => setIsPrintMode(true)}
        savedCount={bookmarkedIds.length}
        activeTab={activeTab}
        onSelectTab={(tab) => setActiveTab(tab)}
        selectedChapterId={selectedChapterId}
      />

      {/* Chapter Picker & Search Bar */}
      <ChapterSelector
        chapters={allChapters}
        selectedChapterId={selectedChapterId}
        onSelectChapter={(id) => setSelectedChapterId(id)}
        searchQuery={searchQuery}
        onSearchChange={(q) => setSearchQuery(q)}
        boardFilter={boardFilter}
        onBoardFilterChange={(b) => setBoardFilter(b)}
      />

      {/* Content View Navigation Tabs */}
      <TabNav
        activeTab={activeTab}
        onSelectTab={(tab) => setActiveTab(tab)}
        counts={totalCounts}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* TAB: ALL / OVERVIEW */}
        {activeTab === 'all' && (
          <div className="space-y-12">
            
            {/* Theory Component */}
            <TheoryView chapters={filteredChapters} />

            {/* Creative Questions Component */}
            <CreativeQuestionsView
              chapters={filteredChapters}
              bookmarkedCqIds={bookmarkedIds}
              onToggleBookmark={toggleBookmark}
            />

            {/* Knowledge & Comprehension Component */}
            <KnowledgeComprehensionView
              chapters={filteredChapters}
              mode="both"
              bookmarkedIds={bookmarkedIds}
              onToggleBookmark={toggleBookmark}
            />

            {/* MCQ Component */}
            <MCQView
              chapters={filteredChapters}
              bookmarkedMcqIds={bookmarkedIds}
              onToggleBookmark={toggleBookmark}
            />

          </div>
        )}

        {/* TAB: THEORY */}
        {activeTab === 'theory' && <TheoryView chapters={filteredChapters} />}

        {/* TAB: CREATIVE QUESTIONS (CQ) */}
        {activeTab === 'cq' && (
          <CreativeQuestionsView
            chapters={filteredChapters}
            bookmarkedCqIds={bookmarkedIds}
            onToggleBookmark={toggleBookmark}
          />
        )}

        {/* TAB: KNOWLEDGE (ক) */}
        {activeTab === 'knowledge' && (
          <KnowledgeComprehensionView
            chapters={filteredChapters}
            mode="knowledge"
            bookmarkedIds={bookmarkedIds}
            onToggleBookmark={toggleBookmark}
          />
        )}

        {/* TAB: COMPREHENSION (খ) */}
        {activeTab === 'comprehension' && (
          <KnowledgeComprehensionView
            chapters={filteredChapters}
            mode="comprehension"
            bookmarkedIds={bookmarkedIds}
            onToggleBookmark={toggleBookmark}
          />
        )}

        {/* TAB: MCQ BANK */}
        {activeTab === 'mcq' && (
          <MCQView
            chapters={filteredChapters}
            bookmarkedMcqIds={bookmarkedIds}
            onToggleBookmark={toggleBookmark}
          />
        )}

        {/* TAB: FORMULA CHEATSHEET */}
        {activeTab === 'cheatsheet' && <FormulaCheatsheetView chapters={filteredChapters} />}

        {/* TAB: BOOKMARKS */}
        {activeTab === 'bookmarks' && (
          <div className="space-y-8">
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 text-amber-900 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bookmark className="w-6 h-6 text-amber-600 fill-current" />
                <div>
                  <h2 className="font-extrabold text-lg">আপনার সংরক্ষিত প্রশ্ন ও উত্তরসমূহ</h2>
                  <p className="text-xs text-amber-800 mt-0.5">
                    মোট {bookmarkedIds.length} টি প্রশ্ন বুকমার্ক করে রেখেছেন।
                  </p>
                </div>
              </div>
            </div>

            <CreativeQuestionsView
              chapters={filteredChapters.map((c) => ({
                ...c,
                creativeQuestions: c.creativeQuestions.filter((cq) => bookmarkedIds.includes(cq.id)),
              }))}
              bookmarkedCqIds={bookmarkedIds}
              onToggleBookmark={toggleBookmark}
            />

            <KnowledgeComprehensionView
              chapters={filteredChapters.map((c) => ({
                ...c,
                knowledgeQuestions: c.knowledgeQuestions.filter((kq) => bookmarkedIds.includes(kq.id)),
                comprehensionQuestions: c.comprehensionQuestions.filter((cq) => bookmarkedIds.includes(cq.id)),
              }))}
              mode="both"
              bookmarkedIds={bookmarkedIds}
              onToggleBookmark={toggleBookmark}
            />

            <MCQView
              chapters={filteredChapters.map((c) => ({
                ...c,
                mcqs: c.mcqs.filter((m) => bookmarkedIds.includes(m.id)),
              }))}
              bookmarkedMcqIds={bookmarkedIds}
              onToggleBookmark={toggleBookmark}
            />
          </div>
        )}

      </main>

      {/* Persistent Footer */}
      <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 py-8 text-center text-xs print:hidden">
        <div className="max-w-7xl mx-auto px-4 space-y-2">
          <p className="font-extrabold text-slate-200 text-sm">
            এইচএসসি পদার্থবিজ্ঞান দ্বিতীয় পত্র – বোর্ড প্রশ্ন ও সাজেশন মাস্টার শিট
          </p>
          <p className="text-emerald-400 font-bold">
            Prepared by - SB Junayed
          </p>
          <p className="text-slate-500 text-[11px]">
            © {new Date().getFullYear()} HSC Physics Master Note • All Rights Reserved.
          </p>
        </div>
      </footer>

      {/* AI Solver Modal */}
      <AiSolverModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
      />

    </div>
  );
}
