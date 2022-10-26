const grav = 0.38;
let birds = [];
let savedBirds = [];
let bestScore = 0;
const lift = -5;

class Bird {
  constructor(brain = undefined) {
    // Basic Game properties
    let ran = Math.random();
    this.pos = createVector((width / 6), (height / 2) * ran + (height / 2));
    this.vel = 0;
    this.size = 16;
    this.c = color(255, 45);

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
    nn.addHiddenLayer(8, 'tanH');
    nn.addHiddenLayer(4, 'tanH');
    nn.outputActivation('softplus');
    nn.makeWeights(-0.8, 0.8);
    return nn;
  }
 
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

  mutate() {
    this.brain.mutateRandom(0.4, 0.1);
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
    return (
      (this.pos.y >= height - this.size / 2) || 
      (this.pos.y <= this.size / 2)
    )
  }
  render() {
    fill(this.c);
    noStroke();
    ellipse(this.pos.x, this.pos.y, this.size, this.size);
  }
}
