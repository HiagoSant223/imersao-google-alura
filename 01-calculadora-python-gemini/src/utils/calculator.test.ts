import test from 'node:test';
import assert from 'node:assert/strict';
import {
  somar,
  subtrair,
  multiplicar,
  dividir,
  porcentagem,
  formatarNumero,
  executarOperacao,
} from './calculator';

test('somar calcula a soma corretamente com inteiros e decimais', () => {
  assert.equal(somar(2, 3), 5);
  assert.equal(somar(-5, 10), 5);
  assert.equal(somar(0.1, 0.2).toFixed(1), '0.3');
});

test('subtrair calcula a diferença corretamente', () => {
  assert.equal(subtrair(10, 4), 6);
  assert.equal(subtrair(4, 10), -6);
  assert.equal(subtrair(0, 0), 0);
});

test('multiplicar calcula o produto corretamente', () => {
  assert.equal(multiplicar(7, 8), 56);
  assert.equal(multiplicar(-3, 4), -12);
  assert.equal(multiplicar(9, 0), 0);
});

test('dividir calcula a divisão e lança erro em divisão por zero', () => {
  assert.equal(dividir(15, 3), 5);
  assert.equal(dividir(7, 2), 3.5);
  assert.throws(() => dividir(10, 0), /Divisão por zero não é permitida/);
});

test('porcentagem calcula a porcentagem de um valor corretamente', () => {
  assert.equal(porcentagem(200, 15), 30);
  assert.equal(porcentagem(50, 100), 50);
  assert.equal(porcentagem(80, 0), 0);
  assert.equal(porcentagem(250, 10), 25);
});

test('formatarNumero formata inteiros e decimais limpos', () => {
  assert.equal(formatarNumero(42), '42');
  assert.equal(formatarNumero(3.14), '3.14');
  assert.equal(formatarNumero(-0), '0');
});

test('executarOperacao lida com opções válidas e divisão por zero com segurança', () => {
  const somaRes = executarOperacao('1', 10, 5);
  assert.equal(somaRes.sucesso, true);
  assert.equal(somaRes.resultado, 15);

  const subRes = executarOperacao('2', 20, 8);
  assert.equal(subRes.sucesso, true);
  assert.equal(subRes.resultado, 12);

  const multRes = executarOperacao('3', 6, 7);
  assert.equal(multRes.sucesso, true);
  assert.equal(multRes.resultado, 42);

  const divRes = executarOperacao('4', 50, 2);
  assert.equal(divRes.sucesso, true);
  assert.equal(divRes.resultado, 25);

  const percRes = executarOperacao('5', 200, 15);
  assert.equal(percRes.sucesso, true);
  assert.equal(percRes.resultado, 30);
  assert.equal(percRes.operacao, 'Porcentagem (%)');

  const divZeroRes = executarOperacao('4', 10, 0);
  assert.equal(divZeroRes.sucesso, false);
  assert.match(divZeroRes.erro || '', /dividir por zero/i);

  const invalidoRes = executarOperacao('99', 1, 1);
  assert.equal(invalidoRes.sucesso, false);
  assert.match(invalidoRes.erro || '', /inválida/i);
});
