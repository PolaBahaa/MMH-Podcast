import React from 'react';

export const GlobalFooter: React.FC = () => {
  return (
    <footer className="w-full py-8 px-4 mt-auto border-t border-white/10 bg-black/40 backdrop-blur-md select-none">
      <div className="max-w-4xl mx-auto flex flex-col items-center justify-center gap-2 text-center">
        <p className="text-xs font-tajawal text-zinc-400/90 tracking-wide">
          © 2026 All Rights Reserved.
        </p>
        <div className="flex items-center justify-center gap-1.5 text-xs text-zinc-400 font-tajawal dir-ltr">
          <span className="text-zinc-500">Powered By</span>
          <span className="text-amber-300 font-bold">Pola Bahaa</span>
          <span className="text-zinc-600">•</span>
          <span className="text-amber-400/90 font-semibold">Starter Team (SPP)</span>
        </div>
      </div>
    </footer>
  );
};
