<div align="center">

# ⚡ Engenharia de Software na Era da IA: Sistemas Agênticos, Sandboxing & Tooling Moderno
### Google Cloud & Alura • Google ADK, Antigravity CLI & Gemini Platform

![Google Cloud](https://img.shields.io/badge/Google%20Cloud-Platform-4285F4?style=for-the-badge&logo=google-cloud&logoColor=white)
![Google ADK](https://img.shields.io/badge/Google%20ADK-Agent%20Framework-34A853?style=for-the-badge&logo=google&logoColor=white)
![Gemini AI](https://img.shields.io/badge/Gemini%203.8%20Flash-LLM-8E75B2?style=for-the-badge&logo=google&logoColor=white)
![Astral uv](https://img.shields.io/badge/Astral%20uv-High--Performance%20Python-DE5FE9?style=for-the-badge&logo=python&logoColor=white)
![Architecture](https://img.shields.io/badge/Architecture-ReAct%20%7C%20Sandboxing%20%7C%20POLP-blue?style=for-the-badge)

<p align="center">
  <b>Exploração aprofundada de padrões arquiteturais e engenharia de software para sistemas agênticos autônomos.</b><br>
  <i>Foco em determinismo de Tool Calling, isolamento de I/O em runtime (Least Privilege), especificação formal de Agent Skills e tooling moderno de desenvolvimento assistido por IA.</i>
</p>

[Visão Arquitetural](#-visão-arquitetural-do-sistema) •
[Pilares de Engenharia de Software](#-pilares-de-engenharia-de-software-aplicada-à-ia) •
[Mapeamento do Monorepo](#-mapeamento-do-monorepo) •
[Tooling & Produtividade](#-tooling-e-infraestrutura-de-desenvolvimento) •
[Execução e Reprodutibilidade](#-execução-e-reprodutibilidade) •
[Autor](#-autor)

---

</div>

## 🏛️ Visão Arquitetural do Sistema

Diferente de simples integrações de APIs de chat, a construção de **Sistemas Agênticos de Produção** exige rigor em separação de responsabilidades, idempotência e controle defensivo de execução. 

Este repositório documenta a implementação de um ecossistema agêntico baseado no **Google ADK (Agent Development Kit)** e **Antigravity CLI (`agy`)**, operando sob o paradigma **ReAct (Reasoning and Acting)** com isolamento estrito de I/O:

```
+----------------------------------------------------------------------------------+
|                            CAMADA DE ENGENHARIA & CLI                            |
|             Google Antigravity CLI (agy) & Google agents-cli                     |
|        - Análise estática, alinhamento (/grill-me) e suite de avaliação          |
+----------------------------------------+-----------------------------------------+
                                         |
                                         v
+----------------------------------------------------------------------------------+
|                           GOOGLE ADK RUNTIME ENGINE                              |
|                                                                                  |
|   +--------------------------+               +-------------------------------+   |
|   |   Gemini 3.8 Flash LLM   | <-----------> |  Dynamic Instruction Provider  |   |
|   |  (Reasoning & Decision)  |               |  - Ancoragem temporal em tempo |   |
|   +------------+-------------+               |    real (mitigação alucinação)|   |
|                |                             +-------------------------------+   |
|                | Function Calling Estruturado (JSON-RPC)                          |
|                v                                                                 |
|   +--------------------------------------+   +-------------------------------+   |
|   |       SkillToolset (Domínio)         |   | EnvironmentToolset (Sandbox)  |   |
|   | - Especificação formal (SKILL.md)    |   | - Princípio do Menor          |   |
|   | - Regras de Gating (Pré-condições)   |   |   Privilégio (POLP)           |   |
|   | - Fluxo sob demanda desacoplado      |   | - Apenas ReadFile/WriteFile   |   |
|   +--------------------------------------+   | - Sem acesso ao Shell do host |   |
|                                              +---------------+---------------+   |
+--------------------------------------------------------------|-------------------+
                                                               | I/O Confinado
                                                               v
                                                 [ ./planos/plano-de-estudos.csv ]
```

---

## 🔬 Pilares de Engenharia de Software Aplicada à IA

### 1. Arquitetura ReAct e Regras Estritas de Gating
O agente não atua como mero gerador de texto: ele orquestra um laço reflexivo de **pensamento ➔ validação ➔ ação**.
- **Gating de Execução:** Antes de executar qualquer ferramenta de escrita, o agente valida se todos os parâmetros críticos foram atendidos (objetivo, escopo, disponibilidade de tempo e nível prévio). Se houver ambiguidades, o laço é interrompido e uma interação de clarificação é disparada, impedindo a geração de saídas incompletas ou corrompidas.
- **Ancoragem Temporal Dinâmica:** Utilização de um `InstructionProvider` programático que injeta a data e o dia da semana no momento exato de cada invocação, eliminando alucinações temporais comuns ao gerar cronogramas relativos (*"começar na próxima segunda-feira"*).

### 2. Sandboxing e Princípio do Menor Privilégio (POLP)
A execução de ferramentas por modelos de linguagem apresenta vetores de risco caso o agente tenha acesso irrestrito ao sistema.
- **Isolamento de Diretório:** O `EnvironmentToolset` é configurado para um `LocalEnvironment` restrito exclusivamente à subpasta local `planos/`, prevenindo ataques de *path traversal*.
- **Filtragem Cirúrgica de Ferramentas:** Implementação da classe `FerramentasDeArquivo`, que sobrescreve o carregador de ferramentas para expor **apenas `ReadFile` e `WriteFile`**, bloqueando completamente ferramentas de terminal/shell ou comandos de infraestrutura do sistema operacional.

### 3. Desacoplamento via Especificação Formal de Agent Skills
- Adoção da especificação padronizada **Agent Skills** (`SKILL.md`).
- A lógica de negócio, os critérios de gating e os schemas de dados esperados (RFC 4180 / compatibilidade com importação direta do Google Calendar) residem em módulos versionáveis e portáveis, totalmente isolados do código de orquestração do framework.

### 4. Determinismo e Formatação Contratual de Saída
- O pipeline agêntico gera artefatos CSV determinísticos que cumprem os requisitos estritos do analisador do **Google Agenda** (campos `Subject`, `Start Date`, `Start Time`, `End Date`, `End Time`, `Description`). Qualquer desvio é capturado pelo contrato de dados da skill.

---

## 🛠️ Tooling e Infraestrutura de Desenvolvimento

A stack deste repositório foi selecionada com foco em performance, reprodutibilidade e padrões de qualidade:

| Ferramenta / Tecnologia | Finalidade Técnica | Diferencial de Engenharia |
|-------------------------|--------------------|---------------------------|
| **Google Antigravity CLI (`agy`)** | Engenharia assistida por IA | Plataforma nativa com comandos de diagnóstico, alinhamento estruturado de requisitos (`/grill-me`) e automação de workflows agênticos. |
| **Google ADK** | Framework de Agentes | Suporte a ReAct nativo, toolsets desacoplados, interceptadores e conformidade com o protocolo A2A (*Agent-to-Agent*). |
| **Astral `uv`** | Gerenciamento de runtime Python | Resolução determinística de dependências escrita em Rust, garantindo paridade total entre ambientes via `uv.lock`. |
| **Google `agents-cli`** | Ciclo de vida e qualidade | Scaffolding padronizado, suporte a infraestrutura como código (Terraform), telemetria e datasets de avaliação (`eval`). |
| **Node.js Test Runner (Custom Mocking)** | Testes automatizados | Execução de **19 testes unitários e de integração** no Projeto 02 com emulação in-memory de DOM e LocalStorage via módulo `vm`. |
| **React 19 & TypeScript** | Interface reativa e fortemente tipada | Validação de tipos em tempo de compilação, consumo do SDK `@google/genai` e componentização atômica. |

---

## 📂 Mapeamento do Monorepo

```text
imersao-google-alura/
├── 01-calculadora-python-gemini/    # Lógica estruturada em Python e Web App reativo com SDK @google/genai
│   ├── src/                         # Componentes React 19 + TypeScript + Tailwind
│   ├── calculadora.py               # Funções puras, validação de tipos e controle defensivo de fluxo
│   ├── package.json                 # Tooling frontend
│   └── README.md
│
├── 02-poketask/                     # Aplicação frontend com persistência local e testes
│   ├── index.html                   # Estrutura semântica
│   ├── style.css                    # Estilização modular com variáveis CSS
│   ├── script.js                    # Manipulação de DOM e persistência em LocalStorage
│   ├── test_app.js                  # Suite com 19 testes automatizados (unitários e integração)
│   └── README.md
│
├── 03-agente-estudos-adk/           # Agente ReAct construído com Google ADK, Toolsets e Sandboxing
│   ├── app/
│   │   ├── agent.py                 # Core: ReAct loop, instruction provider e filtro POLP
│   │   ├── fast_api_app.py          # Servidor backend e integração com protocolo A2A
│   │   └── skills/plano-de-estudos/ # Especificação de Skill padronizada com regras de gating
│   ├── planos/                      # Diretório de sandbox isolado para gravação de arquivos
│   ├── tests/                       # Testes de integração, unitários e datasets de avaliação
│   ├── pyproject.toml               # Dependências Python gerenciadas pelo uv
│   └── README.md
│
├── .gitignore                       # Políticas estritas contra vazamento de secrets, builds e caches
└── README.md                        # Documentação técnica e arquitetural
```

---

## 🧪 Qualidade de Software e Políticas de Segurança

- **Zero-Secret Leakage:** O repositório utiliza políticas ativas de `.gitignore` e verificação estrita, prevenindo qualquer exposição de chaves de API (`GEMINI_API_KEY`) ou tokens de nuvem.
- **Testes Automatizados:** Cobertura de fluxos críticos de manipulação de dados, persistência e validação de entradas através de runners automatizados sem dependência externa de browsers.
- **Sandboxing de Disco:** Nenhum arquivo é gravado ou lido fora da fronteira declarada no `LocalEnvironment`.

---

## 💻 Execução e Reprodutibilidade

### 1. Agente Autônomo com Google ADK (`03-agente-estudos-adk`)

```bash
cd 03-agente-estudos-adk

# 1. Configurar credenciais
cp .env.example .env
# Defina sua chave GEMINI_API_KEY no arquivo .env

# 2. Sincronizar o ambiente determinístico com uv
uv sync

# 3. Iniciar o servidor local do ADK
uv run adk web --allow_origins="*"
```
Acesse `http://127.0.0.1:8000`, selecione o agente `app` e acompanhe as chamadas de raciocínio e ferramentas na interface.

### 2. Suite de Testes Automatizados (`02-poketask`)

```bash
node 02-poketask/test_app.js
```
Saída esperada:
```text
=== RESUMO: 19/19 testes passaram com sucesso! ===
```

---

## 👤 Autor

Desenvolvido por **Hiago Oliveira** durante a jornada de **Engenharia de Software na Era da IA** (Google Cloud & Alura).

- **LinkedIn:** [hiago-santos-oliveira](https://www.linkedin.com/in/hiago-santos-oliveira/)
- **GitHub:** [@HiagoSant223](https://github.com/HiagoSant223)

---

<div align="center">
  <sub>Construído com foco em arquitetura resiliente, segurança agêntica e excelência técnica ⚡</sub>
</div>
