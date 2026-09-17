import React, { useState } from 'react';
import { Interest } from '../../types/resume';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Plus, Heart } from 'lucide-react';

interface InterestsFormProps {
  interests: Interest[];
  onAdd: (interest: Interest) => void;
  onRemove: (id: string) => void;
}

export const InterestsForm: React.FC<InterestsFormProps> = ({
  interests,
  onAdd,
  onRemove
}) => {
  const [newInterest, setNewInterest] = useState('');

  const handleAdd = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (newInterest.trim()) {
      onAdd({
        id: `int-${Date.now()}`,
        name: newInterest.trim()
      });
      setNewInterest('');
    }
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleAdd} className="flex gap-2 items-end">
        <div className="flex-1">
          <Input
            label="Interest / Hobby"
            placeholder="e.g. Open Source, Cloud Architecture, AI Ethics, Chess"
            value={newInterest}
            onChange={e => setNewInterest(e.target.value)}
            icon={<Heart size={16} />}
          />
        </div>
        <Button type="submit" variant="primary" icon={<Plus size={16} />}>
          Add
        </Button>
      </form>

      <div className="p-4 bg-slate-900/40 border border-slate-800 rounded-xl space-y-2">
        <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
          Added Interests ({interests.length})
        </h4>
        {interests.length === 0 ? (
          <p className="text-xs text-slate-500 italic">No interests added yet.</p>
        ) : (
          <div className="flex flex-wrap gap-2 pt-1">
            {interests.map(item => (
              <Badge
                key={item.id}
                variant="slate"
                onRemove={() => onRemove(item.id)}
              >
                {item.name}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
