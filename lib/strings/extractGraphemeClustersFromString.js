var defaults                      = require('../defaults');
var decodeCodePoints              = require('../codePoints/decodeCodePoints');
var extractGraphemeClusters       = require('../graphemeClusters/extractGraphemeClusters');
var applyCustomGraphemeClustering = require('../graphemeClusters/applyCustomGraphemeClustering');

/**
 * Decodes the given string into code points and groups them into grapheme clusters.
 * 
 * @param {string}  str                   - The string to extract grapheme clusters from.
 * @param {boolean} [useLegacyClustering] -  If legacy (`true`) or extended (`false`) grapheme
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
 * @param {boolean} [useCustomClustering] - If custom clustering should be applied to the grapheme
 *   clusters (`true`) or not (`false`). Defaults to `defaults.useCustomClustering`.
 * 
 * @returns {int[][]} array of grapheme clusters extracted from the given string. Each element in
 *   the array is an array of code points that make up a grapheme cluster. e.g. `result[2]` is the
 *   third grapheme cluster and `result[2][4]` is the fith code point in the third grapheme
 *   cluster.
 */
module.exports = function extractGraphemeClustersFromString(str, useLegacyClustering, useCustomClustering) {
  // default the params
  if (typeof useLegacyClustering === 'undefined') {
    useLegacyClustering = defaults.useLegacyClustering;
  }
  if (typeof useCustomClustering === 'undefined') {
    useCustomClustering = defaults.useCustomClustering;
  }
  
  // convert the string to code points
  var codePoints = decodeCodePoints(str);
  
  // split the code points into grapheme clusters
  var graphemeClusters = extractGraphemeClusters(codePoints, useLegacyClustering);
  
  // apply our custom grapheme clustering
  if (useCustomClustering) {
    graphemeClusters = applyCustomGraphemeClustering(graphemeClusters);
  }
  
  return graphemeClusters;
};