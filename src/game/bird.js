const grav = 0.28;
let birds = [];
let savedBirds = [];
let bestScore = 0;
const lift = -4;

class Bird {
  constructor(brain = undefined) {
    // Basic Game properties
    let ran = Math.random();
    this.pos = createVector((width / 6), (height / 2) * ran + (height / 2));
    this.vel = 0;
    this.size = 16;
    this.c = color(255, 100);

    this.heightAtDeath = 0;
    // Selection properties
    this.fitness = 0;
    this.score = 0;

    /**
     * @prop brain
     * Neural Network property
     * Inherit if specified a model is specified
     * else
     * create a new one
     */
    if (brain === undefined) {
      this.brain = Bird.initBrain();
    } else {
      let model = brain.toJSON();
      this.brain = Dann.createFromJSON(model);
    }
  }
  /**
   * @method initBrain
   * @static
   * 
   * Create a neural network for the bird.
   * 
   * @returns { Dann } A flappy bird neural network (4, 8, 2) Structure
   */
  static initBrain() {
    let nn = new Dann(4, 2);
    nn.addHiddenLayer(12, 'tanH');
    nn.outputActivation('sigmoid');
    nn.makeWeights(-0.8, 0.8);
    return nn;
  }
  // Need more population size
  // static initSmallBrain() {
  //   let nn = new Dann(4, 2);
  //   nn.addHiddenLayer(4, 'tanH');
  //   nn.outputActivation('sigmoid');
  //   nn.makeWeights();
  //   return nn;
  // }
  // // 4 layer brain
  // static initBrain4layers() {
  //   let nn = new Dann(4, 2);
  //   nn.addHiddenLayer(16, 'tanH');
  //   nn.addHiddenLayer(4, 'tanH');
  //   nn.outputActivation('tanH');
  //   nn.makeWeights();
  //   return nn;
  // }
  // // 5 LAYER BRAIN! 
  // static initBrain5layers() {
  //   let nn = new Dann(4, 2);
  //   nn.addHiddenLayer(16, 'tanH');
  //   nn.addHiddenLayer(8, 'tanH');
  //   nn.addHiddenLayer(4, 'tanH');
  //   nn.outputActivation('tanH');
  //   nn.makeWeights();
  //   return nn;
  // }
  jump() {
    this.vel = lift;
  }
  think(pipe) {
    let inputs = [
      this.pos.y / height,
      pipe.downY / height,
      pipe.gapOffset / height,
      pipe.x / width
    ]
    let output = this.brain.feed(inputs);

    if (output[0] > output[1]) {
      this.jump();
    }
  }
  mutate(simTime) {

    let m = 1;
    this.brain.mapWeights(w => {
      let ran = random(-1, 1) * (100 / simTime);
      return w + (w * ran);
    });
  }
  update() {
    this.vel += grav;
    this.pos.y += this.vel;
    this.score++;

    if (this.pos.y >= height - this.size / 2) {
      this.pos.y = height - this.size / 2;
      this.vel = 0;
    }
    if (this.pos.y <= this.size / 2) {
      this.pos.y = this.size / 2;
      this.vel = 0;
    }
  }
  floor() {
    if ((this.pos.y >= height - this.size / 2) || (this.pos.y <= this.size / 2)) {
      return true;
    } else {
      return false;
    }
  }
  render() {
    fill(this.c);
    stroke(0);
    ellipse(this.pos.x, this.pos.y, this.size, this.size);
  }
}
