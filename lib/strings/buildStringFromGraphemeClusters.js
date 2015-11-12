var encodeCodePoints = require('../codePoints/encodeCodePoints');

/**
 * Encodes all the code points from the given grapheme clusters into a string.
 * 
 * @param {int[][]} graphemeClusters - Grapheme clusters to create a string from.
 * 
 * @returns {string} String built from the given grapheme clusters.
 */
module.exports = function buildStringFromGraphemeClusters(graphemeClusters) {
  var str = '';
  
  for (var i = 0; i < graphemeClusters.length; ++i) {
    str += encodeCodePoints(graphemeClusters[i]);
  }
  
  return str;
};