var getGraphemeClustersInfo           = require('./getGraphemeClustersInfo.js');
var extractGraphemeClustersFromString = require('../strings/extractGraphemeClustersFromString');
var shouldBeEncodedInSurrogatePair    = require('../surrogatePairs/shouldBeEncodedInSurrogatePair');
var encodeSurrogatePair               = require('../surrogatePairs/encodeSurrogatePair');


/**
 * Extracts grapheme clusters from the given string and returns a string containing readable debug
 * information about them.
 * 
 * @param {string}  str                   - String to get debug information about.
 * @param {boolean} [useLegacyClustering] - If legacy (`true`) or extended (`false`) grapheme
 *   clusters should be used. Defaults to `defaults.useLegacyClustering`.
 * @param {boolean} [useCustomClustering] - If custom clustering should be applied to the grapheme
 *   clusters (`true`) or not (`false`). Defaults to `defaults.useCustomClustering`.
 * 
 * @returns {string} string containing debug information about the grapheme clusters in the given
 *   string.
 */
module.exports = function getStringInfo(str, useLegacyClustering, useCustomClustering) {
  // extract grapheme clusters from the string
  var graphemeClusters = extractGraphemeClustersFromString(str, useLegacyClustering, useCustomClustering);
  
  
  // show the string
  var msg = 'String:';
  msg += '\nLength: ' + str.length;
  msg += '\n';
  msg += '\n' + str;
  
  
  // get the code points from the grapheme clusters
  var codePoints = [];
  for (var i = 0; i < graphemeClusters.length; ++i) {
    codePoints = codePoints.concat(graphemeClusters[i]);
  }
  
  // show the code points that make up the string
  msg += '\n';
  msg += '\n--------------';
  msg += '\nCode Points:';
  msg += '\nNum: ' + codePoints.length;
  msg += '\n';
  
  for (var i = 0; i < codePoints.length; ++i) {
    var codePoint = codePoints[i];
    
    msg += '\nU+' + codePoint.toString(16).toUpperCase();
    
    if (shouldBeEncodedInSurrogatePair(codePoint)) {
      var codeUnits = encodeSurrogatePair(codePoint);
      
      msg +=
        ' (' +
        '0x' + codeUnits[0].toString(16).toUpperCase() +
        ', ' +
        '0x' + codeUnits[1].toString(16).toUpperCase() +
        ')';
    }
  }
  
  
  // show the grapheme cluster information
  msg += '\n';
  msg += '\n--------------';
  msg += '\nGrapheme Clusters';
  msg += '\n' + getGraphemeClustersInfo(graphemeClusters);
  
  return msg;
};