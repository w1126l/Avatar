
let sketchStarted = false;

let mic;
let micLevel;

var bodyColor, bodyOutlineColor, pupilColor, mouthColor, mouthOutlineColor;
var hatColor, hatOutlineColor, hatStrapColor, hatStrapColorOutline;

var leftEyeX, rightEyeX, eyeY;

var handHeight, mouthHeight;

let starDomainOne = [0.03, 0.28, 0.53, 0.78];
let starDomainTwo = [0.22, 0.47, 0.72, 0.97];

function setup() {

  createCanvas(windowHeight, windowHeight); //canvas
  background('#ffef85');

  drawBackgroundStars(); //background stars

  createButton("Start Froag").mousePressed(startSketch);

}

function startSketch() {

  mic = new p5.AudioIn();
  mic.start();

  sketchStarted = true;

}

function draw() {

  if(sketchStarted) {

  micLevel = mic.getLevel() * 10;

  //console.log('Mic level is: ' + micLevel);
  //console.log(frameCount);

  drawFrog();

}

}

function mousePressed() {

  if(mouseX > (width * 0.1) && mouseX < (width * 0.9) && mouseY > (height * 0.35) && mouseY < (height * 0.975)) {

    var c = 0;

    background(random(100, 255), random(100, 255), random(100, 255));

    drawBackgroundStars();

  } //change background color

}

function drawFrog() {

  if (mouseIsPressed) {

    bodyColor = color(140, 0, 40);
    bodyOutlineColor = color(183, 43, 84);
    pupilColor = color(255, 0, 0);
    mouthColor = color(0, 69, 33);
    mouthOutlineColor = color(0, 105, 50);

    hatColor = color(107, 47, 0);
    hatOutlineColor = color(172, 86, 18);
    hatStrapColor = color(255);

  } else {

    bodyColor = color(115, 255, 215);
    bodyOutlineColor = color(72, 212, 171);
    pupilColor = color(0);
    mouthColor = color(255, 186, 222);
    mouthOutlineColor = color(255, 150, 205);

    hatColor = color(148, 208, 255);
    hatOutlineColor = color(83, 169, 237);
    hatStrapColor = color(0);

  }

  drawBody(bodyColor, bodyOutlineColor);

  leftEyeX = map(mouseX, 0, width, 0.18, 0.22, true);
  rightEyeX = map(mouseX, 0, width, 0.78, 0.82, true);
  eyeY = map(mouseY, 0, height, 0.38, 0.42, true);

  drawEyeWhite(0.2, 0.4, 0.2, bodyOutlineColor); //left eye white
  drawEyeWhite(0.8, 0.4, 0.2, bodyOutlineColor); //right eye white

  drawEyePupil(leftEyeX, eyeY, 0.125, pupilColor); //left pupils
  drawEyePupil(rightEyeX, eyeY, 0.125, pupilColor); //right pupils

  mouthHeight = map(micLevel, 0, 1, 0.10, 0.15, true);
  drawMouth(0.5, 0.5, 0.15, mouthHeight, 0, PI, OPEN, mouthColor, mouthOutlineColor); //mouth

  handHeight = map(micLevel, 0, 1, 0.775, 0.625, true);
  drawHand(0.2, 0.7, 0.275, handHeight, 0.275, handHeight, 0.35, 0.7, bodyOutlineColor); //left hand
  drawHand(0.65, 0.7, 0.725, handHeight, 0.725, handHeight, 0.8, 0.7, bodyOutlineColor); //right hand

  drawHat(hatColor, hatOutlineColor); //hat :)
  drawHatStrap(hatStrapColor, hatOutlineColor); //hat strap

  laserEyes(leftEyeX, rightEyeX, eyeY);

}

function drawBody(bodyColor, bodyOutlineColor) {

  fill(bodyColor);
  stroke(bodyOutlineColor);
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

function drawEyeWhite(x, y, dia, bodyOutlineColor) {

  x = width * x;
  y = height * y;
  dia = height * dia;

  fill(255, 255, 255);
  stroke(bodyOutlineColor);
  strokeWeight(6);
  circle(x, y, dia);

}

function drawEyePupil(x, y, dia, pupilColor) {

  x = width * x;
  y = height * y;
  dia = height * dia;

  fill(pupilColor);
  strokeWeight(0);
  circle(x, y, dia);

}

function drawMouth(x, y, w, h, startAngle, stopAngle, parameter) {

  x = width * x;
  y = height * y;
  w = width * w;
  h = width * h;

  fill(mouthColor);
  stroke(mouthOutlineColor);
  strokeWeight(8);
  arc(x, y, w, h, startAngle, stopAngle, parameter);

}

function drawHand(left1x, left1y, left2x, left2y, right1x, right1y, right2x, right2y, bodyOutlineColor){

  left1x = width * left1x;
  left1y = height * left1y;
  left2x = width * left2x;
  left2y = height * left2y;
  right1x = width * right1x;
  right1y = height * right1y;
  right2x = width * right2x;
  right2y = height * right2y;

  stroke(bodyOutlineColor);
  strokeWeight(8);
  line(left1x, left1y, left2x, left2y);
  line(right1x, right1y, right2x, right2y);

}//left and right or sides of the specific hands, not the right hand or left hand

function drawHat(hatColor, hatOutlineColor) {

  fill(hatColor);
  stroke(hatOutlineColor);
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

function drawHatStrap(hatStrapColor, hatOutlineColor) {

  fill(hatStrapColor);
  stroke(hatOutlineColor);
  strokeWeight(5);
  rect(width * 0.35, height * 0.225, width * 0.3, height * 0.075);

}

function laserEyes(leftX, rightX, y) {

  leftX = width * leftX;
  rightX = width * rightX;
  y = height * y;

  stroke(255, 140, 150);
  strokeWeight(20);

  if(mouseIsPressed) {

    //laser beams
    line(leftX, y, mouseX, mouseY);
    line(rightX, y, mouseX, mouseY);

    //crosshair
    noFill();
    stroke(255);
    strokeWeight(5);
    line(mouseX - (width * 0.05), mouseY, mouseX + (width * 0.05), mouseY);
    line(mouseX, mouseY - (height * 0.05), mouseX, mouseY + (height * 0.05));
    circle(mouseX, mouseY, (height * 0.07));

    //angry brows
    stroke(0);
    strokeWeight(10);
    line(width * 0.15, height * 0.25, width * 0.275, height * 0.3);
    line(width * 0.85, height * 0.25, width * 0.725, height * 0.3);

  }

}

function drawBackgroundStars() {

  for(i = 0; i <= 3; i++) {

    for(j = 0; j <= 3; j++) {

      drawStar(starDomainOne[i], starDomainTwo[i], starDomainOne[j], starDomainTwo[j]);

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
