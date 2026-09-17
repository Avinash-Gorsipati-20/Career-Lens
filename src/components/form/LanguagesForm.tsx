import React from 'react';
import { Language } from '../../types/resume';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Plus, Trash2, Languages } from 'lucide-react';

interface LanguagesFormProps {
  languages: Language[];
  onAdd: (lang: Language) => void;
  onUpdate: (id: string, lang: Partial<Language>) => void;
  onRemove: (id: string) => void;
}

export const LanguagesForm: React.FC<LanguagesFormProps> = ({
  languages,
  onAdd,
  onUpdate,
  onRemove
}) => {
  const proficiencies: Language['proficiency'][] = [
    'Native',
    'Fluent',
    'Professional',
    'Intermediate',
    'Basic'
  ];

  const handleAddNew = () => {
    onAdd({
      id: `lang-${Date.now()}`,
      name: '',
      proficiency: 'Fluent'
    });
  };

  return (
    <div className="space-y-4">
      {languages.map((item, index) => (
        <div key={item.id} className="p-3.5 bg-slate-900/40 border border-slate-800 rounded-xl space-y-3">
          <div className="flex justify-between items-center pb-2 border-b border-slate-800/60">
            <span className="text-xs font-semibold text-blue-400 flex items-center gap-1.5 uppercase tracking-wider">
              <Languages size={14} /> Language #{index + 1}
            </span>
            <Button
              variant="danger"
              size="sm"
              onClick={() => onRemove(item.id)}
              icon={<Trash2 size={14} />}
            >
              Remove
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-end">
            <Input
              label="Language Name *"
              placeholder="e.g. English, Spanish, German"
              value={item.name}
              onChange={e => onUpdate(item.id, { name: e.target.value })}
            />
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1.5">
                Proficiency Level
              </label>
              <select
                value={item.proficiency}
                onChange={e => onUpdate(item.id, { proficiency: e.target.value as Language['proficiency'] })}
                className="w-full bg-slate-900 border border-slate-700 hover:border-slate-600 focus:border-blue-500 text-slate-100 rounded-lg text-sm px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              >
                {proficiencies.map(p => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      ))}

      <Button
        variant="secondary"
        onClick={handleAddNew}
        className="w-full border-dashed border-slate-700 hover:border-blue-500 py-3"
        icon={<Plus size={16} />}
      >
        Add Language
      </Button>
    </div>
  );
};
