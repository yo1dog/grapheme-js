var codePointsTypeRanges = require('../../generated/codePointTypeRanges.min.json');


/**
 * Checks if the given code point type is valid.
 * 
 * @param {string} codePointType - Code point type to check.
 * 
 * @retruns {boolean} `true` if the given code point type is valid or `false` if it is not.
 */
module.exports = function isCodePointTypeValid(codePointType) {
  // check if the code point type exists
  if (codePointsTypeRanges[codePointType]) {
    return true;
  }
  
  return false;
};