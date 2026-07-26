import { Chapter } from '../types';
import { chapter1 } from './chapter1';
import { chapter2 } from './chapter2';
import { chapter3 } from './chapter3';
import { chapter4 } from './chapter4';
import { chapter5 } from './chapter5';
import { chapter6 } from './chapter6';
import { chapter7 } from './chapter7';
import { chapter8 } from './chapter8';
import { chapter9 } from './chapter9';
import { chapter10 } from './chapter10';
import { chapter11 } from './chapter11';

export const allChapters: Chapter[] = [
  chapter1,
  chapter2,
  chapter3,
  chapter4,
  chapter5,
  chapter6,
  chapter7,
  chapter8,
  chapter9,
  chapter10,
  chapter11
];

export const courseInfo = {
  subjectBn: 'পদার্থবিজ্ঞান দ্বিতীয় পত্র',
  subjectEn: 'Physics 2nd Paper',
  level: 'HSC & Admission',
  prepType: 'ক, খ, গ, ঘ এবং MCQ মাস্টার শিট (Full Board Questions & Solutions)',
  preparedBy: 'SB Junayed',
  institute: 'HSC Physics Academy',
  totalChapters: 11,
  totalBoardsCovered: 'ঢাকা, রাজশাহী, চট্টগ্রাম, কুমিল্লা, যশোর, বরিশাল, সিলেট, দিনাজপুর, ময়মনসিংহ ও মাদ্রাসা বোর্ড'
};
