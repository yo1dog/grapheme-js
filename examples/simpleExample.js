var exampleHelpers = require('./exampleHelpers');
var graphemejs     = require('../graphemejs');


// hey-$-you (9)
// $ = 'PERSON WITH BLOND HAIR' (U+1F471) unicode caracter
var str = '\u0068\u0065\u0079\u002D\uD83D\uDC71\u002D\u0079\u006F\u0075';
var asciiStr = 'hey-$-you';

// extract extended custom grapheme clusters from the string
var graphemeClusters = graphemejs.extract(str, false, true);

exampleHelpers.displayExample(str, asciiStr, graphemeClusters);