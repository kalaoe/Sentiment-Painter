// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/VV1JmMYceJw


var wordSentimentDict;
var backupDict;
var lastWordScore = 0;
var words = [];
var prevLength = 0;

var rad;
var res;
var angle;
var blobObj = [];

class Blob {
  constructor(x, y, rad, displace) {
    this.x = x;
    this.y = y;
    this.rad = rad;
    this.szDelta = this.rad * displace; // ie., displace = 0.2 sets the displace amount 20% of the radius
    this.blobObj = [];
    
    // constants
    this.res = 10; // the number of points 
    this.angle = 360 / this.res; // angular distance between each point
  }
  
  display() {
    push(); // It's a good practice to use push and pop whenevewer you translate screen coordinates
    noStroke(); // Do not fill the shape with color. Just draw strokes
    translate(this.x, this.y); // translate the screen coordinate from top-left to middle of the canvas
    beginShape(); // start to draw custom shape
    for (var i = 0; i < this.res; i++) {
      var randRad = min(this.rad, this.rad+random(-this.szDelta, this.szDelta));
      this.blobObj.push({
        "rad": randRad,
        "x": randRad * cos(this.angle * i),
        "y": randRad * sin(this.angle * i)
      });
      // circle(this.blobObj[i].x, this.blobObj[i].y, 5);
      curveVertex(this.blobObj[i].x, this.blobObj[i].y); // add points to the custom shape
    }
    curveVertex(this.blobObj[0].x, this.blobObj[0].y);
    curveVertex(this.blobObj[1].x, this.blobObj[1].y);
    curveVertex(this.blobObj[2].x, this.blobObj[2].y);
    endShape(); // we finish adding points
    pop();
  }
}

function preload() {
  wordSentimentDict = loadJSON('afinn165.json');
  backupDict = loadJSON('sentiwords.json')
}


function setup() {
  createCanvas(400, 400); // window size
  rad = 100; // radius of the circular path
  res = 10; // the number of points 
  angle = 360 / res; // angular distance between each point
  angleMode(DEGREES); // enable the Degree mode not to make calculations easier.
  colorMode(HSB);

  background(40, 100, 90);

  var txt = select('#txt');
  txt.input(typing);

  function typing() {
    var textinput = txt.value();
    var scoredwords = [];
    var totalScore = 0;

    if (textinput.length == 1 && /\s+$/.test(textinput)) {
      txt.value("")
      textinput = txt.value();
    }

    if (/\s+$/.test(textinput)) {
      var score = 0;
      var word = textinput.substring(0, textinput.length-1);
      txt.value("");

      if (wordSentimentDict.hasOwnProperty(word)) {
        score = wordSentimentDict[word]/4; // score is from -4 to 4 in afinn165
        // console.log(word, score);
        totalScore += Number(score);
        // scoredwords.push(' ' + word + ': ' + score);
      } else if (backupDict.hasOwnProperty(word)) {
        score = backupDict[word];
        // console.log(word, score);
        totalScore += Number(score);
        // scoredwords.push(' ' + word + ': ' + score);
        draw();
      } // else {
      //   score = 0;
      // }
      words.push(word);
      lastWordScore = Number(score);
    }
  }
  // var scorePar = select('#score');
  // scorePar.html('score: ' + totalScore);
  // var comp = select('#comparative');
  // comp.html('comparative: ' + totalScore / words.length);
  // var wordlist = select('#wordlist');
  // wordlist.html(scoredwords);

  // console.log(txt.value());
  }


function draw() {
  // new word typed
  // console.log("words.length: " + words.length);
  // console.log("prevLength: " + prevLength);
  if (words.length > prevLength) {
    var hue;
    var sat = 90;
    var bright = 80;

    console.log(words);

    console.log(lastWordScore);
    
    if (lastWordScore > 0) { 
      // positive
      hue = random(70, 120);

    } else if (lastWordScore < 0) {
      // negative
      hue = random(0, 15);
    } else {
      // neutral
      hue = random(30, 60);
      sat = 2;
    }
    fill(color(hue, sat, bright));

    blob = new Blob(random(0, width), random(0, height), lastWordScore * 100, lastWordScore + 0.1);
    blob.display();
    prevLength = words.length;
  }
}

