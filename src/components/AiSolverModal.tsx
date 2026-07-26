import React, { useState } from 'react';
import { Sparkles, Send, X, Bot, AlertCircle, Loader2, CheckCircle2, Copy, Check } from 'lucide-react';

interface AiSolverModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AiSolverModal: React.FC<AiSolverModalProps> = ({ isOpen, onClose }) => {
  const [questionText, setQuestionText] = useState('');
  const [loading, setLoading] = useState(false);
  const [solution, setSolution] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleSolve = async () => {
    if (!questionText.trim()) return;

    setLoading(true);
    setError(null);
    setSolution(null);

    try {
      const response = await fetch('/api/ai/solve-physics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ questionText }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'প্রশ্ন সমাধানে সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।');
      }

      setSolution(data.solution || data.text || 'কোনো সমাধান পাওয়া যায়নি।');
    } catch (err: any) {
      setError(err.message || 'নেটওয়ার্ক বা সার্ভারে সমস্যা দেখা দিয়েছে।');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (solution) {
      navigator.clipboard.writeText(solution);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const sampleQuestions = [
    'একটি নভো দূরবীক্ষণ যন্ত্রের অভিলক্ষ্য ও অভিনেত্রের ফোকাস দূরত্ব যথাক্রমে 50 cm ও 5 cm। এর বিবর্ধন ও নলের দৈর্ঘ্য কত?',
    'ইয়ং-এর দ্বি-চির পরীক্ষায় আলোর তরঙ্গদৈর্ঘ্য 6000 Å, চিড় হতে পর্দার দূরত্ব 1.5 m এবং ডোরা প্রস্থ 0.3 mm হলে চিড়দ্বয়ের মধ্যবর্তী দূরত্ব কত?',
    'একটি কার্নো ইঞ্জিন 500 K ও 300 K তাপমাত্রার মধ্যে কাজ করে। এর দক্ষতা কত?'
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-3xl shadow-2xl overflow-hidden text-white my-8">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl text-yellow-305 shadow-md">
              <Sparkles className="w-5 h-5 text-yellow-300" />
            </div>
            <div>
              <h3 className="font-extrabold text-lg text-white">AI ফিজিক্স প্রবলেম সলভার</h3>
              <p className="text-xs text-indigo-200">
                পদার্থবিজ্ঞান ২য় পত্রের যেকোনো গাণিতিক বা থিওরিটিক্যাল প্রশ্ন লিখুন বা পেস্ট করুন।
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-800 rounded-lg transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {/* Question Input Area */}
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-2">
              আপনার ফিজিক্স প্রশ্নটি লিখুন:
            </label>
            <textarea
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
              placeholder="উদাহরণ: একটি সমান্তরাল পাত ধারকের পাতের ক্ষেত্রফল 0.2 m² এবং পাতদ্বয়ের দূরত্ব 1 mm হলে এর ধারকত্ব কত?"
              rows={4}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent font-sans"
            />
          </div>

          {/* Sample Prompts */}
          <div>
            <span className="text-[11px] font-semibold text-slate-400 block mb-1.5">
              💡 দ্রুত চেষ্টার জন্য নমুনা প্রশ্নসমূহ:
            </span>
            <div className="flex flex-wrap gap-2">
              {sampleQuestions.map((sq, i) => (
                <button
                  key={i}
                  onClick={() => setQuestionText(sq)}
                  className="text-xs bg-slate-800/80 hover:bg-slate-800 text-indigo-200 border border-slate-700/80 rounded-lg px-3 py-1.5 text-left transition-all cursor-pointer truncate max-w-full"
                >
                  {sq}
                </button>
              ))}
            </div>
          </div>

          {/* Submit Action */}
          <div className="flex justify-end">
            <button
              onClick={handleSolve}
              disabled={loading || !questionText.trim()}
              className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-extrabold text-sm rounded-xl shadow-lg transition-all flex items-center gap-2 disabled:opacity-50 cursor-pointer active:scale-95"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-yellow-300" />
                  <span>AI সমাধান তৈরি করছে...</span>
                </>
              ) : (
                <>
                  <Bot className="w-4 h-4 text-yellow-300" />
                  <span>গাণিতিক সমাধান পান</span>
                  <Send className="w-4 h-4" />
                </>
              )}
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-4 bg-rose-950/80 border border-rose-800 text-rose-200 rounded-xl text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Solution Result Display */}
          {solution && (
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4 text-slate-200">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <span className="font-bold text-sm text-white">AI পদার্থবিজ্ঞান সমাধান:</span>
                </div>
                <button
                  onClick={handleCopy}
                  className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'কপি হয়েছে' : 'কপি করুন'}</span>
                </button>
              </div>

              <div className="prose prose-invert max-w-none text-xs sm:text-sm text-slate-200 leading-relaxed font-sans whitespace-pre-wrap">
                {solution}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
