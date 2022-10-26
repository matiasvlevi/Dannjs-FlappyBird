
let cycles = 1;
let slider;
let gen = 0;
let increase = 0;

function nextGen() {
  calcFitness();

  gen += 1;
  // Sort best birds
  savedBirds.sort((a, b) => ((a.fit > b.fit) ? 1 : -1));
  let bestBird = savedBirds.reverse().splice(0, 4)[0];
  let simTime = bestBird.score;
  if (bestBird.score > bestScore) {
    bestScore = bestBird.score;
  }

  // Pick one of the 3 best birds
  for (let i = 0; i < TOTAL_POPULATION; i++) {
    birds[i] = pickOne(bestBird, simTime);
  }

  // Reset previous generation birds.
  savedBirds = [];
}
function fitLevel(score, pipeDist) {
  return score * -(score + Math.abs(pipeDist));
}
function calcFitness() {
  let sum = 0;

  for (let bird of savedBirds) {
    let scores = fitLevel(bird.score, bird.pos.y - bird.heightAtDeath);
    bird.fitness = scores;
    sum += scores;
  }

}

function pickOne(best, simTime) {
  let child = new Bird(best.brain);
  child.mutate(simTime);
  return child;
}