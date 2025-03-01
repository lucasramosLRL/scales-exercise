const seconds = document.getElementById('seconds');
const bpmIncrease = document.getElementById('increase');
const bpmDecrease = document.getElementById('decrease');
const startbtn = document.getElementById('start');

let timer;
let isplaying = false;

bpmDecrease.addEventListener('click', () => {
  seconds.value = parseInt(seconds.value) - 1;

  // Reinica o timer de BPM
  // Reinicia a execução do exercicio
});

bpmIncrease.addEventListener('click', () => {
  seconds.value = parseInt(seconds.value) + 1;
  // Reinica o timer de BPM
  // Reinicia a execução do exercicio
});


startbtn.addEventListener('click', () => {
  if(isplaying){
    stopExercise();
    isplaying = false;
  }else{
    startExercise();
    isplaying = true;
  }
});

const startExercise = () => {
  console.log("Starting exercise");
  
  startbtn.innerHTML = "Parar";
}

const stopExercise = () => {
  
  startbtn.innerHTML= "Iniciar";

  console.log("Exercise stopped");
}