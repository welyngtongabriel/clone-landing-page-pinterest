const grids = document.querySelectorAll(".grid");
const headings = document.querySelectorAll(".heading .wrapper .text");

function removeAnimations(gridColumns, heading) {
  // para todos os elemntos, após acionado remove classe de animação para trocar
  gridColumns.forEach((elemento) => {
    elemento.classList.remove("animate-enter", "animate-exit");
    // ↑ para garantir que remova todos as classes de animação indicadas 9se houver)
  });

  heading.classList.remove("animate-enter", "animate-exit");
}

function enterScreen(index) {
  const grid = grids[index]; // obtém o index selecionado pelo usuário
  const heading = headings[index];
  const gridColumns = grid.querySelectorAll(".column"); // todos os elementos com a classe ".x"

  // adicionar atribuir "active" a lista de classe do elemento
  grid.classList.add("active"); // fará com que a "tela" apareça conforme o css

  removeAnimations(gridColumns, heading);
}

function exitScreen(index, exitDelay) {
  const grid = grids[index];
  const heading = headings[index];
  const gridColumns = grid.querySelectorAll(".column");

  // para todos os elementos adiciona a nova classe de animação
  gridColumns.forEach((elemento) => {
    elemento.classList.add("animate-exit");
  });

  heading.classList.add("animate-exit");

  // definir tempo de espera até sair e remove a classe active
  setTimeout(() => {
    grid.classList.remove("active");

    removeAnimations(gridColumns, heading);

    gridColumns.forEach((elemento) => {
      elemento.classList.add("animate-enter");
    });

    heading.classList.add("animate-enter");
  }, exitDelay);
  // * ↑ "exitDelay" para esperar um tempo até a próxima frase entrar/aparecer
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
