/**
 * Checks if the given code point is from a supplementary plane and should be encoded with in a
 * surrogate pair.
 * 
 * @param {int} codePoint - Code point to check.
 * 
 * @returns `true` if the given code point should be encoded in a surrogate pair or `false` if it
 *   should not. 
 */
module.exports = function shouldBeEncodedInSurrogatePair(codePoint) {
  // referencing:
  // https://en.wikipedia.org/wiki/UTF-16#U.2B10000_to_U.2B10FFFF
  
  // Code points greater than 0xFFFF (= 65535 = 2^16 - 1) fall outside the range of what is
  // possible to store with a single UTF-16 code unit. Therefore, code points in this range must be
  // encoded into two UTF-16 code units called a surrogate pair.
  // 
  // For example, the 'PERSON WITH BLOND HAIR' (U+1F471) unicode caracter has the code point:
  // 0x01F471. Because this code point is greater than 0xFFFF it is encoded into the surrogate pair
  // 0xD83D 0xDC71.
  
  // if the code point is greater than 0xFFFF, it must be encoded in a surrogate pair. Otherwise it
  // must not.
  return codePoint > 0xFFFF;
};