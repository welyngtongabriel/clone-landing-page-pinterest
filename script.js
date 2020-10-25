const grids = document.querySelectorAll(".grid");
const headings = document.querySelectorAll(".heading .wrapper .text");

function enterScreen(index) {
  const grid = grids[index]; // obtém o index selecionado pelo usuário
  const heading = headings[index];
  const gridColumns = grid.querySelectorAll(".column"); // todos os elementos com a classe ".x"

  // adicionar atribuir "active" a lista de classe do elemento
  grid.classList.add("active"); // fará com que a "tela" apareça conforme o css

  // para todos os elemntos, após acionado remove classe de animação para trocar
  gridColumns.forEach((elemento) => {
    elemento.classList.remove("animate-before", "animate-after");
    // ↑ para garantir que remova todos as classes de animação
  });

  heading.classList.remove("animate-before", "animate-after");
}

// ↓ "exitDelay" paara esperar um tempo até a p´roxima frase entrar/aparecer
function exitScreen(index, exitDelay) {
  const grid = grids[index];
  const heading = headings[index];
  const gridColumns = grid.querySelectorAll(".column");

  // para todos os elemntos adiciona a nova classe de animação
  gridColumns.forEach((elemento) => {
    elemento.classList.add("animate-after");
  });

  heading.classList.add("animate-after");

  // definir tempo de espera até sair e remove a classe active
  setTimeout(() => {
    grid.classList.remove("active");
  }, exitDelay);
}

// definir um ciclo de animação
function setupAnimationCycle({ timePerScreen, exitDelay }) {
  // calcular o tempo de vida das animações
  const cycleTime = timePerScreen + exitDelay;
  let nextIndex = 0; // definindo que o primeiro index é "0"

  function nextCycle() {
    const currentIndex = nextIndex; // o ciclo de vida atual é igual ao nextIndex

    enterScreen(currentIndex); // acessa a "tela" relacionada ao currentIndex

    // defindo o que acontece quando acabar o tempo do ciclo
    setTimeout(() => exitScreen(currentIndex, exitDelay), timePerScreen);

    // 0,1,2,3 - 4 telas para mostrar
    nextIndex = nextIndex >= grids.length - 1 ? 0 : nextIndex + 1;
  }

  nextCycle(); // chama a função logo que a página é carregada

  // definindo um intervalo, para acontecer "sempre"
  setInterval(nextCycle, cycleTime);
}

// definir "tela" inicial ao carregar o site
setupAnimationCycle({
  timePerScreen: 2000, // tempo em milisegundos de permanência na tela
  exitDelay: 200 * 7, // tempo total para todas as colunas sairem (200ms * 7 colunas)
});
