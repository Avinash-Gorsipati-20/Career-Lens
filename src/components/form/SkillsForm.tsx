import React, { useState } from 'react';
import { Skill, ValidationErrors } from '../../types/resume';
import { SKILL_SUGGESTIONS } from '../../data/skillSuggestions';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Plus, Sparkles, Code2, AlertTriangle, Check } from 'lucide-react';

interface SkillsFormProps {
  skills: Skill[];
  onAddSkill: (name: string, category: Skill['category'], level?: Skill['level']) => void;
  onUpdateSkill: (id: string, skill: Partial<Skill>) => void;
  onRemoveSkill: (id: string) => void;
  errors?: ValidationErrors;
}

export const SkillsForm: React.FC<SkillsFormProps> = ({
  skills,
  onAddSkill,
  onUpdateSkill,
  onRemoveSkill,
  errors = {}
}) => {
  const [newSkillName, setNewSkillName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Skill['category']>('Programming');
  const [selectedLevel, setSelectedLevel] = useState<Skill['level']>('Advanced');
  const [activeTab, setActiveTab] = useState<string>('All');

  const categories: Skill['category'][] = [
    'Programming',
    'Web',
    'Frameworks',
    'Database',
    'DevOps & Cloud',
    'AI & Data',
    'Tools & Software',
    'Soft Skills',
    'Other'
  ];

  const handleCustomAdd = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (newSkillName.trim()) {
      onAddSkill(newSkillName.trim(), selectedCategory, selectedLevel);
      setNewSkillName('');
    }
  };

  const handleSuggestionClick = (skillName: string, category: Skill['category']) => {
    onAddSkill(skillName, category, 'Advanced');
  };

  const existingSkillNames = new Set(skills.map(s => s.name.toLowerCase()));

  // Group current user skills by category
  const groupedSkills = categories.reduce((acc, cat) => {
    const catSkills = skills.filter(s => s.category === cat);
    if (catSkills.length > 0) {
      acc[cat] = catSkills;
    }
    return acc;
  }, {} as Record<string, Skill[]>);

  return (
    <div className="space-y-6">
      {/* Custom Add Bar */}
      <form onSubmit={handleCustomAdd} className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl space-y-3">
        <h4 className="text-xs font-semibold text-blue-400 uppercase tracking-wider flex items-center gap-1.5">
          <Code2 size={15} /> Add Custom Skill
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
          <div className="sm:col-span-4">
            <Input
              label="Skill Name"
              placeholder="e.g. React.js, Rust, Docker"
              value={newSkillName}
              onChange={e => setNewSkillName(e.target.value)}
            />
          </div>
          <div className="sm:col-span-3">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1.5">
              Category
            </label>
            <select
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value as Skill['category'])}
              className="w-full bg-slate-900 border border-slate-700 hover:border-slate-600 focus:border-blue-500 text-slate-100 rounded-lg text-sm px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div className="sm:col-span-3">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1.5">
              Proficiency Level
            </label>
            <select
              value={selectedLevel}
              onChange={e => setSelectedLevel(e.target.value as Skill['level'])}
              className="w-full bg-slate-900 border border-slate-700 hover:border-slate-600 focus:border-blue-500 text-slate-100 rounded-lg text-sm px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
              <option value="Expert">Expert</option>
            </select>
          </div>
          <div className="sm:col-span-2">
            <Button type="submit" variant="primary" className="w-full" icon={<Plus size={16} />}>
              Add
            </Button>
          </div>
        </div>
      </form>

      {/* Duplicate warning if any */}
      {errors.duplicateSkills && (
        <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg flex items-center gap-2 text-xs text-amber-400">
          <AlertTriangle size={16} />
          <span>Duplicate skills detected: {errors.duplicateSkills.join(', ')}</span>
        </div>
      )}

      {/* Quick Skill Suggestion Library */}
      <div className="p-4 bg-slate-900/40 border border-slate-800/80 rounded-xl space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-semibold text-purple-400 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles size={15} /> 1-Click Skill Library (Click to Add)
          </h4>
          <span className="text-[11px] text-slate-400">Categorized pre-set skills</span>
        </div>

        {/* Suggestion Category Tabs */}
        <div className="flex flex-wrap gap-1.5 pb-1 border-b border-slate-800/60">
          <button
            type="button"
            onClick={() => setActiveTab('All')}
            className={`px-2.5 py-1 text-xs rounded-md transition-colors ${
              activeTab === 'All' ? 'bg-blue-600 text-white font-medium' : 'text-slate-400 hover:bg-slate-800'
            }`}
          >
            All
          </button>
          {SKILL_SUGGESTIONS.map(group => (
            <button
              key={group.category}
              type="button"
              onClick={() => setActiveTab(group.category)}
              className={`px-2.5 py-1 text-xs rounded-md transition-colors ${
                activeTab === group.category ? 'bg-blue-600 text-white font-medium' : 'text-slate-400 hover:bg-slate-800'
              }`}
            >
              {group.category}
            </button>
          ))}
        </div>

        {/* Suggestion Chips */}
        <div className="flex flex-wrap gap-2 max-h-44 overflow-y-auto pr-1">
          {SKILL_SUGGESTIONS
            .filter(group => activeTab === 'All' || activeTab === group.category)
            .flatMap(group =>
              group.skills.map(skillName => {
                const isAdded = existingSkillNames.has(skillName.toLowerCase());
                return (
                  <button
                    key={`${group.category}-${skillName}`}
                    type="button"
                    disabled={isAdded}
                    onClick={() => handleSuggestionClick(skillName, group.category)}
                    className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all border flex items-center gap-1.5 ${
                      isAdded
                        ? 'bg-slate-800/50 border-slate-800 text-slate-500 cursor-not-allowed'
                        : 'bg-slate-800/90 border-slate-700 hover:border-purple-500 hover:text-purple-300 text-slate-300 active:scale-95'
                    }`}
                  >
                    {isAdded ? <Check size={11} className="text-emerald-400" /> : <Plus size={11} className="text-purple-400" />}
                    <span>{skillName}</span>
                  </button>
                );
              })
            )}
        </div>
      </div>

      {/* Current Added Skills Display */}
      <div className="space-y-4">
        <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
          Added Resume Skills ({skills.length})
        </h4>

        {skills.length === 0 ? (
          <div className="text-center py-6 border border-dashed border-slate-800 rounded-xl text-slate-500 text-xs">
            No skills added yet. Use the library above or custom input to add skills.
          </div>
        ) : (
          Object.entries(groupedSkills).map(([cat, catSkills]) => (
            <div key={cat} className="p-3.5 bg-slate-900/30 border border-slate-800 rounded-lg space-y-2">
              <span className="text-xs font-semibold text-blue-400 block">{cat}</span>
              <div className="flex flex-wrap gap-2">
                {catSkills.map(skill => (
                  <div key={skill.id} className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs rounded-lg font-medium">
                    <span>{skill.name}</span>
                    {skill.level && (
                      <span className="px-1.5 py-0.5 text-[9px] font-mono bg-blue-500/20 text-blue-400 rounded">
                        {skill.level}
                      </span>
                    )}
                    <button
                      type="button"
                      onClick={() => onRemoveSkill(skill.id)}
                      className="text-slate-400 hover:text-rose-400 ml-1 transition-colors"
                      title="Remove skill"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
