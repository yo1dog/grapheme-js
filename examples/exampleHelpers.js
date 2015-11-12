var graphemejs      = require('../graphemejs');
var codePointUtil   = graphemejs.codePointUtil;
var surrogePairUtil = graphemejs.surrogatePairUtil;
var debugUtil       = graphemejs.debugUtil;


function displayString(str) {
  console.log('Length: ' + str.length);
  console.log('');
  console.log(str);
}

function displayStringCodePoints(str) {
  var codePoints = codePointUtil.decode(str);
  
  console.log('Num: ' + codePoints.length);
  console.log('');
  
  for (var i = 0; i < codePoints.length; ++i) {
    var codePoint = codePoints[i];
    
    var msg = 'U+' + codePoint.toString(16).toUpperCase();
    
    if (surrogePairUtil.shouldBeEncoded(codePoint)) {
      var codeUnits = surrogePairUtil.encode(codePoint);
      
      msg +=
        ' (' +
        '0x' + codeUnits[0].toString(16).toUpperCase() +
        ', ' +
        '0x' + codeUnits[1].toString(16).toUpperCase() +
        ')';
    }
    
    console.log(msg);
  }
}

function displayGraphemeClusters(graphemeClusters) {
  console.log(debugUtil.getGraphemeClustersInfo(graphemeClusters));
}

function displayExample(str, asciiStr, graphemeClusters) {
  // display the string
  console.log('String:');
  displayString(str);
  
  // display the ASCII-only version of the string
  console.log('');
  console.log('--------------');
  console.log('ASCII String ($ = emoji):');
  displayString(asciiStr);
  
  // display each code point in the string
  console.log('');
  console.log('--------------');
  console.log('Code Points:');
  displayStringCodePoints(str);
  
  // display the grapheme clusters
  console.log('');
  console.log('--------------');
  console.log('Grapheme Clusters:');
  displayGraphemeClusters(graphemeClusters);
}


module.exports = {
  displayString          : displayString,
  displayStringCodePoints: displayStringCodePoints,
  displayGraphemeClusters: displayGraphemeClusters,
  displayExample         : displayExample
};