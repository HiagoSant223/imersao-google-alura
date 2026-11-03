import React, { useState } from 'react';
import { somar, subtrair, multiplicar, dividir, porcentagem, formatarNumero } from '../utils/calculator';
import { Delete, RotateCcw, ArrowRight, Code } from 'lucide-react';

interface HistoryItem {
  id: string;
  expression: string;
  result: string;
  pythonSnippet: string;
  isError?: boolean;
}

export const InteractiveCalculator: React.FC = () => {
  const [display, setDisplay] = useState<string>('0');
  const [prevValue, setPrevValue] = useState<number | null>(null);
  const [operator, setOperator] = useState<'+' | '-' | '*' | '/' | '%' | null>(null);
  const [waitingForNext, setWaitingForNext] = useState<boolean>(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [activePythonCode, setActivePythonCode] = useState<string>(
    '# Digite os números e selecione a operação para ver o código em ação'
  );

  const handleDigit = (digit: string) => {
    if (waitingForNext) {
      setDisplay(digit);
      setWaitingForNext(false);
      setActivePythonCode(`num2 = ${digit}`);
    } else {
      const nextDisplay = display === '0' ? digit : display + digit;
      setDisplay(nextDisplay);
      setActivePythonCode(operator ? `num2 = ${nextDisplay}` : `num1 = ${nextDisplay}`);
    }
  };

  const handleDot = () => {
    if (waitingForNext) {
      setDisplay('0.');
      setWaitingForNext(false);
      return;
    }
    if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setPrevValue(null);
    setOperator(null);
    setWaitingForNext(false);
    setActivePythonCode('# Calculadora reiniciada. Escolha um número.');
  };

  const handleOperator = (op: '+' | '-' | '*' | '/' | '%') => {
    const current = parseFloat(display);

    if (prevValue !== null && operator && !waitingForNext) {
      // Calculate intermediate result
      executeCalculation(prevValue, current, operator);
      setOperator(op);
      setWaitingForNext(true);
    } else {
      setPrevValue(current);
      setOperator(op);
      setWaitingForNext(true);
      const funcName =
        op === '+' ? 'somar' : op === '-' ? 'subtrair' : op === '*' ? 'multiplicar' : op === '/' ? 'dividir' : 'porcentagem';
      setActivePythonCode(`num1 = ${current}\noperacao = '${op}'  # Chamará a função ${funcName}(a, b)`);
    }
  };

  const executeCalculation = (a: number, b: number, op: '+' | '-' | '*' | '/' | '%') => {
    let result = 0;
    let snippet = '';
    let isErr = false;
    let resultStr = '';

    try {
      if (op === '+') {
        result = somar(a, b);
        snippet = `def somar(${a}, ${b}):\n    return ${a} + ${b}  # -> ${result}`;
      } else if (op === '-') {
        result = subtrair(a, b);
        snippet = `def subtrair(${a}, ${b}):\n    return ${a} - ${b}  # -> ${result}`;
      } else if (op === '*') {
        result = multiplicar(a, b);
        snippet = `def multiplicar(${a}, ${b}):\n    return ${a} * ${b}  # -> ${result}`;
      } else if (op === '/') {
        if (b === 0) {
          isErr = true;
          snippet = `if ${b} == 0:\n    return "Erro: Divisão por zero!"  # Protegido!`;
          resultStr = 'Erro: ZeroDivision';
        } else {
          result = dividir(a, b);
          snippet = `def dividir(${a}, ${b}):\n    return ${a} / ${b}  # -> ${result}`;
        }
      } else if (op === '%') {
        result = porcentagem(a, b);
        snippet = `def porcentagem(${a}, ${b}):\n    return (${a} * ${b}) / 100  # -> ${result} (${b}% de ${a})`;
      }

      if (!isErr) {
        resultStr = formatarNumero(result);
        setDisplay(resultStr);
        setPrevValue(result);
      } else {
        setDisplay('Erro');
        setPrevValue(null);
      }

      setActivePythonCode(snippet);

      setHistory((prev) => [
        {
          id: Date.now().toString(),
          expression: `${formatarNumero(a)} ${op} ${formatarNumero(b)}`,
          result: resultStr,
          pythonSnippet: snippet,
          isError: isErr,
        },
        ...prev.slice(0, 5),
      ]);
    } catch {
      setDisplay('Erro');
      setActivePythonCode('# Erro inesperado capturado');
    }
  };

  const handleEqual = () => {
    if (prevValue === null || !operator) return;
    const current = parseFloat(display);
    executeCalculation(prevValue, current, operator);
    setOperator(null);
    setWaitingForNext(true);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      {/* Calculator Body */}
      <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Calculadora Visual
            </span>
            {operator && (
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 border border-sky-500/30">
                Op: {operator}
              </span>
            )}
          </div>
          <button
            onClick={handleClear}
            className="text-xs text-slate-400 hover:text-white flex items-center gap-1 transition"
            aria-label="Limpar calculadora"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Limpar (C)
          </button>
        </div>

        {/* Display */}
        <div className="bg-[#0b0f19] border border-slate-800 rounded-xl p-4 mb-5 text-right font-mono">
          <div className="text-xs text-slate-500 h-5 overflow-hidden">
            {prevValue !== null && operator ? `${formatarNumero(prevValue)} ${operator}` : ''}
          </div>
          <div className="text-3xl sm:text-4xl font-bold text-white tracking-tight overflow-x-auto scrollbar-none py-1">
            {display}
          </div>
        </div>

        {/* Keypad Grid */}
        <div className="grid grid-cols-4 gap-2.5">
          {/* Row 1 */}
          <button
            onClick={handleClear}
            className="py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-rose-300 font-semibold text-sm transition border border-slate-700/60"
            aria-label="Limpar tudo"
          >
            AC
          </button>
          <button
            onClick={() => {
              if (display.length > 1 && display !== 'Erro') {
                setDisplay(display.slice(0, -1));
              } else {
                setDisplay('0');
              }
            }}
            className="py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-sm transition border border-slate-700/60 flex items-center justify-center"
            aria-label="Apagar último dígito"
          >
            <Delete className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleOperator('%')}
            className={`py-3 rounded-xl font-bold text-lg transition border ${
              operator === '%'
                ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md shadow-amber-500/20'
                : 'bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border-amber-500/30'
            }`}
            aria-label="Porcentagem"
          >
            %
          </button>
          <button
            onClick={() => handleOperator('/')}
            className={`py-3 rounded-xl font-bold text-lg transition border ${
              operator === '/'
                ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md shadow-amber-500/20'
                : 'bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border-amber-500/30'
            }`}
            aria-label="Divisão"
          >
            ÷
          </button>

          {/* Row 2 */}
          <button
            onClick={() => handleDigit('7')}
            className="py-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-white font-mono text-base font-medium transition border border-slate-800"
          >
            7
          </button>
          <button
            onClick={() => handleDigit('8')}
            className="py-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-white font-mono text-base font-medium transition border border-slate-800"
          >
            8
          </button>
          <button
            onClick={() => handleDigit('9')}
            className="py-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-white font-mono text-base font-medium transition border border-slate-800"
          >
            9
          </button>
          <button
            onClick={() => handleOperator('*')}
            className={`py-3 rounded-xl font-bold text-lg transition border ${
              operator === '*'
                ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md shadow-amber-500/20'
                : 'bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border-amber-500/30'
            }`}
            aria-label="Multiplicação"
          >
            ×
          </button>

          {/* Row 3 */}
          <button
            onClick={() => handleDigit('4')}
            className="py-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-white font-mono text-base font-medium transition border border-slate-800"
          >
            4
          </button>
          <button
            onClick={() => handleDigit('5')}
            className="py-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-white font-mono text-base font-medium transition border border-slate-800"
          >
            5
          </button>
          <button
            onClick={() => handleDigit('6')}
            className="py-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-white font-mono text-base font-medium transition border border-slate-800"
          >
            6
          </button>
          <button
            onClick={() => handleOperator('-')}
            className={`py-3 rounded-xl font-bold text-lg transition border ${
              operator === '-'
                ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md shadow-amber-500/20'
                : 'bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border-amber-500/30'
            }`}
            aria-label="Subtração"
          >
            −
          </button>

          {/* Row 4 */}
          <button
            onClick={() => handleDigit('1')}
            className="py-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-white font-mono text-base font-medium transition border border-slate-800"
          >
            1
          </button>
          <button
            onClick={() => handleDigit('2')}
            className="py-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-white font-mono text-base font-medium transition border border-slate-800"
          >
            2
          </button>
          <button
            onClick={() => handleDigit('3')}
            className="py-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-white font-mono text-base font-medium transition border border-slate-800"
          >
            3
          </button>
          <button
            onClick={() => handleOperator('+')}
            className={`py-3 rounded-xl font-bold text-lg transition border ${
              operator === '+'
                ? 'bg-sky-500 text-slate-950 border-sky-400 shadow-md shadow-sky-500/20'
                : 'bg-sky-500/15 hover:bg-sky-500/25 text-sky-300 border-sky-500/30'
            }`}
            aria-label="Soma"
          >
            +
          </button>

          {/* Row 5 */}
          <button
            onClick={() => handleDigit('0')}
            className="col-span-2 py-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-white font-mono text-base font-medium transition border border-slate-800"
          >
            0
          </button>
          <button
            onClick={handleDot}
            className="py-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-white font-mono text-base font-medium transition border border-slate-800"
            aria-label="Ponto decimal"
          >
            .
          </button>
          <button
            onClick={handleEqual}
            className="py-3.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xl transition shadow-lg shadow-sky-500/25"
            aria-label="Igual"
          >
            =
          </button>
        </div>
      </div>

      {/* Right Column: Code inspect & History */}
      <div className="lg:col-span-6 space-y-4">
        {/* Python Code Inspector */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl">
          <div className="flex items-center gap-2 mb-2 pb-2 border-b border-slate-800">
            <Code className="w-4 h-4 text-sky-400" />
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-300">
              O que o Python está executando:
            </h3>
          </div>
          <div className="bg-[#0b0f19] p-3 rounded-xl border border-slate-800 font-mono text-xs text-sky-300 leading-relaxed overflow-x-auto">
            <pre>{activePythonCode}</pre>
          </div>
          <p className="text-[11px] text-slate-400 mt-2">
            Cada clique no teclado da calculadora executa a função Python equivalente à operação selecionada.
          </p>
        </div>

        {/* Calculation History */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl">
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-800">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-300">
              Histórico de Cálculos
            </h3>
            {history.length > 0 && (
              <button
                onClick={() => setHistory([])}
                className="text-[11px] text-slate-500 hover:text-slate-300"
              >
                Limpar histórico
              </button>
            )}
          </div>

          {history.length === 0 ? (
            <div className="py-6 text-center text-xs text-slate-500">
              Faça contas na calculadora ao lado para ver o histórico aqui.
            </div>
          ) : (
            <div className="space-y-2">
              {history.map((item) => (
                <div
                  key={item.id}
                  className={`p-2.5 rounded-xl border text-xs flex items-center justify-between ${
                    item.isError
                      ? 'bg-rose-950/20 border-rose-800/40 text-rose-300'
                      : 'bg-slate-950/60 border-slate-800/80 text-slate-200'
                  }`}
                >
                  <span className="font-mono">{item.expression}</span>
                  <div className="flex items-center gap-2">
                    <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                    <span className="font-mono font-bold text-white">{item.result}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
