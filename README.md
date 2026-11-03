<div align="center">

# ⚡ Engenharia de Software na Era da IA: Agentes Autônomos, Sandboxing & Tooling Moderno
### Google Cloud & Alura • Antigravity CLI, Google ADK & Gemini Platform

![Google Cloud](https://img.shields.io/badge/Google%20Cloud-Platform-4285F4?style=for-the-badge&logo=google-cloud&logoColor=white)
![Google ADK](https://img.shields.io/badge/Google%20ADK-Agent%20Framework-34A853?style=for-the-badge&logo=google&logoColor=white)
![Gemini AI](https://img.shields.io/badge/Gemini%203.8%20Flash-LLM-8E75B2?style=for-the-badge&logo=google&logoColor=white)
![Astral uv](https://img.shields.io/badge/Astral%20uv-High--Performance%20Python-DE5FE9?style=for-the-badge&logo=python&logoColor=white)
![Architecture](https://img.shields.io/badge/Architecture-ReAct%20%7C%20Sandboxing%20%7C%20A2A-blue?style=for-the-badge)

<p align="center">
  <b>Exploração prática de padrões avançados de Engenharia de Software aplicados a Sistemas Agênticos de IA.</b><br>
  <i>Implementação de arquitetura ReAct, sandboxing de arquivos com menor privilégio, Tool Calling determinístico, especificação formal de Agent Skills e tooling de alto desempenho com o ecossistema Google.</i>
</p>

[Visão Arquitetural](#-visão-arquitetural-e-pilares-de-engenharia) •
[Engenharia Agêntica & Segurança](#-engenharia-agêntica-com-google-adk) •
[Tooling & Produtividade](#-tooling-moderno-e-engenharia-de-software) •
[Estrutura do Repositório](#-estrutura-do-monorepo) •
[Instruções de Execução](#-execução-e-reprodução)

---

</div>

## 🏛️ Visão Arquitetural e Pilares de Engenharia

O propósito deste repositório vai além de casos de uso isolados: trata-se de um laboratório prático focado em **padrões avançados de Engenharia de Software para a Era da IA Generativa**, explorando o estado da arte das ferramentas desenvolvidas pela engenharia do Google.

```
       +-----------------------------------------------------------+
       |             Google Antigravity CLI (agy)                  |
       |  Orquestração Assistida, Alinhamento (/grill-me) & Lint    |
       +-----------------------------+-----------------------------+
                                     |
                                     v
+--------------------------------------------------------------------------+
|                     GOOGLE ADK RUNTIME ENGINE                            |
|                                                                          |
|  +--------------------+   Instruction Provider   +--------------------+  |
|  |  Gemini 3.8 Flash  | <----------------------> | Contexto Dinâmico  |  |
|  |  (ReAct Reasoner)  |                          | (Data/Hora & Gating)| |
|  +---------+----------+                          +--------------------+  |
|            |                                                             |
|            | Structured Function Calling (JSON-RPC)                      |
|            v                                                             |
|  +--------------------+                          +--------------------+  |
|  |    SkillToolset    |                          | EnvironmentToolset |  |
|  |  (Agent Skills)    |                          | (Local Sandbox IO) |  |
|  |  - Validação Specs |                          | - POLP Isolation   |  |
|  |  - Gating Rules    |                          | - Read/Write Only  |  |
|  +--------------------+                          +--------------------+  |
+------------------------------------+-------------------------------------+
                                     | Output Determinístico
                                     v
                        [ Google Calendar CSV Pipeline ]
```

---

## 🧠 Engenharia Agêntica com Google ADK

A construção de agentes de IA confiáveis exige rigor arquitetural para evitar alucinações, vazamento de contexto e execuções não autorizadas. Neste projeto foram aplicados os seguintes padrões:

### 1. Arquitetura ReAct (Reasoning and Acting)
Ao invés de prompts estáticos ou cadeias lineares, o agente opera em um laço de raciocínio dinâmico:
- **Gating de Contexto:** O agente valida ativamente as pré-condições da tarefa antes de executar ações externas. Se parâmetros essenciais estiverem ausentes (e.g., prazos, carga horária semanal ou nível do usuário), o modelo interrompe a cadeia de ferramentas e solicita esclarecimentos.
- **Injeção Dinâmica de Instruções (`InstructionProvider`):** Injeção de metadados temporais em tempo de execução (`datetime` dinâmico), garantindo ancoragem temporal correta para agendamento.

### 2. Sandboxing e Princípio do Menor Privilégio (POLP)
- Implementação customizada de **`FerramentasDeArquivo`** estendendo o `EnvironmentToolset` do ADK.
- **Isolamento de Diretório:** O agente é confinado a um diretório de trabalho exclusivo (`planos/`), impossibilitando *directory traversal* ou acesso indevido à máquina host.
- **Restrição de Ações:** O agente **não tem permissão de shell** nem acesso a comandos do sistema operacional. As únicas ferramentas expostas são leitura e escrita cirúrgicas (`ReadFile` e `WriteFile`).

### 3. Especificação Formal de Agent Skills
- Adoção do padrão aberto de **Agent Skills** (`SKILL.md`), desacoplando o conhecimento de domínio da lógica de infraestrutura do agente.
- A skill define contratos rigorosos de entrada, fluxo de trabalho condicional e templates estruturados para geração de dados interoperáveis (formato RFC 4180 / Google Calendar).

---

## 🛠️ Tooling Moderno e Engenharia de Software

O ecossistema empregado utiliza as ferramentas mais eficientes do cenário contemporâneo de engenharia:

- **Google Antigravity CLI (`agy`):** Plataforma de desenvolvimento assistido por IA integrada nativamente à Google Agent Platform, trazendo análise estática, revisão de código e alinhamento interativo via entrevistas guiadas (`/grill-me`).
- **Astral `uv`:** Substituição de gerenciadores legados por um resolver de dependências de alta performance escrito em Rust, garantindo builds determinísticos e isolamento através do `uv.lock`.
- **Google `agents-cli`:** Framework de engenharia para o ciclo de vida completo de agentes autônomos (scaffolding, suite de testes automatizados, `eval` com métricas LLM-as-judge e telemetria).
- **Testes Automatizados & TDD:** Cobertura de testes unitários e de integração mockando ambientes de runtime (DOM e storage) para assegurar tolerância a falhas.
- **Segurança de Segredos:** Gestão via Application Default Credentials (ADC) e variáveis de ambiente isoladas, mantendo o histórico de commits 100% livre de segredos ou chaves sensíveis.

---

## 📂 Estrutura do Monorepo

```text
imersao-google-alura/
├── 01-calculadora-python-gemini/    # Lógica estruturada em Python e Web App reativo com SDK @google/genai
├── 02-poketask/                     # Aplicação frontend com persistência local e suite de 19 testes automatizados
├── 03-agente-estudos-adk/           # Agente ReAct construído com Google ADK, Toolsets e Sandboxing
│   ├── app/
│   │   ├── agent.py                 # Arquitetura do agente, filtragem de ferramentas e injeção de contexto
│   │   ├── fast_api_app.py          # Exposição de serviço web e integração A2A
│   │   └── skills/plano-de-estudos/ # Especificação padronizada de Agent Skill
│   ├── planos/                      # Diretório de sandbox isolado para escrita de artefatos
│   ├── tests/                       # Testes de integração, unitários e datasets de avaliação
│   └── pyproject.toml               # Dependências gerenciadas via uv
├── .gitignore                       # Políticas estritas de exclusão de artefatos e credenciais
└── README.md                        # Documentação técnica de arquitetura
```

---

## 💻 Execução e Reprodução

### Agente Autônomo com Google ADK (`03-agente-estudos-adk`)

```bash
cd 03-agente-estudos-adk

# 1. Configurar credenciais
cp .env.example .env
# Defina sua GEMINI_API_KEY no arquivo .env

# 2. Sincronizar o ambiente com o uv
uv sync

# 3. Iniciar o servidor local do ADK
uv run adk web --allow_origins="*"
```

### Suite de Testes Automatizados (`02-poketask`)

```bash
node 02-poketask/test_app.js
```

---

## 👤 Autor

Engenharia desenvolvida por **Hiago Oliveira** durante a jornada de **Engenharia de Software na Era da IA** (Google Cloud & Alura).

- **GitHub:** [@HiagoSant223](https://github.com/HiagoSant223)
- **LinkedIn:** [Perfil no LinkedIn](https://www.linkedin.com/in/hiagooliveira-dev/)
