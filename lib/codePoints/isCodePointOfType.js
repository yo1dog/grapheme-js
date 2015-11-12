var codePointsTypeRanges = require('../../generated/codePointTypeRanges.min.json');
var isCodePointTypeValid = require('./isCodePointTypeValid');


/**
 * Checks if the given code point is of the given type(s).
 * 
 * @param {int}             codePoint       - Code point to check.
 * @param {string|string[]} codePointType_s - Code point type(s) to check. If a string is given,
 *   the code point is check against only that one type. If an array of types are given, the code
 *   point is checked against all types in the array.
 * 
 * @returns {boolean} `true` if the given code point is of one or more of the given types. `false`
 *  is returned if the code point is not of any of the given types.
 * 
 * @throws if an invalid code point type is given.
 */
module.exports = function isCodePointOfType(codePoint, codePointType_s) {
  // check if we were given a string as the code point type(s)
  if (typeof codePointType_s === 'string') {
    // we were given a single type, just check that type
    var singleCodePointType = codePointType_s;
    return isCodePointOfSingleType(codePoint, singleCodePointType);
  }
  
  // we were given multiple types, check each one
  var codePointTypes = codePointType_s;
  
  // for each code point type
  for (var i = 0; i < codePointTypes.length; ++i) {
    var codePointType = codePointTypes[i];
    
    // check if the given code point is of the current type
    if (isCodePointOfSingleType(codePoint, codePointType)) {
      return true;
    }
  }
  
  // we did not find any valid types
  return false;
};

function isCodePointOfSingleType(codePoint, codePointType) {
  // check if the code point type is valid
  if (!isCodePointTypeValid(codePointType)) {
    throw new Error('Invalid code point type "' + codePointType + '".');
  }
  
  // check if the given code point is of the given code point type
  var codePointRanges = codePointsTypeRanges[codePointType];
  
  // for each code point range of the given type...
  for (var i = 0; i < codePointRanges.length; ++i) {
    var codePointRange = codePointRanges[i];
    
    // check if the given code point is within the current code point range
    if (typeof codePointRange === 'number') {
      if (codePoint === codePointRange) {
        return true;
      }
    }
    else {
      if (codePoint >= codePointRange[0] && codePoint <= codePointRange[1]) {
        return true;
      }
    }
  }
  
  // the given code point is not of the given code point type
  return false;
}