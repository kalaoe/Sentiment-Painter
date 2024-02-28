// https://youtu.be/uw3GbsY_Pbc
// Coding Challenge #44: AFINN-111 Sentiment Analysis - Part 1

var table;
var afinn = {}

function preload() {
  table = loadTable("AFINN165.txt", "tsv");
}

function setup() {
  noCanvas()
  console.log(table);
  for (var i = 0; i < table.getRowCount(); i++) {
    var row = table.getRow(i);
    var word = row.get(0);
    var score = row.get(1);

    afinn[word] = score;
    console.log(word, score);
  }
  console.log(afinn);
  save(afinn, "afinn165.json");
}

function draw() {

}