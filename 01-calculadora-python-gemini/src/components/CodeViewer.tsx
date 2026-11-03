import React, { useState } from 'react';
import { Copy, Check, Sparkles, FileCode } from 'lucide-react';
import { CODIGO_COMPLETO_PYTHON, CODIGO_MINIMALISTA_PYTHON } from '../data/pythonCode';

export const CodeViewer: React.FC = () => {
  const [version, setVersion] = useState<'completa' | 'minimalista'>('completa');
  const [copied, setCopied] = useState(false);

  const currentCode = version === 'completa' ? CODIGO_COMPLETO_PYTHON : CODIGO_MINIMALISTA_PYTHON;

  const handleCopy = () => {
    navigator.clipboard.writeText(currentCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = currentCode.trim().split('\n');

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
      {/* Top Bar */}
      <div className="bg-slate-950/80 px-4 py-3 border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1.5 mr-2">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
          </div>
          <FileCode className="w-4 h-4 text-sky-400" />
          <span className="text-xs font-mono font-medium text-slate-300">
            {version === 'completa' ? 'calculadora_completa.py' : 'calculadora_minimalista.py'}
          </span>
          <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded border border-slate-700">
            Python 3
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Toggle Version */}
          <div className="inline-flex rounded-lg bg-slate-900 p-0.5 border border-slate-800 text-xs">
            <button
              onClick={() => setVersion('completa')}
              className={`px-2.5 py-1 rounded-md transition font-medium ${
                version === 'completa'
                  ? 'bg-sky-500 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Versão Completa (Recomendada)
            </button>
            <button
              onClick={() => setVersion('minimalista')}
              className={`px-2.5 py-1 rounded-md transition font-medium ${
                version === 'minimalista'
                  ? 'bg-sky-500 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Versão Minimalista
            </button>
          </div>

          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg border border-slate-700 transition"
            aria-label="Copiar código Python"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copiado</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-400" />
                <span>Copiar</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Code Area with line numbers */}
      <div className="p-4 overflow-x-auto max-h-[550px] font-mono text-xs sm:text-sm leading-relaxed bg-[#0d1117] text-slate-300 scrollbar-thin">
        <table className="w-full border-collapse">
          <tbody>
            {lines.map((line, idx) => {
              const isComment = line.trim().startsWith('#');
              const isDef = line.trim().startsWith('def ');
              const isIfElif = line.trim().startsWith('if ') || line.trim().startsWith('elif ') || line.trim().startsWith('else:');
              const isTry = line.trim().startsWith('try:') || line.trim().startsWith('except');
              const isWhile = line.trim().startsWith('while ');
              const isReturn = line.includes('return ');
              const isDocstring = line.trim().startsWith('"""') || line.trim().endsWith('"""');

              return (
                <tr key={idx} className="hover:bg-slate-800/40 transition-colors">
                  <td className="select-none text-right pr-4 text-slate-600 text-xs w-10 align-top">
                    {idx + 1}
                  </td>
                  <td className="whitespace-pre">
                    {isComment ? (
                      <span className="text-emerald-400/90 italic">{line}</span>
                    ) : isDocstring ? (
                      <span className="text-amber-300/80 italic">{line}</span>
                    ) : isDef ? (
                      <span>
                        <span className="text-pink-400 font-semibold">def </span>
                        <span className="text-sky-300 font-medium">
                          {line.replace(/^\s*def\s+/, '')}
                        </span>
                      </span>
                    ) : isIfElif ? (
                      <span className="text-amber-300 font-semibold">{line}</span>
                    ) : isTry ? (
                      <span className="text-purple-400 font-semibold">{line}</span>
                    ) : isWhile ? (
                      <span className="text-cyan-400 font-semibold">{line}</span>
                    ) : isReturn ? (
                      <span>
                        {line.split('return')[0]}
                        <span className="text-rose-400 font-semibold">return</span>
                        {line.split('return')[1]}
                      </span>
                    ) : (
                      <span>{line}</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Footer Info Box */}
      <div className="bg-slate-950/90 px-4 py-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>
            {version === 'completa'
              ? 'Código estruturado em funções com validação de divisão por zero e prevenção de erros.'
              : 'Código linear compacto para quem acabou de instalar o Python.'}
          </span>
        </div>
        <span className="hidden sm:inline text-slate-500">
          {lines.length} linhas de código
        </span>
      </div>
    </div>
  );
};
