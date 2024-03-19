// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/VV1JmMYceJw


var wordSentimentDict;
var backupDict;
var lastWordScore;
var words = [];
var prevLength = 0;

const num = 2000;
const noiseScale = 0.02
const particles = [];

var hue;
var sat = 90;
var bright = 80;

function preload() {
  wordSentimentDict = loadJSON('afinn165.json');
  backupDict = loadJSON('sentiwords.json')
}


function setup() {
  createCanvas(600, 600);
  colorMode(HSB);

  background(0);

  // set up particles for perlin noise flow field
  for(let i = 0; i < num; i++) {
    particles.push(createVector(random(width), random(height)));
    stroke(255)
  }

  // get text input
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
      } 

      words.push(word);
      lastWordScore = score;
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
  // colorMode(RGBA)
  background(0, 0.1);

  // new word typed
  // console.log("words.length: " + words.length);
  // console.log("prevLength: " + prevLength);
 
  if (words.length > prevLength) {
    // console.log(words);
    // console.log(lastWordScore);

    noiseSeed(millis());
    
    if (lastWordScore > 0) { 
      // positive
      hue = map(lastWordScore, 0, 1, 70, 120);
      sat = 90
    } else if (lastWordScore < 0) {
      // negative
      hue = map(lastWordScore, -1, 0, 0, 20);
      sat = 90
    } else if (lastWordScore == 0) {
      // neutral
      hue = random(20, 60);
      sat = 50;
    } else {
      // not found
      hue = random(30, 60);
      sat = 2;
    }

    prevLength = words.length;
  }
  

  for (let i = 0; i < num; i++) {
    let p = particles[i]
    stroke(hue, sat, bright);
    strokeWeight(1.2);
    point(p.x, p.y);
    let n = noise(p.x * noiseScale, p.y * noiseScale);
    let a = TAU * n;
    p.x += cos(a);
    p.y += sin(a);
    if (!onScreen(p)) {
      p.x = random(width);
      p.y = random(height);
    }
  }
}

function onScreen(v) {
  return v.x >= 0 && v.x <= width && v.y >= 0 && v.y <= height;
}