
let balls = [];

let clicks = [];

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function mouseClicked() {
  clicks.push(new Click(mouseX,mouseY));
}

function touchEnded(){
  clicks.push(new Click(mouseX,mouseY));
}

function setup() {

  var canvas = createCanvas(windowWidth,windowHeight);

  canvas.parent('slide-canvas-container');

  for(var i = 0 ; i < 20 ; i++){
    balls.push(ball = new Ball())
  }

}

function draw() {

  background(51,51,51,100);

  noStroke();


  for(let c = clicks.length-1 ; c >= 0 ; c--){

    let click = clicks[c];

    click.update();
    click.draw();

    if(click.isDead()){
      clicks.splice(c,1);
    }

  }

  for(var ball of balls){
    ball.update();
    ball.draw();
  }

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

class Ball {

  constructor(x,y){

    this.dir = createVector(
      random(-1,1),
      random(-1,1)
    )

    this.speed = random(1,5)

    this.size = random(10,50)

    this.pos = createVector(
      random(0,width),
      random(0,height)
    );

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

    this.bound();

  }

  draw(){

    fill(map(this.pos.x,0,width,0,255),map(this.pos.x,0,width,255,0),255)

    ellipse(this.pos.x,this.pos.y,this.size,this.size);

  }


}