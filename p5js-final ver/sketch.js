var img = [];
var pg;
var c;
var index = 0;
var colorful = false
var button = []
var btext = ["clear", "next", "random color", "colorful"]
var bfunction = []

var f1 = function() {
 pg.clear()
}
var f2 = function() {
 index=(index+1)%7
}
var f3 = function() {
 c = color(random(360), random(60, 100), random(60, 100))
}
var f4 = function() {
 colorful=!colorful
}
var bf = [f1, f2, f3,f4]

function setup() {
 createCanvas(600, 800);
 setV()
 colorMode(HSB, 360, 100, 100);
 for (let i = 0; i <= 7; i++) {
  //img{i}= loadImage('img/00${i}.jpg');
  img[i] = loadImage(`img/00${i}.jpg`);
 }

 blendMode(BLEND);
 c = color(random(360), random(60, 100), random(60, 100));
 pg = createGraphics(800, 800);
 for (let i = 0; i < btext.length; i++) {
  button[i] = createButton(btext[i]);
  button[i].position(1000, 800 + i * 100);
  button[i].size(200,50)
  button[i].mousePressed(bf[i]);
 }
}

function draw() {
 for (let i = 0; i <= 7; i++) {
  img[i].resize(0, floor(height));
 }
 background(0);
 blendMode(BLEND);
 image(img[index], -0, -0);
 graffiti()
 blendMode(MULTIPLY);
 image(pg, 0, 0);
 if (colorful == true) {
  c = color(random(360), random(60, 100), random(60, 100));
 }
}

function keyPressed() {
 if (key == ' ') {
 index=(index+1)%7
 } 
 if (key == 'c'||key == 'C') {
  pg.clear()
 }
}

function setV() {
 distance = 10;
 spring = 0.5;
 friction = 0.5;
 size = 25;
 diff = size / 8;
 x = y = ax = ay = a = r = f = 0;
}

function graffiti() {
 oldR = r;
 if (mouseIsPressed) {
  mX = mouseX;
  mY = mouseY;
  if (!f) {
   f = 1;
   x = mX;
   y = mY;
  }
  ax += (mX - x) * spring;
  ay += (mY - y) * spring;
  ax *= friction;
  ay *= friction;
  a += sqrt(ax * ax + ay * ay) - a;
  a *= 0.6;
  r = size - a;
  pg.stroke(c)
  for (i = 0; i < distance; ++i) {
   oldX = x;
   oldY = y;
   x += ax / distance;
   y += ay / distance;
   oldR += (r - oldR) / distance;
   if (oldR < 1) oldR = 1;
   pg.strokeWeight(oldR + diff);
   pg.line(x, y, oldX, oldY);
   pg.strokeWeight(oldR);
   pg.line(x + diff * 2, y + diff * 2, oldX + diff * 2, oldY + diff * 2);
   pg.line(x - diff, y - diff, oldX - diff, oldY - diff);
  }
 } else if (f) {
  ax = ay = f = 0;
 }
}
