var encodeCodePoints = require('../codePoints/encodeCodePoints');

/**
 * Builds a string containing readable debug information about the given grapheme clusters.
 * 
 * @param {int[][]}  graphemeClusters - Grapheme clusters to get debug information about.
 * 
 * @returns {string} string containing debug information about the given grapheme clusters.
 */
module.exports = function getGraphemeClustersInfo(graphemeClusters) {
  var msg = '';
  
  msg += 'Num: ' + graphemeClusters.length;
  msg += '\n';
  
  // for each grapheme cluster...
  for (var i = 0; i < graphemeClusters.length; ++i) {
    var graphemeCluster = graphemeClusters[i];
    
    // encode the grapheme cluster's code points
    msg += '\n' + i + ':    ' + encodeCodePoints(graphemeCluster) + '    ';
    
    // show the code points that make up the grapheme cluster
    for (var j = 0; j < graphemeCluster.length; ++j) {
      var codePoint = graphemeCluster[j];
      
      msg += ' U+' + codePoint.toString(16).toUpperCase();
    }
  }
  
  return msg;
};