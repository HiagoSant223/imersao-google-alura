/**
 * Operações matemáticas básicas que espelham o comportamento do script Python.
 */

export interface CalculationResult {
  sucesso: boolean;
  operacao: string;
  expressao: string;
  resultado?: number;
  erro?: string;
  explicacaoPython: string;
}

/**
 * Soma dois números
 */
export function somar(a: number, b: number): number {
  return a + b;
}

/**
 * Subtrai o segundo número do primeiro
 */
export function subtrair(a: number, b: number): number {
  return a - b;
}

/**
 * Multiplica dois números
 */
export function multiplicar(a: number, b: number): number {
  return a * b;
}

/**
 * Divide o primeiro número pelo segundo.
 * Lança erro se b == 0 (simulando ZeroDivisionError do Python).
 */
export function dividir(a: number, b: number): number {
  if (b === 0) {
    throw new Error('Divisão por zero não é permitida.');
  }
  return a / b;
}

/**
 * Calcula a porcentagem: b% de a ((a * b) / 100)
 */
export function porcentagem(a: number, b: number): number {
  return (a * b) / 100;
}

/**
 * Formata um número para exibição amigável: se for inteiro, exibe sem decimais desnecessários.
 */
export function formatarNumero(n: number): string {
  if (Number.isInteger(n)) {
    return n.toString();
  }
  // Limita a até 6 casas decimais e remove zeros à direita
  return parseFloat(n.toFixed(6)).toString();
}

/**
 * Executa uma operação com base na opção selecionada (1 a 4)
 */
export function executarOperacao(
  opcao: string | number,
  num1: number,
  num2: number
): CalculationResult {
  const opStr = opcao.toString().trim();

  switch (opStr) {
    case '1':
    case '+':
    case 'soma':
      return {
        sucesso: true,
        operacao: 'Soma (+)',
        expressao: `${formatarNumero(num1)} + ${formatarNumero(num2)} = ${formatarNumero(somar(num1, num2))}`,
        resultado: somar(num1, num2),
        explicacaoPython: `def somar(a, b): return a + b -> somar(${num1}, ${num2})`,
      };

    case '2':
    case '-':
    case 'subtracao':
      return {
        sucesso: true,
        operacao: 'Subtração (-)',
        expressao: `${formatarNumero(num1)} - ${formatarNumero(num2)} = ${formatarNumero(subtrair(num1, num2))}`,
        resultado: subtrair(num1, num2),
        explicacaoPython: `def subtrair(a, b): return a - b -> subtrair(${num1}, ${num2})`,
      };

    case '3':
    case '*':
    case 'multiplicacao':
      return {
        sucesso: true,
        operacao: 'Multiplicação (*)',
        expressao: `${formatarNumero(num1)} × ${formatarNumero(num2)} = ${formatarNumero(multiplicar(num1, num2))}`,
        resultado: multiplicar(num1, num2),
        explicacaoPython: `def multiplicar(a, b): return a * b -> multiplicar(${num1}, ${num2})`,
      };

    case '4':
    case '/':
    case 'divisao':
      if (num2 === 0) {
        return {
          sucesso: false,
          operacao: 'Divisão (/)',
          expressao: `${formatarNumero(num1)} / 0`,
          erro: 'Erro: Não é possível dividir por zero! (ZeroDivisionError no Python)',
          explicacaoPython: `if b == 0: raise ZeroDivisionError("Não é possível dividir por zero")`,
        };
      }
      return {
        sucesso: true,
        operacao: 'Divisão (/)',
        expressao: `${formatarNumero(num1)} ÷ ${formatarNumero(num2)} = ${formatarNumero(dividir(num1, num2))}`,
        resultado: dividir(num1, num2),
        explicacaoPython: `def dividir(a, b): return a / b -> dividir(${num1}, ${num2})`,
      };

    case '5':
    case '%':
    case 'porcentagem':
      return {
        sucesso: true,
        operacao: 'Porcentagem (%)',
        expressao: `${formatarNumero(num2)}% de ${formatarNumero(num1)} = ${formatarNumero(porcentagem(num1, num2))}`,
        resultado: porcentagem(num1, num2),
        explicacaoPython: `def porcentagem(a, b): return (a * b) / 100 -> porcentagem(${num1}, ${num2})`,
      };

    default:
      return {
        sucesso: false,
        operacao: 'Desconhecida',
        expressao: '?',
        erro: 'Opção inválida! Escolha entre 1 e 5.',
        explicacaoPython: `else: print("Opção inválida!")`,
      };
  }
}
