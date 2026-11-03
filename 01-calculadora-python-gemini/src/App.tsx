/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { CodeViewer } from './components/CodeViewer';
import { ExplanationsGuide } from './components/ExplanationsGuide';
import { TerminalSimulator } from './components/TerminalSimulator';
import { InteractiveCalculator } from './components/InteractiveCalculator';
import { BeginnerQuiz } from './components/BeginnerQuiz';
import { HowToRunModal } from './components/HowToRunModal';
import { Sparkles, Terminal, Code2, Play, BookOpen, Layers } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'guia' | 'terminal' | 'calculadora' | 'quiz'>('guia');
  const [isHowToRunOpen, setIsHowToRunOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-sky-500/30 selection:text-sky-200">
      {/* Top Navigation */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenHowToRun={() => setIsHowToRunOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Banner Hero for Beginners */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-sky-950/40 to-slate-900 border border-slate-800 p-6 sm:p-8 shadow-xl">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="max-w-2xl space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-sky-500/10 text-sky-400 border border-sky-500/20">
                <Sparkles className="w-3.5 h-3.5" />
                Guia Completo para Quem Está Começando
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                Calculadora Simples com as 4 Operações em Python
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                Aprenda a estruturar um programa limpo e profissional em Python: aprenda a criar funções (<code className="text-sky-300 bg-slate-800/80 px-1 py-0.5 rounded">def</code>), interagir com o usuário (<code className="text-sky-300 bg-slate-800/80 px-1 py-0.5 rounded">input</code>), evitar quebras por divisão por zero e testar o código no terminal interativo.
              </p>
            </div>

            {/* Quick Stat Badges */}
            <div className="grid grid-cols-2 gap-2 sm:gap-3 shrink-0">
              <div className="bg-slate-950/70 border border-slate-800 p-3 rounded-xl text-center">
                <span className="block text-lg font-bold text-sky-400 font-mono">+ − × ÷</span>
                <span className="text-[11px] text-slate-400">4 Operações</span>
              </div>
              <div className="bg-slate-950/70 border border-slate-800 p-3 rounded-xl text-center">
                <span className="block text-lg font-bold text-amber-400 font-mono">Python 3</span>
                <span className="text-[11px] text-slate-400">Sintaxe Moderna</span>
              </div>
              <div className="bg-slate-950/70 border border-slate-800 p-3 rounded-xl text-center">
                <span className="block text-lg font-bold text-emerald-400 font-mono">try/except</span>
                <span className="text-[11px] text-slate-400">Sem Travar</span>
              </div>
              <div className="bg-slate-950/70 border border-slate-800 p-3 rounded-xl text-center">
                <span className="block text-lg font-bold text-pink-400 font-mono">while True</span>
                <span className="text-[11px] text-slate-400">Menu Contínuo</span>
              </div>
            </div>
          </div>
        </section>

        {/* Tab 1: Código & Explicações */}
        {activeTab === 'guia' && (
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
            <div className="xl:col-span-7 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Code2 className="w-5 h-5 text-sky-400" />
                  Código Fonte em Python
                </h3>
                <span className="text-xs text-slate-400">
                  Comente cada linha para fixar o aprendizado
                </span>
              </div>
              <CodeViewer />
            </div>

            <div className="xl:col-span-5">
              <ExplanationsGuide />
            </div>
          </div>
        )}

        {/* Tab 2: Simulador de Terminal Python */}
        {activeTab === 'terminal' && (
          <div className="space-y-4 max-w-4xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Terminal className="w-5 h-5 text-emerald-400" />
                  Terminal Python Interativo
                </h3>
                <p className="text-xs text-slate-400">
                  Teste o código em tempo real diretamente no navegador, exatamente como rodaria no seu computador.
                </p>
              </div>
            </div>
            <TerminalSimulator />
          </div>
        )}

        {/* Tab 3: Calculadora Visual */}
        {activeTab === 'calculadora' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Play className="w-5 h-5 text-sky-400" />
                  Calculadora Visual & Mapeamento Python
                </h3>
                <p className="text-xs text-slate-400">
                  Clique nos botões e veja instantaneamente como o código Python processa cada operação.
                </p>
              </div>
            </div>
            <InteractiveCalculator />
          </div>
        )}

        {/* Tab 4: Quiz de Fixação */}
        {activeTab === 'quiz' && (
          <div className="space-y-4">
            <div className="text-center max-w-md mx-auto mb-2">
              <h3 className="text-lg font-bold text-white">Quiz de Fixação Python</h3>
              <p className="text-xs text-slate-400">
                Responda a 4 perguntas rápidas e veja se você absorveu os principais conceitos!
              </p>
            </div>
            <BeginnerQuiz />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span>🐍 Calculadora Python para Iniciantes</span>
            <span>•</span>
            <span>Soma, Subtração, Multiplicação, Divisão e Porcentagem</span>
          </div>
          <div>
            Desenvolvido com foco didático para quem está aprendendo a programar.
          </div>
        </div>
      </footer>

      {/* How to run modal */}
      <HowToRunModal
        isOpen={isHowToRunOpen}
        onClose={() => setIsHowToRunOpen(false)}
      />
    </div>
  );
}
