import React, { useState, useEffect } from 'react';
import { X, Sparkles, Wrench, Users, Plus } from 'lucide-react';

const COMMON_TECH_SUGGESTIONS = [
  'Java', 'Spring Boot', 'React.js', 'MySQL', 'Python', 'JavaScript', 
  'TypeScript', 'HTML/CSS', 'Tailwind CSS', 'Docker', 'Git', 'REST APIs', 
  'Node.js', 'C++', 'PostgreSQL', 'Data Structures', 'AWS'
];

const COMMON_SOFT_SUGGESTIONS = [
  'Problem Solving', 'Team Collaboration', 'Communication', 'Adaptability',
  'Time Management', 'Critical Thinking', 'Leadership', 'Presentation', 'Work Ethic'
];

export const SkillModal = ({ isOpen, onClose, onSave, initialData, defaultCategory = 'TECHNICAL' }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: 'TECHNICAL',
    proficiencyLevel: 'Intermediate',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        category: initialData.category || 'TECHNICAL',
        proficiencyLevel: initialData.proficiencyLevel || 'Intermediate',
      });
    } else {
      setFormData({
        name: '',
        category: defaultCategory,
        proficiencyLevel: 'Intermediate',
      });
    }
    setErrors({});
  }, [initialData, isOpen, defaultCategory]);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Skill name is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSave(formData);
  };

  const handleSuggestionClick = (name) => {
    setFormData((prev) => ({ ...prev, name }));
    if (errors.name) {
      setErrors((prev) => ({ ...prev, name: null }));
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100 my-8">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-brand-50 text-brand-600 rounded-xl">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                {initialData ? 'Edit Skill' : 'Add New Skill'}
              </h2>
              <p className="text-xs text-slate-500">Showcase your technical and interpersonal strengths</p>
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
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
              Skill Category *
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, category: 'TECHNICAL' })}
                className={`flex items-center justify-center gap-2 py-2 px-3 rounded-xl border text-sm font-medium transition-all ${
                  formData.category === 'TECHNICAL'
                    ? 'border-brand-500 bg-brand-50 text-brand-700 font-semibold shadow-sm'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Wrench className="w-4 h-4" />
                Technical
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, category: 'SOFT' })}
                className={`flex items-center justify-center gap-2 py-2 px-3 rounded-xl border text-sm font-medium transition-all ${
                  formData.category === 'SOFT'
                    ? 'border-brand-500 bg-brand-50 text-brand-700 font-semibold shadow-sm'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Users className="w-4 h-4" />
                Soft Skill
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
              Skill Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder={formData.category === 'TECHNICAL' ? 'e.g. React.js, Java, MySQL' : 'e.g. Leadership, Problem Solving'}
              className={`w-full px-3 py-2 text-sm border rounded-xl focus:ring-2 focus:outline-none transition-all ${
                errors.name
                  ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-200'
                  : 'border-slate-200 focus:border-brand-500 focus:ring-brand-200'
              }`}
            />
            {errors.name && <p className="text-xs text-rose-500 mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
              Quick Suggestions
            </label>
            <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto p-1.5 bg-slate-50 rounded-xl border border-slate-100">
              {(formData.category === 'TECHNICAL' ? COMMON_TECH_SUGGESTIONS : COMMON_SOFT_SUGGESTIONS).map((sugg) => (
                <button
                  key={sugg}
                  type="button"
                  onClick={() => handleSuggestionClick(sugg)}
                  className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 hover:border-brand-400 hover:text-brand-600 hover:bg-brand-50 transition-all"
                >
                  <Plus className="w-3 h-3 text-slate-400" />
                  {sugg}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
              Proficiency Level
            </label>
            <select
              value={formData.proficiencyLevel}
              onChange={(e) => setFormData({ ...formData, proficiencyLevel: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:border-brand-500 focus:ring-brand-200 outline-none bg-white"
            >
              <option value="Beginner">Beginner (Foundational)</option>
              <option value="Intermediate">Intermediate (Working knowledge)</option>
              <option value="Advanced">Advanced (Hands-on experience)</option>
              <option value="Expert">Expert (Specialist / Proficient)</option>
            </select>
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
              {initialData ? 'Save Changes' : 'Add Skill'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
