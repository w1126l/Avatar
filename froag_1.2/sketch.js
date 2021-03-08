
let mic;
let micLevel;

var leftEyeX;
var rightEyeX;
var eyeY;

var handHeight;
var mouthHeight;

let domainOne = [0.03, 0.28, 0.53, 0.78];
let domainTwo = [0.22, 0.47, 0.72, 0.97];

function setup() {
  
  //createCanvas(windowWidth/1.8, windowWidth/1.8);
  createCanvas(1000, 1000); //canvas
  background('#ffef85');
  
  drawBackgroundStars(); //background stars
  
  var bodyColor = color('#73ffd7');
  
  mic = new p5.AudioIn();
  mic.start();
  
}
  
function draw() {

  micLevel = mic.getLevel() * 10;
  
  //console.log("The current microphone volume is: " + micLevel);
  
  drawBody();
  
  leftEyeX = map(mouseX, 0, width, 0.18, 0.22, true);
  rightEyeX = map(mouseX, 0, width, 0.78, 0.82, true);
  eyeY = map(mouseY, 0, height, 0.38, 0.42, true);
  
  drawEyeWhite(0.2, 0.4, 0.2); //left eye white
  drawEyeWhite(0.8, 0.4, 0.2); //right eye white
  drawEyePupil(leftEyeX, eyeY, 0.125); //left pupils
  drawEyePupil(rightEyeX, eyeY, 0.125); //right pupils
  
  mouthHeight = map(micLevel, 0, 1, 0.10, 0.15, true);
  drawMouth(0.5, 0.5, 0.15, mouthHeight, 0, PI, OPEN); //mouth
  
  handHeight = map(micLevel, 0, 1, 0.775, 0.625, true);
  drawHand(0.2, 0.7, 0.275, handHeight, 0.275, handHeight, 0.35, 0.7); //left hand
  drawHand(0.65, 0.7, 0.725, handHeight, 0.725, handHeight, 0.8, 0.7); //right hand
  
  drawHat(); //hat :)
  drawHatStrap(); //hat strap
  
}

function mousePressed() {
  
  if(mouseX > (width * 0.35) && mouseX < (width * 0.65) && mouseY > (height * 0.175) && mouseY < (height * 0.3)) {
    console.log("beep beep is here");
  }
}

function drawBody() {
  
  fill(bodyColor);
  stroke('#48d4ab');
  strokeWeight(6);
  
  beginShape();
  curveVertex(width * 0.1, height * 0.4);
  curveVertex(width * 0.025, height * 0.6);
  curveVertex(width * 0.1, height * 0.85);
  curveVertex(width * 0.25, height * 0.975);
  curveVertex(width * 0.75, height * 0.975);
  curveVertex(width * 0.9, height * 0.85);
  curveVertex(width * 0.975, height * 0.6);
  curveVertex(width * 0.9, height * 0.4);
  curveVertex(width * 0.7, height * 0.35);
  curveVertex(width * 0.3, height * 0.35);
  curveVertex(width * 0.1, height * 0.4);
  curveVertex(width * 0.025, height * 0.6);
  curveVertex(width * 0.1, height * 0.85);
  endShape();
  
}

function drawEyeWhite(x, y, dia) {
  
  x = width * x;
  y = height * y;
  dia = height * dia;
  
  fill(255, 255, 255);
  stroke('#48d4ab');
  strokeWeight(5);
  circle(x, y, dia);
  
}

function drawEyePupil(x, y, dia) {
  
  x = width * x;
  y = height * y;
  dia = height * dia;
  
  fill(20, 20, 20);
  strokeWeight(0);
  circle(x, y, dia);
  
}

function drawMouth(x, y, w, h, startAngle, stopAngle, parameter) {
  
  x = width * x;
  y = height * y;
  w = width * w;
  h = width * h;
  
  fill('#ffbade');
  stroke('#ff96cd');
  strokeWeight(8);
  arc(x, y, w, h, startAngle, stopAngle, parameter);
  
}

function drawHand(left1x, left1y, left2x, left2y, right1x, right1y, right2x, right2y){ 
  
  left1x = width * left1x;
  left1y = height * left1y;
  left2x = width * left2x;
  left2y = height * left2y;
  right1x = width * right1x;
  right1y = height * right1y;
  right2x = width * right2x;
  right2y = height * right2y;
  
  stroke('#48d4ab');
  strokeWeight(8);
  line(left1x, left1y, left2x, left2y);
  line(right1x, right1y, right2x, right2y);
  
}//left and right or sides of the specific hands, not the right hand or left hand

function drawHat() {
  
  fill('#94d0ff');
  stroke('#53a9ed');
  strokeWeight(5);
  beginShape();
  vertex(width * 0.35, height * 0.075);
  vertex(width * 0.35, height * 0.3);
  vertex(width * 0.3, height * 0.3);
  vertex(width * 0.3, height * 0.35);
  vertex(width * 0.7, height * 0.35);
  vertex(width * 0.7, height * 0.3);
  vertex(width * 0.65, height * 0.3);
  vertex(width * 0.65, height * 0.075);
  vertex(width * 0.35, height * 0.075);
  endShape();
}

function drawHatStrap() {
  
  fill('#000000');
  stroke('#53a9ed');
  strokeWeight(5);
  rect(width * 0.35, height * 0.225, width * 0.3, height * 0.075);
  
}

function drawBackgroundStars() {
  
  for(i = 0; i <= 3; i++) {
    
    for(j = 0; j <= 3; j++) {
      
      drawStar(domainOne[i], domainTwo[i], domainOne[j], domainTwo[j]);
      
    }
  }
}


function drawStar(a, b, c, d) {
  
  var starWidth = (width * random(a, b));
  var starHeight = (height * random(c, d));
  
  star(starWidth, starHeight);
  
}

function star(x, y) { //(x, y);
  
  fill('white');
  stroke('#ffe538');
  strokeWeight(5);
  
  var radius1 = width * 0.03; //deepness
  var radius2 = height * 0.055; //pointiness
  
  let angle = TWO_PI / 5;
  let halfAngle = angle / 2.0;
  
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
  
}
