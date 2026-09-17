import React, { useRef } from 'react';
import { PersonalInfo, ValidationErrors } from '../../types/resume';
import { Input } from '../ui/Input';
import { User, Briefcase, Mail, Phone, MapPin, Linkedin, Github, Globe, Image } from 'lucide-react';

interface PersonalFormProps {
  personal: PersonalInfo;
  onChange: (fields: Partial<PersonalInfo>) => void;
  errors?: ValidationErrors;
  profilePhotoUrl?: string;
  isPhotoUploading?: boolean;
  onPhotoUpload?: (file: File) => void;
}

export const PersonalForm: React.FC<PersonalFormProps> = ({
  personal,
  onChange,
  errors = {},
  profilePhotoUrl,
  isPhotoUploading = false,
  onPhotoUpload
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const displayedPhotoUrl = profilePhotoUrl || personal.profilePhoto;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Full Name *"
          placeholder="e.g. Alex Rivera"
          value={personal.fullName}
          onChange={e => onChange({ fullName: e.target.value })}
          error={errors.fullName}
          icon={<User size={16} />}
        />
        <Input
          label="Professional Title *"
          placeholder="e.g. Senior Full-Stack Software Engineer"
          value={personal.title}
          onChange={e => onChange({ title: e.target.value })}
          icon={<Briefcase size={16} />}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Email Address *"
          type="email"
          placeholder="e.g. alex.rivera@example.com"
          value={personal.email}
          onChange={e => onChange({ email: e.target.value })}
          error={errors.email}
          icon={<Mail size={16} />}
        />
        <Input
          label="Phone Number *"
          placeholder="e.g. +1 (555) 234-5678"
          value={personal.phone}
          onChange={e => onChange({ phone: e.target.value })}
          error={errors.phone}
          icon={<Phone size={16} />}
        />
      </div>

      <Input
        label="Address / Location"
        placeholder="e.g. San Francisco, CA, USA"
        value={personal.address}
        onChange={e => onChange({ address: e.target.value })}
        icon={<MapPin size={16} />}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Input
          label="LinkedIn URL"
          placeholder="https://linkedin.com/in/username"
          value={personal.linkedin}
          onChange={e => onChange({ linkedin: e.target.value })}
          error={errors.linkedin}
          icon={<Linkedin size={16} />}
        />
        <Input
          label="GitHub URL"
          placeholder="https://github.com/username"
          value={personal.github}
          onChange={e => onChange({ github: e.target.value })}
          error={errors.github}
          icon={<Github size={16} />}
        />
        <Input
          label="Portfolio / Website"
          placeholder="https://yourportfolio.dev"
          value={personal.portfolio}
          onChange={e => onChange({ portfolio: e.target.value })}
          error={errors.portfolio}
          icon={<Globe size={16} />}
        />
      </div>

      <div className="p-4 bg-slate-950/40 border border-slate-800 rounded-xl flex flex-col sm:flex-row sm:items-center gap-4">
        {displayedPhotoUrl ? (
          <img src={displayedPhotoUrl} alt="Profile" className="w-14 h-14 rounded-xl object-cover border border-slate-700" />
        ) : (
          <div className="w-14 h-14 rounded-xl bg-slate-800 text-slate-400 flex items-center justify-center"><Image size={22} /></div>
        )}
        <div className="flex-1 space-y-1">
          <p className="text-sm font-semibold text-slate-200">Profile photo</p>
          <p className="text-xs text-slate-400">Stored securely in your Firebase Storage profile folder. JPG, PNG, or WEBP up to 5 MB.</p>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp"
          className="hidden"
          onChange={event => {
            const file = event.target.files?.[0];
            if (file) onPhotoUpload?.(file);
            event.currentTarget.value = '';
          }}
        />
        <button
          type="button"
          disabled={!onPhotoUpload || isPhotoUploading}
          onClick={() => fileInputRef.current?.click()}
          className="px-3 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-60 border border-slate-700 rounded-xl text-xs font-bold text-slate-100"
        >
          {isPhotoUploading ? 'Uploading…' : displayedPhotoUrl ? 'Replace photo' : 'Upload photo'}
        </button>
      </div>
    </div>
  );
};
