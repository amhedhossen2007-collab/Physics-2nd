export interface FormulaItem {
  id: string;
  title: string;
  expression: string;
  variables: { symbol: string; name: string; unit?: string }[];
  note?: string;
}

export interface TheorySection {
  id: string;
  title: string;
  bullets: string[];
  formulas?: FormulaItem[];
  notes?: string[];
  comparisonTable?: {
    headers: string[];
    rows: string[][];
  };
}

export interface MCQOption {
  key: 'a' | 'b' | 'c' | 'd';
  text: string;
}

export interface MCQQuestion {
  id: string;
  number: number;
  question: string;
  options: MCQOption[];
  correctAnswer: 'a' | 'b' | 'c' | 'd';
  explanation?: string;
  boardRef?: string; // e.g. [DB'25, SB'24]
  stimulusCode?: string;
}

export interface KnowledgeQuestion {
  id: string;
  question: string;
  answer: string;
  boardRef?: string;
}

export interface ComprehensionQuestion {
  id: string;
  question: string;
  answer: string;
  boardRef?: string;
  keyPoints?: string[];
}

export interface CreativeQuestion {
  id: string;
  title: string;
  boardRef?: string;
  stimulus: string; // উদ্দীপক
  partG: {
    question: string; // (গ) প্রশ্ন
    solution: string; // গ এর সমাধান
    formulaUsed?: string;
  };
  partGh: {
    question: string; // (ঘ) প্রশ্ন
    solution: string; // ঘ এর সমাধান / গাণিতিক বিশ্লেষণ
    conclusion: string; // সিদ্ধান্ত / মন্তব্য
  };
}

export interface Chapter {
  id: string;
  number: number;
  titleBn: string;
  titleEn: string;
  part: 1 | 2; // Part 1 or Part 2 sheet
  importanceStars: number; // 1 to 3 stars
  overview: string;
  topicsAnalysis: { name: string; totalG: number; totalGh: number; totalMCQ: number }[];
  theories: TheorySection[];
  mcqs: MCQQuestion[];
  knowledgeQuestions: KnowledgeQuestion[];
  comprehensionQuestions: ComprehensionQuestion[];
  creativeQuestions: CreativeQuestion[];
}

export type ContentTab = 'all' | 'theory' | 'mcq' | 'knowledge' | 'comprehension' | 'cq' | 'cheatsheet';

export interface BookmarkState {
  mcqIds: string[];
  cqIds: string[];
  knowledgeIds: string[];
}
