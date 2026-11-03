<div align="center">

# 🚀 Imersão Dev: Engenharia de Software na Era da IA
### Parceria Google Cloud & Alura

![Google Cloud](https://img.shields.io/badge/Google%20Cloud-4285F4?style=for-the-badge&logo=google-cloud&logoColor=white)
![Gemini](https://img.shields.io/badge/Gemini%20AI-8E75B2?style=for-the-badge&logo=google&logoColor=white)
![Python](https://img.shields.io/badge/Python%203.12-3776AB?style=for-the-badge&logo=python&logoColor=white)
![React](https://img.shields.io/badge/React%2019-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)

<p align="center">
  <b>Repositório com os 3 projetos desenvolvidos durante a imersão de IA e Engenharia de Software promovida pela Alura em parceria com o Google Cloud.</b><br>
  <i>Explorando desde lógica e interfaces ricas até o desenvolvimento de Agentes Autônomos de IA com o Google ADK e Antigravity CLI.</i>
</p>

[Visão Geral](#-visão-geral) •
[Projetos Desenvolvidos](#-projetos-desenvolvidos) •
[Estrutura do Repositório](#-estrutura-do-repositório) •
[Stack Tecnológica](#-stack-tecnológica) •
[Como Executar](#-como-executar) •
[Autor](#-autor)

---

</div>

## 📌 Visão Geral

Este repositório reúne a jornada prática na **Imersão Dev: Engenharia de Software na Era da IA**, realizada pela **Alura** em colaboração com o **Google**. 

Durante o programa, foram exploradas as ferramentas mais inovadoras do ecossistema Google para desenvolvimento assistido por IA:
- **Google Antigravity CLI (`agy`)**: nova geração de ferramentas de linha de comando orientadas a agentes e engenharia assistida.
- **Google ADK (Agent Development Kit)**: framework modular para orquestração de agentes de IA baseados em raciocínio e execução de ferramentas (*Reasoning and Acting - ReAct*).
- **Gemini 3.8 Flash & Google AI Studio**: integração de Large Language Models (LLMs) multimodais de alta performance e baixa latência.
- **Engenharia de Software de Ponta a Ponta**: testes automatizados, sandboxing seguro de arquivos, componentização web e versionamento profissional.

---

## 🌟 Projetos Desenvolvidos

| # | Projeto | Principais Tecnologias | Destaques |
|---|---------|------------------------|-----------|
| **01** | [**Calculadora Python & Gemini Web**](./01-calculadora-python-gemini) | `Python 3.12` `React 19` `TypeScript` `Tailwind CSS` `Gemini API` | CLI com tratamento de erros, terminal interativo no browser, explicador de código e quiz. |
| **02** | [**PokéTask (Pokédex de Missões)**](./02-poketask) | `JavaScript ES6+` `HTML5` `CSS3` `LocalStorage` `Node.js` | To-Do gamificado estilo RPG Pixel Art, cálculo de EXP dinâmico e suite de 19 testes automatizados. |
| **03** | [**Agente Autônomo de Estudos**](./03-agente-estudos-adk) | `Google ADK` `Antigravity CLI (agy)` `Gemini 3.8 Flash` `Python` `uv` | Agente ReAct com `SkillToolset` e sandbox de arquivos, exportando cronograma para o Google Agenda. |

---

### 🧮 1. Calculadora Python & Interface Interativa com Gemini AI
> Pasta: [`01-calculadora-python-gemini`](./01-calculadora-python-gemini)

- **Módulo Python (`calculadora.py`):** Calculadora CLI com operações essenciais (soma, subtração, multiplicação, divisão com guarda contra divisão por zero e cálculo percentual), laço de repetição robusto e validação de tipos com `try/except`.
- **Módulo Web Interativo:** Aplicação moderna construída com React 19, TypeScript e Tailwind CSS, trazendo um simulador de terminal, visualizador linha por linha do código-fonte e integração com a **Gemini API** via `@google/genai`.

---

### 🎮 2. PokéTask • Pokédex de Missões Gamificada
> Pasta: [`02-poketask`](./02-poketask)

- **Interface Pixel Art RPG:** Inspirada no design retrô do chassi clássico de uma Pokédex (LEDs dinâmicos, visor ótico e fontes temáticas).
- **Gamificação com Sistema de EXP:** Cálculo em tempo real da taxa de conclusão de tarefas com barra de experiência e frases motivacionais dinâmicas.
- **Persistência de Dados:** Armazenamento seguro de missões no `LocalStorage` do navegador.
- **Qualidade de Software:** Suite automatizada com **19 testes unitários e de integração** implementados em Node.js (`node test_app.js`), validando fluxos de adição, sanitização, alternância de status, persistência e remoção.

---

### 🧠 3. Agente Autônomo de Estudos (Google ADK & Antigravity CLI)
> Pasta: [`03-agente-estudos-adk`](./03-agente-estudos-adk)

- **Arquitetura ReAct com Google ADK:** Agente capaz de raciocinar e interagir ativamente. Ele identifica se o usuário forneceu todos os parâmetros pedagógicos necessários (meta, prazo, rotina semanal e nível de proficiência) antes de planejar.
- **SkillToolset & Agent Skills:** Utilização da skill padronizada `plano-de-estudos` com regras rigorosas de ativação e fluxo sob demanda.
- **EnvironmentToolset (Sandbox Seguro):** Manipulação restrita de sistema de arquivos através de um ambiente local isolado (`planos/`), expondo exclusivamente `ReadFile` e `WriteFile` para segurança e integridade do host.
- **Integração com Google Agenda (Google Calendar):** Geração automática de arquivo `.csv` formatado de acordo com as especificações de importação do Google Agenda, distribuindo as sessões de estudo ao longo do calendário com revisão espaçada.

---

## 📂 Estrutura do Repositório

```text
imersao-google-alura/
├── 01-calculadora-python-gemini/    # Projeto 1: Python CLI + Web App Gemini
│   ├── src/                         # Componentes React + TypeScript
│   ├── calculadora.py               # Script interativo em Python
│   ├── package.json                 # Dependências frontend
│   └── README.md
│
├── 02-poketask/                     # Projeto 2: Pokédex de Missões Gamificada
│   ├── index.html                   # Estrutura HTML5 da Pokédex
│   ├── style.css                    # Estilização Pixel Art RPG
│   ├── script.js                    # Lógica de DOM, EXP e LocalStorage
│   ├── test_app.js                  # Suite de 19 testes automatizados
│   └── README.md
│
├── 03-agente-estudos-adk/           # Projeto 3: Agente de IA com Google ADK
│   ├── app/
│   │   ├── agent.py                 # Core do agente, ReAct loop e toolsets
│   │   ├── fast_api_app.py          # Backend FastAPI
│   │   └── skills/plano-de-estudos/ # Especificação de Skill do agente
│   ├── planos/                      # Diretório de saída dos cronogramas em CSV
│   ├── tests/                       # Testes e avaliações do agente
│   ├── pyproject.toml               # Dependências Python gerenciadas pelo uv
│   └── README.md
│
├── .gitignore                       # Proteção contra vazamento de secrets e caches
└── README.md                        # Documentação principal do repositório
```

---

## 🛠️ Stack Tecnológica

- **Linguagens:** Python 3.12, JavaScript (ES6+), TypeScript, HTML5, CSS3.
- **IA & Cloud:** Google Cloud Platform, Google ADK, Antigravity CLI (`agy`), Google AI Studio, Gemini 3.8 Flash, `@google/genai`.
- **Frontend & UI:** React 19, Vite, Tailwind CSS, Lucide Icons, Motion.
- **Backend & Ferramentas:** FastAPI, `uv` (gerenciador ultrarrápido de pacotes Python), Node.js, Git & GitHub.
- **Metodologias:** Clean Code, TDD/Testes Automatizados, Arquitetura ReAct de Agentes, Persistência Local, Sandbox de Arquivos.

---

## 💻 Como Executar

### Pré-requisitos
- [Git](https://git-scm.com/)
- [Python 3.11+](https://www.python.org/)
- [Node.js 18+](https://nodejs.org/)
- [uv](https://docs.astral.sh/uv/) (recomendado para o projeto 03)

### Clonando o Repositório
```bash
git clone https://github.com/HiagoSant223/imersao-google-alura.git
cd imersao-google-alura
```

### Rodando o Projeto 01 (Calculadora & Gemini)
```bash
# Executar a calculadora no terminal:
python3 01-calculadora-python-gemini/calculadora.py

# Ou iniciar o web app interativo:
cd 01-calculadora-python-gemini
npm install
npm run dev
```

### Rodando o Projeto 02 (PokéTask)
```bash
# Executar a suite de 19 testes automatizados:
node 02-poketask/test_app.js

# Para abrir o app, abra o arquivo 02-poketask/index.html no seu navegador favorito!
```

### Rodando o Projeto 03 (Agente de Estudos ADK)
```bash
cd 03-agente-estudos-adk

# Configure sua API Key do Google AI Studio no arquivo .env
cp .env.example .env

# Sincronize o ambiente e inicie a interface interativa:
uv sync
uv run adk web --allow_origins="*"
```

---

## 👤 Autor

Desenvolvido por **Hiago Oliveira** durante a **Imersão Dev: Engenharia de Software na Era da IA** (Google & Alura).

- **GitHub:** [@HiagoSant223](https://github.com/HiagoSant223)
- **LinkedIn:** [Conecte-se comigo no LinkedIn](https://www.linkedin.com/in/hiagooliveira-dev/)

---

<div align="center">
  <sub>Construído com dedicação e explorando o futuro da Engenharia de Software com IA ⚡</sub>
</div>
