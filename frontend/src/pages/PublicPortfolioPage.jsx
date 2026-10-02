import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../services/api';
import { PortfolioRenderer } from '../components/PortfolioRenderer';
import {
  Lock, AlertCircle, ArrowLeft, Sparkles, Printer, UserX, Loader2
} from 'lucide-react';

export const PublicPortfolioPage = () => {
  const { slug } = useParams();
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPortfolio = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await api.public.getPortfolio(slug);
        setPortfolio(data);
      } catch (err) {
        setError(err.message || 'Portfolio not found or public access has been disabled by the student.');
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchPortfolio();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center">
        <Loader2 className="w-10 h-10 text-brand-600 animate-spin mb-4" />
        <h2 className="text-lg font-bold text-slate-800">Loading Portfolio...</h2>
        <p className="text-xs text-slate-500 mt-1">Fetching student records and achievements</p>
      </div>
    );
  }

  if (error || !portfolio) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-slate-200 shadow-xl">
          <div className="w-14 h-14 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Lock className="w-7 h-7" />
          </div>

          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Portfolio Not Available
          </h1>

          <p className="text-sm text-slate-600 mt-3 leading-relaxed">
            {error || "This student's portfolio is currently set to private or does not exist."}
          </p>

          <div className="mt-6 flex flex-col gap-3">
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-sm font-semibold transition-all shadow-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Go to Home Page
            </Link>

            <Link
              to="/register"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-sm font-semibold transition-all"
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
              Build Your Own Portfolio Free
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Non-print Top Notice Bar */}
      <div className="no-print bg-slate-900 text-slate-200 text-xs py-2.5 px-4 sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Viewing Verified Student Portfolio: <strong>{portfolio.fullName}</strong></span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-1 px-3 py-1 bg-white/10 hover:bg-white/20 rounded-lg text-white font-medium transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              Print / Save PDF
            </button>

            <Link
              to="/register"
              className="inline-flex items-center gap-1 px-3 py-1 bg-brand-600 hover:bg-brand-500 rounded-lg text-white font-semibold transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              Create Yours Free
            </Link>
          </div>
        </div>
      </div>

      {/* Render Assembled Portfolio */}
      <PortfolioRenderer
        portfolio={portfolio}
        theme={portfolio.themeTemplate}
        accentColor={portfolio.accentColor}
        isPublicView={true}
      />
    </div>
  );
};
