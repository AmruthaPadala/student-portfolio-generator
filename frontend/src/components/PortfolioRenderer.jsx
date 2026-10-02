import React, { useState } from 'react';
import {
  Mail, Phone, MapPin, Globe, Github, Linkedin, ExternalLink,
  GraduationCap, Award, BookOpen, Calendar, Trophy, FolderGit2,
  Code2, CheckCircle2, User, Star, Download, Printer, QrCode,
  X, MessageSquare, Share2
} from 'lucide-react';
import { QrModal } from './QrModal';

const ACCENT_STYLES = {
  indigo: {
    bg: 'bg-indigo-600',
    hoverBg: 'hover:bg-indigo-700',
    lightBg: 'bg-indigo-50',
    border: 'border-indigo-500',
    lightBorder: 'border-indigo-200',
    text: 'text-indigo-600',
    badge: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    gradient: 'from-indigo-600 to-violet-600',
    accentRing: 'ring-indigo-500',
  },
  emerald: {
    bg: 'bg-emerald-600',
    hoverBg: 'hover:bg-emerald-700',
    lightBg: 'bg-emerald-50',
    border: 'border-emerald-500',
    lightBorder: 'border-emerald-200',
    text: 'text-emerald-600',
    badge: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    gradient: 'from-emerald-600 to-teal-600',
    accentRing: 'ring-emerald-500',
  },
  rose: {
    bg: 'bg-rose-600',
    hoverBg: 'hover:bg-rose-700',
    lightBg: 'bg-rose-50',
    border: 'border-rose-500',
    lightBorder: 'border-rose-200',
    text: 'text-rose-600',
    badge: 'bg-rose-50 text-rose-700 border-rose-200',
    gradient: 'from-rose-600 to-pink-600',
    accentRing: 'ring-rose-500',
  },
  amber: {
    bg: 'bg-amber-600',
    hoverBg: 'hover:bg-amber-700',
    lightBg: 'bg-amber-50',
    border: 'border-amber-500',
    lightBorder: 'border-amber-200',
    text: 'text-amber-600',
    badge: 'bg-amber-50 text-amber-800 border-amber-200',
    gradient: 'from-amber-600 to-orange-600',
    accentRing: 'ring-amber-500',
  },
  cyan: {
    bg: 'bg-cyan-600',
    hoverBg: 'hover:bg-cyan-700',
    lightBg: 'bg-cyan-50',
    border: 'border-cyan-500',
    lightBorder: 'border-cyan-200',
    text: 'text-cyan-600',
    badge: 'bg-cyan-50 text-cyan-800 border-cyan-200',
    gradient: 'from-cyan-600 to-blue-600',
    accentRing: 'ring-cyan-500',
  },
  violet: {
    bg: 'bg-violet-600',
    hoverBg: 'hover:bg-violet-700',
    lightBg: 'bg-violet-50',
    border: 'border-violet-500',
    lightBorder: 'border-violet-200',
    text: 'text-violet-600',
    badge: 'bg-violet-50 text-violet-700 border-violet-200',
    gradient: 'from-violet-600 to-purple-600',
    accentRing: 'ring-violet-500',
  },
};

export const PortfolioRenderer = ({
  portfolio,
  theme = 'MODERN',
  accentColor = 'indigo',
  isPublicView = false,
}) => {
  if (!portfolio) {
    return (
      <div className="p-12 text-center text-slate-500">
        <User className="w-12 h-12 mx-auto text-slate-300 mb-3" />
        <p className="text-base font-medium">No portfolio data available</p>
      </div>
    );
  }

  const activeTheme = theme || portfolio.themeTemplate || 'MODERN';
  const activeAccent = ACCENT_STYLES[accentColor || portfolio.accentColor] || ACCENT_STYLES.indigo;

  const {
    fullName = 'Student Name',
    headline = 'Aspiring Student & Problem Solver',
    bio,
    location,
    email,
    phone,
    githubUrl,
    linkedinUrl,
    websiteUrl,
    avatarUrl,
    customTagline,
    educations = [],
    technicalSkills = [],
    softSkills = [],
    projects = [],
    achievements = [],
    showContactInfo = true,
  } = portfolio;

  const initials = fullName
    ? fullName
        .split(' ')
        .map((n) => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()
    : 'ST';

  const [showContactModal, setShowContactModal] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);

  const portfolioUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/portfolio/${portfolio.slug || 'student'}`
    : '';

  const handlePrint = () => {
    window.print();
  };

  const handleExportJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(portfolio, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `${(portfolio.slug || 'student')}-portfolio.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className={`portfolio-container w-full min-h-screen ${
      activeTheme === 'MINIMAL' ? 'bg-white' : 'bg-slate-50/60'
    } text-slate-800 transition-colors`}>
      
      {/* Top Banner & Header */}
      <header className="relative">
        {/* Decorative Top Accent Bar */}
        <div className={`h-3 w-full bg-gradient-to-r ${activeAccent.gradient}`} />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-10 pb-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 text-center md:text-left">
            {/* Avatar */}
            <div className="relative flex-shrink-0">
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt={fullName}
                  className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl object-cover shadow-lg border-4 border-white ring-2 ring-slate-100"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextElementSibling.style.display = 'flex';
                  }}
                />
              ) : null}
              <div
                className={`w-28 h-28 sm:w-32 sm:h-32 rounded-2xl bg-gradient-to-br ${activeAccent.gradient} text-white flex items-center justify-center text-3xl font-extrabold shadow-lg border-4 border-white ${
                  avatarUrl ? 'hidden' : 'flex'
                }`}
              >
                {initials}
              </div>
            </div>

            {/* Main Title & Bio */}
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                    {fullName}
                  </h1>
                  <p className={`text-lg font-medium ${activeAccent.text} mt-1`}>
                    {headline}
                  </p>
                </div>

                {/* Action buttons on public view or preview */}
                <div className="no-print flex flex-wrap items-center justify-center md:justify-end gap-2">
                  {showContactInfo && email && (
                    <button
                      onClick={() => setShowContactModal(true)}
                      className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white ${activeAccent.bg} ${activeAccent.hoverBg} rounded-xl shadow-sm transition-all`}
                      title="Contact this student directly"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      Get in Touch
                    </button>
                  )}

                  {portfolio.slug && (
                    <button
                      onClick={() => setShowQrModal(true)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl shadow-xs transition-all"
                      title="Show QR Code for Resume"
                    >
                      <QrCode className="w-3.5 h-3.5 text-slate-500" />
                      QR
                    </button>
                  )}

                  <button
                    onClick={handleExportJson}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl shadow-xs transition-all"
                    title="Export portfolio data as JSON"
                  >
                    <Download className="w-3.5 h-3.5 text-slate-500" />
                    JSON
                  </button>

                  <button
                    onClick={handlePrint}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl shadow-xs transition-all"
                    title="Print or Save as PDF"
                  >
                    <Printer className="w-3.5 h-3.5 text-slate-500" />
                    Print / PDF
                  </button>
                </div>
              </div>

              {customTagline && (
                <div className="mt-2 inline-block px-3 py-1 bg-slate-100 text-slate-700 rounded-lg text-xs font-medium italic">
                  "{customTagline}"
                </div>
              )}

              {bio && (
                <p className="mt-4 text-slate-600 text-sm leading-relaxed max-w-3xl">
                  {bio}
                </p>
              )}

              {/* Meta & Contact Badges */}
              <div className="mt-5 flex flex-wrap items-center justify-center md:justify-start gap-3 text-xs text-slate-600">
                {location && (
                  <span className="inline-flex items-center gap-1 bg-slate-100 px-2.5 py-1 rounded-lg">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    {location}
                  </span>
                )}

                {showContactInfo && email && (
                  <a
                    href={`mailto:${email}`}
                    className="inline-flex items-center gap-1 bg-slate-100 hover:bg-slate-200 px-2.5 py-1 rounded-lg text-slate-700 transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    {email}
                  </a>
                )}

                {showContactInfo && phone && (
                  <a
                    href={`tel:${phone}`}
                    className="inline-flex items-center gap-1 bg-slate-100 hover:bg-slate-200 px-2.5 py-1 rounded-lg text-slate-700 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    {phone}
                  </a>
                )}

                {/* Social Links */}
                {githubUrl && (
                  <a
                    href={githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-900 text-white hover:bg-slate-800 transition-colors"
                  >
                    <Github className="w-3.5 h-3.5" />
                    GitHub
                  </a>
                )}

                {linkedinUrl && (
                  <a
                    href={linkedinUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                  >
                    <Linkedin className="w-3.5 h-3.5" />
                    LinkedIn
                  </a>
                )}

                {websiteUrl && (
                  <a
                    href={websiteUrl}
                    target="_blank"
                    rel="noreferrer"
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg ${activeAccent.bg} text-white ${activeAccent.hoverBg} transition-colors`}
                  >
                    <Globe className="w-3.5 h-3.5" />
                    Website
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Body */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-12">
        
        {/* Section 1: Education */}
        <section>
          <div className="flex items-center gap-2 pb-3 mb-6 border-b border-slate-200">
            <div className={`p-2 rounded-lg ${activeAccent.lightBg} ${activeAccent.text}`}>
              <GraduationCap className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">Education</h2>
          </div>

          {educations.length === 0 ? (
            <div className="p-6 bg-white rounded-xl border border-dashed border-slate-300 text-center text-slate-400 text-sm">
              No education history added yet.
            </div>
          ) : (
            <div className="space-y-4">
              {educations.map((edu, idx) => (
                <div
                  key={edu.id || idx}
                  className={`p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow transition-all ${
                    activeTheme === 'CREATIVE' ? `border-l-4 ${activeAccent.border}` : ''
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                    <div>
                      <h3 className="text-base font-bold text-slate-900">
                        {edu.institution}
                      </h3>
                      <p className="text-sm font-medium text-slate-700 mt-0.5">
                        {edu.degree} &bull; <span className="text-slate-600">{edu.fieldOfStudy}</span>
                      </p>
                    </div>

                    <div className="flex items-center gap-2 self-start">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">
                        <Calendar className="w-3 h-3 text-slate-400" />
                        {edu.startYear ? `${edu.startYear} - ` : ''}{edu.graduationYear}
                      </span>
                      {edu.grade && (
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${activeAccent.badge}`}>
                          {edu.grade}
                        </span>
                      )}
                    </div>
                  </div>

                  {edu.description && (
                    <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {edu.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Section 2: Skills (Technical & Soft) */}
        <section>
          <div className="flex items-center gap-2 pb-3 mb-6 border-b border-slate-200">
            <div className={`p-2 rounded-lg ${activeAccent.lightBg} ${activeAccent.text}`}>
              <Code2 className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">Skills & Expertise</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Technical Skills */}
            <div className="p-6 bg-white rounded-2xl border border-slate-200/80 shadow-sm">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-4 flex items-center justify-between">
                <span>Technical Skills</span>
                <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-semibold">
                  {technicalSkills.length}
                </span>
              </h3>

              {technicalSkills.length === 0 ? (
                <p className="text-xs text-slate-400 italic">No technical skills added yet.</p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {technicalSkills.map((skill, idx) => (
                    <div
                      key={skill.id || idx}
                      className="group flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50/50 hover:border-slate-300 hover:bg-white text-xs font-medium text-slate-800 transition-all shadow-2xs"
                    >
                      <span>{skill.name}</span>
                      {skill.proficiencyLevel && (
                        <span className="text-[10px] text-slate-400 group-hover:text-slate-500 font-normal">
                          &bull; {skill.proficiencyLevel}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Soft Skills */}
            <div className="p-6 bg-white rounded-2xl border border-slate-200/80 shadow-sm">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-4 flex items-center justify-between">
                <span>Interpersonal & Soft Skills</span>
                <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-semibold">
                  {softSkills.length}
                </span>
              </h3>

              {softSkills.length === 0 ? (
                <p className="text-xs text-slate-400 italic">No soft skills added yet.</p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {softSkills.map((skill, idx) => (
                    <div
                      key={skill.id || idx}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border ${activeAccent.lightBorder} ${activeAccent.lightBg} text-xs font-medium ${activeAccent.text} shadow-2xs`}
                    >
                      <CheckCircle2 className="w-3 h-3 flex-shrink-0" />
                      <span>{skill.name}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Section 3: Projects */}
        <section>
          <div className="flex items-center gap-2 pb-3 mb-6 border-b border-slate-200">
            <div className={`p-2 rounded-lg ${activeAccent.lightBg} ${activeAccent.text}`}>
              <FolderGit2 className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">Key Projects</h2>
          </div>

          {projects.length === 0 ? (
            <div className="p-6 bg-white rounded-xl border border-dashed border-slate-300 text-center text-slate-400 text-sm">
              No projects added yet.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {projects.map((proj, idx) => (
                <div
                  key={proj.id || idx}
                  className={`flex flex-col justify-between p-6 bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all ${
                    proj.featured ? 'ring-2 ring-amber-400/40 relative' : ''
                  }`}
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="text-base font-bold text-slate-900 leading-snug">
                        {proj.title}
                      </h3>
                      {proj.featured && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-100 text-amber-800 flex-shrink-0">
                          <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                          Featured
                        </span>
                      )}
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                      {proj.description}
                    </p>
                  </div>

                  <div>
                    {proj.technologies && (
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {proj.technologies.split(',').map((tech, tIdx) => (
                          <span
                            key={tIdx}
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
                          className="inline-flex items-center gap-1 text-slate-700 hover:text-slate-900 font-semibold transition-colors"
                        >
                          <Github className="w-3.5 h-3.5" />
                          Code
                        </a>
                      )}
                      {proj.liveUrl && (
                        <a
                          href={proj.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className={`inline-flex items-center gap-1 ${activeAccent.text} hover:underline font-semibold ml-auto`}
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
        </section>

        {/* Section 4: Achievements & Certifications */}
        <section>
          <div className="flex items-center gap-2 pb-3 mb-6 border-b border-slate-200">
            <div className={`p-2 rounded-lg ${activeAccent.lightBg} ${activeAccent.text}`}>
              <Trophy className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">Achievements & Certifications</h2>
          </div>

          {achievements.length === 0 ? (
            <div className="p-6 bg-white rounded-xl border border-dashed border-slate-300 text-center text-slate-400 text-sm">
              No achievements or certifications listed yet.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {achievements.map((ach, idx) => (
                <div
                  key={ach.id || idx}
                  className="p-5 bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-1 mb-2">
                      <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded ${activeAccent.badge}`}>
                        {ach.category || 'Achievement'}
                      </span>
                      {ach.issueDate && (
                        <span className="text-[11px] text-slate-400 font-medium">
                          {ach.issueDate}
                        </span>
                      )}
                    </div>

                    <h3 className="text-sm font-bold text-slate-900 leading-snug">
                      {ach.title}
                    </h3>

                    {ach.issuer && (
                      <p className="text-xs font-medium text-slate-500 mt-1">
                        Issued by: {ach.issuer}
                      </p>
                    )}

                    {ach.description && (
                      <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                        {ach.description}
                      </p>
                    )}
                  </div>

                  {ach.credentialUrl && (
                    <div className="pt-3 mt-3 border-t border-slate-100">
                      <a
                        href={ach.credentialUrl}
                        target="_blank"
                        rel="noreferrer"
                        className={`inline-flex items-center gap-1 text-xs font-semibold ${activeAccent.text} hover:underline`}
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        Verify Credential
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>

      </main>

      {/* Footer */}
      <footer className="mt-16 py-8 border-t border-slate-200/80 text-center text-xs text-slate-400 bg-white">
        <p>
          Generated with <strong className="text-slate-600">Digital Portfolio Generator</strong> for Students &bull; {new Date().getFullYear()}
        </p>
      </footer>

      {/* Contact Modal */}
      {showContactModal && (
        <div className="no-print fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 animate-scale-up">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2">
                <div className={`p-2 rounded-xl ${activeAccent.lightBg} ${activeAccent.text}`}>
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">Contact {fullName}</h3>
                  <p className="text-xs text-slate-500">Reach out for internships, projects, or opportunities</p>
                </div>
              </div>
              <button
                onClick={() => setShowContactModal(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 mb-6">
              {email && (
                <div className="p-3 bg-slate-50 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs">
                    <Mail className="w-4 h-4 text-slate-400" />
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">Email</span>
                      <span className="font-semibold text-slate-800">{email}</span>
                    </div>
                  </div>
                  <a
                    href={`mailto:${email}?subject=Opportunity Inquiry via StudentFolio for ${fullName}`}
                    className={`px-3 py-1.5 ${activeAccent.bg} text-white rounded-lg text-xs font-semibold hover:opacity-90 transition-opacity`}
                  >
                    Email
                  </a>
                </div>
              )}

              {phone && (
                <div className="p-3 bg-slate-50 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs">
                    <Phone className="w-4 h-4 text-slate-400" />
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">Phone</span>
                      <span className="font-semibold text-slate-800">{phone}</span>
                    </div>
                  </div>
                  <a
                    href={`tel:${phone}`}
                    className="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-lg text-xs font-semibold transition-colors"
                  >
                    Call
                  </a>
                </div>
              )}

              {location && (
                <div className="p-3 bg-slate-50 rounded-xl flex items-center gap-2 text-xs">
                  <MapPin className="w-4 h-4 text-slate-400" />
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Location</span>
                    <span className="font-semibold text-slate-800">{location}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Social Links inside Contact Dialog */}
            {(githubUrl || linkedinUrl || websiteUrl) && (
              <div className="mb-6 pt-4 border-t border-slate-100">
                <p className="text-xs font-semibold text-slate-500 mb-2">Social & Professional Channels</p>
                <div className="flex flex-wrap gap-2 text-xs">
                  {githubUrl && (
                    <a
                      href={githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 text-white rounded-xl font-medium hover:bg-slate-800 transition-colors"
                    >
                      <Github className="w-3.5 h-3.5" />
                      GitHub
                    </a>
                  )}
                  {linkedinUrl && (
                    <a
                      href={linkedinUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors"
                    >
                      <Linkedin className="w-3.5 h-3.5" />
                      LinkedIn
                    </a>
                  )}
                  {websiteUrl && (
                    <a
                      href={websiteUrl}
                      target="_blank"
                      rel="noreferrer"
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 ${activeAccent.bg} text-white rounded-xl font-medium hover:opacity-90 transition-opacity`}
                    >
                      <Globe className="w-3.5 h-3.5" />
                      Website
                    </a>
                  )}
                </div>
              </div>
            )}

            <button
              onClick={() => setShowContactModal(false)}
              className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Client-Side Generated Scannable QR Code Modal */}
      <QrModal
        isOpen={showQrModal}
        onClose={() => setShowQrModal(false)}
        portfolio={portfolio}
        slug={portfolio?.slug}
      />
    </div>
  );
};
