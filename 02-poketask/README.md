# 🎮 PokéTask • Pokédex de Missões

Uma aplicação web interativa de gerenciamento de tarefas (To-Do List) totalmente gamificada com estética **Pixel Art RPG** e inspirada no universo Pokémon.

---

## 🚀 Funcionalidades

- **Gerenciamento Completo de Tarefas (CRUD):**
  - Criação de novas missões com validação de dados (impede inputs em branco ou espaços vazios).
  - Alternância de status (Pendente / Concluída) com atualização visual imediata.
  - Remoção de missões concluídas ou canceladas.
- **Gamificação RPG (Sistema de EXP):**
  - Cálculo dinâmico de taxa de conclusão e ganho de pontos de experiência (EXP).
  - Barra de progresso interativa e mensagens dinâmicas de RPG conforme o treinador avança nas missões.
- **Persistência de Dados:**
  - Armazenamento automático no `LocalStorage` do navegador (os dados permanecem salvos após recarregar a página).
- **Interface Imersiva:**
  - Design inspirado no chassi clássico de uma Pokédex (LEDs de status, visor ótico e tipografia retrô *Press Start 2P* combinada com *Plus Jakarta Sans*).
- **Qualidade de Software:**
  - Suite de **19 testes unitários e de integração** automatizados rodando em Node.js com mocks de DOM e LocalStorage.

---

## 🛠️ Tecnologias Utilizadas

- **HTML5 Semântico:** Estruturação acessível e otimizada para navegadores modernos.
- **CSS3 Moderno:** Flexbox, Grid, Variáveis CSS (Custom Properties), animações e visual retrô Pixel Art.
- **JavaScript (ES6+ Vanilla):** Manipulação eficiente de DOM, modularidade e persistência em LocalStorage.
- **Node.js (Test Runner):** Execução da suite de testes automatizados com módulo `vm`.

---

## 💻 Como Executar

### 1. Abrir a aplicação no navegador
Basta abrir o arquivo `index.html` em qualquer navegador:

```bash
# Se estiver no Linux/Cloud Shell, você pode subir um servidor local simples:
python3 -m http.server 8080
```
Ou dê dois cliques no arquivo `index.html` no seu computador.

### 2. Rodar a suite de testes automatizados

```bash
node test_app.js
```

Você verá a execução dos 19 testes cobrindo validação, adição, alternância, persistência e remoção:

```text
=== RESUMO: 19/19 testes passaram com sucesso! ===
```
