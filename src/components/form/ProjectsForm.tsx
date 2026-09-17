import React, { useState } from 'react';
import { Project } from '../../types/resume';
import { Input } from '../ui/Input';
import { TextArea } from '../ui/TextArea';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Plus, Trash2, FolderGit2, Github, ExternalLink } from 'lucide-react';

interface ProjectsFormProps {
  projects: Project[];
  onAdd: (proj: Project) => void;
  onUpdate: (id: string, proj: Partial<Project>) => void;
  onRemove: (id: string) => void;
}

export const ProjectsForm: React.FC<ProjectsFormProps> = ({
  projects,
  onAdd,
  onUpdate,
  onRemove
}) => {
  const [techInput, setTechInput] = useState<Record<string, string>>({});

  const handleAddNew = () => {
    onAdd({
      id: `proj-${Date.now()}`,
      name: '',
      description: '',
      technologies: [],
      githubLink: '',
      liveDemo: ''
    });
  };

  const handleAddTech = (projId: string, currentTechs: string[]) => {
    const val = techInput[projId]?.trim();
    if (val && !currentTechs.includes(val)) {
      onUpdate(projId, { technologies: [...currentTechs, val] });
      setTechInput(prev => ({ ...prev, [projId]: '' }));
    }
  };

  const handleRemoveTech = (projId: string, currentTechs: string[], techToRemove: string) => {
    onUpdate(projId, {
      technologies: currentTechs.filter(t => t !== techToRemove)
    });
  };

  return (
    <div className="space-y-4">
      {projects.map((item, index) => (
        <div key={item.id} className="p-4 bg-slate-900/40 border border-slate-800 rounded-xl space-y-3">
          <div className="flex justify-between items-center pb-2 border-b border-slate-800/60">
            <span className="text-xs font-semibold text-blue-400 flex items-center gap-1.5 uppercase tracking-wider">
              <FolderGit2 size={14} /> Project #{index + 1}
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

          <Input
            label="Project Name *"
            placeholder="e.g. AI Resume & Portfolio Suite"
            value={item.name}
            onChange={e => onUpdate(item.id, { name: e.target.value })}
          />

          <TextArea
            label="Description *"
            placeholder="Describe what the project accomplishes, problem solved, architecture used..."
            value={item.description}
            onChange={e => onUpdate(item.id, { description: e.target.value })}
            rows={3}
          />

          {/* Technologies Tag Manager */}
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Technologies Used
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="e.g. React, TypeScript, Docker (press Enter)"
                value={techInput[item.id] || ''}
                onChange={e => setTechInput({ ...techInput, [item.id]: e.target.value })}
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddTech(item.id, item.technologies || []);
                  }
                }}
                className="flex-1 bg-slate-900 border border-slate-700 text-slate-100 placeholder-slate-500 rounded-lg text-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              />
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={() => handleAddTech(item.id, item.technologies || [])}
              >
                Add Tech
              </Button>
            </div>
            <div className="flex flex-wrap gap-1.5 mt-2">
              {(item.technologies || []).map(tech => (
                <Badge
                  key={tech}
                  variant="purple"
                  onRemove={() => handleRemoveTech(item.id, item.technologies, tech)}
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Input
              label="GitHub Repository Link"
              placeholder="https://github.com/user/project"
              value={item.githubLink}
              onChange={e => onUpdate(item.id, { githubLink: e.target.value })}
              icon={<Github size={15} />}
            />
            <Input
              label="Live Demo Link"
              placeholder="https://myproject.demo.com"
              value={item.liveDemo}
              onChange={e => onUpdate(item.id, { liveDemo: e.target.value })}
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
        Add Project
      </Button>
    </div>
  );
};
