var exampleHelpers = require('./exampleHelpers');
var graphemejs     = require('../graphemejs');


// ZALGOT (6)
var str =
  '\u005A\u0351\u036B\u0343\u036A\u0302\u036B\u033D\u034F\u0334\u0319\u0324\u031E\u0349\u035A\u032F' +
  '\u031E\u0320\u034D\u0041\u036B\u0357\u0334\u0362\u0335\u031C\u0330\u0354\u004C\u0368\u0367\u0369' +
  '\u0358\u0320\u0047\u0311\u0357\u030E\u0305\u035B\u0341\u0334\u033B\u0348\u034D\u0354\u0339\u004F' +
  '\u0342\u030C\u030C\u0358\u0328\u0335\u0339\u033B\u031D\u0333\u0021\u033F\u030B\u0365\u0365\u0302' +
  '\u0363\u0310\u0301\u0301\u035E\u035C\u0356\u032C\u0330\u0319\u0317';
var asciiStr = 'ZALGOT';

// extract extended custom grapheme clusters from the string
var graphemeClusters = graphemejs.extract(str, false, true);

exampleHelpers.displayExample(str, asciiStr, graphemeClusters);