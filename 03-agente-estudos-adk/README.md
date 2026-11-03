# 🧠 Agente de Estudos com Google ADK & Antigravity CLI

Agente autônomo inteligente desenvolvido durante a **Imersão Dev: Engenharia de Software na Era da IA** (Google Cloud & Alura). O agente atua como um mentor especialista em planejamento pedagógico, auxiliando estudantes a organizar cronogramas eficientes com técnicas de revisão espaçada e exportação direta para o **Google Agenda (Google Calendar)** via arquivo CSV.

Construído utilizando o **Google ADK (Agent Development Kit)**, arquitetura **ReAct**, modelo **Gemini 3.8 Flash** e gerenciado via **Antigravity CLI (`agy`)** e **`agents-cli`**.

---

## 🎯 Destaques do Projeto

- **Arquitetura ReAct (Reasoning + Acting):** O agente analisa a demanda do aluno, verifica se faltam parâmetros críticos (objetivo, prazo, disponibilidade semanal e nível atual) e interage até obter contexto suficiente antes de gerar o plano.
- **SkillToolset com Agent Skills:** Utiliza a skill [`plano-de-estudos`](app/skills/plano-de-estudos/SKILL.md) estruturada segundo a especificação de *Agent Skills* com regras de gating estritas e fluxo sob demanda.
- **EnvironmentToolset (Sandbox Seguro):** Interage com o sistema de arquivos local restrito à pasta `planos/`, expondo exclusivamente as ferramentas `ReadFile` e `WriteFile` para gerar o CSV sem acesso a shell ou comandos do sistema operacional.
- **Injeção Dinâmica de Contexto:** Provedor dinâmico de instruções que insere a data corrente e o dia da semana em tempo real para cálculo preciso de datas de estudo.
- **Compatibilidade Google Calendar:** O arquivo CSV gerado segue rigorosamente o formato de importação direta do Google Agenda (Subject, Start Date, Start Time, End Date, End Time, Description).

---

## 🛠️ Tecnologias Utilizadas

- **Google ADK (Agent Development Kit):** Framework do Google para orquestração de agentes autônomos.
- **Google Gemini 3.8 Flash:** Modelo de linguagem de alta velocidade e precisão para raciocínio e chamadas de ferramenta (Tool Calling).
- **Antigravity CLI (`agy`):** CLI avançada do Google para desenvolvimento de agentes assistido por IA.
- **Python 3.12 & `uv`:** Gerenciamento de dependências ultrarrápido com resolução determinística via `uv.lock`.
- **FastAPI:** Servidor backend para exposição de endpoints e interface web do ADK.
- **A2A Protocol (Agent-to-Agent):** Compatibilidade com o ecossistema de comunicação entre agentes autônomos.

---

## 📂 Estrutura do Projeto

```
03-agente-estudos-adk/
├── app/
│   ├── agent.py               # Definição do agente, toolsets, Gemini e instruções
│   ├── fast_api_app.py        # Servidor backend FastAPI
│   ├── skills/
│   │   └── plano-de-estudos/  # Skill com instruções e especificações do plano
│   └── app_utils/             # Utilitários auxiliares
├── planos/                    # Diretório sandbox onde os arquivos CSV são gravados
├── tests/                     # Testes unitários, de integração e avaliação (eval)
├── Dockerfile                 # Containerização pronta para Agent Runtime / Cloud Run
├── pyproject.toml             # Configuração de dependências Python
└── GEMINI.md                  # Contexto e guia para desenvolvimento assistido por IA
```

---

## 💻 Como Executar

### 1. Configurar variáveis de ambiente
Copie o arquivo de exemplo e insira sua API Key do Google AI Studio:

```bash
cp .env.example .env
```

Edite o `.env`:
```ini
GOOGLE_GENAI_USE_VERTEXAI=FALSE
GEMINI_API_KEY=sua_api_key_aqui
MODEL=gemini-3.8-flash
```

### 2. Sincronizar dependências com `uv`

```bash
uv sync
```

### 3. Iniciar a interface interativa do ADK Web

```bash
uv run adk web --allow_origins="*"
```

Abra o link gerado no terminal (`http://127.0.0.1:8000`), selecione o agente `app` e converse com o agente para montar seu cronograma de estudos!

---

## 🧪 Importando no Google Agenda

Após o agente gerar o plano e salvar o arquivo em `planos/plano-de-estudos.csv`:
1. Acesse o [Google Agenda](https://calendar.google.com/).
2. Vá em **Configurações ⚙️ → Importar e exportar → Importar**.
3. Selecione o arquivo CSV gerado e veja todas as suas sessões de estudo agendadas automaticamente!
