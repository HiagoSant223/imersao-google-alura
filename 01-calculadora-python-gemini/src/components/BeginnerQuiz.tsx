import React, { useState } from 'react';
import { PERGUNTAS_QUIZ } from '../data/pythonCode';
import { CheckCircle2, XCircle, RotateCcw, HelpCircle, Award } from 'lucide-react';

export const BeginnerQuiz: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState<boolean>(false);

  const question = PERGUNTAS_QUIZ[currentIdx];
  const userChoiceIdx = selectedAnswers[currentIdx];
  const isAnswered = userChoiceIdx !== undefined;

  const handleSelect = (optionIdx: number) => {
    if (isAnswered) return;
    setSelectedAnswers((prev) => ({ ...prev, [currentIdx]: optionIdx }));
  };

  const handleNext = () => {
    if (currentIdx < PERGUNTAS_QUIZ.length - 1) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedAnswers({});
    setShowResults(false);
  };

  const calculateScore = () => {
    let score = 0;
    PERGUNTAS_QUIZ.forEach((q, idx) => {
      const selected = selectedAnswers[idx];
      if (selected !== undefined && q.opcoes[selected]?.correta) {
        score++;
      }
    });
    return score;
  };

  if (showResults) {
    const score = calculateScore();
    const percent = Math.round((score / PERGUNTAS_QUIZ.length) * 100);

    return (
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 text-center max-w-2xl mx-auto shadow-2xl">
        <div className="w-16 h-16 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center mx-auto mb-4">
          <Award className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Quiz Concluído!</h2>
        <p className="text-sm text-slate-400 mb-6">
          Você acertou <span className="font-bold text-sky-400">{score}</span> de{' '}
          <span className="font-bold text-white">{PERGUNTAS_QUIZ.length}</span> perguntas ({percent}%).
        </p>

        <div className="bg-slate-950/80 rounded-xl p-4 border border-slate-800 text-left text-xs space-y-3 mb-6">
          {PERGUNTAS_QUIZ.map((q, idx) => {
            const userChoice = selectedAnswers[idx];
            const isCorrect = userChoice !== undefined && q.opcoes[userChoice]?.correta;
            return (
              <div key={q.id} className="flex items-start gap-2.5 pb-2 border-b border-slate-800/60 last:border-0 last:pb-0">
                {isCorrect ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                )}
                <div>
                  <div className="font-medium text-slate-200">{q.pergunta}</div>
                  <div className="text-slate-400 mt-0.5">{q.explicacao}</div>
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={handleRestart}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-sm transition shadow-lg shadow-sky-500/20"
        >
          <RotateCcw className="w-4 h-4" />
          Fazer o Quiz Novamente
        </button>
      </div>
    );
  }

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 max-w-2xl mx-auto shadow-2xl">
      {/* Quiz Progress */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-5">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-sky-400" />
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">
            Fixação de Conteúdo Python
          </span>
        </div>
        <span className="text-xs font-mono text-slate-400">
          Pergunta {currentIdx + 1} de {PERGUNTAS_QUIZ.length}
        </span>
      </div>

      {/* Question */}
      <h3 className="text-base sm:text-lg font-bold text-white mb-5 leading-snug">
        {question.pergunta}
      </h3>

      {/* Options */}
      <div className="space-y-3 mb-6">
        {question.opcoes.map((op, optIdx) => {
          let btnStyle = 'border-slate-800 bg-slate-950/60 hover:bg-slate-800/80 text-slate-200';

          if (isAnswered) {
            if (op.correta) {
              btnStyle = 'border-emerald-500/60 bg-emerald-950/30 text-emerald-200';
            } else if (userChoiceIdx === optIdx) {
              btnStyle = 'border-rose-500/60 bg-rose-950/30 text-rose-200';
            } else {
              btnStyle = 'opacity-40 border-slate-800 bg-slate-950/40 text-slate-400';
            }
          }

          return (
            <button
              key={optIdx}
              onClick={() => handleSelect(optIdx)}
              disabled={isAnswered}
              className={`w-full text-left p-3.5 rounded-xl border text-sm font-medium transition flex items-center justify-between ${btnStyle}`}
            >
              <span>{op.texto}</span>
              {isAnswered && op.correta && (
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 ml-2" />
              )}
              {isAnswered && !op.correta && userChoiceIdx === optIdx && (
                <XCircle className="w-5 h-5 text-rose-400 shrink-0 ml-2" />
              )}
            </button>
          );
        })}
      </div>

      {/* Didactic Explanation when answered */}
      {isAnswered && (
        <div className="p-3.5 rounded-xl bg-sky-950/30 border border-sky-800/40 text-xs text-sky-200 mb-5 leading-relaxed">
          <span className="font-semibold text-sky-300">Explicação: </span>
          {question.explicacao}
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-end">
        {isAnswered && (
          <button
            onClick={handleNext}
            className="px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs sm:text-sm transition shadow-lg shadow-sky-500/20"
          >
            {currentIdx < PERGUNTAS_QUIZ.length - 1 ? 'Próxima Pergunta →' : 'Ver Resultado Final 🏆'}
          </button>
        )}
      </div>
    </div>
  );
};
