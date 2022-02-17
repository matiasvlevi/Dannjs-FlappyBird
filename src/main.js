const TOTAL_POPULATION = 80;


function setup() {
  createCanvas(600, 600);
  slider = createSlider(1, 200, 1);
  // First generation is bigger
  for (var i = 0; i < TOTAL_POPULATION * 5; i++) {
    birds[i] = new Bird();
  }

  pipe = new Pipe(width);
}

function draw() {
  for (let n = 0; n < slider.value(); n++) {
    if (birds.length === 0) {
      nextGen();
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
  }
  background(51);
  textSize(16);
  text("Generation :", 10, 20);
  text(gen, 105, 20);

  for (let bird of birds) {
    bird.render();
  }
  pipe.render();
}