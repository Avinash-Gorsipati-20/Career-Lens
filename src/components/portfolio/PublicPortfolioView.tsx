import React, { useEffect, useState } from 'react';
import { getPublicPortfolio } from '../../services/documentService';
import { PortfolioTemplateId, PortfolioThemeId } from '../../types/portfolio';
import { ResumeData } from '../../types/resume';
import { PortfolioEngine } from './PortfolioEngine';

export const PublicPortfolioView: React.FC<{ slug: string }> = ({ slug }) => {
  const [data, setData] = useState<{ resumeData: ResumeData; templateId: PortfolioTemplateId; themeId: PortfolioThemeId } | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    getPublicPortfolio(slug).then(result => {
      const content = result?.content;
      if (content?.resumeData?.personal) {
        setData({
          resumeData: { ...content.resumeData, leadershipActivities: content.resumeData.leadershipActivities || [] },
          templateId: content.templateId || 'modern',
          themeId: content.themeId || 'ai-cyan'
        });
      } else {
        setError(true);
      }
    }).catch(() => setError(true));
  }, [slug]);

  if (error) return <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6"><p>This portfolio link is unavailable.</p></main>;
  if (!data) return <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6"><p>Loading portfolio...</p></main>;

  return <main className="min-h-screen bg-slate-950 p-4 sm:p-8"><PortfolioEngine data={data.resumeData} initialTemplateId={data.templateId} initialThemeId={data.themeId} publicView /></main>;
};