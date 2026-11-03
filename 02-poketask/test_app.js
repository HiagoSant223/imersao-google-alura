/**
 * Suite de Testes Automatizados para a Aplicação To-Do List
 * Simula o ambiente do navegador (DOM e LocalStorage) para validar todas as operações.
 */

const fs = require('fs');
const vm = require('vm');

// Simulação de LocalStorage
const mockLocalStorage = (() => {
  let store = {};
  return {
    getItem: (key) => store[key] || null,
    setItem: (key, val) => { store[key] = String(val); },
    clear: () => { store = {}; },
    getStore: () => store
  };
})();

// Simulação mínima de elementos DOM
function criarElementoMock(tag = 'div') {
  return {
    tagName: tag.toUpperCase(),
    value: '',
    textContent: '',
    innerHTML: '',
    className: '',
    classList: {
      classes: new Set(),
      add(c) { this.classes.add(c); },
      remove(c) { this.classes.delete(c); },
      contains(c) { return this.classes.has(c); }
    },
    style: {},
    children: [],
    appendChild(child) { this.children.push(child); },
    addEventListener() {},
    setAttribute() {},
    focus() {}
  };
}

const mockElements = {
  'form-tarefa': criarElementoMock('form'),
  'input-tarefa': criarElementoMock('input'),
  'mensagem-erro': criarElementoMock('span'),
  'lista-tarefas': criarElementoMock('ul'),
  'estado-vazio': criarElementoMock('div'),
  'contador-pendentes': criarElementoMock('strong'),
  'contador-concluidas': criarElementoMock('strong'),
};

const sandbox = {
  localStorage: mockLocalStorage,
  document: {
    getElementById: (id) => mockElements[id] || criarElementoMock(),
    createElement: (tag) => criarElementoMock(tag),
    addEventListener: () => {}
  },
  console: console,
  Date: Date
};

vm.createContext(sandbox);

// Substitui let/const no escopo de topo por var para que fiquem acessíveis no sandbox do teste
const rawScript = fs.readFileSync(__dirname + '/script.js', 'utf8');
const scriptCode = rawScript.replace(/^(let|const) /gm, 'var ');
vm.runInContext(scriptCode, sandbox);

// Funções de asserção
let totalTestes = 0;
let testesPassaram = 0;

function asserir(condicao, descricao) {
  totalTestes++;
  if (condicao) {
    testesPassaram++;
    console.log(`  ✔ [PASSOU] ${descricao}`);
  } else {
    console.error(`  ✖ [FALHOU] ${descricao}`);
    process.exitCode = 1;
  }
}

console.log("=== INICIANDO TESTES DA TO-DO LIST (project-antigravity) ===");

// 1. Teste de Campo Vazio
console.log("\n1. Teste de Validação de Campos Vazios:");
const resultadoVazio = sandbox.adicionarTarefa("   ");
asserir(resultadoVazio === false, "Não deve permitir adicionar tarefa apenas com espaços");
asserir(sandbox.tarefas.length === 0, "A lista de tarefas deve permanecer vazia");
asserir(mockElements['mensagem-erro'].textContent !== "", "Mensagem de erro amigável deve ser exibida");

// 2. Teste de Adicionar Tarefa
console.log("\n2. Teste de Adição de Tarefas:");
const resultadoAdicao1 = sandbox.adicionarTarefa("Estudar JavaScript");
const resultadoAdicao2 = sandbox.adicionarTarefa("Fazer compras");
asserir(resultadoAdicao1 === true && resultadoAdicao2 === true, "Tarefas válidas devem ser adicionadas com sucesso");
asserir(sandbox.tarefas.length === 2, "A lista deve conter exatamente 2 tarefas");
asserir(sandbox.tarefas[0].texto === "Fazer compras", "Nova tarefa deve entrar no início da lista");
asserir(sandbox.tarefas[0].concluida === false, "Nova tarefa deve começar como pendente");

// 3. Teste dos Contadores
console.log("\n3. Teste dos Contadores:");
sandbox.atualizarContadores();
asserir(mockElements['contador-pendentes'].textContent === 2, "Contador de pendentes deve ser 2");
asserir(mockElements['contador-concluidas'].textContent === 0, "Contador de concluídas deve ser 0");

// 4. Teste de Concluir Tarefa
console.log("\n4. Teste de Alternância de Conclusão (Toggle):");
const idTarefa1 = sandbox.tarefas[1].id; // "Estudar JavaScript"
sandbox.alternarStatusTarefa(idTarefa1);
asserir(sandbox.tarefas[1].concluida === true, "A tarefa selecionada deve estar concluída");
sandbox.atualizarContadores();
asserir(mockElements['contador-pendentes'].textContent === 1, "Contador de pendentes agora deve ser 1");
asserir(mockElements['contador-concluidas'].textContent === 1, "Contador de concluídas agora deve ser 1");

// 5. Teste de Persistência no LocalStorage (Salvar e Recarregar)
console.log("\n5. Teste de Persistência no LocalStorage:");
const jsonSalvo = mockLocalStorage.getItem("tarefas_app");
asserir(jsonSalvo !== null, "Os dados devem estar presentes no LocalStorage");

// Simula recarregamento da página lendo do storage
const tarefasRecarregadas = sandbox.carregarTarefasDoStorage();
asserir(tarefasRecarregadas.length === 2, "Deve recuperar 2 tarefas do LocalStorage");
asserir(tarefasRecarregadas[1].concluida === true, "O estado de concluída deve ser preservado após recarregar");

// 6. Teste de Remover Tarefa
console.log("\n6. Teste de Remoção de Tarefas:");
const idRemover = sandbox.tarefas[0].id; // "Fazer compras"
sandbox.removerTarefa(idRemover);
asserir(sandbox.tarefas.length === 1, "A lista deve conter 1 tarefa após a remoção");
asserir(sandbox.tarefas[0].texto === "Estudar JavaScript", "A tarefa restante deve ser 'Estudar JavaScript'");
sandbox.atualizarContadores();
asserir(mockElements['contador-pendentes'].textContent === 0, "Contador de pendentes deve ser 0");
asserir(mockElements['contador-concluidas'].textContent === 1, "Contador de concluídas deve ser 1");

console.log(`\n=== RESUMO: ${testesPassaram}/${totalTestes} testes passaram com sucesso! ===\n`);
