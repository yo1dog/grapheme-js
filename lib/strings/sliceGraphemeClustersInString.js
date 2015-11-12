var extractGraphemeClustersFromString = require('./extractGraphemeClustersFromString');
var buildStringFromGraphemeClusters   = require('./buildStringFromGraphemeClusters');

/**
 * Slices the given string by grapheme clusters instead of by characters. It does this by
 * extracting grapheme clusters from the given string, slicing them via the `Array.slice` function,
 * and then building them back into a string.
 * 
 * **NOTE:** This function uses the `Array.slice` function internally, and not the `String.slice`
 * function. Therefore, this function should not be expected to behave exactly the same as the
 * `String.slice`, `String.substr`, nor `String.substring` functions. Refer to your documentation
 * for the `Array.slice` function for expected behavior.
 * 
 * @param {string} str                    - String to slice.
 * @param {int}    [start]                - Where to start slicing from. This is passed as the
 *   first paramter to the `Array.slice` function called on the extracted grapheme clusters.
 * @param {int}    [end]                  - Where to stop slicing at. This is passed as the second
 *   paramter to the `Array.slice` function called on the extracted grapheme clusters.
 * @param {boolean} [useLegacyClustering] - If legacy (`true`) or extended (`false`) grapheme
 *   clusters should be used. Defaults to `defaults.useLegacyClustering`.
 * @param {boolean} [useCustomClustering] - If custom clustering should be applied to the grapheme
 *   clusters (`true`) or not (`false`). Defaults to `defaults.useCustomClustering`.
 * 
 * @returns {string} string sliced based on its grapheme clusters.
 */
module.exports = function sliceGraphemeClusters(str, start, end, useLegacyClustering, useCustomClustering) {
  var graphemeClusters = extractGraphemeClustersFromString(str, useLegacyClustering, useCustomClustering);
  
  graphemeClusters = graphemeClusters.slice(start, end);
  
  return buildStringFromGraphemeClusters(graphemeClusters);
};