/**
 * Checks if the given code units form a valid UTF-16 surrogate pair for a code point from a
 * supplementary plane. This is done by checking if the first code unit is a UTF-16 high surrogate
 * code unit and the proceeding code unit is a UTF-16 low surrogate code unit.
 * 
 * @param {int} codeUnit1 - Starting code unit.
 * @param {int} codeUnit2 - Following code unit.
 * 
 * @returns {boolean} `true` if the code units are a valid UTF-16 surrogate pair or `false` if they
 *   are not. `false` is always returned if either `codeUnit1` or `codeUnit2` are falsy.
 */
module.exports = function isSurrogatePair(codeUnit1, codeUnit2) {
  // refrencing:
  // https://en.wikipedia.org/wiki/UTF-16#U.2B10000_to_U.2B10FFFF
  
  // Because it may not render correctly in many editors, I will use "$" instead of the unicode
  // character 'PERSON WITH BLOND HAIR' (U+1F471). So any time you see $, you should mentally
  // replace it with this character. The 'PERSON WITH BLOND HAIR' (U+1F471) unicode caracter has
  // the code point:
  // 0x01F471
  // 
  // and is encoded into the UTF-16 surrogate pair code units:
  // 0xD83D 0xDC71
  
  
  // For the examples below, I will be using the the string:
  // hey-$-you
  // 
  //   h      e      y      -          $         -      y      o      u
  //   |      |      |      |       /     \      |      |      |      |
  // 0x0068 0x0065 0x0079 0x002D 0xD83D 0xDC71 0x002D 0x0079 0x006F 0x0075
  //   0      1      2      3      4      5      6      7      8      9
  
  // make sure we were given two code units
  if (!codeUnit1 || !codeUnit2) {
    return false;
  }
  
  // check if the code unit is within the possible range of a high surrogate code unit
  // "high surrogate ... will be in the range 0xD800..0xDBFF."
  if (codeUnit1 < 0xD800 || codeUnit1 > 0xDBFF) {
    // the code unit can not be a high surrogate so it is not possible for a
    // surrogate pair to start at the given index
    
    // index = 1
    //
    //        index
    //          |
    //          |______
    //          |      |
    //          V      V
    //   h      e      y      -          $         -      y      o      u
    //   |      |      |      |       /     \      |      |      |      |
    // 0x0068 0x0065 0x0079 0x002D 0xD83D 0xDC71 0x002D 0x0079 0x006F 0x0075
    //   0      1      2      3      4      5      6      7      8      9
    //          ^
    //          |
    //          this is not a high surrogate code unit so it can not be part of a surrogate pair 
    return false;
  }
  
  
  // check if the next code point is within the possible range of a low surrogate code unit
  // "low surrogate ... will be in the range 0xDC00..0xDFFF"
  if (codeUnit2 < 0xDC00 || codeUnit2 > 0xDFFF) {
    // the next code unit can not be a low surrogate so it is not possible for a surrogate pair to
    // start at the given index.
    
    // this usually means that the given string has been manageled as this should not be possible
    // if the first code unit is a valid high surrogate. The high surrogate code unit range is
    // reserved.
    // https://en.wikipedia.org/wiki/UTF-16#U.2BD800_to_U.2BDFFF
    
    // Lets pretend our example string got messed up some how and str[5] (the low surrogate) was
    // removed. str[4] is now an invalid, unprintable character
    // 
    // index = 4
    //
    //                             index
    //                               |
    //                               |______
    //                               |      |
    //                               V      V
    //   h      e      y      -     ERR     -      y      o      u
    //   |      |      |      |      |      |      |      |      |
    // 0x0068 0x0065 0x0079 0x002D 0xD83D 0x002D 0x0079 0x006F 0x0075
    //   0      1      2      3      4      5      6      7      8
    //                               ^      ^
    //                               |      |
    //                               |      this is not a low surrogate code unit so it can not be part of a surrogate pair
    //                               |
    //                               this is a high surrogate code unit
    return false;
  }
  
  
  // there is a surrogate pair starting at the given index
  // index = 4
  //
  //                             index
  //                               |
  //                               |______
  //                               |      |
  //                               V      V
  //   h      e      y      -          $         -      y      o      u
  //   |      |      |      |       /     \      |      |      |      |
  // 0x0068 0x0065 0x0079 0x002D 0xD83D 0xDC71 0x002D 0x0079 0x006F 0x0075
  //   0      1      2      3      4      5      6      7      8      9
  //                               ^      ^
  //                               |      |
  //                               |      this is a low surrogate code unit
  //                               |
  //                               this is a high surrogate code unit
  return true;
};