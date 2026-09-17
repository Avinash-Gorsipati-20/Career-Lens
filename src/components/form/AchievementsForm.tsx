import React from 'react';
import { Achievement } from '../../types/resume';
import { Input } from '../ui/Input';
import { TextArea } from '../ui/TextArea';
import { Button } from '../ui/Button';
import { Plus, Trash2, Trophy } from 'lucide-react';

interface AchievementsFormProps {
  achievements: Achievement[];
  onAdd: (ach: Achievement) => void;
  onUpdate: (id: string, ach: Partial<Achievement>) => void;
  onRemove: (id: string) => void;
}

export const AchievementsForm: React.FC<AchievementsFormProps> = ({
  achievements,
  onAdd,
  onUpdate,
  onRemove
}) => {
  const handleAddNew = () => {
    onAdd({
      id: `ach-${Date.now()}`,
      title: '',
      description: '',
      date: ''
    });
  };

  return (
    <div className="space-y-4">
      {achievements.map((item, index) => (
        <div key={item.id} className="p-4 bg-slate-900/40 border border-slate-800 rounded-xl space-y-3">
          <div className="flex justify-between items-center pb-2 border-b border-slate-800/60">
            <span className="text-xs font-semibold text-blue-400 flex items-center gap-1.5 uppercase tracking-wider">
              <Trophy size={14} /> Achievement #{index + 1}
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="md:col-span-2">
              <Input
                label="Achievement / Award Title *"
                placeholder="e.g. 1st Place - TechCrunch Global Hackathon"
                value={item.title}
                onChange={e => onUpdate(item.id, { title: e.target.value })}
              />
            </div>
            <Input
              label="Year / Date"
              placeholder="e.g. 2023"
              value={item.date || ''}
              onChange={e => onUpdate(item.id, { date: e.target.value })}
            />
          </div>

          <TextArea
            label="Brief Description"
            placeholder="Details about the award, scope of competition, or recognition..."
            value={item.description}
            onChange={e => onUpdate(item.id, { description: e.target.value })}
            rows={2}
          />
        </div>
      ))}

      <Button
        variant="secondary"
        onClick={handleAddNew}
        className="w-full border-dashed border-slate-700 hover:border-blue-500 py-3"
        icon={<Plus size={16} />}
      >
        Add Achievement / Honor
      </Button>
    </div>
  );
};
