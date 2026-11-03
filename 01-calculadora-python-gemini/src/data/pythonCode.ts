export interface PythonConcept {
  id: string;
  titulo: string;
  subtitulo: string;
  badge: string;
  exemploCodigo: string;
  explicacao: string;
  dicaPratica: string;
}

export const CODIGO_COMPLETO_PYTHON = `# ==============================================================
# CALCULADORA BÁSICA EM PYTHON
# Desenvolvida para quem está aprendendo a programar!
# ==============================================================

# 1. FUNÇÕES MATEMÁTICAS
# Criamos uma função para cada operação. Isso mantém o código organizado e reutilizável.
def somar(a, b):
    """Recebe dois números e retorna a soma."""
    return a + b

def subtrair(a, b):
    """Recebe dois números e retorna a subtração."""
    return a - b

def multiplicar(a, b):
    """Recebe dois números e retorna a multiplicação."""
    return a * b

def dividir(a, b):
    """Recebe dois números e retorna a divisão.
    Importante: verifica se o divisor é zero para evitar erros matemáticos."""
    if b == 0:
        return "Erro: Não é possível dividir por zero!"
    return a / b

def porcentagem(a, b):
    """Recebe o valor base (a) e a taxa percentual (b), retornando b% de a."""
    return (a * b) / 100

# 2. PROGRAMA PRINCIPAL
def calculadora():
    print("=" * 40)
    print("      CALCULADORA SIMPLES EM PYTHON     ")
    print("=" * 40)
    
    # O laço while True mantém a calculadora rodando até o usuário decidir sair
    while True:
        print("\\nEscolha a operação:")
        print("1 - Soma (+)")
        print("2 - Subtração (-)")
        print("3 - Multiplicação (*)")
        print("4 - Divisão (/)")
        print("5 - Porcentagem (%)")
        print("6 - Sair do programa")
        
        opcao = input("\\nDigite o número da operação (1-6): ").strip()
        
        # Se escolher 6, usamos 'break' para encerrar o loop
        if opcao == '6':
            print("\\nEncerrando a calculadora. Bons estudos!")
            break
            
        # Verifica se digitou uma opção válida
        if opcao not in ['1', '2', '3', '4', '5']:
            print("Opção inválida! Escolha um número de 1 a 6.")
            continue
            
        # O bloco try/except evita que o programa 'trave' se alguém digitar texto
        try:
            num1 = float(input("Digite o primeiro número: "))
            num2 = float(input("Digite o segundo número: "))
        except ValueError:
            print("Entrada inválida! Digite apenas números (ex: 10 ou 3.5).")
            continue
            
        # Tomada de decisão: chama a função correspondente
        if opcao == '1':
            resultado = somar(num1, num2)
            print(f"\\n-> Resultado: {num1} + {num2} = {resultado}")
        elif opcao == '2':
            resultado = subtrair(num1, num2)
            print(f"\\n-> Resultado: {num1} - {num2} = {resultado}")
        elif opcao == '3':
            resultado = multiplicar(num1, num2)
            print(f"\\n-> Resultado: {num1} × {num2} = {resultado}")
        elif opcao == '4':
            resultado = dividir(num1, num2)
            print(f"\\n-> Resultado: {num1} ÷ {num2} = {resultado}")
        elif opcao == '5':
            resultado = porcentagem(num1, num2)
            print(f"\\n-> Resultado: {num2}% de {num1} = {resultado}")

# 3. PONTO DE EXECUÇÃO
# Esta linha garante que o programa só execute quando o arquivo for rodado diretamente
if __name__ == "__main__":
    calculadora()
`;

export const CODIGO_MINIMALISTA_PYTHON = `# Versão Expressa: Ideal para entender a lógica pura sem funções
num1 = float(input("Digite o 1º número: "))
operador = input("Operador (+, -, *, /): ")
num2 = float(input("Digite o 2º número: "))

if operador == '+':
    print(f"Resultado: {num1 + num2}")
elif operador == '-':
    print(f"Resultado: {num1 - num2}")
elif operador == '*':
    print(f"Resultado: {num1 * num2}")
elif operador == '/':
    if num2 != 0:
        print(f"Resultado: {num1 / num2}")
    else:
        print("Erro: Não é possível dividir por zero!")
else:
    print("Operador inválido!")
`;

export const CONCEITOS_PYTHON: PythonConcept[] = [
  {
    id: 'funcoes',
    titulo: '1. Funções (def e return)',
    subtitulo: 'Organização, modularização e reaproveitamento de código',
    badge: 'def / return',
    exemploCodigo: `def somar(a, b):
    return a + b

resultado = somar(10, 5) # resultado vale 15`,
    explicacao:
      'Uma função é um bloco de instruções que realiza uma tarefa específica. A palavra-chave "def" define a função, "a" e "b" são os parâmetros (dados que ela recebe), e o comando "return" devolve o resultado para quem chamou.',
    dicaPratica:
      'Dividir o código em funções pequenas torna seu projeto muito mais fácil de ler, testar e dar manutenção.',
  },
  {
    id: 'input-float',
    titulo: '2. Entrada de Dados e Conversão de Tipos',
    subtitulo: 'input() recebe texto; float() converte para número decimal',
    badge: 'input() & float()',
    exemploCodigo: `texto = input("Digite um número: ")  # Sempre devolve string, ex: "10"
numero = float(texto)                 # Converte para decimal: 10.0`,
    explicacao:
      'Por padrão, a função input() do Python lê qualquer dado como texto (string). Se tentássemos fazer "10" + "5", o Python juntaria os textos virando "105" (concatenação). Por isso, usamos float() para converter o texto em número decimal com suporte a vírgula/ponto.',
    dicaPratica:
      'Se você quiser apenas números inteiros, use int(). Mas para calculadoras, float() é mais flexível porque aceita números como 2.5 ou 10.',
  },
  {
    id: 'divisao-zero',
    titulo: '3. Tratamento da Divisão por Zero',
    subtitulo: 'Evitando a quebra do programa (ZeroDivisionError)',
    badge: 'if b == 0',
    exemploCodigo: `def dividir(a, b):
    if b == 0:
        return "Erro: Divisão por zero!"
    return a / b`,
    explicacao:
      'Na matemática, a divisão por zero não existe. No Python, tentar fazer 10 / 0 geraria um erro fatal chamado ZeroDivisionError. Verificamos antes se b == 0 para devolver uma mensagem amigável em vez de quebrar o programa.',
    dicaPratica:
      'Bons programadores sempre antecipam casos extremos (edge cases) como entradas nulas ou divisões proibidas.',
  },
  {
    id: 'condicionais',
    titulo: '4. Estruturas Condicionais (if / elif / else)',
    subtitulo: 'Tomada de decisões no fluxo do algoritmo',
    badge: 'if / elif / else',
    exemploCodigo: `if opcao == '1':
    resultado = somar(num1, num2)
elif opcao == '2':
    resultado = subtrair(num1, num2)
else:
    print("Opção inválida!")`,
    explicacao:
      'O "if" verifica a primeira condição. Se for falsa, o "elif" (else if) verifica a próxima condição sequencialmente. O "else" é executado se nenhuma das condições anteriores for atendida.',
    dicaPratica:
      'Em Python, a indentação (4 espaços à direita) é obrigatória e define o bloco de código que pertence ao if/elif.',
  },
  {
    id: 'laco-while',
    titulo: '5. Laço de Repetição (while True & break)',
    subtitulo: 'Mantendo o programa ativo em loop contínuo',
    badge: 'while True / break',
    exemploCodigo: `while True:
    # Mostra o menu e faz contas...
    if opcao == '5':
        break # Interrompe o loop e encerra`,
    explicacao:
      'O laço "while True" cria uma repetição infinita proposital para que a calculadora não feche após uma única conta. O comando "break" serve para quebrar o ciclo quando o usuário escolhe a opção de sair.',
    dicaPratica:
      'Também usamos "continue" quando ocorre um erro para pular o resto do ciclo e recomeçar do menu.',
  },
  {
    id: 'try-except',
    titulo: '6. Tratamento de Exceções (try / except)',
    subtitulo: 'Blindando o programa contra erros de digitação',
    badge: 'try / except ValueError',
    exemploCodigo: `try:
    num1 = float(input("Digite um número: "))
except ValueError:
    print("Você digitou letras em vez de números!")`,
    explicacao:
      'Se o usuário digitar "abc" quando o programa espera um número, float("abc") gera um ValueError. O bloco try/except "captura" esse erro, impede a tela vermelha de crash e permite exibir uma instrução clara para o usuário.',
    dicaPratica:
      'Tratamento de exceções é uma das práticas mais valorizadas no desenvolvimento de software profissional.',
  },
  {
    id: 'f-strings',
    titulo: '7. Interpolação Moderna de Textos (f-strings)',
    subtitulo: 'Formatação clara e legível de mensagens',
    badge: 'f"{variavel}"',
    exemploCodigo: `a = 15
b = 3
print(f"O resultado de {a} + {b} é igual a {a + b}")
# Imprime: O resultado de 15 + 3 é igual a 18`,
    explicacao:
      'As f-strings (format strings) surgiram no Python 3.6. Basta colocar uma letra f antes das aspas e inserir qualquer variável ou expressão entre chaves {}. É muito mais limpo do que usar "+" para juntar pedaços de texto.',
    dicaPratica:
      'Você também pode formatar casas decimais dentro da f-string: f"{resultado:.2f}" exibe o número com 2 casas após a vírgula.',
  },
];

export const PERGUNTAS_QUIZ = [
  {
    id: 1,
    pergunta: 'Por que precisamos usar float(input(...)) em vez de apenas input(...) no Python?',
    opcoes: [
      { texto: 'Porque input() retorna sempre uma string (texto), mesmo se digitarmos números.', correta: true },
      { texto: 'Porque o Python não aceita números inteiros sem float.', correta: false },
      { texto: 'Para fazer o programa rodar mais rápido no processador.', correta: false },
    ],
    explicacao: 'Exato! A função input() sempre lê dados como texto. Se fizéssemos "5" + "5", o resultado seria "55" (texto grudado) em vez de 10 numérico.',
  },
  {
    id: 2,
    pergunta: 'O que acontece em Python se tentarmos executar a conta 10 / 0 sem tratamento?',
    opcoes: [
      { texto: 'O resultado será 0 automaticamente.', correta: false },
      { texto: 'O resultado será infinito (inf).', correta: false },
      { texto: 'O programa lança um erro fatal (ZeroDivisionError) e trava.', correta: true },
    ],
    explicacao: 'Correto! Em Python, dividir por zero lança o erro ZeroDivisionError. Por isso usamos "if b == 0" para proteger nosso código.',
  },
  {
    id: 3,
    pergunta: 'Qual comando é utilizado para interromper imediatamente um laço "while True" em Python?',
    opcoes: [
      { texto: 'stop', correta: false },
      { texto: 'break', correta: true },
      { texto: 'exit()', correta: false },
    ],
    explicacao: 'Muito bem! A palavra reservada "break" interrompe imediatamente a execução do laço de repetição mais próximo.',
  },
  {
    id: 4,
    pergunta: 'Para que serve o bloco try / except com ValueError?',
    opcoes: [
      { texto: 'Capturar quando o usuário digita letras ou símbolos onde era esperado um número.', correta: true },
      { texto: 'Aumentar a velocidade das quatro operações matemáticas.', correta: false },
      { texto: 'Definir o nome de uma nova função em Python.', correta: false },
    ],
    explicacao: 'Perfeito! Quando tentamos converter texto inválido com float("abc"), o Python gera um ValueError, que o bloco except trata graciosamente.',
  },
];
