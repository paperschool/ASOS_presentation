
let balls = null;

let clicks = [];

let baseColour = {r:255,g:255,b:255,a:255}

function setBaseColour(r,g,b,a){
  baseColour = {r:r,g:g,b:b,a:a}
  return baseColour;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function mouseClicked() {
  clicks.push(new Click(mouseX,mouseY));
  balls.scatter();
}

function touchEnded(){
  clicks.push(new Click(mouseX,mouseY));
  balls.scatter();
}

function setup() {

  var canvas = createCanvas(windowWidth,windowHeight);

  canvas.parent('slide-canvas-container');

  balls = new Balls(20);

}

function draw() {

  background(
    baseColour.r * 0.40,
    baseColour.g * 0.40,
    baseColour.b * 0.40,
    100
  );

  noStroke();


  for(let c = clicks.length-1 ; c >= 0 ; c--){

    let click = clicks[c];

    click.update();
    click.draw();

    if(click.isDead()){
      clicks.splice(c,1);
    }

  }

  balls.update();
  balls.draw();

}

class Click {

  constructor(x,y){
    this.pos = createVector(x,y);
    this.size = 0;
    this.max  = 200;
  }

  isDead(){
    return this.size > this.max;
  }

  update(){
    this.size += 10;
  }

  draw(){
    let alpha = map(this.size,0,this.max,255,0)
    fill(200,200,200,alpha)
    ellipse(this.pos.x,this.pos.y,this.size,this.size);
  }

}

function boostAll(){
  for(var ball of balls){
    ball.boost();
  }
}

class Balls {

  constructor(count){

    this.balls = [];
    this.count = count;

    for(var i = 0 ; i < this.count ; i++){
      this.balls.push(new Ball())
    }

  }

  update(){
    for(var ball of this.balls){
      ball.update();
    }
  }

  scatter(){

    let mouse = createVector(mouseX,mouseY);

    for(var ball of this.balls){
      ball.dir.x = mouse.x - ball.pos.x
      ball.dir.y = mouse.y - ball.pos.y
      ball.dir.normalize();
      ball.boost();
    }
  }

  draw(){
    for(var ball of this.balls){
      ball.draw();
    }
  }

}

class Ball {

  constructor(x,y){

    this.dir = createVector(
      random(-1,1),
      random(-1,1)
    )

    this.speed = random(1,5)

    this.speedNorm = this.speed;

    this.speedUp = this.speedNorm*5;

    this.size = random(10,50)

    this.pos = createVector(
      random(0,width),
      random(0,height)
    );

  }

  boost(){
    this.speed = this.speedUp;
  }

  bound(){

    if(this.pos.x - this.size/2 < 0 || this.pos.x + this.size/2 > width){
      this.dir.x *= -1;
    }

    if(this.pos.y - this.size/2 < 0 || this.pos.y + this.size/2 > height){
      this.dir.y *= -1;
    }

  }

  update(){

    this.pos.x += this.dir.x * this.speed
    this.pos.y += this.dir.y * this.speed

    if(this.speed > this.speedNorm){
      this.speed *= 0.98
    }

    if(this.speed < this.speedNorm) this.speed = this.speedNorm

    this.bound();

  }

  draw(){

    // fill(map(this.pos.x,0,width,0,255),map(this.pos.x,0,width,255,0),255)

    let sizeDelta = 0;

    if(this.speed > this.speedNorm){
      fill(baseColour.r+random(-50,50),
      baseColour.g+random(-50,50),
      baseColour.b+random(-50,50),
      baseColour.a+random(-50,50))
      sizeDelta = random(-10,10)
    } else {
      fill(baseColour.r,baseColour.g,baseColour.b,baseColour.a)
    }


    ellipse(this.pos.x,this.pos.y,this.size+sizeDelta,this.size+sizeDelta);

  }


}
