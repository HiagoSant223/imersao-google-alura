import React from 'react';
import { Terminal, Download, Copy, Check, Play, BookOpen } from 'lucide-react';
import { CODIGO_COMPLETO_PYTHON } from '../data/pythonCode';

interface HeaderProps {
  activeTab: 'guia' | 'terminal' | 'calculadora' | 'quiz';
  setActiveTab: (tab: 'guia' | 'terminal' | 'calculadora' | 'quiz') => void;
  onOpenHowToRun: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenHowToRun,
}) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(CODIGO_COMPLETO_PYTHON);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([CODIGO_COMPLETO_PYTHON], { type: 'text/x-python;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'calculadora.py';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-md sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between py-4 gap-4">
          
          {/* Logo & Intro */}
          <div className="flex items-center space-x-3">
            <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-blue-500 via-sky-600 to-amber-400 p-0.5 shadow-lg shadow-sky-500/10 flex items-center justify-center">
              <div className="h-full w-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Terminal className="h-6 w-6 text-sky-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold tracking-tight text-white">
                  Calculadora Python
                </h1>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-sky-500/15 text-sky-300 border border-sky-500/30">
                  Iniciante
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Guia didático, código comentado & simulador interativo de terminal
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 text-slate-200 hover:bg-slate-700 hover:text-white border border-slate-700 transition"
              title="Copiar código completo"
              aria-label="Copiar código Python completo"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5 text-slate-400" />
                  <span>Copiar .py</span>
                </>
              )}
            </button>

            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 text-slate-200 hover:bg-slate-700 hover:text-white border border-slate-700 transition"
              title="Baixar arquivo calculadora.py"
              aria-label="Baixar arquivo calculadora.py"
            >
              <Download className="h-3.5 w-3.5 text-slate-400" />
              <span>Baixar calculadora.py</span>
            </button>

            <button
              onClick={onOpenHowToRun}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-amber-500/15 text-amber-300 hover:bg-amber-500/25 border border-amber-500/30 transition"
              aria-label="Como executar no seu computador"
            >
              <BookOpen className="h-3.5 w-3.5" />
              <span>Como Executar</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <nav className="flex space-x-1 border-t border-slate-800/80 pt-2 pb-1 overflow-x-auto" aria-label="Navegação de abas">
          <button
            onClick={() => setActiveTab('guia')}
            className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-lg whitespace-nowrap transition flex items-center gap-2 ${
              activeTab === 'guia'
                ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <BookOpen className="h-4 w-4" />
            Código & Explicações
          </button>

          <button
            onClick={() => setActiveTab('terminal')}
            className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-lg whitespace-nowrap transition flex items-center gap-2 ${
              activeTab === 'terminal'
                ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Terminal className="h-4 w-4" />
            Simulador de Terminal Python
          </button>

          <button
            onClick={() => setActiveTab('calculadora')}
            className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-lg whitespace-nowrap transition flex items-center gap-2 ${
              activeTab === 'calculadora'
                ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Play className="h-4 w-4" />
            Calculadora Interativa Visual
          </button>

          <button
            onClick={() => setActiveTab('quiz')}
            className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-lg whitespace-nowrap transition flex items-center gap-2 ${
              activeTab === 'quiz'
                ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <span>🎯</span>
            Quiz de Fixação
          </button>
        </nav>
      </div>
    </header>
  );
};
