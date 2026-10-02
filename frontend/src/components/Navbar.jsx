import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Sparkles, Eye, LogOut, Menu, X, ExternalLink,
  User, LayoutDashboard, GraduationCap, Wrench, FolderGit2, Trophy, Palette
} from 'lucide-react';

export const Navbar = ({ activeTab, setActiveTab }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSignOut = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'skills', label: 'Skills', icon: Wrench },
    { id: 'projects', label: 'Projects', icon: FolderGit2 },
    { id: 'achievements', label: 'Achievements', icon: Trophy },
    { id: 'preview', label: 'Portfolio Preview', icon: Palette },
  ];

  const initials = user?.fullName
    ? user.fullName.split(' ').map((n) => n[0]).slice(0, 2).join('').toUpperCase()
    : 'ST';

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <Link to="/dashboard" className="flex items-center gap-2 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-500 text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="leading-tight">
                <span className="font-extrabold text-slate-900 text-base tracking-tight block">
                  StudentFolio
                </span>
                <span className="text-[10px] text-slate-400 font-medium block">
                  Portfolio Generator
                </span>
              </div>
            </Link>

            {/* In dashboard: quick tab buttons for larger screens */}
            {location.pathname === '/dashboard' && (
              <div className="hidden xl:flex items-center gap-1 ml-6 border-l border-slate-200 pl-4">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                        isActive
                          ? 'bg-brand-50 text-brand-700'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      {item.label}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Right Action buttons */}
          <div className="hidden sm:flex items-center gap-3">
            {user?.slug && (
              <a
                href={`/portfolio/${user.slug}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all"
                title="Open public portfolio link in new tab"
              >
                <Eye className="w-3.5 h-3.5 text-slate-500" />
                Live Portfolio
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>
            )}

            <div className="h-5 w-px bg-slate-200" />

            {/* User profile dropdown info */}
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-brand-600 text-white flex items-center justify-center font-bold text-xs shadow-sm">
                {initials}
              </div>
              <div className="text-left text-xs hidden md:block">
                <p className="font-semibold text-slate-800 leading-tight">{user?.fullName || 'Student'}</p>
                <p className="text-[10px] text-slate-400 truncate max-w-[120px]">{user?.email}</p>
              </div>
            </div>

            <button
              onClick={handleSignOut}
              className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors ml-1"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile hamburger toggle */}
          <div className="sm:hidden flex items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-4 space-y-2">
          {/* User profile details in mobile */}
          <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl mb-3">
            <div className="w-10 h-10 rounded-full bg-brand-600 text-white flex items-center justify-center font-bold text-sm">
              {initials}
            </div>
            <div>
              <p className="font-bold text-sm text-slate-900">{user?.fullName}</p>
              <p className="text-xs text-slate-500">{user?.email}</p>
            </div>
          </div>

          {location.pathname === '/dashboard' && (
            <div className="space-y-1">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2 py-1">
                Dashboard Sections
              </p>
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                      isActive ? 'bg-brand-50 text-brand-700 font-bold' : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </button>
                );
              })}
            </div>
          )}

          <div className="pt-2 border-t border-slate-100 space-y-1">
            {user?.slug && (
              <a
                href={`/portfolio/${user.slug}`}
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <Eye className="w-4 h-4 text-slate-500" />
                  View Public Portfolio
                </span>
                <ExternalLink className="w-4 h-4 text-slate-400" />
              </a>
            )}

            <button
              onClick={handleSignOut}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium text-rose-600 hover:bg-rose-50 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
