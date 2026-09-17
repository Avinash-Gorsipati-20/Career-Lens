import React from 'react';
import { LeadershipActivity } from '../../types/resume';
import { Input } from '../ui/Input';
import { TextArea } from '../ui/TextArea';
import { Button } from '../ui/Button';
import { Plus, Trash2, Users } from 'lucide-react';

interface LeadershipActivitiesFormProps {
  activities: LeadershipActivity[];
  onAdd: (activity: LeadershipActivity) => void;
  onUpdate: (id: string, activity: Partial<LeadershipActivity>) => void;
  onRemove: (id: string) => void;
}

export const LeadershipActivitiesForm: React.FC<LeadershipActivitiesFormProps> = ({ activities, onAdd, onUpdate, onRemove }) => (
  <div className="space-y-4">
    {activities.map((item, index) => (
      <div key={item.id} className="p-4 bg-slate-900/40 border border-slate-800 rounded-xl space-y-3">
        <div className="flex justify-between items-center pb-2 border-b border-slate-800/60">
          <span className="text-xs font-semibold text-blue-400 flex items-center gap-1.5 uppercase tracking-wider">
            <Users size={14} /> Leadership / Activity #{index + 1}
          </span>
          <Button variant="danger" size="sm" onClick={() => onRemove(item.id)} icon={<Trash2 size={14} />}>Remove</Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="md:col-span-2">
            <Input label="Role / Activity Title *" placeholder="e.g. President, Computer Science Club" value={item.title} onChange={e => onUpdate(item.id, { title: e.target.value })} />
          </div>
          <Input label="Year / Date" placeholder="e.g. 2024" value={item.date || ''} onChange={e => onUpdate(item.id, { date: e.target.value })} />
        </div>
        <TextArea label="Description" placeholder="Describe your leadership, contribution, or community activity..." value={item.description} onChange={e => onUpdate(item.id, { description: e.target.value })} rows={2} />
      </div>
    ))}
    <Button variant="secondary" onClick={() => onAdd({ id: `lead-${Date.now()}`, title: '', description: '', date: '' })} className="w-full border-dashed border-slate-700 hover:border-blue-500 py-3" icon={<Plus size={16} />}>
      Add Leadership & Activity
    </Button>
  </div>
);
