import asyncio
import datetime
import os
import pytest
from app.agent import root_agent, obter_instrucao, FerramentasDeArquivo, DIAS_DA_SEMANA
from google.adk.tools.skill_toolset import SkillToolset


def test_root_agent_properties():
    assert root_agent.name == "agente_estudos"
    assert len(root_agent.tools) == 2
    assert any(isinstance(t, SkillToolset) for t in root_agent.tools)
    assert any(isinstance(t, FerramentasDeArquivo) for t in root_agent.tools)


def test_obter_instrucao():
    instrucao = obter_instrucao()
    hoje = datetime.date.today()
    dia_semana = DIAS_DA_SEMANA[hoje.weekday()]
    data_formatada = hoje.strftime("%d/%m/%Y")
    
    assert data_formatada in instrucao
    assert dia_semana in instrucao
    assert "plano-de-estudos" in instrucao


@pytest.mark.asyncio
async def test_ferramentas_de_arquivo_filtro():
    ferramentas_arquivo = next(t for t in root_agent.tools if isinstance(t, FerramentasDeArquivo))
    tools = await ferramentas_arquivo.get_tools()
    tool_names = [t.name for t in tools]
    
    assert sorted(tool_names) == ["ReadFile", "WriteFile"]
