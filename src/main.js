const TOTAL_POPULATION = 300;

const fr = 60;
function setup() {
  createCanvas(600, 600);
  slider = createSlider(1, 20, 1);
  // First generation is bigger
  for (var i = 0; i < TOTAL_POPULATION; i++) {
    birds[i] = new Bird();
  }
  frameRate(fr);
  pipe = new Pipe(width);
}
let div = fr / 1000;
let timer = 0;
function draw() {
  for (let n = 0; n < slider.value(); n++) {
    if (birds.length === 0) {
      nextGen();
      timer = 0;
      pipe.x = width;
    }
    for (let i = birds.length - 1; i >= 0; i--) {
      if (pipe.collide(birds[i]) || birds[i].floor()) {
        savedBirds.push(birds.splice(i, 1)[0]);
      }
    }
    for (let bird of birds) {
      bird.update();
      bird.think(pipe);

    }
    pipe.update();

    timer += 1 / div;
  }
  background(51);
  textSize(16);
  text("Generation :", 10, 20);

  text(`Best survival time : ${Math.floor(bestScore / div)}ms`, 10, 40)
  text(`Curretn Gen time: ${Math.floor(timer)}ms`, 10, 60)
  text(gen, 105, 20);

  for (let bird of birds) {
    bird.render();
  }
  pipe.render();

}