var exampleHelpers      = require('./exampleHelpers');
var graphemejs          = require('../graphemejs');
var codePointUtil       = graphemejs.codePointUtil;
var graphemeClusterUtil = graphemejs.graphemeClusterUtil;


// eeeeemojis (10)
var str =
  '\uD83D\uDC71\uD83C\uDFFF\uD83D\uDC78\uD83C\uDFFC\uD83D\uDE4B\uD83D\uDC87\uD83C\uDFFF\uD83D\uDE45' +
  '\uD83C\uDFFD\uD83D\uDE47\uD83C\uDFFC\uD83D\uDC69\u200D\u2764\uFE0F\u200D\uD83D\uDC69\uD83D\uDC68' +
  '\u200D\uD83D\uDC69\u200D\uD83D\uDC67\u200D\uD83D\uDC66\uD83D\uDC68\u200D\uD83D\uDC69\u200D\uD83D' +
  '\uDC67\uD83D\uDC6A';
var asciiString = '$$$$$$$$$$';

// extract extended custom grapheme clusters from the string with custom clustering
var customGraphemeClusters = graphemejs.extract(str, false, true);

// extract extended grapheme clusters from the string with custom clustering
var graphemeClusters = graphemejs.extract(str, false, false);

// display the string
console.log('String:');
exampleHelpers.displayString(str);

// display the ASCII-only version of the string
console.log('');
console.log('--------------');
console.log('ASCII String ($ = emoji):');
exampleHelpers.displayString(asciiString);


// display each code point in the string
console.log('');
console.log('--------------');
console.log('Code Points:');
exampleHelpers.displayStringCodePoints(str);

// display the custom grapheme clusters
console.log('');
console.log('--------------');
console.log('Grapheme Clusters with custom clustering:');
exampleHelpers.displayGraphemeClusters(customGraphemeClusters);

// display the grapheme clusters
console.log('');
console.log('--------------');
console.log('Grapheme Clusters without custom clustering:');
exampleHelpers.displayGraphemeClusters(graphemeClusters);