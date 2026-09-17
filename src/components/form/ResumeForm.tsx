import React, { useState } from 'react';
import { ResumeData, PersonalInfo, Education, Skill, Experience, Project, Certification, Achievement, Language, Interest, ValidationErrors } from '../../types/resume';
import { PersonalForm } from './PersonalForm';
import { SummaryForm } from './SummaryForm';
import { EducationForm } from './EducationForm';
import { SkillsForm } from './SkillsForm';
import { ExperienceForm } from './ExperienceForm';
import { ProjectsForm } from './ProjectsForm';
import { CertificationsForm } from './CertificationsForm';
import { AchievementsForm } from './AchievementsForm';
import { LanguagesForm } from './LanguagesForm';
import { InterestsForm } from './InterestsForm';
import { LeadershipActivitiesForm } from './LeadershipActivitiesForm';
import { Card } from '../ui/Card';
import { User, FileText, GraduationCap, Code, Briefcase, FolderGit2, Award, Trophy, Languages, Heart, Users, CheckCircle2 } from 'lucide-react';

interface ResumeFormProps {
  resumeData: ResumeData;
  updatePersonal: (fields: Partial<PersonalInfo>) => void;
  updateSummary: (summary: string) => void;
  addItem: <K extends keyof ResumeData>(section: K, item: any) => void;
  updateItem: <K extends keyof ResumeData>(section: K, id: string, updatedFields: any) => void;
  removeItem: <K extends keyof ResumeData>(section: K, id: string) => void;
  addSkill: (name: string, category: Skill['category'], level?: Skill['level']) => void;
  validationErrors?: ValidationErrors;
  profilePhotoUrl?: string;
  isPhotoUploading?: boolean;
  onPhotoUpload?: (file: File) => void;
}

export const ResumeForm: React.FC<ResumeFormProps> = ({
  resumeData,
  updatePersonal,
  updateSummary,
  addItem,
  updateItem,
  removeItem,
  addSkill,
  validationErrors = {},
  profilePhotoUrl,
  isPhotoUploading,
  onPhotoUpload
}) => {
  const [activeTab, setActiveTab] = useState<string>('personal');

  const tabs = [
    { id: 'personal', label: 'Personal Details', icon: <User size={16} />, isComplete: Boolean(resumeData.personal.fullName && resumeData.personal.email) },
    { id: 'summary', label: 'Summary', icon: <FileText size={16} />, isComplete: Boolean(resumeData.summary) },
    { id: 'education', label: 'Education', icon: <GraduationCap size={16} />, count: resumeData.education.length, isComplete: resumeData.education.length > 0 },
    { id: 'skills', label: 'Skills', icon: <Code size={16} />, count: resumeData.skills.length, isComplete: resumeData.skills.length >= 3 },
    { id: 'experience', label: 'Experience', icon: <Briefcase size={16} />, count: resumeData.experience.length, isComplete: resumeData.experience.length > 0 },
    { id: 'projects', label: 'Projects', icon: <FolderGit2 size={16} />, count: resumeData.projects.length, isComplete: resumeData.projects.length > 0 },
    { id: 'certifications', label: 'Certifications', icon: <Award size={16} />, count: resumeData.certifications.length, isComplete: resumeData.certifications.length > 0 },
    { id: 'achievements', label: 'Achievements', icon: <Trophy size={16} />, count: resumeData.achievements.length, isComplete: resumeData.achievements.length > 0 },
    { id: 'leadershipActivities', label: 'Leadership & Activities', icon: <Users size={16} />, count: resumeData.leadershipActivities.length, isComplete: resumeData.leadershipActivities.length > 0 },
    { id: 'languages', label: 'Languages', icon: <Languages size={16} />, count: resumeData.languages.length, isComplete: resumeData.languages.length > 0 },
    { id: 'interests', label: 'Interests', icon: <Heart size={16} />, count: resumeData.interests.length, isComplete: resumeData.interests.length > 0 },
  ];

  const currentTabInfo = tabs.find(t => t.id === activeTab) || tabs[0];

  return (
    <div className="space-y-4">
      {/* Horizontal Nav Bar for Form Sections */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none border-b border-slate-800">
        {tabs.map(tab => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-3 py-2 text-xs font-semibold rounded-lg whitespace-nowrap transition-all ${
              activeTab === tab.id
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                : 'bg-slate-900/60 text-slate-400 hover:bg-slate-800 hover:text-slate-200 border border-slate-800'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
            {tab.count !== undefined && (
              <span className={`px-1.5 py-0.5 text-[10px] rounded-full ${
                activeTab === tab.id ? 'bg-blue-700 text-white' : 'bg-slate-800 text-slate-400'
              }`}>
                {tab.count}
              </span>
            )}
            {tab.isComplete && activeTab !== tab.id && (
              <CheckCircle2 size={11} className="text-emerald-400 shrink-0" />
            )}
          </button>
        ))}
      </div>

      {/* Active Form Section Container */}
      <Card
        title={currentTabInfo.label}
        subtitle="Fill in your accurate details to update the live resume template preview in real-time."
        icon={currentTabInfo.icon}
      >
        {activeTab === 'personal' && (
          <PersonalForm
            personal={resumeData.personal}
            onChange={updatePersonal}
            errors={validationErrors}
            profilePhotoUrl={profilePhotoUrl}
            isPhotoUploading={isPhotoUploading}
            onPhotoUpload={onPhotoUpload}
          />
        )}

        {activeTab === 'summary' && (
          <SummaryForm
            summary={resumeData.summary}
            onChange={updateSummary}
          />
        )}

        {activeTab === 'education' && (
          <EducationForm
            education={resumeData.education}
            onAdd={edu => addItem('education', edu)}
            onUpdate={(id, fields) => updateItem('education', id, fields)}
            onRemove={id => removeItem('education', id)}
          />
        )}

        {activeTab === 'skills' && (
          <SkillsForm
            skills={resumeData.skills}
            onAddSkill={addSkill}
            onUpdateSkill={(id, fields) => updateItem('skills', id, fields)}
            onRemoveSkill={id => removeItem('skills', id)}
            errors={validationErrors}
          />
        )}

        {activeTab === 'experience' && (
          <ExperienceForm
            experience={resumeData.experience}
            onAdd={exp => addItem('experience', exp)}
            onUpdate={(id, fields) => updateItem('experience', id, fields)}
            onRemove={id => removeItem('experience', id)}
          />
        )}

        {activeTab === 'projects' && (
          <ProjectsForm
            projects={resumeData.projects}
            onAdd={proj => addItem('projects', proj)}
            onUpdate={(id, fields) => updateItem('projects', id, fields)}
            onRemove={id => removeItem('projects', id)}
          />
        )}

        {activeTab === 'certifications' && (
          <CertificationsForm
            certifications={resumeData.certifications}
            onAdd={cert => addItem('certifications', cert)}
            onUpdate={(id, fields) => updateItem('certifications', id, fields)}
            onRemove={id => removeItem('certifications', id)}
          />
        )}

        {activeTab === 'achievements' && (
          <AchievementsForm
            achievements={resumeData.achievements}
            onAdd={ach => addItem('achievements', ach)}
            onUpdate={(id, fields) => updateItem('achievements', id, fields)}
            onRemove={id => removeItem('achievements', id)}
          />
        )}

        {activeTab === 'leadershipActivities' && (
          <LeadershipActivitiesForm
            activities={resumeData.leadershipActivities}
            onAdd={activity => addItem('leadershipActivities', activity)}
            onUpdate={(id, fields) => updateItem('leadershipActivities', id, fields)}
            onRemove={id => removeItem('leadershipActivities', id)}
          />
        )}

        {activeTab === 'languages' && (
          <LanguagesForm
            languages={resumeData.languages}
            onAdd={lang => addItem('languages', lang)}
            onUpdate={(id, fields) => updateItem('languages', id, fields)}
            onRemove={id => removeItem('languages', id)}
          />
        )}

        {activeTab === 'interests' && (
          <InterestsForm
            interests={resumeData.interests}
            onAdd={int => addItem('interests', int)}
            onRemove={id => removeItem('interests', id)}
          />
        )}
      </Card>
    </div>
  );
};
