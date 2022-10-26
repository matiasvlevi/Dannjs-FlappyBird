class Pipe {
  constructor(x) {
    this.gapSize = 90;
    this.gapOffset = random(100, 500);
    this.x = x;
    this.w = 50;
    this.yoff = Math.random() * 100000;
  }
  update() {
    increase = map(gen, 0, 100000, 0, 1);
    this.x -= 7 + increase;

    // Increase for bigger train difficulty
    this.yoff += 0.004;
    this.gapOffset = map(noise(this.yoff), 0, 1, 100, 500);
    if (this.x <= -this.w) {
      this.x = width;
      this.yoff = random(100, 50000);
    }
  }
  collide(bird) {
    if (this.x < bird.pos.x && this.x + this.w > bird.pos.x && (bird.pos.y < this.gapOffset || bird.pos.y > this.downY))
      return true;
    else
      return false;
  }
  render() {
    fill(255);
    noStroke();
    rect(this.x, 0, this.w, this.gapOffset);
    this.downY = this.gapOffset + this.gapSize;
    rect(this.x, this.gapOffset + this.gapSize, this.w, height - this.downY);
  }
}