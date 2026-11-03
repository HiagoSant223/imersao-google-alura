# ==============================================================
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
        print("\nEscolha a operação:")
        print("1 - Soma (+)")
        print("2 - Subtração (-)")
        print("3 - Multiplicação (*)")
        print("4 - Divisão (/)")
        print("5 - Porcentagem (%)")
        print("6 - Sair do programa")
        
        opcao = input("\nDigite o número da operação (1-6): ").strip()
        
        # Se escolher 6, usamos 'break' para encerrar o loop
        if opcao == '6':
            print("\nEncerrando a calculadora. Bons estudos!")
            break
            
        # Verifica se digitou uma opção válida
        if opcao not in ['1', '2', '3', '4', '5']:
            print("Opção inválida! Escolha um número de 1 a 6.")
            continue
            
        # O bloco try/except evita que o programa 'trave' se alguém digitar texto
        try:
            num1 = float(input("Digite o primeiro número (valor base): "))
            num2 = float(input("Digite o segundo número: "))
        except ValueError:
            print("Entrada inválida! Digite apenas números (ex: 10 ou 3.5).")
            continue
            
        # Tomada de decisão: chama a função correspondente
        if opcao == '1':
            resultado = somar(num1, num2)
            print(f"\n-> Resultado: {num1} + {num2} = {resultado}")
        elif opcao == '2':
            resultado = subtrair(num1, num2)
            print(f"\n-> Resultado: {num1} - {num2} = {resultado}")
        elif opcao == '3':
            resultado = multiplicar(num1, num2)
            print(f"\n-> Resultado: {num1} × {num2} = {resultado}")
        elif opcao == '4':
            resultado = dividir(num1, num2)
            print(f"\n-> Resultado: {num1} ÷ {num2} = {resultado}")
        elif opcao == '5':
            resultado = porcentagem(num1, num2)
            print(f"\n-> Resultado: {num2}% de {num1} = {resultado}")

# 3. PONTO DE EXECUÇÃO
# Esta linha garante que o programa só execute quando o arquivo for rodado diretamente
if __name__ == "__main__":
    calculadora()
