const seconds = document.getElementById('seconds');
const bpmIncrease = document.getElementById('increase');
const bpmDecrease = document.getElementById('decrease');
const startbtn = document.getElementById('start');
const intervalDisplay = document.getElementById('interval-display');
const countDisplay = document.getElementById('count-display');
const dropdown = document.getElementById('dropdown');
const circlesContainer = document.getElementById('cicles-container');

let ciclesVisible = true;

let countdown = null;
let isPlaying = false;

const scales = {
  'C': ['C', 'D', 'E', 'F', 'G', 'A', 'B'],
  'G': ['G', 'A', 'B', 'C', 'D', 'E', 'F#'],
  'D': ['D', 'E', 'F#', 'G', 'A', 'B', 'C#'],
  'A': ['A', 'B', 'C#', 'D', 'E', 'F#', 'G#'],
  'E': ['E', 'F#', 'G#', 'A', 'B', 'C#', 'D#'],
  'B': ['B', 'C#', 'D#', 'E', 'F#', 'G#', 'A#'],
  'F#': ['F#', 'G#', 'A#', 'B', 'C#', 'D#', 'E#'],
  'C#': ['C#', 'D#', 'E#', 'F#', 'G#', 'A#', 'B#'],
  'F': ['F', 'G', 'A', 'Bb', 'C', 'D', 'E'],
  'Bb': ['Bb', 'C', 'D', 'Eb', 'F', 'G', 'A'],
  'Eb': ['Eb', 'F', 'G', 'Ab', 'Bb', 'C', 'D'],
  'Ab': ['Ab', 'Bb', 'C', 'Db', 'Eb', 'F', 'G'],
  'Db': ['Db', 'Eb', 'F', 'Gb', 'Ab', 'Bb', 'C'],
  'Gb': ['Gb', 'Ab', 'Bb', 'Cb', 'Db', 'Eb', 'F'],
  'Cb': ['Cb', 'Db', 'Eb', 'Fb', 'Gb', 'Ab', 'Bb']
}

const romansMap = {
  '1': 'I',
  '2': 'II',
  '3': 'III',
  '4': 'IV',
  '5': 'V',
  '6': 'VI',
  '7': 'VII'
}

bpmDecrease.addEventListener('click', () => {
  if(parseInt(seconds.value) - 1 < 1)
    return;
  
  seconds.value = parseInt(seconds.value) - 1;
  countDisplay.innerHTML = seconds.value;

  stopExercise();
});

bpmIncrease.addEventListener('click', () => {
  if(parseInt(seconds.value) + 1 > 10)
    return;
  
  seconds.value = parseInt(seconds.value) + 1;
  countDisplay.innerHTML = seconds.value;
  
  stopExercise();
});

dropdown.addEventListener('click', () => {
  console.log("click")
  circlesContainer.classList.toggle("hidden");
  
  if(ciclesVisible){
    ciclesVisible = false;
    dropdown.innerHTML = "Mostrar escalas";
  }else{
    ciclesVisible = true;
    dropdown.innerHTML = "Ocultar escalas";
  }
});

startbtn.addEventListener('click', () => {
  if(isPlaying){
    stopExercise();
    isPlaying = false;
    dropdown.click();
    return;
  }

  const selectedNote = getSelectedNote();

  if (!selectedNote) {
    console.log("Nenhuma nota selecionada.");
    return;
  }

  dropdown.click();

  startbtn.innerHTML = "Parar";
    
  exercise(selectedNote);

  isPlaying = true;

});

document.addEventListener("DOMContentLoaded", () => {
  const listItems = document.querySelectorAll("ul li");

  listItems.forEach(item => {
      item.addEventListener("click", () => {
          // Remove a classe 'selected' de todos os itens
          listItems.forEach(li => li.classList.remove("selected"));

          if(isPlaying)
            stopExercise();

          // Adiciona a classe 'selected' no item clicado
          item.classList.add("selected");
      });
  });
});

// Função para obter o item selecionado
function getSelectedNote() {
  const selectedItem = document.querySelector("ul li.selected");
  return selectedItem ? selectedItem.textContent : null;
}

const stopExercise = () => {
  clearInterval(countdown);
  countDisplay.innerHTML = seconds.value;

  startbtn.innerHTML= "Iniciar";

}

const generateUniqueSequence = () => {
  const sequence = [1, 2, 3, 4, 5, 6, 7];

  for (let i = sequence.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [sequence[i], sequence[j]] = [sequence[j], sequence[i]];
  }

  return sequence;
}

const exercise = (selectedNote) => {
  let sequence = generateUniqueSequence();
  let currentInterval = sequence.shift();
  intervalDisplay.innerHTML = romansMap[currentInterval];

  const showNote = () => {
    if(!isPlaying)
      return;

    countDisplay.innerHTML = scales[selectedNote][currentInterval - 1];

    setTimeout(() => {
      countDisplay.innerHTML = seconds.value;
      countdown = setInterval(countdownInterval, 1000);

      if(sequence.length <= 0){
        sequence = generateUniqueSequence();
      }

      currentInterval = sequence.shift();
      intervalDisplay.innerHTML = romansMap[currentInterval];
    }, 2000);

  }

  const countdownInterval = () => {
    if(!isPlaying)
      return;

    countDisplay.innerHTML = parseInt(countDisplay.innerHTML) - 1;
    if(parseInt(countDisplay.innerHTML) < 0){
      clearInterval(countdown);
      showNote();
    }
  }

  countdown = setInterval(countdownInterval, 1000);
}