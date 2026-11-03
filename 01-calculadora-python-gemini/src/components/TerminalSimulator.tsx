import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, Play, RotateCcw, CornerDownLeft, Sparkles } from 'lucide-react';
import { executarOperacao } from '../utils/calculator';

interface TerminalLine {
  id: string;
  type: 'system' | 'input' | 'output' | 'error' | 'success' | 'highlight';
  text: string;
  pythonLine?: string;
}

export const TerminalSimulator: React.FC = () => {
  const [lines, setLines] = useState<TerminalLine[]>([
    { id: '1', type: 'system', text: '========================================' },
    { id: '2', type: 'system', text: '      CALCULADORA SIMPLES EM PYTHON     ' },
    { id: '3', type: 'system', text: '========================================' },
    { id: '4', type: 'system', text: 'Escolha a operação:' },
    { id: '5', type: 'system', text: '1 - Soma (+)' },
    { id: '6', type: 'system', text: '2 - Subtração (-)' },
    { id: '7', type: 'system', text: '3 - Multiplicação (*)' },
    { id: '8', type: 'system', text: '4 - Divisão (/)' },
    { id: '9', type: 'system', text: '5 - Porcentagem (%)' },
    { id: '10', type: 'system', text: '6 - Sair do programa' },
  ]);

  // Terminal state:
  // 'menu' -> waiting for option 1-5
  // 'num1' -> waiting for first number
  // 'num2' -> waiting for second number
  // 'ended' -> exit requested
  const [step, setStep] = useState<'menu' | 'num1' | 'num2' | 'ended'>('menu');
  const [selectedOp, setSelectedOp] = useState<string>('1');
  const [firstNum, setFirstNum] = useState<number>(0);
  const [inputVal, setInputVal] = useState<string>('');
  const [lastTrace, setLastTrace] = useState<string>('while True: (Aguardando opção do menu)');

  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines]);

  const getPromptText = () => {
    switch (step) {
      case 'menu':
        return 'Digite sua opção (1-5): ';
      case 'num1':
        return 'Digite o primeiro número: ';
      case 'num2':
        return 'Digite o segundo número: ';
      case 'ended':
        return '[Programa finalizado] ';
    }
  };

  const handleRestart = () => {
    setLines([
      { id: '1', type: 'system', text: '========================================' },
      { id: '2', type: 'system', text: '      CALCULADORA SIMPLES EM PYTHON     ' },
      { id: '3', type: 'system', text: '========================================' },
      { id: '4', type: 'system', text: 'Escolha a operação:' },
      { id: '5', type: 'system', text: '1 - Soma (+)' },
      { id: '6', type: 'system', text: '2 - Subtração (-)' },
      { id: '7', type: 'system', text: '3 - Multiplicação (*)' },
      { id: '8', type: 'system', text: '4 - Divisão (/)' },
      { id: '9', type: 'system', text: '5 - Porcentagem (%)' },
      { id: '10', type: 'system', text: '6 - Sair do programa' },
    ]);
    setStep('menu');
    setSelectedOp('1');
    setFirstNum(0);
    setInputVal('');
    setLastTrace('while True: (Aguardando opção do menu)');
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const raw = inputVal.trim();
    if (!raw && step !== 'ended') return;

    if (step === 'ended') {
      handleRestart();
      return;
    }

    // Append user input line
    const userLine: TerminalLine = {
      id: Date.now().toString(),
      type: 'input',
      text: `${getPromptText()}${raw}`,
    };

    if (step === 'menu') {
      if (raw === '6') {
        setLines((prev) => [
          ...prev,
          userLine,
          {
            id: (Date.now() + 1).toString(),
            type: 'highlight',
            text: '\nEncerrando a calculadora. Bons estudos em Python!',
            pythonLine: 'break  # Interrompe o loop',
          },
        ]);
        setStep('ended');
        setInputVal('');
        setLastTrace('break -> Programa encerrado');
        return;
      }

      if (!['1', '2', '3', '4', '5'].includes(raw)) {
        setLines((prev) => [
          ...prev,
          userLine,
          {
            id: (Date.now() + 1).toString(),
            type: 'error',
            text: 'Opção inválida! Escolha um número de 1 a 6.',
            pythonLine: 'if opcao not in [\'1\', \'2\', \'3\', \'4\', \'5\']: continue',
          },
          { id: (Date.now() + 2).toString(), type: 'system', text: '\nEscolha a operação:' },
          { id: (Date.now() + 3).toString(), type: 'system', text: '1 - Soma (+)' },
          { id: (Date.now() + 4).toString(), type: 'system', text: '2 - Subtração (-)' },
          { id: (Date.now() + 5).toString(), type: 'system', text: '3 - Multiplicação (*)' },
          { id: (Date.now() + 6).toString(), type: 'system', text: '4 - Divisão (/)' },
          { id: (Date.now() + 7).toString(), type: 'system', text: '5 - Porcentagem (%)' },
          { id: (Date.now() + 8).toString(), type: 'system', text: '6 - Sair do programa' },
        ]);
        setInputVal('');
        setLastTrace('continue -> Voltou ao topo do loop');
        return;
      }

      // Valid option selected
      setSelectedOp(raw);
      setStep('num1');
      setLines((prev) => [
        ...prev,
        userLine,
        {
          id: (Date.now() + 1).toString(),
          type: 'output',
          text: `Opção selecionada: ${
            raw === '1'
              ? 'Soma'
              : raw === '2'
              ? 'Subtração'
              : raw === '3'
              ? 'Multiplicação'
              : raw === '4'
              ? 'Divisão'
              : 'Porcentagem'
          }`,
        },
      ]);
      setInputVal('');
      setLastTrace(`opcao = '${raw}' -> try: num1 = float(input(...))`);
      return;
    }

    if (step === 'num1') {
      const val = parseFloat(raw.replace(',', '.'));
      if (isNaN(val)) {
        setLines((prev) => [
          ...prev,
          userLine,
          {
            id: (Date.now() + 1).toString(),
            type: 'error',
            text: 'Entrada inválida! Digite apenas números (ValueError tratado pelo try/except).',
            pythonLine: 'except ValueError: print("Entrada inválida!"); continue',
          },
          { id: (Date.now() + 2).toString(), type: 'system', text: '\nEscolha a operação (1-5):' },
        ]);
        setStep('menu');
        setInputVal('');
        setLastTrace('ValueError capturado pelo except!');
        return;
      }

      setFirstNum(val);
      setStep('num2');
      setLines((prev) => [...prev, userLine]);
      setInputVal('');
      setLastTrace(`num1 = ${val} -> Aguardando segundo número`);
      return;
    }

    if (step === 'num2') {
      const val2 = parseFloat(raw.replace(',', '.'));
      if (isNaN(val2)) {
        setLines((prev) => [
          ...prev,
          userLine,
          {
            id: (Date.now() + 1).toString(),
            type: 'error',
            text: 'Entrada inválida! Digite apenas números.',
            pythonLine: 'except ValueError: continue',
          },
          { id: (Date.now() + 2).toString(), type: 'system', text: '\nEscolha a operação (1-5):' },
        ]);
        setStep('menu');
        setInputVal('');
        setLastTrace('ValueError capturado!');
        return;
      }

      const res = executarOperacao(selectedOp, firstNum, val2);

      const resultLine: TerminalLine = res.sucesso
        ? {
            id: (Date.now() + 1).toString(),
            type: 'success',
            text: `\n-> Resultado: ${res.expressao}`,
            pythonLine: res.explicacaoPython,
          }
        : {
            id: (Date.now() + 1).toString(),
            type: 'error',
            text: `\n-> ${res.erro}`,
            pythonLine: res.explicacaoPython,
          };

      setLines((prev) => [
        ...prev,
        userLine,
        resultLine,
        { id: (Date.now() + 2).toString(), type: 'system', text: '\n----------------------------------------' },
        { id: (Date.now() + 3).toString(), type: 'system', text: 'Escolha a operação:' },
        { id: (Date.now() + 4).toString(), type: 'system', text: '1 - Soma (+)' },
        { id: (Date.now() + 5).toString(), type: 'system', text: '2 - Subtração (-)' },
        { id: (Date.now() + 6).toString(), type: 'system', text: '3 - Multiplicação (*)' },
        { id: (Date.now() + 7).toString(), type: 'system', text: '4 - Divisão (/)' },
        { id: (Date.now() + 8).toString(), type: 'system', text: '5 - Porcentagem (%)' },
        { id: (Date.now() + 9).toString(), type: 'system', text: '6 - Sair do programa' },
      ]);

      setStep('menu');
      setInputVal('');
      setLastTrace(res.explicacaoPython);
    }
  };

  const handleQuickInput = (val: string) => {
    setInputVal(val);
    inputRef.current?.focus();
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col">
      {/* Terminal Header */}
      <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1.5 mr-2">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
          </div>
          <TerminalIcon className="w-4 h-4 text-emerald-400" />
          <span className="text-xs font-mono font-medium text-slate-300">
            Terminal Python (Simulação Interativa)
          </span>
          <span className="hidden sm:inline-block text-[10px] bg-emerald-500/10 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/20 font-mono">
            python calculadora.py
          </span>
        </div>

        <button
          onClick={handleRestart}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg border border-slate-700 transition"
          aria-label="Reiniciar execução do terminal"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reiniciar</span>
        </button>
      </div>

      {/* Terminal Output Area */}
      <div className="bg-[#0b0f19] p-4 font-mono text-xs sm:text-sm leading-relaxed min-h-[380px] max-h-[500px] overflow-y-auto space-y-1.5">
        {lines.map((line) => {
          let color = 'text-slate-300';
          if (line.type === 'system') color = 'text-slate-400';
          if (line.type === 'input') color = 'text-amber-300 font-semibold';
          if (line.type === 'success') color = 'text-emerald-300 font-bold';
          if (line.type === 'error') color = 'text-rose-400 font-semibold';
          if (line.type === 'highlight') color = 'text-sky-300 font-semibold';

          return (
            <div key={line.id} className="whitespace-pre-wrap">
              <span className={color}>{line.text}</span>
              {line.pythonLine && (
                <div className="text-[11px] text-slate-500 bg-slate-900/50 px-2 py-0.5 rounded mt-0.5 border-l-2 border-sky-400 inline-block">
                  🐍 Python: {line.pythonLine}
                </div>
              )}
            </div>
          );
        })}

        {/* Current Active Input Prompt */}
        {step !== 'ended' ? (
          <form onSubmit={handleSubmit} className="flex items-center pt-1">
            <span className="text-sky-400 font-semibold select-none pr-1">
              {getPromptText()}
            </span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder={step === 'menu' ? '1, 2, 3, 4 ou 5' : 'ex: 15 ou 2.5'}
              className="flex-1 bg-transparent border-none outline-none text-amber-300 font-mono text-xs sm:text-sm p-0 focus:ring-0"
              autoFocus
              aria-label="Entrada do terminal Python"
            />
            <button
              type="submit"
              className="p-1 rounded bg-sky-500/20 text-sky-400 hover:bg-sky-500/30 transition ml-2"
              title="Pressionar Enter"
              aria-label="Enviar entrada do terminal"
            >
              <CornerDownLeft className="w-3.5 h-3.5" />
            </button>
          </form>
        ) : (
          <div className="pt-2">
            <button
              onClick={handleRestart}
              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-xs font-semibold inline-flex items-center gap-1.5 transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Executar novamente (python calculadora.py)
            </button>
          </div>
        )}
        <div ref={terminalEndRef} />
      </div>

      {/* Interactive Helper Bar */}
      <div className="bg-slate-950 p-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-1.5 text-slate-400">
          <Sparkles className="w-4 h-4 text-sky-400 shrink-0" />
          <span className="font-mono text-[11px]">
            {lastTrace}
          </span>
        </div>

        {/* Quick helper buttons for testing without typing */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[11px] text-slate-500 mr-1">Atalhos rápidos:</span>
          {step === 'menu' && (
            <>
              <button
                onClick={() => handleQuickInput('1')}
                className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-mono border border-slate-700"
              >
                1 (Soma)
              </button>
              <button
                onClick={() => handleQuickInput('4')}
                className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-mono border border-slate-700"
              >
                4 (Divisão)
              </button>
              <button
                onClick={() => handleQuickInput('5')}
                className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-mono border border-slate-700"
              >
                5 (Porcentagem)
              </button>
              <button
                onClick={() => handleQuickInput('6')}
                className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-rose-300 text-[11px] font-mono border border-slate-700"
              >
                6 (Sair)
              </button>
            </>
          )}
          {step === 'num1' && (
            <>
              <button
                onClick={() => handleQuickInput('10')}
                className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-mono border border-slate-700"
              >
                10
              </button>
              <button
                onClick={() => handleQuickInput('25.5')}
                className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-mono border border-slate-700"
              >
                25.5
              </button>
              <button
                onClick={() => handleQuickInput('abc')}
                className="px-2 py-0.5 rounded bg-rose-950/40 hover:bg-rose-900/40 text-rose-300 text-[11px] font-mono border border-rose-800/40"
                title="Testar erro de digitação (ValueError)"
              >
                "abc" (Erro)
              </button>
            </>
          )}
          {step === 'num2' && (
            <>
              <button
                onClick={() => handleQuickInput('5')}
                className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-mono border border-slate-700"
              >
                5
              </button>
              <button
                onClick={() => handleQuickInput('0')}
                className="px-2 py-0.5 rounded bg-amber-950/40 hover:bg-amber-900/40 text-amber-300 text-[11px] font-mono border border-amber-800/40"
                title="Testar divisão por zero"
              >
                0 (Divisão zero)
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
