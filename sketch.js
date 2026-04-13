let grasses = [];
let bubbles = [];
let numGrasses = 70;

function setup() {
  // 建立畫布
  createCanvas(windowWidth, windowHeight);
  initElements();
}

function draw() {
  clear(); // 清除畫布，這行很重要，否則背景會變全黑
  
  // 設定 0.3 透明度的水色背景 (e3f2fd = 227, 242, 253)
  background(227, 242, 253, 76); 

  for (let g of grasses) g.display();
  for (let b of bubbles) {
    b.update();
    b.display();
  }
}

function initElements() {
  grasses = [];
  bubbles = [];
  let colorPalette = ['#CF9E9E', '#C2C287', '#95CACA', '#B8B8DC', '#CA8EC2'];
  for (let i = 0; i < numGrasses; i++) {
    grasses.push(new Grass(random(width), height, colorPalette));
  }
  for (let i = 0; i < 25; i++) {
    bubbles.push(new Bubble());
  }
}

class Grass {
  constructor(x, y, palette) {
    this.x = x;
    this.y = y;
    this.h = random(height * 0.2, height * 0.45);
    this.w = random(20, 35);
    this.speed = random(0.01, 0.02);
    this.off = random(1000);
    let c = color(random(palette));
    c.setAlpha(150);
    this.color = c;
  }
  display() {
    noFill();
    stroke(this.color);
    strokeWeight(this.w);
    strokeCap(ROUND);
    beginShape();
    for (let i = 0; i <= 10; i++) {
      let t = i / 10;
      let nx = noise(t * 0.5, frameCount * this.speed + this.off);
      let x = this.x + map(nx, 0, 1, -200 * t, 200 * t);
      let y = this.y - t * this.h;
      if (i == 0) curveVertex(x, y);
      curveVertex(x, y);
      if (i == 10) curveVertex(x, y);
    }
    endShape();
  }
}

class Bubble {
  constructor() { this.init(); }
  init() {
    this.x = random(width);
    this.y = height + 50;
    this.s = random(5, 20);
    this.sp = random(1, 3);
  }
  update() {
    this.y -= this.sp;
    if (this.y < -20) this.init();
  }
  display() {
    stroke(255, 150);
    fill(255, 50);
    circle(this.x, this.y, this.s);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}