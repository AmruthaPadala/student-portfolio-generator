import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const Toast = ({ toast, onClose }) => {
  if (!toast) return null;

  const isSuccess = toast.type === 'success';
  const isError = toast.type === 'error';

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-md animate-bounce-in shadow-2xl rounded-xl overflow-hidden border transition-all">
      <div
        className={`flex items-start gap-3 p-4 ${
          isSuccess
            ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
            : isError
            ? 'bg-rose-50 border-rose-200 text-rose-900'
            : 'bg-indigo-50 border-indigo-200 text-indigo-900'
        }`}
      >
        <div className="flex-shrink-0 mt-0.5">
          {isSuccess && <CheckCircle2 className="w-5 h-5 text-emerald-600" />}
          {isError && <AlertCircle className="w-5 h-5 text-rose-600" />}
          {!isSuccess && !isError && <Info className="w-5 h-5 text-indigo-600" />}
        </div>
        <div className="flex-1 pr-2">
          {toast.title && <p className="font-semibold text-sm">{toast.title}</p>}
          <p className="text-sm leading-snug">{toast.message}</p>
        </div>
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-slate-600 p-1 rounded-md transition-colors"
          aria-label="Close notification"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
