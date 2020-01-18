var exampleHelpers = require('./exampleHelpers');
var graphemejs     = require('../graphemejs');


// hey-$-you (9)
// $ = 'PERSON WITH BLOND HAIR' (U+1F471) unicode caracter
var str = process.argv[2];
var asciiStr = 'hey-$-you';

// extract extended custom grapheme clusters from the string
var graphemeClusters = graphemejs.extract(str, false, true);

exampleHelpers.displayExample(str, asciiStr, graphemeClusters);