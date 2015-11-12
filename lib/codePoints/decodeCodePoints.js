var isSurrogatePair     = require('../surrogatePairs/isSurrogatePair');
var decodeSurrogatePair = require('../surrogatePairs/decodeSurrogatePair');


/**
 * Decodes UTF-16 code units from the given string into code points (JavaScript uses UTF-16 encoded
 * strings).
 * 
 * @param {string} str - String to decode.
 * 
 * @returns {int[]} array of code points decoded from the given string.
 */
module.exports = function decodeCodePoints(str) {
  var codePoints = [];
  
  // for each UTF-16 code unit (UTF-16 character) in the string...
  for (var i = 0; i < str.length; ++i) {
    var codeUnit     = str.charCodeAt(i);
    var nextCodeUnit = str.charCodeAt(i + 1); // will be falsy on the last iteration
    
    // calculate the code point
    var codePoint;
    
    // check if the current and next code units are a surrogate pair
    if (isSurrogatePair(codeUnit, nextCodeUnit)) {
      // the two code units are a surrogate pair
      // decode the surrogate pair
      codePoint = decodeSurrogatePair(codeUnit, nextCodeUnit);
      
      // advance the index an extra 1 so we skip over the next code unit since we already used it
      // as part of the surrogate pair
      ++i;
    }
    else {
      // the two code units are not a surrogate pair
      // the code unit is the code point
      codePoint = codeUnit;
    }
    
    // add the code point to the list
    codePoints.push(codePoint);
  }
  
  return codePoints;
};