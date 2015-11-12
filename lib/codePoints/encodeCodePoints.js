var shouldBeEncodedInSurrogatePair = require('../surrogatePairs/shouldBeEncodedInSurrogatePair');
var encodeSurrogatePair            = require('../surrogatePairs/encodeSurrogatePair');


/**
 * Encodes the given code points into UTF-16 code units as a string (JavaScript uses UTF-16
 * encoded strings).
 * 
 * @param {int[]} codePoints Code points to encode.
 * 
 * @returns {string} string encoded from the given code points.
 */
module.exports = function encodeCodePoints(codePoints) {
  var str = '';
  
  // for each code point...
  for (var i = 0; i < codePoints.length; ++i) {
    var codePoint = codePoints[i];
    
    // check if the code point should be encoded in a surrogate pair
    if (shouldBeEncodedInSurrogatePair(codePoint)) {
      // the code point should be encoded in a surrogate pair
      // encode the code point in a surrogate pair
      var surrogatePair = encodeSurrogatePair(codePoint);
      
      var highSurrogateCodePoint = surrogatePair[0];
      var lowSurrogateCodePoint  = surrogatePair[1];
      
      // add the high and low surrogate code points to the string
      str += String.fromCharCode(highSurrogateCodePoint);
      str += String.fromCharCode(lowSurrogateCodePoint);
    }
    else {
      // the code point should not be encoded in a surrogate pair
      // the code point is the the code unit
      var codeUnit = codePoint;
      
      // add the code unit
      str += String.fromCharCode(codeUnit);
    }
  }
  
  return str;
};