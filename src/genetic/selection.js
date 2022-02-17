
let cycles = 1;
let slider;
let gen = 0;
let increase = 0;

function nextGen() {
  calcFitness();

  gen += 1;
  // Sort best birds
  savedBirds.sort((a, b) => ((a.fit > b.fit) ? 1 : -1));
  let bestBirds = [...savedBirds].splice(0, 3);

  // Pick one of the 3 best birds
  for (let i = 0; i < TOTAL_POPULATION; i++) {
    birds[i] = pickOne(bestBirds);
  }

  // Reset previous generation birds.
  savedBirds = [];
}

function calcFitness() {
  let sum = 0;
  for (let bird of savedBirds) {
    sum += bird.score;
  }

  for (let bird of savedBirds) {
    bird.fitness = bird.score / sum;
  }
}

function pickOne(bestBirds) {
  let ran = Math.floor(Math.random() * 3);

  let child = new Bird(bestBirds[ran].brain);
  child.mutate();
  return child;
}