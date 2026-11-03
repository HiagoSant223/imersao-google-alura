import React from 'react';
import { X, Terminal, Monitor, Sparkles, Check, ExternalLink } from 'lucide-react';

interface HowToRunModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HowToRunModal: React.FC<HowToRunModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full p-6 shadow-2xl overflow-y-auto max-h-[90vh]">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
          <div className="flex items-center gap-2">
            <Terminal className="w-5 h-5 text-amber-400" />
            <h2 id="modal-title" className="text-lg font-bold text-white">
              Como Executar o Código no seu Computador
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
            aria-label="Fechar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4 text-xs sm:text-sm text-slate-300">
          {/* Passo 1 */}
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
            <h3 className="font-semibold text-white text-sm mb-1 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-sky-500/20 text-sky-400 font-bold flex items-center justify-center text-xs">
                1
              </span>
              Verifique se você tem o Python instalado
            </h3>
            <p className="text-slate-400 text-xs mb-2">
              Abra o Prompt de Comando (CMD no Windows) ou Terminal (Mac/Linux) e digite:
            </p>
            <div className="bg-[#0b0f19] px-3 py-2 rounded-lg font-mono text-xs text-amber-300">
              python --version
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              Se aparecer algo como <code>Python 3.10+</code>, já está tudo pronto! Se não, baixe no site oficial:{' '}
              <span className="text-sky-400 font-mono">python.org</span> (não esqueça de marcar a opção "Add Python to PATH" no instalador do Windows).
            </p>
          </div>

          {/* Passo 2 */}
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
            <h3 className="font-semibold text-white text-sm mb-1 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-sky-500/20 text-sky-400 font-bold flex items-center justify-center text-xs">
                2
              </span>
              Crie o arquivo calculadora.py
            </h3>
            <p className="text-slate-400 text-xs">
              Você pode clicar no botão <strong>"Baixar calculadora.py"</strong> no topo desta página, ou criar um arquivo novo no VS Code ou Bloco de Notas e colar o código.
            </p>
          </div>

          {/* Passo 3 */}
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
            <h3 className="font-semibold text-white text-sm mb-1 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-sky-500/20 text-sky-400 font-bold flex items-center justify-center text-xs">
                3
              </span>
              Execute no Terminal
            </h3>
            <p className="text-slate-400 text-xs mb-2">
              Navegue até a pasta onde salvou o arquivo e digite:
            </p>
            <div className="bg-[#0b0f19] px-3 py-2 rounded-lg font-mono text-xs text-emerald-300">
              python calculadora.py
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              (No Mac ou Linux, pode ser necessário digitar <code>python3 calculadora.py</code>)
            </p>
          </div>

          {/* Alternativa Online: Colab */}
          <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-xl text-xs text-amber-200">
            <h4 className="font-semibold text-amber-300 mb-1 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-400" />
              Não quer instalar nada agora? Use o Google Colab!
            </h4>
            <p className="text-amber-200/90 leading-relaxed">
              Você pode acessar <strong>colab.research.google.com</strong>, criar um novo notebook, colar o código em uma célula e clicar em Play. O Python executa diretamente na nuvem!
            </p>
          </div>

          {/* Desafios para praticar */}
          <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800">
            <h4 className="font-semibold text-white text-xs mb-2">
              💡 Desafios para quem está aprendendo:
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-300 list-disc list-inside">
              <li>Adicionar uma operação de exponenciação (potência) usando o operador <code>**</code>.</li>
              <li>Adicionar cálculo de porcentagem ou resto da divisão inteira com <code>%</code>.</li>
              <li>Salvar as contas realizadas em uma lista para exibir um histórico.</li>
            </ul>
          </div>
        </div>

        <div className="mt-5 pt-3 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold transition"
          >
            Entendido, fechar guia
          </button>
        </div>
      </div>
    </div>
  );
};
