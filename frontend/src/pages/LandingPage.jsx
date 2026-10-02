import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles, GraduationCap, Code2, Trophy, Share2, Eye, ShieldCheck,
  CheckCircle, ArrowRight, Palette, Printer, Smartphone
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const LandingPage = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Navigation */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-500 text-white flex items-center justify-center shadow-md">
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="font-extrabold text-slate-900 text-lg tracking-tight">
              StudentFolio
            </span>
          </div>

          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <Link
                to="/dashboard"
                className="px-4 py-2 text-sm font-semibold text-white bg-brand-600 hover:bg-brand-700 rounded-xl shadow-sm transition-all flex items-center gap-1.5"
              >
                Go to Dashboard
                <ArrowRight className="w-4 h-4" />
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 text-sm font-semibold text-white bg-brand-600 hover:bg-brand-700 rounded-xl shadow-sm transition-all"
                >
                  Create Account
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-brand-100 text-brand-700 mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            Crafted for Students, Job Aspirants & Interns
          </span>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight sm:leading-none">
            Generate Your Professional{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-600 via-indigo-600 to-purple-600">
              Digital Portfolio
            </span>{' '}
            in Minutes
          </h1>

          <p className="mt-6 text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            No design or web development experience needed. Simply enter your education, technical skills,
            projects, and achievements. StudentFolio compiles everything into a polished, responsive web portfolio
            with a shareable link ready for recruiters.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to={isAuthenticated ? "/dashboard" : "/register"}
              className="w-full sm:w-auto px-8 py-3.5 text-base font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-2xl shadow-lg hover:shadow-brand-500/25 transition-all flex items-center justify-center gap-2 group"
            >
              Start Generating Free
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              to="/portfolio/studentdemo"
              target="_blank"
              className="w-full sm:w-auto px-6 py-3.5 text-base font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-2xl shadow-sm transition-all flex items-center justify-center gap-2"
            >
              <Eye className="w-5 h-5 text-slate-500" />
              View Sample Student Portfolio
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs font-medium text-slate-500">
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-500" />
              100% Free for Students
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-500" />
              Instant Shareable URL
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-500" />
              One-Click Print / PDF Export
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-500" />
              Privacy Toggle Control
            </span>
          </div>
        </div>
      </section>

      {/* Feature Highlights Grid */}
      <section className="bg-white py-16 border-y border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Everything You Need to Stand Out
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Designed specifically to solve the challenges student job seekers face when applying for internships and campus placements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
              <div className="p-3 bg-blue-100 text-blue-600 rounded-xl w-fit mb-4">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">Academics & Skills</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Log your degree, branch, CGPA, coursework, and organize your technical & interpersonal soft skills with proficiency tags.
              </p>
            </div>

            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
              <div className="p-3 bg-purple-100 text-purple-600 rounded-xl w-fit mb-4">
                <Code2 className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">Projects & Certifications</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Showcase personal projects, hackathon prototypes, GitHub repos, live demos, and verified credentials from Coursera, AWS, and colleges.
              </p>
            </div>

            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
              <div className="p-3 bg-emerald-100 text-emerald-600 rounded-xl w-fit mb-4">
                <Share2 className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">Share with Recruiters</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Get a clean public URL like <code className="bg-white px-1.5 py-0.5 rounded text-[11px] font-mono">/portfolio/yourname</code>.
                Turn public access on or off anytime with a single click.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Predefined Themes Showcase */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex p-3 bg-brand-50 text-brand-600 rounded-2xl mb-4">
            <Palette className="w-6 h-6" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Professional Predefined Themes
          </h2>
          <p className="mt-2 text-sm text-slate-500 max-w-xl mx-auto">
            Switch between Modern Tech, Elegant Classic, and Minimal layouts with personalized accent palettes to match your style.
          </p>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <div className="h-2 w-full bg-indigo-500 rounded-full mb-3" />
              <h4 className="font-bold text-sm text-slate-900">Modern Tech</h4>
              <p className="text-xs text-slate-500 mt-1">High-impact card grids with badges, social links, and tech pills.</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <div className="h-2 w-full bg-emerald-500 rounded-full mb-3" />
              <h4 className="font-bold text-sm text-slate-900">Creative Showcase</h4>
              <p className="text-xs text-slate-500 mt-1">Vibrant accent highlights, starred projects, and verified badge timelines.</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <div className="h-2 w-full bg-slate-600 rounded-full mb-3" />
              <h4 className="font-bold text-sm text-slate-900">Minimal Clean</h4>
              <p className="text-xs text-slate-500 mt-1">Timeless academic typography, stark contrast, and print-optimized structure.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto bg-white border-t border-slate-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} Digital Portfolio Generator for Students. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link to="/login" className="hover:text-slate-800 transition-colors">Sign In</Link>
            <Link to="/register" className="hover:text-slate-800 transition-colors">Register</Link>
            <Link to="/portfolio/studentdemo" className="hover:text-slate-800 transition-colors">Demo Portfolio</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};
