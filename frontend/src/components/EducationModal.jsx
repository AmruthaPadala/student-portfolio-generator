import React, { useState, useEffect } from 'react';
import { X, GraduationCap, Calendar, Building, Award, BookOpen } from 'lucide-react';

export const EducationModal = ({ isOpen, onClose, onSave, initialData }) => {
  const [formData, setFormData] = useState({
    institution: '',
    degree: '',
    fieldOfStudy: '',
    startYear: '',
    graduationYear: '',
    grade: '',
    description: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        institution: initialData.institution || '',
        degree: initialData.degree || '',
        fieldOfStudy: initialData.fieldOfStudy || '',
        startYear: initialData.startYear || '',
        graduationYear: initialData.graduationYear || '',
        grade: initialData.grade || '',
        description: initialData.description || '',
      });
    } else {
      setFormData({
        institution: '',
        degree: '',
        fieldOfStudy: '',
        startYear: new Date().getFullYear() - 3,
        graduationYear: new Date().getFullYear() + 1,
        grade: '',
        description: '',
      });
    }
    setErrors({});
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors = {};
    if (!formData.institution.trim()) {
      newErrors.institution = 'College or University name is required';
    }
    if (!formData.degree.trim()) {
      newErrors.degree = 'Degree (e.g. B.Tech, B.Sc) is required';
    }
    if (!formData.fieldOfStudy.trim()) {
      newErrors.fieldOfStudy = 'Branch or Specialization is required';
    }
    if (!formData.graduationYear) {
      newErrors.graduationYear = 'Graduation year is required';
    } else {
      const year = Number(formData.graduationYear);
      if (isNaN(year) || year < 1970 || year > 2040) {
        newErrors.graduationYear = 'Please provide a valid graduation year (e.g. 2026)';
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    onSave({
      ...formData,
      startYear: formData.startYear ? Number(formData.startYear) : null,
      graduationYear: Number(formData.graduationYear),
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 my-8">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-brand-50 text-brand-600 rounded-xl">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                {initialData ? 'Edit Education' : 'Add Education'}
              </h2>
              <p className="text-xs text-slate-500">Record your college, degree, and specialization</p>
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
              College / University / School *
            </label>
            <div className="relative">
              <Building className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                value={formData.institution}
                onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                placeholder="e.g. National Institute of Technology"
                className={`w-full pl-9 pr-3 py-2 text-sm border rounded-xl focus:ring-2 focus:outline-none transition-all ${
                  errors.institution
                    ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-200'
                    : 'border-slate-200 focus:border-brand-500 focus:ring-brand-200'
                }`}
              />
            </div>
            {errors.institution && (
              <p className="text-xs text-rose-500 mt-1">{errors.institution}</p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                Degree *
              </label>
              <div className="relative">
                <Award className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  value={formData.degree}
                  onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                  placeholder="e.g. Bachelor of Technology"
                  className={`w-full pl-9 pr-3 py-2 text-sm border rounded-xl focus:ring-2 focus:outline-none transition-all ${
                    errors.degree
                      ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-200'
                      : 'border-slate-200 focus:border-brand-500 focus:ring-brand-200'
                  }`}
                />
              </div>
              {errors.degree && (
                <p className="text-xs text-rose-500 mt-1">{errors.degree}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                Branch / Specialization *
              </label>
              <div className="relative">
                <BookOpen className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  value={formData.fieldOfStudy}
                  onChange={(e) => setFormData({ ...formData, fieldOfStudy: e.target.value })}
                  placeholder="e.g. Computer Science"
                  className={`w-full pl-9 pr-3 py-2 text-sm border rounded-xl focus:ring-2 focus:outline-none transition-all ${
                    errors.fieldOfStudy
                      ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-200'
                      : 'border-slate-200 focus:border-brand-500 focus:ring-brand-200'
                  }`}
                />
              </div>
              {errors.fieldOfStudy && (
                <p className="text-xs text-rose-500 mt-1">{errors.fieldOfStudy}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                Start Year
              </label>
              <input
                type="number"
                value={formData.startYear}
                onChange={(e) => setFormData({ ...formData, startYear: e.target.value })}
                placeholder="2022"
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:border-brand-500 focus:ring-brand-200 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                Graduation Year *
              </label>
              <input
                type="number"
                value={formData.graduationYear}
                onChange={(e) => setFormData({ ...formData, graduationYear: e.target.value })}
                placeholder="2026"
                className={`w-full px-3 py-2 text-sm border rounded-xl focus:ring-2 outline-none ${
                  errors.graduationYear
                    ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-200'
                    : 'border-slate-200 focus:border-brand-500 focus:ring-brand-200'
                }`}
              />
              {errors.graduationYear && (
                <p className="text-xs text-rose-500 mt-1">{errors.graduationYear}</p>
              )}
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                CGPA / Grade
              </label>
              <input
                type="text"
                value={formData.grade}
                onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                placeholder="e.g. 8.8 CGPA"
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:border-brand-500 focus:ring-brand-200 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
              Description / Relevant Coursework (Optional)
            </label>
            <textarea
              rows="3"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="e.g. Relevant courses: Data Structures, Operating Systems, Computer Networks. Active member of Coding Club."
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
              {initialData ? 'Save Changes' : 'Add Education'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
