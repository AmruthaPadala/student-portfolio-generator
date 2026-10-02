import React, { useState, useEffect } from 'react';
import { X, Trophy, ExternalLink, Calendar, Building, FileText } from 'lucide-react';

export const AchievementModal = ({ isOpen, onClose, onSave, initialData }) => {
  const [formData, setFormData] = useState({
    title: '',
    category: 'CERTIFICATION',
    issuer: '',
    issueDate: '',
    description: '',
    credentialUrl: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        category: initialData.category || 'CERTIFICATION',
        issuer: initialData.issuer || '',
        issueDate: initialData.issueDate || '',
        description: initialData.description || '',
        credentialUrl: initialData.credentialUrl || '',
      });
    } else {
      setFormData({
        title: '',
        category: 'CERTIFICATION',
        issuer: '',
        issueDate: '',
        description: '',
        credentialUrl: '',
      });
    }
    setErrors({});
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) {
      newErrors.title = 'Title or Honor name is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 my-8">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-brand-50 text-brand-600 rounded-xl">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                {initialData ? 'Edit Achievement' : 'Add Achievement'}
              </h2>
              <p className="text-xs text-slate-500">Showcase certifications, awards, hackathons & workshops</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:border-brand-500 focus:ring-brand-200 outline-none bg-white"
            >
              <option value="CERTIFICATION">Certification</option>
              <option value="AWARD">Award / Honor</option>
              <option value="HACKATHON">Hackathon / Competition</option>
              <option value="WORKSHOP">Workshop / Bootcamp</option>
              <option value="OTHER">Other Achievement</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
              Title / Achievement Name *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. AWS Certified Cloud Practitioner"
              className={`w-full px-3 py-2 text-sm border rounded-xl focus:ring-2 focus:outline-none transition-all ${
                errors.title
                  ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-200'
                  : 'border-slate-200 focus:border-brand-500 focus:ring-brand-200'
              }`}
            />
            {errors.title && <p className="text-xs text-rose-500 mt-1">{errors.title}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                Issuing Organization
              </label>
              <div className="relative">
                <Building className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  value={formData.issuer}
                  onChange={(e) => setFormData({ ...formData, issuer: e.target.value })}
                  placeholder="e.g. Amazon Web Services"
                  className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:border-brand-500 focus:ring-brand-200 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                Date / Period
              </label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  value={formData.issueDate}
                  onChange={(e) => setFormData({ ...formData, issueDate: e.target.value })}
                  placeholder="e.g. Nov 2025"
                  className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:border-brand-500 focus:ring-brand-200 outline-none"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
              Credential / Verification URL
            </label>
            <div className="relative">
              <ExternalLink className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="url"
                value={formData.credentialUrl}
                onChange={(e) => setFormData({ ...formData, credentialUrl: e.target.value })}
                placeholder="https://coursera.org/verify/..."
                className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:border-brand-500 focus:ring-brand-200 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
              Description (Optional)
            </label>
            <textarea
              rows="3"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Key topics covered, rank achieved, or project created during the workshop/hackathon..."
              className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:border-brand-500 focus:ring-brand-200 outline-none"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-sm font-semibold text-white bg-brand-600 hover:bg-brand-700 rounded-xl shadow-sm transition-all"
            >
              {initialData ? 'Save Changes' : 'Add Achievement'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
