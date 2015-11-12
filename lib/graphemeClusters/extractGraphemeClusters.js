var defaults                 = require('../defaults');
var isGraphemeClusterBoundry = require('./isGraphemeClusterBoundry');


/**
 * Groups the given code points into grapheme clusters.
 * 
 * @param {int[]}   codePoints            - The code points to group into grapheme clusters.
 * @param {boolean} [useLegacyClustering] - If legacy (`true`) or extended (`false`) grapheme
 *   clusters should be used. Defaults to `defaults.useLegacyClustering`.
 *   
 *   In most causes extended grapheme clusters (`false`) shoud be used. From
 *   http://www.unicode.org/reports/tr29/#Grapheme_Cluster_Boundaries - "The Unicode Standard
 *   provides default algorithms for determining grapheme cluster boundaries, with two variants:
 *   legacy grapheme clusters and extended grapheme clusters. The most appropriate variant depends
 *   on the language and operation involved. However, the extended grapheme cluster boundaries are
 *   recommended for general processing, while the legacy grapheme cluster boundaries are
 *   maintained primarily for backwards compatibility with earlier versions of this specification."
 * 
 * @returns {int[][]} array of grapheme clusters extracted from the given code points. Each element
 *   in the array is an array of code points that make up a grapheme cluster. e.g. `result[2]` is
 *   the third grapheme cluster and `result[2][4]` is the fith code point in the third grapheme
 *   cluster.
 */
module.exports = function extractGraphemeClusters(codePoints, useLegacyClustering) {
  // default the params
  if (typeof useLegacyClustering === 'undefined') {
    useLegacyClustering = defaults.useLegacyClustering;
  }
  
  // if we were given no code points there can be no grapheme clusters
  if (codePoints.length === 0) {
    return [];
  }
  
  var graphemeClusters = [];
  var graphemeCluster = [];
  
  // for each code point...
  for (var i = 0; i < codePoints.length; ++i) {
    var codePoint     = codePoints[i];
    var nextCodePoint = codePoints[i + 1]; // will be falsy on the last iteration
    
    // add the current code point to the current grapheme cluster
    graphemeCluster.push(codePoints[i]);
    
    // check if there is a grapheme cluster boundry between the current and next code point
    if (isGraphemeClusterBoundry(codePoint, nextCodePoint, useLegacyClustering)) {
      // there is a grapheme cluster boundry between the code points
      // we should end the current grapheme cluster and start a new one
      
      // add the current grapheme cluster to the list
      graphemeClusters.push(graphemeCluster);
      
      // start a new grapheme cluster
      graphemeCluster = [];
    }
  }
  
  // return the grapheme clusters we found
  return graphemeClusters;
};