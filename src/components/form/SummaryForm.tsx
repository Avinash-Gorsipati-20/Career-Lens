import React from 'react';
import { TextArea } from '../ui/TextArea';

interface SummaryFormProps {
  summary: string;
  onChange: (summary: string) => void;
}

export const SummaryForm: React.FC<SummaryFormProps> = ({ summary, onChange }) => {
  return (
    <div className="space-y-3">
      <TextArea
        label="Professional Summary"
        placeholder="Write a compelling 3-4 sentence overview of your technical background, key accomplishments, core competencies, and career goals..."
        value={summary}
        onChange={e => onChange(e.target.value)}
        rows={6}
        helperText="A strong summary introduces your technical stack, years of experience, and key value proposition."
      />
    </div>
  );
};
