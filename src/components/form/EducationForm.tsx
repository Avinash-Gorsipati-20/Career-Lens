import React from 'react';
import { Education } from '../../types/resume';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Plus, Trash2, GraduationCap } from 'lucide-react';

interface EducationFormProps {
  education: Education[];
  onAdd: (edu: Education) => void;
  onUpdate: (id: string, edu: Partial<Education>) => void;
  onRemove: (id: string) => void;
}

export const EducationForm: React.FC<EducationFormProps> = ({
  education,
  onAdd,
  onUpdate,
  onRemove
}) => {
  const handleAddNew = () => {
    onAdd({
      id: `edu-${Date.now()}`,
      institution: '',
      degree: '',
      branch: '',
      cgpa: '',
      startYear: '',
      endYear: ''
    });
  };

  return (
    <div className="space-y-4">
      {education.map((item, index) => (
        <div key={item.id} className="p-4 bg-slate-900/40 border border-slate-800 rounded-xl space-y-3 relative group">
          <div className="flex justify-between items-center pb-2 border-b border-slate-800/60">
            <span className="text-xs font-semibold text-blue-400 flex items-center gap-1.5 uppercase tracking-wider">
              <GraduationCap size={14} /> Education #{index + 1}
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
              label="Institution / University *"
              placeholder="e.g. Stanford University"
              value={item.institution}
              onChange={e => onUpdate(item.id, { institution: e.target.value })}
            />
            <Input
              label="Degree *"
              placeholder="e.g. Bachelor of Science"
              value={item.degree}
              onChange={e => onUpdate(item.id, { degree: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <Input
              label="Branch / Major"
              placeholder="e.g. Computer Science & Eng"
              value={item.branch}
              onChange={e => onUpdate(item.id, { branch: e.target.value })}
            />
            <Input
              label="CGPA / Percentage"
              placeholder="e.g. 3.9 / 4.0 or 88%"
              value={item.cgpa}
              onChange={e => onUpdate(item.id, { cgpa: e.target.value })}
            />
            <div className="grid grid-cols-2 gap-2">
              <Input
                label="Start Year"
                placeholder="2020"
                value={item.startYear}
                onChange={e => onUpdate(item.id, { startYear: e.target.value })}
              />
              <Input
                label="End Year"
                placeholder="2024"
                value={item.endYear}
                onChange={e => onUpdate(item.id, { endYear: e.target.value })}
              />
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
        Add Education Entry
      </Button>
    </div>
  );
};
