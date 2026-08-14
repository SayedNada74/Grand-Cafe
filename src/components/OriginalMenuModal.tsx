import React from 'react';
import { cafeConfig } from '../config/cafeConfig';
import { X, Download, FileText } from 'lucide-react';

interface OriginalMenuModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OriginalMenuModal: React.FC<OriginalMenuModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-cafe-espresso border border-cafe-gold/30 rounded-3xl overflow-hidden shadow-2xl flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-cafe-gold/20 bg-cafe-dark">
          <div className="flex items-center gap-3">
            <FileText className="w-5 h-5 text-cafe-gold" />
            <h3 className="text-base font-bold text-white">
              المنيو الأصلي الورقي - Grand Cafe Menu Scan
            </h3>
          </div>
          <div className="flex items-center gap-3">
            <a
              href={cafeConfig.assets.originalMenu}
              download="Grand_Cafe_Menu.jpeg"
              className="p-2 rounded-full bg-cafe-gold/15 text-cafe-gold hover:bg-cafe-gold hover:text-cafe-espresso transition-colors text-xs font-bold flex items-center gap-1.5 px-3"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">تحميل المنيو</span>
            </a>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Image Content */}
        <div className="flex-1 overflow-auto p-4 flex items-center justify-center bg-zinc-950">
          <img
            src={cafeConfig.assets.originalMenu}
            alt="Grand Cafe Original Physical Menu"
            className="max-w-full h-auto rounded-xl shadow-lg border border-white/10"
          />
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-cafe-gold/20 bg-cafe-dark text-center">
          <p className="text-xs text-cafe-warm/70">
            * جميع الأسعار المعروضة في المنيو التفاعلي بالموقع هي الأسعار الرسمية المعتمدة.
          </p>
        </div>

      </div>
    </div>
  );
};
