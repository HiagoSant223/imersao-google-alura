/**
 * ==============================================================================
 * APLICAÇÃO DE LISTA DE TAREFAS (POKÉDEX / TO-DO LIST)
 * ==============================================================================
 * 
 * Lógica da aplicação integrada ao tema Pokédex:
 * 1. Gerenciamento do estado das tarefas/missões (adicionar, alternar status, remover).
 * 2. Persistência de dados via LocalStorage do navegador.
 * 3. Gamificação com cálculo de EXP (barra de progresso) e mensagens de RPG.
 * 4. Manipulação da interface (DOM) preservando toda a compatibilidade funcional.
 */

// Chave utilizada para identificar os dados da aplicação no LocalStorage
const CHAVE_STORAGE = "tarefas_app";

// Elementos do HTML capturados para manipulação via DOM
const formTarefa = document.getElementById("form-tarefa");
const inputTarefa = document.getElementById("input-tarefa");
const mensagemErro = document.getElementById("mensagem-erro");
const listaTarefas = document.getElementById("lista-tarefas");
const estadoVazio = document.getElementById("estado-vazio");
const contadorPendentes = document.getElementById("contador-pendentes");
const contadorConcluidas = document.getElementById("contador-concluidas");

// Elementos adicionais de gamificação (Pokédex EXP e RPG)
const barraExp = document.getElementById("barra-exp");
const expPorcentagem = document.getElementById("exp-porcentagem");
const fraseRpg = document.getElementById("frase-rpg");

// Array que armazena a lista de tarefas em memória durante a execução
let tarefas = [];

/**
 * ==============================================================================
 * 1. FUNÇÕES DE PERSISTÊNCIA (LocalStorage)
 * ==============================================================================
 */

/**
 * Recupera as tarefas salvas no LocalStorage.
 * O LocalStorage armazena apenas strings, por isso usamos JSON.parse para converter
 * de volta para um Array de objetos JavaScript.
 * 
 * @returns {Array} Lista de tarefas salvas ou um array vazio.
 */
function carregarTarefasDoStorage() {
  const dados = localStorage.getItem(CHAVE_STORAGE);
  if (!dados) {
    return [];
  }
  try {
    return JSON.parse(dados);
  } catch (erro) {
    console.error("Erro ao converter tarefas do LocalStorage:", erro);
    return [];
  }
}

/**
 * Salva a lista de tarefas no LocalStorage.
 * Convertemos o array de objetos em string usando JSON.stringify.
 */
function salvarTarefasNoStorage() {
  localStorage.setItem(CHAVE_STORAGE, JSON.stringify(tarefas));
}

/**
 * ==============================================================================
 * 2. FUNÇÕES DE REGRAS DE NEGÓCIO (Ações sobre as tarefas)
 * ==============================================================================
 */

/**
 * Adiciona uma nova tarefa/missão à lista.
 * 
 * @param {string} texto - O texto digitado pelo usuário.
 */
function adicionarTarefa(texto) {
  // Limpa espaços em branco extras no início e fim
  const textoLimpo = texto.trim();

  // Validação: não permitir adicionar tarefa sem texto
  if (textoLimpo === "") {
    exibirErro("Digite uma missão para registrar na Pokédex!");
    return false;
  }

  // Criação do objeto que representa a tarefa
  const novaTarefa = {
    id: Date.now(), // Identificador único baseado no timestamp atual
    texto: textoLimpo,
    concluida: false // Toda nova tarefa começa como pendente (missão ativa)
  };

  // Adiciona a nova tarefa no início da lista
  tarefas.unshift(novaTarefa);

  // Persiste e atualiza a tela
  salvarTarefasNoStorage();
  renderizarTarefas();
  limparErro();

  return true;
}

/**
 * Alterna o status de uma tarefa entre pendente e concluída.
 * 
 * @param {number} id - Identificador da tarefa a ser alternada.
 */
function alternarStatusTarefa(id) {
  // Encontra a tarefa correspondente pelo ID
  const tarefa = tarefas.find((t) => t.id === id);

  if (tarefa) {
    // Inverte o valor booleano: se era true vira false, se era false vira true
    tarefa.concluida = !tarefa.concluida;

    // Salva a alteração e atualiza a interface
    salvarTarefasNoStorage();
    renderizarTarefas();
  }
}

/**
 * Remove uma tarefa da lista pelo seu ID.
 * 
 * @param {number} id - Identificador da tarefa a ser removida.
 */
function removerTarefa(id) {
  // Filtra a lista, mantendo apenas as tarefas cujo ID seja diferente do selecionado
  tarefas = tarefas.filter((t) => t.id !== id);

  // Salva a remoção e atualiza a interface
  salvarTarefasNoStorage();
  renderizarTarefas();
}

/**
 * ==============================================================================
 * 3. FUNÇÕES DE INTERFACE (Renderização e Gamificação)
 * ==============================================================================
 */

/**
 * Atualiza os contadores de tarefas e calcula o progresso de EXP do Treinador.
 */
function atualizarContadores() {
  const totalPendentes = tarefas.filter((t) => !t.concluida).length;
  const totalConcluidas = tarefas.filter((t) => t.concluida).length;
  const totalTarefas = tarefas.length;

  // Atualização dos contadores tradicionais
  contadorPendentes.textContent = totalPendentes;
  contadorConcluidas.textContent = totalConcluidas;

  // Gamificação: Cálculo de EXP e Barra de Progresso
  const porcentagem = totalTarefas === 0 ? 0 : Math.round((totalConcluidas / totalTarefas) * 100);

  if (barraExp) {
    barraExp.style.width = `${porcentagem}%`;
  }

  if (expPorcentagem) {
    expPorcentagem.textContent = `${porcentagem}%`;
  }

  // Mensagens Motivacionais Dinâmicas de RPG
  if (fraseRpg) {
    if (totalTarefas === 0) {
      fraseRpg.textContent = "Nenhuma missão ativa. Escolha seu próximo objetivo!";
    } else if (porcentagem === 100) {
      fraseRpg.textContent = "🎉 Fantástico, Treinador! Todas as missões foram capturadas!";
    } else if (porcentagem >= 50) {
      fraseRpg.textContent = "⚡ Mais da metade concluída! Mantenha a força na jornada!";
    } else {
      fraseRpg.textContent = "⚔️ Jornada em andamento! Capture todos os seus objetivos!";
    }
  }
}

/**
 * Exibe uma mensagem de validação de erro para o usuário.
 * 
 * @param {string} mensagem - Texto de aviso a ser exibido.
 */
function exibirErro(mensagem) {
  mensagemErro.textContent = mensagem;
  inputTarefa.focus();
}

/**
 * Limpa a mensagem de erro.
 */
function limparErro() {
  mensagemErro.textContent = "";
}

/**
 * Reconstrói a lista de tarefas no HTML a partir do array `tarefas`.
 */
function renderizarTarefas() {
  // Limpa os itens anteriores para evitar duplicatas
  listaTarefas.innerHTML = "";

  // Se não houver tarefas, exibe o radar de estado vazio
  if (tarefas.length === 0) {
    estadoVazio.style.display = "block";
  } else {
    estadoVazio.style.display = "none";

    // Cria os elementos HTML para cada tarefa cadastrada
    tarefas.forEach((tarefa) => {
      const li = document.createElement("li");
      li.className = "item-tarefa";

      // SE a tarefa estiver concluída, adiciona a classe CSS '.concluida'
      if (tarefa.concluida) {
        li.classList.add("concluida");
      }

      // Conteúdo clicável da tarefa (Checkbox Pokébola + Texto)
      const containerConteudo = document.createElement("div");
      containerConteudo.className = "item-conteudo";

      // Caixa de seleção customizada como Pokébola
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.className = "checkbox-tarefa";
      checkbox.checked = tarefa.concluida;
      checkbox.setAttribute("aria-label", `Marcar "${tarefa.texto}" como capturada`);

      // Evento de alteração no checkbox
      checkbox.addEventListener("change", () => {
        alternarStatusTarefa(tarefa.id);
      });

      // Texto da missão
      const spanTexto = document.createElement("span");
      spanTexto.className = "texto-tarefa";
      spanTexto.textContent = tarefa.texto;

      // Clicar no texto também alterna a conclusão da tarefa
      spanTexto.addEventListener("click", () => {
        alternarStatusTarefa(tarefa.id);
      });

      // Monta o lado esquerdo
      containerConteudo.appendChild(checkbox);
      containerConteudo.appendChild(spanTexto);

      // Botão de Excluir / Abandonar Missão
      const btnRemover = document.createElement("button");
      btnRemover.className = "btn-remover";
      btnRemover.textContent = "Excluir";
      btnRemover.setAttribute("aria-label", `Abandonar missão "${tarefa.texto}"`);

      // Evento de clique para remover a tarefa
      btnRemover.addEventListener("click", () => {
        removerTarefa(tarefa.id);
      });

      // Junta tudo no elemento <li>
      li.appendChild(containerConteudo);
      li.appendChild(btnRemover);

      // Adiciona o <li> na <ul> principal
      listaTarefas.appendChild(li);
    });
  }

  // Atualiza os contadores e a barra de EXP
  atualizarContadores();
}

/**
 * ==============================================================================
 * 4. EVENTOS DA APLICAÇÃO
 * ==============================================================================
 */

// Evento disparado quando o formulário é enviado (clique no botão ou tecla Enter)
formTarefa.addEventListener("submit", (evento) => {
  evento.preventDefault(); // Impede o recarregamento padrão da página

  const texto = inputTarefa.value;
  const sucesso = adicionarTarefa(texto);

  if (sucesso) {
    inputTarefa.value = ""; // Limpa o campo de texto
    inputTarefa.focus();   // Mantém o cursor pronto para nova digitação
  }
});

// Limpa a mensagem de erro assim que o usuário começa a digitar novamente
inputTarefa.addEventListener("input", () => {
  if (mensagemErro.textContent !== "") {
    limparErro();
  }
});

// Inicialização: carrega os dados do LocalStorage e renderiza ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
  tarefas = carregarTarefasDoStorage();
  renderizarTarefas();
});
