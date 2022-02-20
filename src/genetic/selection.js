
let cycles = 1;
let slider;
let gen = 0;
let increase = 0;

function nextGen() {
  calcFitness();

  gen += 1;
  // Sort best birds
  savedBirds.sort((a, b) => ((a.fit > b.fit) ? 1 : -1));
  let bestBird = [...savedBirds].splice(0, 1)[0];
  if (bestBird.score > bestScore) {
    bestScore = bestBird.score;
  }

  // Pick one of the 3 best birds
  for (let i = 0; i < TOTAL_POPULATION; i++) {
    birds[i] = pickOne(bestBird);
  }

  // Reset previous generation birds.
  savedBirds = [];
}
function fitLevel(score, pipeDist) {
  return score * (score + pipeDist);
}
function calcFitness() {
  let sum = 0;

  for (let bird of savedBirds) {
    let scores = fitLevel(bird.score, bird.pos.y - bird.heightAtDeath);
    bird.fitness = scores;
    sum += scores;
  }
  console.log(sum / savedBirds.length);
}

function pickOne(best) {
  let child = new Bird(best.brain);
  child.mutate();
  return child;
}