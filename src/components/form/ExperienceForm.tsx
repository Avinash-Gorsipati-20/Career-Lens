import React from 'react';
import { Experience } from '../../types/resume';
import { Input } from '../ui/Input';
import { TextArea } from '../ui/TextArea';
import { Button } from '../ui/Button';
import { Plus, Trash2, Briefcase } from 'lucide-react';

interface ExperienceFormProps {
  experience: Experience[];
  onAdd: (exp: Experience) => void;
  onUpdate: (id: string, exp: Partial<Experience>) => void;
  onRemove: (id: string) => void;
}

export const ExperienceForm: React.FC<ExperienceFormProps> = ({
  experience,
  onAdd,
  onUpdate,
  onRemove
}) => {
  const handleAddNew = () => {
    onAdd({
      id: `exp-${Date.now()}`,
      company: '',
      role: '',
      duration: '',
      description: ''
    });
  };

  return (
    <div className="space-y-4">
      {experience.map((item, index) => (
        <div key={item.id} className="p-4 bg-slate-900/40 border border-slate-800 rounded-xl space-y-3">
          <div className="flex justify-between items-center pb-2 border-b border-slate-800/60">
            <span className="text-xs font-semibold text-blue-400 flex items-center gap-1.5 uppercase tracking-wider">
              <Briefcase size={14} /> Experience #{index + 1}
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Input
              label="Company Name *"
              placeholder="e.g. CloudTech Solutions Inc."
              value={item.company}
              onChange={e => onUpdate(item.id, { company: e.target.value })}
            />
            <Input
              label="Role / Title *"
              placeholder="e.g. Lead Software Architect"
              value={item.role}
              onChange={e => onUpdate(item.id, { role: e.target.value })}
            />
          </div>

          <Input
            label="Duration / Dates *"
            placeholder="e.g. 2022 - Present or Jan 2021 - Dec 2023"
            value={item.duration}
            onChange={e => onUpdate(item.id, { duration: e.target.value })}
          />

          <TextArea
            label="Description & Responsibilities"
            placeholder="• Bullet point 1: Key achievement or metric (e.g. Increased API performance by 40%)\n• Bullet point 2: Technologies used & responsibilities"
            value={item.description}
            onChange={e => onUpdate(item.id, { description: e.target.value })}
            rows={4}
            helperText="Use bullet points starting with '•' to make achievements easy to scan for recruiters."
          />
        </div>
      ))}

      <Button
        variant="secondary"
        onClick={handleAddNew}
        className="w-full border-dashed border-slate-700 hover:border-blue-500 py-3"
        icon={<Plus size={16} />}
      >
        Add Work Experience
      </Button>
    </div>
  );
};
