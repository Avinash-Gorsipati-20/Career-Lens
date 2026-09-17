import React, { useEffect, useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { useResume } from './hooks/useResume';
import { Header, NavTab } from './components/layout/Header';
import { DashboardView } from './components/dashboard/DashboardView';
import { ResumeForm } from './components/form/ResumeForm';
import { ResumePreview } from './components/preview/ResumePreview';
import { ProgressTracker } from './components/widgets/ProgressTracker';
import { TemplateSelector } from './components/widgets/TemplateSelector';
import { PortfolioEngine } from './components/portfolio/PortfolioEngine';
import { CareerLensAiView } from './components/career/CareerLensAiView';
import { TargetedResumeView } from './components/targetedResume/TargetedResumeView';
import { JobOpportunitiesView } from './components/career/JobOpportunitiesView';
import { SkillGapRoadmapView } from './components/career/SkillGapRoadmapView';
import { LandingPage } from './components/landing/LandingPage';
import { GoogleLoginPage } from './components/auth/GoogleLoginPage';
import { ResumeImportModal } from './components/widgets/ResumeImportModal';
import { CodeImportModal } from './components/widgets/CodeImportModal';
import { GuidedInputModal } from './components/widgets/GuidedInputModal';
import { AuthModal } from './components/auth/AuthModal';
import { IntegrationPanel } from './components/widgets/IntegrationPanel';
import { AtsScoreCheckerModal } from './components/widgets/AtsScoreCheckerModal';
import { DocumentNameModal } from './components/documents/DocumentNameModal';
import { Eye, Edit3 } from 'lucide-react';
import { pdfService } from './services/pdfService';
import {
  createDocument,
  deleteDocument,
  getDocument,
  updateDocument
} from './services/documentService';
import { uploadProfilePhoto } from './services/userProfileService';
import { storageService } from './services/storageService';
import { DocumentType, SavedDocument } from './types/documents';
import { PortfolioTemplateId, PortfolioThemeId } from './types/portfolio';
import { ResumeData, TemplateId } from './types/resume';

type ActiveCloudDocument = { id: string | null; type: DocumentType | null };
type NameDialogState = {
  type: DocumentType;
  mode: 'new' | 'saveAs';
  contentOverride?: Record<string, unknown>;
} | null;

const isResumeData = (value: unknown): value is ResumeData => Boolean(
  value && typeof value === 'object' && 'personal' in value && 'skills' in value
);

const MainAppContent: React.FC = () => {
  const { user, isAuthenticated, setProfilePhotoUrl } = useAuth();
  const { theme } = useTheme();
  const {
    resumeData,
    selectedTemplate,
    setSelectedTemplate,
    updatePersonal,
    updateSummary,
    addItem,
    updateItem,
    removeItem,
    addSkill,
    clearData,
    importFromJson,
    replaceResumeData,
    validationErrors
  } = useResume();

  const [activeTab, setActiveTab] = useState<NavTab>('dashboard');
  const [mobileTab, setMobileTab] = useState<'editor' | 'preview'>('editor');
  const [activeDocument, setActiveDocument] = useState<ActiveCloudDocument>({ id: null, type: null });
  const [portfolioSettings, setPortfolioSettings] = useState<{ templateId: PortfolioTemplateId; themeId: PortfolioThemeId }>({
    templateId: 'modern',
    themeId: 'ai-cyan'
  });
  const [nameDialog, setNameDialog] = useState<NameDialogState>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [notice, setNotice] = useState<{ tone: 'success' | 'error'; message: string } | null>(null);
  const [isPhotoUploading, setIsPhotoUploading] = useState(false);

  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isImportOpen, setIsImportOpen] = useState(false);
  const [isCodeImportOpen, setIsCodeImportOpen] = useState(false);
  const [isGuidedInputOpen, setIsGuidedInputOpen] = useState(false);
  const [isIntegrationOpen, setIsIntegrationOpen] = useState(false);
  const [isAtsCheckerOpen, setIsAtsCheckerOpen] = useState(false);

  useEffect(() => {
    if (user?.avatarUrl && resumeData.personal.profilePhoto !== user.avatarUrl) {
      updatePersonal({ profilePhoto: user.avatarUrl });
    }
  }, [resumeData.personal.profilePhoto, updatePersonal, user?.avatarUrl]);

  if (!isAuthenticated || !user) return <GoogleLoginPage />;

  const showNotice = (tone: 'success' | 'error', message: string) => {
    setNotice({ tone, message });
    window.setTimeout(() => setNotice(current => current?.message === message ? null : current), 4500);
  };

  const currentContent = (type: DocumentType): Record<string, unknown> => {
    if (type === 'resume') {
      return { resumeData, templateId: selectedTemplate };
    }
    return {
      resumeData,
      templateId: portfolioSettings.templateId,
      themeId: portfolioSettings.themeId
    };
  };

  const documentTypeForActiveTab = (): DocumentType | null => {
    if (activeTab === 'resume') return 'resume';
    if (activeTab === 'portfolio') return 'portfolio';
    return null;
  };

  const saveCurrentDocument = async () => {
    const type = documentTypeForActiveTab();
    if (!type) return;

    if (activeDocument.id && activeDocument.type === type) {
      setIsSaving(true);
      try {
        await updateDocument(user.id, activeDocument.id, currentContent(type));
        showNotice('success', `${type === 'resume' ? 'Resume' : 'Portfolio'} saved successfully`);
      } catch (error) {
        console.error('Unable to save document:', error);
        showNotice('error', type === 'resume'
          ? 'Unable to save your resume. Please try again.'
          : 'Unable to save your portfolio. Please try again.');
      } finally {
        setIsSaving(false);
      }
      return;
    }

    setNameDialog({ type, mode: 'new' });
  };

  const saveCurrentDocumentAs = () => {
    const type = documentTypeForActiveTab();
    if (type) setNameDialog({ type, mode: 'saveAs' });
  };

  const createNamedDocument = async (name: string) => {
    if (!nameDialog) return;
    setIsSaving(true);
    try {
      const content = nameDialog.contentOverride || currentContent(nameDialog.type);
      const documentId = await createDocument({
        userId: user.id,
        type: nameDialog.type,
        name,
        content
      });
      if (!nameDialog.contentOverride) {
        setActiveDocument({ id: documentId, type: nameDialog.type });
      }
      if (nameDialog.type === 'resume' && !nameDialog.contentOverride) {
        // Existing local data is only removed after its cloud save succeeds.
        storageService.clearResumeData();
      }
      setNameDialog(null);
      showNotice('success', `${nameDialog.type === 'resume' ? 'Resume' : 'Portfolio'} saved successfully`);
    } catch (error) {
      console.error('Unable to create document:', error);
      showNotice('error', nameDialog.type === 'resume'
        ? 'Unable to save your resume. Please try again.'
        : 'Unable to save your portfolio. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const openCloudDocument = async (summary: SavedDocument) => {
    try {
      const saved = await getDocument(user.id, summary.id);
      if (!saved) throw new Error('The document no longer exists.');
      const content = saved.content as Record<string, unknown>;
      const savedResumeData = content.resumeData || content.data || content;
      if (!isResumeData(savedResumeData)) throw new Error('The saved document has an invalid format.');

      replaceResumeData(savedResumeData);
      if (saved.type === 'resume') {
        if (typeof content.templateId === 'string') setSelectedTemplate(content.templateId as TemplateId);
        setActiveTab('resume');
      } else {
        setPortfolioSettings({
          templateId: typeof content.templateId === 'string' ? content.templateId as PortfolioTemplateId : portfolioSettings.templateId,
          themeId: typeof content.themeId === 'string' ? content.themeId as PortfolioThemeId : portfolioSettings.themeId
        });
        setActiveTab('portfolio');
      }
      setActiveDocument({ id: saved.id, type: saved.type });
    } catch (error) {
      console.error('Unable to open document:', error);
      showNotice('error', 'Unable to open your document. Please try again.');
      throw error;
    }
  };

  const deleteCloudDocument = async (document: SavedDocument) => {
    await deleteDocument(user.id, document.id);
    if (activeDocument.id === document.id) setActiveDocument({ id: null, type: null });
    showNotice('success', `${document.type === 'resume' ? 'Resume' : 'Portfolio'} deleted successfully`);
  };

  const saveAsCloudDocument = (document: SavedDocument) => {
    setNameDialog({ type: document.type, mode: 'saveAs', contentOverride: document.content });
  };

  const handlePhotoUpload = async (file: File) => {
    setIsPhotoUploading(true);
    try {
      const photoUrl = await uploadProfilePhoto(user.id, file);
      setProfilePhotoUrl(photoUrl);
      updatePersonal({ profilePhoto: photoUrl });
      showNotice('success', 'Profile photo updated successfully');
    } catch (error) {
      console.error('Unable to upload profile photo:', error);
      const message = error instanceof Error ? error.message : 'Unknown upload error';
      showNotice('error', `Unable to upload photo: ${message}`);
    } finally {
      setIsPhotoUploading(false);
    }
  };

  const handleDownloadPdf = () => {
    const fileName = `Resume_${(resumeData.personal.fullName || 'builder').replace(/\s+/g, '_')}.pdf`;
    pdfService.downloadPdf('resume-preview-document', fileName);
  };

  const themeClasses = theme === 'light'
    ? 'bg-slate-50 text-slate-900 selection:bg-blue-600 selection:text-white'
    : theme === 'eye-protection'
      ? 'bg-[#faf6ed] text-[#2c2825] selection:bg-amber-600 selection:text-white'
      : 'bg-slate-950 text-slate-100 selection:bg-cyan-500 selection:text-slate-950';

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-200 ${themeClasses}`}>
      <Header
        activeTab={activeTab}
        onTabChange={setActiveTab}
        selectedTemplate={selectedTemplate}
        onSelectTemplate={setSelectedTemplate}
        saveStatus={isSaving ? 'saving' : 'idle'}
        lastSavedTime={null}
        resumeData={resumeData}
        onClear={() => { clearData(); setActiveDocument({ id: null, type: null }); }}
        onImportJson={json => { const result = importFromJson(json); if (!result.success) showNotice('error', result.error || 'Unable to import resume data.'); }}
        onOpenIntegration={() => setIsIntegrationOpen(true)}
        onOpenAtsChecker={() => setIsAtsCheckerOpen(true)}
        onOpenAuthModal={() => setIsAuthOpen(true)}
        onSaveDocument={() => void saveCurrentDocument()}
        onSaveDocumentAs={saveCurrentDocumentAs}
      />

      {notice && <div className={`fixed top-20 right-4 z-50 max-w-sm px-4 py-3 rounded-xl border text-sm shadow-xl ${notice.tone === 'success' ? 'bg-emerald-950 border-emerald-700 text-emerald-100' : 'bg-rose-950 border-rose-700 text-rose-100'}`}>{notice.message}</div>}

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 space-y-6">
        {activeTab === 'landing' && <LandingPage onStartBuilding={() => setActiveTab('resume')} onExploreCareer={() => setActiveTab('career')} />}
        {activeTab === 'dashboard' && <DashboardView
          data={resumeData}
          onNavigate={setActiveTab}
          onOpenDocument={openCloudDocument}
          onSaveAsDocument={saveAsCloudDocument}
          onDeleteDocument={deleteCloudDocument}
          onOpenImport={() => setIsImportOpen(true)}
          onOpenCodeImport={() => setIsCodeImportOpen(true)}
          onOpenGuidedInput={() => setIsGuidedInputOpen(true)}
          onOpenIntegration={() => setIsIntegrationOpen(true)}
          onOpenAtsChecker={() => setIsAtsCheckerOpen(true)}
        />}
        {activeTab === 'resume' && <div className="space-y-6 animate-fadeIn">
          <ProgressTracker resumeData={resumeData} />
          <TemplateSelector selectedTemplate={selectedTemplate} onSelectTemplate={setSelectedTemplate} />
          <div className="flex md:hidden bg-slate-900 p-1 rounded-lg border border-slate-800"><button onClick={() => setMobileTab('editor')} className={`flex-1 py-2 text-xs font-semibold rounded-md flex items-center justify-center gap-1.5 ${mobileTab === 'editor' ? 'bg-blue-600 text-white' : 'text-slate-400'}`}><Edit3 size={14} /> Resume Form</button><button onClick={() => setMobileTab('preview')} className={`flex-1 py-2 text-xs font-semibold rounded-md flex items-center justify-center gap-1.5 ${mobileTab === 'preview' ? 'bg-blue-600 text-white' : 'text-slate-400'}`}><Eye size={14} /> Paper Preview</button></div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start"><div className={`lg:col-span-6 space-y-4 ${mobileTab === 'preview' ? 'hidden lg:block' : 'block'}`}><ResumeForm resumeData={resumeData} updatePersonal={updatePersonal} updateSummary={updateSummary} addItem={addItem} updateItem={updateItem} removeItem={removeItem} addSkill={addSkill} validationErrors={validationErrors} profilePhotoUrl={user.avatarUrl} isPhotoUploading={isPhotoUploading} onPhotoUpload={file => void handlePhotoUpload(file)} /></div><div className={`lg:col-span-6 lg:sticky lg:top-24 h-[85vh] ${mobileTab === 'editor' ? 'hidden lg:block' : 'block'}`}><ResumePreview data={resumeData} templateId={selectedTemplate} /></div></div>
        </div>}
        {activeTab === 'targeted' && <TargetedResumeView data={resumeData} onAddSkill={skill => addSkill(skill)} />}
        {activeTab === 'portfolio' && <PortfolioEngine data={resumeData} onDownloadPdf={handleDownloadPdf} initialTemplateId={portfolioSettings.templateId} initialThemeId={portfolioSettings.themeId} onSettingsChange={setPortfolioSettings} onSave={() => void saveCurrentDocument()} onSaveAs={saveCurrentDocumentAs} />}
        {activeTab === 'career' && <CareerLensAiView data={resumeData} onNavigateToTargeted={() => setActiveTab('targeted')} onNavigateToRoadmap={() => setActiveTab('roadmap')} />}
        {activeTab === 'jobs' && <JobOpportunitiesView />}
        {activeTab === 'roadmap' && <SkillGapRoadmapView data={resumeData} onAddSkill={skill => addSkill(skill)} />}
      </main>

      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
      <ResumeImportModal isOpen={isImportOpen} onClose={() => setIsImportOpen(false)} onImportComplete={data => { importFromJson(JSON.stringify(data)); setActiveDocument({ id: null, type: null }); }} />
      <CodeImportModal isOpen={isCodeImportOpen} onClose={() => setIsCodeImportOpen(false)} onImportSuccess={text => updateSummary(text.slice(0, 300))} />
      <GuidedInputModal isOpen={isGuidedInputOpen} onClose={() => setIsGuidedInputOpen(false)} onAddSkills={skills => skills.forEach(skill => addSkill(skill))} />
      <IntegrationPanel resumeData={resumeData} isOpen={isIntegrationOpen} onClose={() => setIsIntegrationOpen(false)} />
      <AtsScoreCheckerModal resumeData={resumeData} isOpen={isAtsCheckerOpen} onClose={() => setIsAtsCheckerOpen(false)} onAddSkill={skill => addSkill(skill)} />
      {nameDialog && <DocumentNameModal isOpen type={nameDialog.type} mode={nameDialog.mode} isSaving={isSaving} onClose={() => setNameDialog(null)} onConfirm={createNamedDocument} />}
    </div>
  );
};

export const App: React.FC = () => <ThemeProvider><AuthProvider><MainAppContent /></AuthProvider></ThemeProvider>;

export default App;
