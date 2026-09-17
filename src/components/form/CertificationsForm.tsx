import React from 'react';
import { Certification } from '../../types/resume';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Plus, Trash2, Award, ExternalLink } from 'lucide-react';

interface CertificationsFormProps {
  certifications: Certification[];
  onAdd: (cert: Certification) => void;
  onUpdate: (id: string, cert: Partial<Certification>) => void;
  onRemove: (id: string) => void;
}

export const CertificationsForm: React.FC<CertificationsFormProps> = ({
  certifications,
  onAdd,
  onUpdate,
  onRemove
}) => {
  const handleAddNew = () => {
    onAdd({
      id: `cert-${Date.now()}`,
      title: '',
      issuer: '',
      date: '',
      link: ''
    });
  };

  return (
    <div className="space-y-4">
      {certifications.map((item, index) => (
        <div key={item.id} className="p-4 bg-slate-900/40 border border-slate-800 rounded-xl space-y-3">
          <div className="flex justify-between items-center pb-2 border-b border-slate-800/60">
            <span className="text-xs font-semibold text-blue-400 flex items-center gap-1.5 uppercase tracking-wider">
              <Award size={14} /> Certification #{index + 1}
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
              label="Certification Title *"
              placeholder="e.g. AWS Solutions Architect"
              value={item.title}
              onChange={e => onUpdate(item.id, { title: e.target.value })}
            />
            <Input
              label="Issuing Organization *"
              placeholder="e.g. Amazon Web Services"
              value={item.issuer}
              onChange={e => onUpdate(item.id, { issuer: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Input
              label="Issue Date / Year"
              placeholder="e.g. 2023"
              value={item.date}
              onChange={e => onUpdate(item.id, { date: e.target.value })}
            />
            <Input
              label="Credential URL"
              placeholder="https://credential.provider.com/verify"
              value={item.link || ''}
              onChange={e => onUpdate(item.id, { link: e.target.value })}
              icon={<ExternalLink size={15} />}
            />
          </div>
        </div>
      ))}

      <Button
        variant="secondary"
        onClick={handleAddNew}
        className="w-full border-dashed border-slate-700 hover:border-blue-500 py-3"
        icon={<Plus size={16} />}
      >
        Add Certification
      </Button>
    </div>
  );
};
