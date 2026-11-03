import React, { useState } from 'react';
import { CONCEITOS_PYTHON } from '../data/pythonCode';
import { ChevronDown, ChevronUp, Lightbulb, Code2, CheckCircle2 } from 'lucide-react';

export const ExplanationsGuide: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>('funcoes');

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between pb-2 border-b border-slate-800">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Code2 className="w-5 h-5 text-sky-400" />
            Explicação dos Principais Componentes
          </h2>
          <p className="text-xs text-slate-400">
            Entenda o que cada linha de código faz e por que foi escrita dessa forma
          </p>
        </div>
        <button
          onClick={() => setExpandedId(expandedId ? null : 'funcoes')}
          className="text-xs text-sky-400 hover:text-sky-300 font-medium"
        >
          {expandedId ? 'Recolher tudo' : 'Expandir'}
        </button>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {CONCEITOS_PYTHON.map((conceito) => {
          const isExpanded = expandedId === conceito.id;

          return (
            <div
              key={conceito.id}
              className={`border rounded-xl transition-all duration-200 overflow-hidden ${
                isExpanded
                  ? 'border-sky-500/50 bg-slate-900/90 shadow-lg shadow-sky-500/5'
                  : 'border-slate-800/80 bg-slate-900/40 hover:bg-slate-900/70 hover:border-slate-700'
              }`}
            >
              <button
                onClick={() => toggleExpand(conceito.id)}
                className="w-full text-left p-4 flex items-center justify-between gap-4"
                aria-expanded={isExpanded}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-slate-100 text-sm sm:text-base">
                      {conceito.titulo}
                    </span>
                    <span className="text-[11px] font-mono font-medium px-2 py-0.5 rounded-full bg-slate-800 text-sky-300 border border-slate-700">
                      {conceito.badge}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">{conceito.subtitulo}</p>
                </div>

                <div className="text-slate-400 hover:text-white transition">
                  {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </div>
              </button>

              {isExpanded && (
                <div className="px-4 pb-4 pt-1 border-t border-slate-800/60 space-y-3 text-sm text-slate-300">
                  <p className="leading-relaxed text-slate-300">{conceito.explicacao}</p>

                  {/* Code snippet example */}
                  <div className="bg-[#0b0f19] border border-slate-800 rounded-lg p-3 font-mono text-xs text-slate-200 overflow-x-auto">
                    <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1 font-sans font-semibold">
                      Trecho em Python:
                    </div>
                    <pre className="text-sky-300">{conceito.exemploCodigo}</pre>
                  </div>

                  {/* Practical tip */}
                  <div className="flex items-start gap-2.5 bg-amber-500/10 border border-amber-500/20 rounded-lg p-3 text-xs text-amber-200/90">
                    <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-amber-300">Dica prática: </span>
                      {conceito.dicaPratica}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Summary card with learning milestones */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-900/80 border border-slate-800 rounded-xl p-4">
        <h3 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          O que você aprendeu com este projeto:
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
            <span>Como declarar funções e reutilizar código</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
            <span>Como capturar entradas do teclado com input()</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
            <span>Conversão de texto em número decimal com float()</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
            <span>Tomada de decisões inteligentes com if / elif / else</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
            <span>Tratamento seguro para divisão por zero</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
            <span>Loop contínuo com while e saída com break</span>
          </div>
        </div>
      </div>
    </div>
  );
};
