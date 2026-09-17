import React, { useState } from 'react';
import { X, Sparkles, Check, ChevronRight } from 'lucide-react';

interface GuidedInputModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddSkills: (skills: string[]) => void;
}

const GUIDED_QUESTIONS = [
  {
    question: "What core programming languages have you worked with?",
    category: "Programming",
    options: ["JavaScript", "TypeScript", "Python", "Java", "C++", "Go", "Rust", "PHP", "SQL"]
  },
  {
    question: "Which frontend web frameworks & libraries do you use?",
    category: "Web",
    options: ["React", "Next.js", "Vue.js", "Tailwind CSS", "HTML5", "CSS3", "Redux", "Sass"]
  },
  {
    question: "What databases or cloud tools are you familiar with?",
    category: "Database",
    options: ["PostgreSQL", "MongoDB", "Redis", "MySQL", "Docker", "AWS", "Firebase", "Git"]
  }
];

export const GuidedInputModal: React.FC<GuidedInputModalProps> = ({
  isOpen,
  onClose,
  onAddSkills
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  if (!isOpen) return null;

  const activeQ = GUIDED_QUESTIONS[currentStep];

  const toggleSkill = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter(s => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const handleFinish = () => {
    onAddSkills(selectedSkills);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-xl shadow-2xl p-6 text-slate-100 space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <span className="p-2 bg-blue-500/10 text-blue-400 rounded-xl">
              <Sparkles size={18} />
            </span>
            <div>
              <h2 className="text-xl font-bold text-white">AI Guided Prompt System</h2>
              <p className="text-xs text-slate-400">1-Click suggestions for students, freshers & professionals</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-white bg-slate-800 rounded-lg">
            <X size={18} />
          </button>
        </div>

        {/* Question Content */}
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
            <span>Step {currentStep + 1} of {GUIDED_QUESTIONS.length}</span>
            <span>Category: {activeQ.category}</span>
          </div>

          <h3 className="text-base font-bold text-white">{activeQ.question}</h3>

          <div className="flex flex-wrap gap-2 pt-2">
            {activeQ.options.map(opt => {
              const isSel = selectedSkills.includes(opt);
              return (
                <button
                  key={opt}
                  onClick={() => toggleSkill(opt)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all border flex items-center gap-1.5 ${
                    isSel
                      ? 'bg-blue-600 text-white border-blue-400 shadow-md'
                      : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {isSel && <Check size={14} />} {opt}
                </button>
              );
            })}
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-800">
          <button
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-slate-300 rounded-xl text-xs font-semibold"
          >
            ← Previous
          </button>

          {currentStep < GUIDED_QUESTIONS.length - 1 ? (
            <button
              onClick={() => setCurrentStep(currentStep + 1)}
              className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md"
            >
              Next Step <ChevronRight size={14} />
            </button>
          ) : (
            <button
              onClick={handleFinish}
              className="px-5 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs shadow-lg"
            >
              ✓ Add Selected Skills ({selectedSkills.length})
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
