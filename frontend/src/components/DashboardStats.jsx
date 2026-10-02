import React, { useState } from 'react';
import {
  GraduationCap, Wrench, FolderGit2, Trophy, Share2, Copy, Check,
  ExternalLink, Globe, Lock, Sparkles, AlertCircle, QrCode
} from 'lucide-react';
import { QrModal } from './QrModal';

export const DashboardStats = ({
  user,
  stats,
  settings,
  onTogglePublic,
  onLoadSampleData,
  onNavigateTab,
  showToast,
}) => {
  const [copied, setCopied] = useState(false);
  const [loadingSample, setLoadingSample] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);

  const publicUrl = settings?.slug
    ? `${window.location.origin}/portfolio/${settings.slug}`
    : '';

  const handleCopyLink = () => {
    if (!publicUrl) return;
    navigator.clipboard.writeText(publicUrl);
    setCopied(true);
    showToast?.('success', 'Public link copied to clipboard!');
    setTimeout(() => setCopied(false), 2500);
  };

  const handleLoadSample = async () => {
    if (window.confirm('Load sample portfolio content? This will populate realistic student education, skills, projects, and achievements to jumpstart your portfolio.')) {
      setLoadingSample(true);
      try {
        await onLoadSampleData();
        showToast?.('success', 'Sample portfolio content loaded successfully!');
      } catch (err) {
        showToast?.('error', err.message || 'Failed to load sample data');
      } finally {
        setLoadingSample(false);
      }
    }
  };

  // Calculate profile completion score
  const completionItems = [
    { label: 'Basic Profile', filled: !!(user?.fullName && user?.headline && user?.bio) },
    { label: 'Contact Info', filled: !!(user?.location || user?.phone) },
    { label: 'Education', filled: stats.educationsCount > 0 },
    { label: 'Technical Skills', filled: stats.techSkillsCount > 0 },
    { label: 'Projects', filled: stats.projectsCount > 0 },
    { label: 'Achievements', filled: stats.achievementsCount > 0 },
  ];
  const filledCount = completionItems.filter((i) => i.filled).length;
  const completionPct = Math.round((filledCount / completionItems.length) * 100);

  return (
    <div className="space-y-6">
      {/* Top Banner: Welcome & Quick Actions */}
      <div className="bg-gradient-to-r from-brand-600 via-indigo-600 to-violet-600 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        {/* Background glow circle */}
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/20 backdrop-blur-md mb-3">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              Student Digital Portfolio Workspace
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Welcome, {user?.fullName || 'Student'}!
            </h1>
            <p className="mt-2 text-indigo-100 text-sm leading-relaxed">
              Build your digital identity. Enter your academics, technical skills, projects, and achievements.
              Your custom portfolio is compiled instantly and ready to share with recruiters and professors.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigateTab('preview')}
              className="px-4 py-2.5 bg-white text-brand-700 hover:bg-indigo-50 font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center gap-2"
            >
              <ExternalLink className="w-4 h-4 text-brand-600" />
              Live Preview & Themes
            </button>

            <button
              onClick={handleLoadSample}
              disabled={loadingSample}
              className="px-4 py-2.5 bg-indigo-700/80 hover:bg-indigo-700 text-white font-semibold text-xs sm:text-sm rounded-xl border border-white/20 transition-all flex items-center gap-2 disabled:opacity-50"
              title="Prepopulate realistic student sample records"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              {loadingSample ? 'Loading...' : 'Load Sample Data'}
            </button>
          </div>
        </div>

        {/* Completion Progress Bar */}
        <div className="mt-6 pt-6 border-t border-white/15">
          <div className="flex items-center justify-between text-xs font-semibold mb-2">
            <span>Portfolio Strength: {completionPct}%</span>
            <span>{filledCount} of {completionItems.length} Sections Completed</span>
          </div>
          <div className="w-full h-2.5 bg-black/20 rounded-full overflow-hidden p-0.5">
            <div
              className="h-full bg-gradient-to-r from-amber-300 to-emerald-300 rounded-full transition-all duration-700"
              style={{ width: `${completionPct}%` }}
            />
          </div>
        </div>
      </div>

      {/* Shareable Link Card */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <Share2 className="w-5 h-5 text-brand-600" />
              <h2 className="text-base font-bold text-slate-900">Your Shareable Public Link</h2>
              <span
                className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold ${
                  settings?.isPublic
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : 'bg-slate-100 text-slate-600 border border-slate-200'
                }`}
              >
                {settings?.isPublic ? (
                  <>
                    <Globe className="w-3 h-3 text-emerald-600" />
                    Public Access Enabled
                  </>
                ) : (
                  <>
                    <Lock className="w-3 h-3 text-slate-500" />
                    Private (Access Disabled)
                  </>
                )}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Recruiters and visitors can view this link without needing to log in.
            </p>
          </div>

          {/* Toggle Access Switch */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-slate-600">
              {settings?.isPublic ? 'Public' : 'Disabled'}
            </span>
            <button
              type="button"
              onClick={onTogglePublic}
              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                settings?.isPublic ? 'bg-brand-600' : 'bg-slate-300'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  settings?.isPublic ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>

        {/* URL Box & Copy Button */}
        <div className="mt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="flex-1 flex items-center px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-700 font-mono overflow-x-auto select-all">
            {publicUrl || 'Generating URL...'}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyLink}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs sm:text-sm font-semibold shadow-sm transition-all"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied!' : 'Copy Link'}
            </button>

            <button
              onClick={() => setShowQrModal(true)}
              className="inline-flex items-center justify-center gap-1 px-3 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-all"
              title="Show QR Code for Resume"
            >
              <QrCode className="w-4 h-4 text-slate-600" />
              <span className="hidden md:inline">QR Code</span>
            </button>

            {settings?.isPublic && (
              <a
                href={publicUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-all"
                title="Open public portfolio"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>

        {/* Robust Client-Side QR Code Modal */}
        <QrModal
          isOpen={showQrModal}
          onClose={() => setShowQrModal(false)}
          portfolio={user}
          slug={settings?.slug}
        />

        {!settings?.isPublic && (
          <div className="mt-3 flex items-center gap-2 text-xs text-amber-700 bg-amber-50 p-2.5 rounded-xl border border-amber-200">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>Public visitors currently receive a private notice until you enable public access.</span>
          </div>
        )}
      </div>

      {/* 4 Quick Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Education Card */}
        <div
          onClick={() => onNavigateTab('education')}
          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:border-brand-300 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl group-hover:scale-105 transition-transform">
              <GraduationCap className="w-5 h-5" />
            </div>
            <span className="text-2xl font-extrabold text-slate-900">
              {stats.educationsCount}
            </span>
          </div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Education Entries
          </h3>
          <p className="text-[11px] text-slate-400 mt-0.5">Colleges & degrees</p>
        </div>

        {/* Skills Card */}
        <div
          onClick={() => onNavigateTab('skills')}
          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:border-brand-300 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl group-hover:scale-105 transition-transform">
              <Wrench className="w-5 h-5" />
            </div>
            <span className="text-2xl font-extrabold text-slate-900">
              {stats.techSkillsCount + stats.softSkillsCount}
            </span>
          </div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Skills Listed
          </h3>
          <p className="text-[11px] text-slate-400 mt-0.5">
            {stats.techSkillsCount} tech &bull; {stats.softSkillsCount} soft
          </p>
        </div>

        {/* Projects Card */}
        <div
          onClick={() => onNavigateTab('projects')}
          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:border-brand-300 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="p-2.5 bg-purple-50 text-purple-600 rounded-xl group-hover:scale-105 transition-transform">
              <FolderGit2 className="w-5 h-5" />
            </div>
            <span className="text-2xl font-extrabold text-slate-900">
              {stats.projectsCount}
            </span>
          </div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Projects
          </h3>
          <p className="text-[11px] text-slate-400 mt-0.5">Apps & case studies</p>
        </div>

        {/* Achievements Card */}
        <div
          onClick={() => onNavigateTab('achievements')}
          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:border-brand-300 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="p-2.5 bg-amber-50 text-amber-600 rounded-xl group-hover:scale-105 transition-transform">
              <Trophy className="w-5 h-5" />
            </div>
            <span className="text-2xl font-extrabold text-slate-900">
              {stats.achievementsCount}
            </span>
          </div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Achievements
          </h3>
          <p className="text-[11px] text-slate-400 mt-0.5">Certificates & honors</p>
        </div>
      </div>
    </div>
  );
};
