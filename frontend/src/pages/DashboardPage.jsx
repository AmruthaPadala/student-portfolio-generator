import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { Navbar } from '../components/Navbar';
import { Toast } from '../components/Toast';
import { DashboardStats } from '../components/DashboardStats';
import { EducationModal } from '../components/EducationModal';
import { SkillModal } from '../components/SkillModal';
import { ProjectModal } from '../components/ProjectModal';
import { AchievementModal } from '../components/AchievementModal';
import { ConfirmationModal } from '../components/ConfirmationModal';
import { PortfolioRenderer } from '../components/PortfolioRenderer';
import {
  LayoutDashboard, User, GraduationCap, Wrench, FolderGit2, Trophy,
  Palette, Plus, Edit2, Trash2, ExternalLink, Globe, Lock, Save,
  CheckCircle, Smartphone, Tablet, Monitor, RefreshCw, Star, MapPin,
  Mail, Phone, Github, Linkedin, AlertCircle, Eye
} from 'lucide-react';

export const DashboardPage = () => {
  const { user, updateUser, refreshUser } = useAuth();

  // Active navigation tab: 'overview', 'profile', 'education', 'skills', 'projects', 'achievements', 'preview'
  const [activeTab, setActiveTab] = useState('overview');

  // State data
  const [profile, setProfile] = useState({
    fullName: '',
    headline: '',
    bio: '',
    phone: '',
    location: '',
    githubUrl: '',
    linkedinUrl: '',
    websiteUrl: '',
    avatarUrl: '',
  });

  const [educations, setEducations] = useState([]);
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [settings, setSettings] = useState({
    slug: '',
    isPublic: true,
    themeTemplate: 'MODERN',
    accentColor: 'indigo',
    showContactInfo: true,
    showGrades: true,
    customTagline: '',
  });

  const [previewData, setPreviewData] = useState(null);
  const [previewDevice, setPreviewDevice] = useState('desktop'); // desktop, tablet, mobile
  const [activeSkillCategory, setActiveSkillCategory] = useState('ALL'); // ALL, TECHNICAL, SOFT

  // Modals state
  const [modalState, setModalState] = useState({
    education: { open: false, data: null },
    skill: { open: false, data: null, defaultCategory: 'TECHNICAL' },
    project: { open: false, data: null },
    achievement: { open: false, data: null },
    deleteConfirm: { open: false, type: null, id: null, title: '' },
  });

  // UI state
  const [loading, setLoading] = useState(true);
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingSettings, setSavingSettings] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (type, message, title) => {
    setToast({ type, message, title });
    setTimeout(() => setToast(null), 4000);
  };

  // Initial Data Fetch
  const fetchAllData = async () => {
    try {
      const [profData, eduData, skillData, projData, achData, settData, prevData] =
        await Promise.all([
          api.profile.get(),
          api.education.getAll(),
          api.skills.getAll(),
          api.projects.getAll(),
          api.achievements.getAll(),
          api.portfolio.getSettings(),
          api.portfolio.getPreview(),
        ]);

      setProfile(profData);
      setEducations(eduData);
      setSkills(skillData);
      setProjects(projData);
      setAchievements(achData);
      setSettings(settData);
      setPreviewData(prevData);

      if (profData?.fullName) {
        updateUser({ fullName: profData.fullName, slug: settData?.slug });
      }
    } catch (err) {
      showToast('error', err.message || 'Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  // Refresh preview data
  const refreshPreview = async () => {
    try {
      const prevData = await api.portfolio.getPreview();
      setPreviewData(prevData);
    } catch (err) {
      console.error('Failed to refresh preview:', err);
    }
  };

  // Profile Save
  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setSavingProfile(true);
    try {
      const updated = await api.profile.update(profile);
      setProfile(updated);
      updateUser({ fullName: updated.fullName });
      showToast('success', 'Profile updated successfully!');
      refreshPreview();
    } catch (err) {
      showToast('error', err.message || 'Failed to update profile');
    } finally {
      setSavingProfile(false);
    }
  };

  // Portfolio Settings Save
  const handleSaveSettings = async (customSettings = null) => {
    const toSave = customSettings || settings;
    setSavingSettings(true);
    try {
      const updated = await api.portfolio.updateSettings(toSave);
      setSettings(updated);
      updateUser({ slug: updated.slug });
      showToast('success', 'Portfolio settings saved!');
      refreshPreview();
    } catch (err) {
      showToast('error', err.message || 'Failed to update portfolio settings');
    } finally {
      setSavingSettings(false);
    }
  };

  // Toggle Public Access
  const handleTogglePublic = async () => {
    const newStatus = !settings.isPublic;
    const newSettings = { ...settings, isPublic: newStatus };
    setSettings(newSettings);
    try {
      await api.portfolio.updateSettings(newSettings);
      showToast(
        'success',
        newStatus ? 'Public access enabled! Anyone with the link can view your portfolio.' : 'Portfolio is now private.'
      );
      refreshPreview();
    } catch (err) {
      setSettings(settings); // rollback
      showToast('error', err.message || 'Failed to change public status');
    }
  };

  // Load realistic sample data
  const handleLoadSampleData = async () => {
    const data = await api.portfolio.loadSampleData();
    setPreviewData(data);
    await fetchAllData();
  };

  // CRUD: Education
  const handleSaveEducation = async (formData) => {
    try {
      if (modalState.education.data) {
        await api.education.update(modalState.education.data.id, formData);
        showToast('success', 'Education record updated!');
      } else {
        await api.education.create(formData);
        showToast('success', 'Education record added!');
      }
      setModalState((prev) => ({ ...prev, education: { open: false, data: null } }));
      const edus = await api.education.getAll();
      setEducations(edus);
      refreshPreview();
    } catch (err) {
      showToast('error', err.message || 'Failed to save education record');
    }
  };

  // CRUD: Skill
  const handleSaveSkill = async (formData) => {
    try {
      if (modalState.skill.data) {
        await api.skills.update(modalState.skill.data.id, formData);
        showToast('success', 'Skill updated!');
      } else {
        await api.skills.create(formData);
        showToast('success', 'Skill added!');
      }
      setModalState((prev) => ({ ...prev, skill: { open: false, data: null, defaultCategory: 'TECHNICAL' } }));
      const sks = await api.skills.getAll();
      setSkills(sks);
      refreshPreview();
    } catch (err) {
      showToast('error', err.message || 'Failed to save skill');
    }
  };

  // CRUD: Project
  const handleSaveProject = async (formData) => {
    try {
      if (modalState.project.data) {
        await api.projects.update(modalState.project.data.id, formData);
        showToast('success', 'Project updated!');
      } else {
        await api.projects.create(formData);
        showToast('success', 'Project added!');
      }
      setModalState((prev) => ({ ...prev, project: { open: false, data: null } }));
      const projs = await api.projects.getAll();
      setProjects(projs);
      refreshPreview();
    } catch (err) {
      showToast('error', err.message || 'Failed to save project');
    }
  };

  // CRUD: Achievement
  const handleSaveAchievement = async (formData) => {
    try {
      if (modalState.achievement.data) {
        await api.achievements.update(modalState.achievement.data.id, formData);
        showToast('success', 'Achievement updated!');
      } else {
        await api.achievements.create(formData);
        showToast('success', 'Achievement added!');
      }
      setModalState((prev) => ({ ...prev, achievement: { open: false, data: null } }));
      const achs = await api.achievements.getAll();
      setAchievements(achs);
      refreshPreview();
    } catch (err) {
      showToast('error', err.message || 'Failed to save achievement');
    }
  };

  // Deletion Confirmation Trigger
  const triggerDelete = (type, id, title) => {
    setModalState((prev) => ({
      ...prev,
      deleteConfirm: { open: true, type, id, title },
    }));
  };

  const handleConfirmDelete = async () => {
    const { type, id } = modalState.deleteConfirm;
    try {
      if (type === 'education') {
        await api.education.delete(id);
        setEducations((prev) => prev.filter((item) => item.id !== id));
        showToast('success', 'Education entry removed');
      } else if (type === 'skill') {
        await api.skills.delete(id);
        setSkills((prev) => prev.filter((item) => item.id !== id));
        showToast('success', 'Skill removed');
      } else if (type === 'project') {
        await api.projects.delete(id);
        setProjects((prev) => prev.filter((item) => item.id !== id));
        showToast('success', 'Project removed');
      } else if (type === 'achievement') {
        await api.achievements.delete(id);
        setAchievements((prev) => prev.filter((item) => item.id !== id));
        showToast('success', 'Achievement removed');
      }
      refreshPreview();
    } catch (err) {
      showToast('error', err.message || 'Failed to delete record');
    } finally {
      setModalState((prev) => ({
        ...prev,
        deleteConfirm: { open: false, type: null, id: null, title: '' },
      }));
    }
  };

  const techSkillsCount = skills.filter((s) => s.category === 'TECHNICAL').length;
  const softSkillsCount = skills.filter((s) => s.category === 'SOFT').length;

  const filteredSkills =
    activeSkillCategory === 'ALL'
      ? skills
      : skills.filter((s) => s.category === activeSkillCategory);

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      <Toast toast={toast} onClose={() => setToast(null)} />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1">
        
        {/* Navigation Tabs Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-4 mb-6 border-b border-slate-200">
          {[
            { id: 'overview', label: 'Overview', icon: LayoutDashboard },
            { id: 'profile', label: 'Profile Information', icon: User },
            { id: 'education', label: `Education (${educations.length})`, icon: GraduationCap },
            { id: 'skills', label: `Skills (${skills.length})`, icon: Wrench },
            { id: 'projects', label: `Projects (${projects.length})`, icon: FolderGit2 },
            { id: 'achievements', label: `Achievements (${achievements.length})`, icon: Trophy },
            { id: 'preview', label: 'Portfolio Generator & Preview', icon: Palette, highlight: true },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-brand-600 text-white shadow-sm'
                    : tab.highlight
                    ? 'bg-brand-50 text-brand-700 hover:bg-brand-100'
                    : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <DashboardStats
            user={profile}
            stats={{
              educationsCount: educations.length,
              techSkillsCount,
              softSkillsCount,
              projectsCount: projects.length,
              achievementsCount: achievements.length,
            }}
            settings={settings}
            onTogglePublic={handleTogglePublic}
            onLoadSampleData={handleLoadSampleData}
            onNavigateTab={setActiveTab}
            showToast={showToast}
          />
        )}

        {/* TAB 2: PROFILE */}
        {activeTab === 'profile' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm max-w-4xl mx-auto">
            <div className="flex items-center justify-between pb-5 border-b border-slate-100 mb-6">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Student Profile</h2>
                <p className="text-xs text-slate-500">Edit your core bio, headline, and contact details</p>
              </div>
              <button
                type="submit"
                form="profile-form"
                disabled={savingProfile}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs sm:text-sm font-semibold shadow-sm transition-all disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                {savingProfile ? 'Saving...' : 'Save Profile'}
              </button>
            </div>

            <form id="profile-form" onSubmit={handleSaveProfile} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={profile.fullName || ''}
                    onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                    placeholder="e.g. Aarav Sharma"
                    className="w-full px-3.5 py-2.5 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:border-brand-500 focus:ring-brand-200 outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                    Professional Headline / Title
                  </label>
                  <input
                    type="text"
                    value={profile.headline || ''}
                    onChange={(e) => setProfile({ ...profile, headline: e.target.value })}
                    placeholder="e.g. Computer Science Undergraduate | Full Stack Aspirant"
                    className="w-full px-3.5 py-2.5 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:border-brand-500 focus:ring-brand-200 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                  About Me / Short Bio
                </label>
                <textarea
                  rows="4"
                  value={profile.bio || ''}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  placeholder="Share a concise background about your academic passions, technical interests, and career goals..."
                  className="w-full px-3.5 py-2.5 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:border-brand-500 focus:ring-brand-200 outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                    Location
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                    <input
                      type="text"
                      value={profile.location || ''}
                      onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                      placeholder="e.g. Bengaluru, India"
                      className="w-full pl-9 pr-3.5 py-2.5 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:border-brand-500 focus:ring-brand-200 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                    <input
                      type="tel"
                      value={profile.phone || ''}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full pl-9 pr-3.5 py-2.5 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:border-brand-500 focus:ring-brand-200 outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                    GitHub URL
                  </label>
                  <div className="relative">
                    <Github className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                    <input
                      type="url"
                      value={profile.githubUrl || ''}
                      onChange={(e) => setProfile({ ...profile, githubUrl: e.target.value })}
                      placeholder="https://github.com/..."
                      className="w-full pl-9 pr-3.5 py-2.5 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:border-brand-500 focus:ring-brand-200 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                    LinkedIn URL
                  </label>
                  <div className="relative">
                    <Linkedin className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                    <input
                      type="url"
                      value={profile.linkedinUrl || ''}
                      onChange={(e) => setProfile({ ...profile, linkedinUrl: e.target.value })}
                      placeholder="https://linkedin.com/in/..."
                      className="w-full pl-9 pr-3.5 py-2.5 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:border-brand-500 focus:ring-brand-200 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                    Portfolio Avatar Image URL
                  </label>
                  <input
                    type="url"
                    value={profile.avatarUrl || ''}
                    onChange={(e) => setProfile({ ...profile, avatarUrl: e.target.value })}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full px-3.5 py-2.5 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:border-brand-500 focus:ring-brand-200 outline-none"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <button
                  type="submit"
                  disabled={savingProfile}
                  className="px-6 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-sm font-semibold shadow-sm transition-all disabled:opacity-50"
                >
                  {savingProfile ? 'Saving Changes...' : 'Save Profile Changes'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* TAB 3: EDUCATION */}
        {activeTab === 'education' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Education Details</h2>
                <p className="text-xs text-slate-500">Record your colleges, degrees, branches, and graduation years</p>
              </div>
              <button
                onClick={() => setModalState((prev) => ({ ...prev, education: { open: true, data: null } }))}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs sm:text-sm font-semibold shadow-sm transition-all"
              >
                <Plus className="w-4 h-4" />
                Add Education Entry
              </button>
            </div>

            {educations.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-dashed border-slate-300">
                <GraduationCap className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h3 className="text-base font-bold text-slate-800">No education entries yet</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 mb-5">
                  Add your college or high school details to show recruiters your academic timeline.
                </p>
                <button
                  onClick={() => setModalState((prev) => ({ ...prev, education: { open: true, data: null } }))}
                  className="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-semibold"
                >
                  Add Your College
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {educations.map((edu) => (
                  <div
                    key={edu.id}
                    className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-start justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-bold text-slate-900">{edu.institution}</h3>
                        {edu.grade && (
                          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-brand-50 text-brand-700">
                            {edu.grade}
                          </span>
                        )}
                      </div>
                      <p className="text-sm font-semibold text-slate-700 mt-1">
                        {edu.degree} &bull; <span className="text-slate-500 font-normal">{edu.fieldOfStudy}</span>
                      </p>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Graduation Year: <strong>{edu.graduationYear}</strong>
                        {edu.startYear ? ` (Started: ${edu.startYear})` : ''}
                      </p>
                      {edu.description && (
                        <p className="text-xs text-slate-600 mt-3 max-w-2xl leading-relaxed">
                          {edu.description}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-start">
                      <button
                        onClick={() =>
                          setModalState((prev) => ({
                            ...prev,
                            education: { open: true, data: edu },
                          }))
                        }
                        className="p-2 text-slate-500 hover:text-brand-600 hover:bg-slate-100 rounded-xl transition-colors"
                        title="Edit education"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => triggerDelete('education', edu.id, edu.institution)}
                        className="p-2 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                        title="Delete education"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 4: SKILLS */}
        {activeTab === 'skills' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Technical & Soft Skills</h2>
                <p className="text-xs text-slate-500">Categorize your technical tools and interpersonal strengths</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    setModalState((prev) => ({
                      ...prev,
                      skill: { open: true, data: null, defaultCategory: 'TECHNICAL' },
                    }))
                  }
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-semibold shadow-sm transition-all"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add Technical Skill
                </button>
                <button
                  onClick={() =>
                    setModalState((prev) => ({
                      ...prev,
                      skill: { open: true, data: null, defaultCategory: 'SOFT' },
                    }))
                  }
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-semibold shadow-sm transition-all"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add Soft Skill
                </button>
              </div>
            </div>

            {/* Category filter pills */}
            <div className="flex items-center gap-2">
              {['ALL', 'TECHNICAL', 'SOFT'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveSkillCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    activeSkillCategory === cat
                      ? 'bg-slate-900 text-white'
                      : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'
                  }`}
                >
                  {cat === 'ALL' ? 'All Skills' : cat === 'TECHNICAL' ? 'Technical Only' : 'Soft Skills Only'}
                </button>
              ))}
            </div>

            {filteredSkills.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-dashed border-slate-300">
                <Wrench className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h3 className="text-base font-bold text-slate-800">No skills added in this category</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 mb-5">
                  Highlight languages (Java, Python), frameworks (React, Spring Boot), and teamwork competencies.
                </p>
                <button
                  onClick={() =>
                    setModalState((prev) => ({
                      ...prev,
                      skill: { open: true, data: null, defaultCategory: 'TECHNICAL' },
                    }))
                  }
                  className="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-semibold"
                >
                  Add Your First Skill
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {filteredSkills.map((sk) => (
                  <div
                    key={sk.id}
                    className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between gap-3 group hover:border-brand-300 transition-all"
                  >
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-bold text-slate-900">{sk.name}</span>
                        <span
                          className={`text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded ${
                            sk.category === 'TECHNICAL'
                              ? 'bg-blue-50 text-blue-700'
                              : 'bg-purple-50 text-purple-700'
                          }`}
                        >
                          {sk.category}
                        </span>
                      </div>
                      {sk.proficiencyLevel && (
                        <p className="text-xs text-slate-400 mt-0.5 font-medium">
                          {sk.proficiencyLevel}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100">
                      <button
                        onClick={() =>
                          setModalState((prev) => ({
                            ...prev,
                            skill: { open: true, data: sk, defaultCategory: sk.category },
                          }))
                        }
                        className="p-1.5 text-slate-400 hover:text-brand-600 hover:bg-slate-100 rounded-lg transition-colors"
                        title="Edit skill"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => triggerDelete('skill', sk.id, sk.name)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                        title="Delete skill"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 5: PROJECTS */}
        {activeTab === 'projects' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Projects & Applications</h2>
                <p className="text-xs text-slate-500">Showcase academic projects, hackathon prototypes, and apps</p>
              </div>
              <button
                onClick={() => setModalState((prev) => ({ ...prev, project: { open: true, data: null } }))}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs sm:text-sm font-semibold shadow-sm transition-all"
              >
                <Plus className="w-4 h-4" />
                Add New Project
              </button>
            </div>

            {projects.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-dashed border-slate-300">
                <FolderGit2 className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h3 className="text-base font-bold text-slate-800">No projects added yet</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 mb-5">
                  Projects demonstrate hands-on coding skills, software architecture, and problem solving.
                </p>
                <button
                  onClick={() => setModalState((prev) => ({ ...prev, project: { open: true, data: null } }))}
                  className="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-semibold"
                >
                  Add Your First Project
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {projects.map((proj) => (
                  <div
                    key={proj.id}
                    className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          <h3 className="text-base font-bold text-slate-900">{proj.title}</h3>
                          {proj.featured && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800">
                              <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                              Featured
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-1">
                          <button
                            onClick={() =>
                              setModalState((prev) => ({
                                ...prev,
                                project: { open: true, data: proj },
                              }))
                            }
                            className="p-1.5 text-slate-400 hover:text-brand-600 hover:bg-slate-100 rounded-lg transition-colors"
                            title="Edit project"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => triggerDelete('project', proj.id, proj.title)}
                            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                            title="Delete project"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                        {proj.description}
                      </p>
                    </div>

                    <div>
                      {proj.technologies && (
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {proj.technologies.split(',').map((tech, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px] font-medium"
                            >
                              {tech.trim()}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="flex items-center gap-3 pt-3 border-t border-slate-100 text-xs">
                        {proj.githubUrl && (
                          <a
                            href={proj.githubUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 text-slate-700 hover:text-slate-900 font-semibold"
                          >
                            <Github className="w-3.5 h-3.5" />
                            GitHub
                          </a>
                        )}
                        {proj.liveUrl && (
                          <a
                            href={proj.liveUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 text-brand-600 hover:underline font-semibold ml-auto"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            Live Demo
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 6: ACHIEVEMENTS */}
        {activeTab === 'achievements' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Achievements & Certifications</h2>
                <p className="text-xs text-slate-500">Record awards, hackathon wins, bootcamps, and verified certificates</p>
              </div>
              <button
                onClick={() => setModalState((prev) => ({ ...prev, achievement: { open: true, data: null } }))}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs sm:text-sm font-semibold shadow-sm transition-all"
              >
                <Plus className="w-4 h-4" />
                Add Achievement
              </button>
            </div>

            {achievements.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-dashed border-slate-300">
                <Trophy className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h3 className="text-base font-bold text-slate-800">No achievements recorded yet</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 mb-5">
                  Highlight cloud certificates, coding rank awards, and workshops you completed.
                </p>
                <button
                  onClick={() => setModalState((prev) => ({ ...prev, achievement: { open: true, data: null } }))}
                  className="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-semibold"
                >
                  Add Your First Achievement
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {achievements.map((ach) => (
                  <div
                    key={ach.id}
                    className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                          {ach.category}
                        </span>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() =>
                              setModalState((prev) => ({
                                ...prev,
                                achievement: { open: true, data: ach },
                              }))
                            }
                            className="p-1 text-slate-400 hover:text-brand-600 hover:bg-slate-100 rounded"
                            title="Edit"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => triggerDelete('achievement', ach.id, ach.title)}
                            className="p-1 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <h3 className="text-sm font-bold text-slate-900 leading-snug">{ach.title}</h3>
                      {ach.issuer && <p className="text-xs text-slate-500 mt-1">By {ach.issuer}</p>}
                      {ach.issueDate && <p className="text-[11px] text-slate-400 mt-0.5">{ach.issueDate}</p>}
                      {ach.description && <p className="text-xs text-slate-600 mt-2 line-clamp-3">{ach.description}</p>}
                    </div>

                    {ach.credentialUrl && (
                      <div className="pt-3 mt-3 border-t border-slate-100">
                        <a
                          href={ach.credentialUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-xs font-semibold text-brand-600 hover:underline"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          Verify Certificate
                        </a>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 7: PORTFOLIO GENERATOR & LIVE PREVIEW */}
        {activeTab === 'preview' && (
          <div className="space-y-6">
            {/* Customization Toolbar */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Portfolio Customizer & Live Preview</h2>
                  <p className="text-xs text-slate-500">
                    Choose predefined layouts, customize color palettes, and preview your portfolio in real time.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href={`/portfolio/${settings.slug}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold shadow-sm transition-all"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    Open Public Page
                    <ExternalLink className="w-3 h-3 text-slate-400" />
                  </a>

                  <button
                    onClick={() => handleSaveSettings()}
                    disabled={savingSettings}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-semibold shadow-sm transition-all disabled:opacity-50"
                  >
                    <Save className="w-3.5 h-3.5" />
                    {savingSettings ? 'Saving...' : 'Save Settings'}
                  </button>
                </div>
              </div>

              {/* Theme & Palette Selectors */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Predefined Themes */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
                    Predefined Layout Theme
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'MODERN', label: 'Modern Tech' },
                      { id: 'CREATIVE', label: 'Creative' },
                      { id: 'MINIMAL', label: 'Minimal' },
                    ].map((th) => (
                      <button
                        key={th.id}
                        type="button"
                        onClick={() => {
                          const updated = { ...settings, themeTemplate: th.id };
                          setSettings(updated);
                          handleSaveSettings(updated);
                        }}
                        className={`py-2 px-2.5 rounded-xl border text-xs font-semibold transition-all ${
                          settings.themeTemplate === th.id
                            ? 'border-brand-500 bg-brand-50 text-brand-700 shadow-xs'
                            : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        {th.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Accent Color Palette */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
                    Color Accent Palette
                  </label>
                  <div className="flex items-center gap-2.5">
                    {[
                      { id: 'indigo', color: 'bg-indigo-600' },
                      { id: 'emerald', color: 'bg-emerald-600' },
                      { id: 'rose', color: 'bg-rose-600' },
                      { id: 'amber', color: 'bg-amber-600' },
                      { id: 'cyan', color: 'bg-cyan-600' },
                      { id: 'violet', color: 'bg-violet-600' },
                    ].map((col) => (
                      <button
                        key={col.id}
                        type="button"
                        onClick={() => {
                          const updated = { ...settings, accentColor: col.id };
                          setSettings(updated);
                          handleSaveSettings(updated);
                        }}
                        className={`w-7 h-7 rounded-full ${col.color} transition-transform ${
                          settings.accentColor === col.id
                            ? 'ring-4 ring-slate-300 scale-110 shadow-sm'
                            : 'hover:scale-105'
                        }`}
                        title={col.id}
                      />
                    ))}
                  </div>
                </div>

                {/* Slug / Handle */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                    Shareable Slug Handle
                  </label>
                  <div className="flex items-center">
                    <span className="text-xs text-slate-400 bg-slate-50 px-2 py-2 border border-r-0 border-slate-200 rounded-l-xl font-mono">
                      /p/
                    </span>
                    <input
                      type="text"
                      value={settings.slug || ''}
                      onChange={(e) => setSettings({ ...settings, slug: e.target.value.toLowerCase().trim() })}
                      className="w-full px-3 py-2 text-xs border border-slate-200 rounded-r-xl outline-none font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Privacy Switches & Device Frame Toggles */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-slate-100">
                <div className="flex flex-wrap items-center gap-4 text-xs">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={settings.isPublic}
                      onChange={handleTogglePublic}
                      className="w-4 h-4 text-brand-600 rounded"
                    />
                    <span className="font-semibold text-slate-800">Public Access Enabled</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={settings.showContactInfo}
                      onChange={(e) => {
                        const updated = { ...settings, showContactInfo: e.target.checked };
                        setSettings(updated);
                        handleSaveSettings(updated);
                      }}
                      className="w-4 h-4 text-brand-600 rounded"
                    />
                    <span className="font-semibold text-slate-800">Show Phone & Email</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={settings.showGrades}
                      onChange={(e) => {
                        const updated = { ...settings, showGrades: e.target.checked };
                        setSettings(updated);
                        handleSaveSettings(updated);
                      }}
                      className="w-4 h-4 text-brand-600 rounded"
                    />
                    <span className="font-semibold text-slate-800">Display CGPA / Grades</span>
                  </label>
                </div>

                {/* Responsive Viewport Buttons */}
                <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl self-start sm:self-auto">
                  <button
                    onClick={() => setPreviewDevice('desktop')}
                    className={`p-1.5 rounded-lg text-xs flex items-center gap-1 font-semibold transition-all ${
                      previewDevice === 'desktop' ? 'bg-white text-brand-700 shadow-xs' : 'text-slate-500'
                    }`}
                    title="Desktop Preview"
                  >
                    <Monitor className="w-3.5 h-3.5" />
                    Desktop
                  </button>
                  <button
                    onClick={() => setPreviewDevice('tablet')}
                    className={`p-1.5 rounded-lg text-xs flex items-center gap-1 font-semibold transition-all ${
                      previewDevice === 'tablet' ? 'bg-white text-brand-700 shadow-xs' : 'text-slate-500'
                    }`}
                    title="Tablet Preview"
                  >
                    <Tablet className="w-3.5 h-3.5" />
                    Tablet
                  </button>
                  <button
                    onClick={() => setPreviewDevice('mobile')}
                    className={`p-1.5 rounded-lg text-xs flex items-center gap-1 font-semibold transition-all ${
                      previewDevice === 'mobile' ? 'bg-white text-brand-700 shadow-xs' : 'text-slate-500'
                    }`}
                    title="Mobile View"
                  >
                    <Smartphone className="w-3.5 h-3.5" />
                    Mobile
                  </button>
                </div>
              </div>
            </div>

            {/* Live Portfolio Preview Sandbox */}
            <div className="bg-slate-200/80 p-4 sm:p-8 rounded-3xl border border-slate-300 flex justify-center overflow-x-auto">
              <div
                className={`transition-all duration-300 bg-white rounded-2xl shadow-2xl overflow-hidden ${
                  previewDevice === 'desktop'
                    ? 'w-full max-w-5xl'
                    : previewDevice === 'tablet'
                    ? 'w-[768px] max-w-full'
                    : 'w-[390px] max-w-full'
                }`}
              >
                {/* Mock Browser Frame Header */}
                <div className="bg-slate-800 text-slate-300 px-4 py-2 flex items-center justify-between text-xs border-b border-slate-700">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    <span className="ml-2 font-mono text-[11px] text-slate-400">
                      https://studentfolio.dev/portfolio/{settings.slug || 'username'}
                    </span>
                  </div>

                  <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                    {previewDevice.toUpperCase()} PREVIEW
                  </span>
                </div>

                {/* Rendered Live Portfolio */}
                <PortfolioRenderer
                  portfolio={previewData}
                  theme={settings.themeTemplate}
                  accentColor={settings.accentColor}
                  isPublicView={false}
                />
              </div>
            </div>
          </div>
        )}

      </div>

      {/* CRUD Modals */}
      <EducationModal
        isOpen={modalState.education.open}
        onClose={() => setModalState((prev) => ({ ...prev, education: { open: false, data: null } }))}
        onSave={handleSaveEducation}
        initialData={modalState.education.data}
      />

      <SkillModal
        isOpen={modalState.skill.open}
        onClose={() =>
          setModalState((prev) => ({
            ...prev,
            skill: { open: false, data: null, defaultCategory: 'TECHNICAL' },
          }))
        }
        onSave={handleSaveSkill}
        initialData={modalState.skill.data}
        defaultCategory={modalState.skill.defaultCategory}
      />

      <ProjectModal
        isOpen={modalState.project.open}
        onClose={() => setModalState((prev) => ({ ...prev, project: { open: false, data: null } }))}
        onSave={handleSaveProject}
        initialData={modalState.project.data}
      />

      <AchievementModal
        isOpen={modalState.achievement.open}
        onClose={() => setModalState((prev) => ({ ...prev, achievement: { open: false, data: null } }))}
        onSave={handleSaveAchievement}
        initialData={modalState.achievement.data}
      />

      <ConfirmationModal
        isOpen={modalState.deleteConfirm.open}
        title={`Delete ${modalState.deleteConfirm.type}?`}
        message={`Are you sure you want to delete "${modalState.deleteConfirm.title}"?`}
        onConfirm={handleConfirmDelete}
        onCancel={() =>
          setModalState((prev) => ({
            ...prev,
            deleteConfirm: { open: false, type: null, id: null, title: '' },
          }))
        }
      />
    </div>
  );
};
