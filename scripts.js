const seconds = document.getElementById('seconds');
const bpmIncrease = document.getElementById('increase');
const bpmDecrease = document.getElementById('decrease');
const startbtn = document.getElementById('start');
const intervalDisplay = document.getElementById('interval-display');
const noteDisplay = document.getElementById('note-display');
const card = document.querySelector('.card');
const progressBar = document.getElementById('progress-bar');
const circlesContainer = document.getElementById('cicles-container');
const scaleNameDisplay = document.getElementById('scale-name');

let countdown = null;
let timeout = null;
let isPlaying = false;
let cardFlipped = false;
let progress = seconds.value;

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
  progress = seconds.value;
});

bpmIncrease.addEventListener('click', () => {
  if(parseInt(seconds.value) + 1 > 10)
    return;
  
  seconds.value = parseInt(seconds.value) + 1;
  progress = seconds.value;
});

card.addEventListener('click', () => {
  if(cardFlipped){
    cardFlipped = false;
  }else{
    cardFlipped = true;
  }

  card.classList.toggle('flipped');
});

startbtn.addEventListener('click', () => {
  if(isPlaying){
    stopExercise();
    isPlaying = false;
    toggleScales();
    scaleNameDisplay.classList.toggle("hidden");
    return;
  }

  const selectedNote = getSelectedNote();
  progress = seconds.value;

  if (!selectedNote) {
    console.log("Nenhuma nota selecionada.");
    return;
  }

  toggleScales();
  scaleNameDisplay.classList.toggle("hidden");

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

          // Adiciona a classe 'selected' no item clicado
          item.classList.add("selected");

          // Edita o nome da escala
          scaleNameDisplay.innerHTML = `Escala de ${item.textContent}`;
      });
  });
});

const toggleScales = () => {
  circlesContainer.classList.toggle("hidden");
};

// Função para obter o item selecionado
function getSelectedNote() {
  const selectedItem = document.querySelector("ul li.selected");
  return selectedItem ? selectedItem.textContent : null;
}

const stopExercise = () => {
  clearInterval(countdown);
  clearTimeout(timeout);

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

const updateProgressBar = (currentValue) => {
  progressBar.style.width = `${(currentValue / seconds.value) * 100}%`;
}

const exercise = (selectedNote) => {
  let sequence = generateUniqueSequence();
  let currentInterval = sequence.shift();
  intervalDisplay.innerHTML = romansMap[currentInterval];
  noteDisplay.innerHTML = scales[selectedNote][currentInterval - 1];
  updateProgressBar(progress);

  const flipCard = () => {
    if(!isPlaying)
      return;

    noteDisplay.innerHTML = scales[selectedNote][currentInterval - 1];
    card.classList.toggle('flipped');
    cardFlipped = true;

    timeout = setTimeout(() => {
      progress = seconds.value;
      updateProgressBar(progress);
      countdown = setInterval(countdownInterval, 1000);

      if(sequence.length <= 0){
        sequence = generateUniqueSequence();
      }

      card.classList.toggle('flipped');
      cardFlipped = false;
      
      currentInterval = sequence.shift();
      intervalDisplay.innerHTML = romansMap[currentInterval];
    }, 2000);

  }

  const countdownInterval = () => {
    if(!isPlaying)
      return;

    progress = progress - 1;
    updateProgressBar(progress);
    if(progress < 0){
      clearInterval(countdown);
      flipCard();
    }
  }

  countdown = setInterval(countdownInterval, 1000);
}