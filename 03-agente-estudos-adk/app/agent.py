# Copyright 2026 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     https://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

import datetime
import os
from pathlib import Path

from google.adk.agents import Agent
from google.adk.apps import App
from google.adk.environment import LocalEnvironment
from google.adk.models import Gemini
from google.adk.skills import load_skill_from_dir
from google.adk.tools.environment import EnvironmentToolset
from google.adk.tools.skill_toolset import SkillToolset
from google.genai import types

MODEL = os.getenv("MODEL", "gemini-3.8-flash")

DIAS_DA_SEMANA = [
    "segunda-feira",
    "terça-feira",
    "quarta-feira",
    "quinta-feira",
    "sexta-feira",
    "sábado",
    "domingo",
]


class FerramentasDeArquivo(EnvironmentToolset):
    """Toolset de ambiente filtrado apenas para operações de arquivo (ReadFile e WriteFile)."""

    async def get_tools(self, readonly_context=None):
        tools = await super().get_tools(readonly_context)
        return [t for t in tools if t.name in ("ReadFile", "WriteFile")]


def obter_instrucao(context=None) -> str:
    """Instruction provider que injeta dinamicamente a data atual e o dia da semana."""
    hoje = datetime.date.today()
    dia_semana = DIAS_DA_SEMANA[hoje.weekday()]
    data_formatada = hoje.strftime("%d/%m/%Y")
    return (
        f"Hoje é {dia_semana}, data atual: {data_formatada}.\n"
        "Você é um mentor especialista em organização e planejamento de estudos.\n"
        "Ajude as pessoas a estruturar rotinas e cronogramas de aprendizado eficientes com a skill 'plano-de-estudos'.\n"
        "Siga rigorosamente as instruções da skill, incluindo a regra de ativação (gating rule) "
        "e o fluxo de trabalho sob demanda."
    )


# Caminhos absolutos calculados a partir de agent.py
APP_DIR = Path(__file__).parent.resolve()
SKILLS_DIR = APP_DIR / "skills" / "plano-de-estudos"
PLANOS_DIR = (APP_DIR.parent / "planos").resolve()
PLANOS_DIR.mkdir(parents=True, exist_ok=True)

# Inicialização dos toolsets
skill_plano = load_skill_from_dir(SKILLS_DIR)
skill_toolset = SkillToolset(skills=[skill_plano])
ferramentas_arquivo = FerramentasDeArquivo(
    environment=LocalEnvironment(working_dir=PLANOS_DIR)
)

root_agent = Agent(
    name="agente_estudos",
    model=Gemini(
        model=MODEL,
        retry_options=types.HttpRetryOptions(attempts=3),
    ),
    instruction=obter_instrucao,
    tools=[skill_toolset, ferramentas_arquivo],
)

app = App(
    root_agent=root_agent,
    name="app",
)
