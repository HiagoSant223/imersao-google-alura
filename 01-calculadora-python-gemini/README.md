# 🧮 Calculadora Python & Interface Interativa com Gemini AI

Projeto desenvolvido durante a **Imersão Dev: Engenharia de Software na Era da IA** (Google Cloud & Alura). O projeto une os conceitos fundamentais de lógica de programação com Python a uma moderna interface web interativa potencializada pela **Gemini API** e **Google AI Studio**.

---

## 🚀 Funcionalidades

### 1. Script Python CLI (`calculadora.py`)
- **Operações Matemáticas:**
  - Soma (`+`), Subtração (`-`), Multiplicação (`*`), Divisão (`/`) com tratamento de divisão por zero.
  - Cálculo de Porcentagem (`%`) de forma direta e intuitiva.
- **Tratamento de Exceções:** Uso de `try/except` para prevenir falhas com inputs não numéricos.
- **Estruturas de Controle:** Laço interativo `while True` e decisões com `if/elif/else`.

### 2. Interface Web Interativa (React + Vite + Tailwind)
- **Simulador de Terminal:** Ambiente interativo no navegador simulando a execução do script Python.
- **Visualizador de Código:** Explicação didática linha por linha da lógica e sintaxe.
- **Calculadora Visual:** Interface rica construída com React 19 e Tailwind CSS.
- **Quiz de Fixação:** Avaliação rápida para iniciantes em programação.
- **Integração com Gemini API:** Recursos com IA generativa usando o SDK `@google/genai`.

---

## 🛠️ Tecnologias Utilizadas

- **Python 3.12:** Funções puras, controle de fluxo e CLI interativa.
- **React 19 & TypeScript:** Interface reativa, componentizada e fortemente tipada.
- **Vite:** Ferramenta de build ultrarrápida para desenvolvimento frontend.
- **Tailwind CSS & Motion:** Estilização moderna e microanimações fluidas.
- **Google GenAI SDK (`@google/genai`):** Integração com modelos generativos Gemini.

---

## 💻 Como Executar

### 1. Executando a Calculadora via Terminal Python

```bash
python3 calculadora.py
```

### 2. Executando o Web App Interativo

```bash
# Instalar as dependências
npm install

# Configurar a API Key do Gemini (opcional para os recursos de IA)
cp .env.example .env.local
# Adicione sua GEMINI_API_KEY no arquivo .env.local

# Iniciar o servidor de desenvolvimento
npm run dev
```

Acesse em `http://localhost:3000` (ou na porta indicada no terminal).
