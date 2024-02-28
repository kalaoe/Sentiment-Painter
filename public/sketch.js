// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/VV1JmMYceJw


var wordSentimentDict;

function preload() {
  wordSentimentDict = loadJSON('afinn165.json');
  backupDict = loadJSON('sentiwords.json')
}


function setup() {
  createCanvas(400, 400);
  background(255, 204, 0);
  // console.log(wordSentimentDict);

  var txt = select('#txt');
  txt.input(typing);

  function typing() {
    var textinput = txt.value();
    var scoredwords = [];
    var totalScore = 0;

    if (/\s+$/.test(textinput)) {
      var words = textinput.split(/\s/);
      console.log(words);
      for (var i = 0; i < words.length; i++) {
        var word = words[i].toLowerCase();
        if (wordSentimentDict.hasOwnProperty(word)) {
          var score = wordSentimentDict[word]/4; // score is from -4 to 4 in afinn165
          // console.log(word, score);
          totalScore += Number(score);
          scoredwords.push(' ' + word + ': ' + score);
        } else if (backupDict.hasOwnProperty(word)) {
          var score = backupDict[word];
          // console.log(word, score);
          totalScore += Number(score);
          scoredwords.push(' ' + word + ': ' + score);
        }
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
}


function draw() {
  circle(mouseX, mouseY, 20);
}