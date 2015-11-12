/**
 * Decodes a UTF-16 surrogate pair into a code point.
 * 
 * @param {int} highSurrogateCodeUnit - High surrogate code unit.
 * @param {int} lowSurrogateCodeUnit  - Low surrogate code unit.
 * 
 * @returns {int} code point decoded from the surrogate pair.
 * @throws if given code points are not a valid surrogate pair.
 */
module.exports = function decodeSurrogatePair(highSurrogateCodeUnit, lowSurrogateCodeUnit) {
  // refrencing:
  // https://en.wikipedia.org/wiki/UTF-16#U.2B10000_to_U.2B10FFFF
  
  // ensure the code units are a valid surrogate pair
  // "high surrogate ... will be in the range 0xD800..0xDBFF."
  if (highSurrogateCodeUnit < 0xD800 || highSurrogateCodeUnit > 0xDBFF) {
    throw new Error('Invalid high surrogate code unit ' + highSurrogateCodeUnit + '.');
  }
  
  // "low surrogate ... will be in the range 0xDC00..0xDFFF"
  if (lowSurrogateCodeUnit < 0xDC00 || lowSurrogateCodeUnit > 0xDFFF) {
    throw new Error('Invalid low surrogate code unit ' + lowSurrogateCodeUnit + '.');
  }
  
  
  // To encode a code point in a surrogate pair:
  // "0x010000 is subtracted from the code point"
  // "The top ten bits ... are added to 0xD800 to give the ... high surrogate"
  // "The low ten bits ... are added to 0xDC00 to give the ... low surrogate"
  //
  // So, when decoding we must do the opposite.
  
  
  // For the examples below I will be using the following values
  // highSurrogateCodeUnit = 0xD83D | 55357 | 0000 0000 0000 0000 1101 1000 0011 1101
  // lowSurrogateCodeUnit  = 0xDC71 | 56433 | 0000 0000 0000 0000 1101 1100 0111 0001
  //
  // which is the surrogate pair that decodes into the 'PERSON WITH BLOND HAIR' (U+1F471) unicode
  // character which has the code point:
  // 0x01F471 | 128113 | 0000 0000 0000 0001 1111 0100 0111 0001
  
  
  // first we must prepare the high surrogate
  // 1.
  // "The top 10 bits ... are added to 0xD800 to give the ... high surrogate"
  // so subtract 0xD800 from the high surrogate
  // 
  // highSurrogateCodeUnit:
  //   0xD83D | 55357 | 0000 0000 0000 0000 1101 1000 0011 1101
  // - 0xD800 | 55296 | 0000 0000 0000 0000 1101 1000 0000 0000
  //   -------|-------|----------------------------------------
  //   0x003D |    61 | 0000 0000 0000 0000 0000 0000 0011 1101
  highSurrogateCodeUnit -= 0xD800;
  
  
  // 2.
  // "The top 10 bits..."
  // we need to move the high surrogate to the top 10 bits
  // we do this by shifting the binary value of high surrogate code unit to the left 10 bits. This
  // adds ten 0's to the right of the code unit's binary value so we can add the low surrogate
  // behind it.
  // 
  // highSurrogateCodeUnit:
  //   0x003D |    61 | 0000 0000 0000 0000 0000 0000 0011 1101
  //          |       | << 10
  // ---------|-------|----------------------------------------
  // 0x00F400 | 62464 | 0000 0000 0000 0000 1111 0100 0000 0000
  //                                   \__________/\__________/
  //                                      top 10     bottom 10
  //                                       bits        bits
  //                                    (high sur)     (0s)
  // 
  // as you can see, the high surrogate has been moved to the top 10 bits
  highSurrogateCodeUnit <<= 10;
  
  
  // next we need to prepare the low surrogate
  // 3.
  // "The low ten bits ... are added to 0xDC00 to give the ... low surrogate"
  // so subtract 0xDC00 from the low surrogate
  // 
  // lowSurrogateCodeUnit:
  //   0xDC71 | 56433 | 0000 0000 0000 0000 1101 1100 0111 0001
  // - 0xDC00 | 56320 | 0000 0000 0000 0000 1101 1100 0000 0000
  //   -------|-------|----------------------------------------
  //   0x0071 |   113 | 0000 0000 0000 0000 0000 0000 0111 0001
  //                                   \__________/\__________/
  //                                      top 10     bottom 10
  //                                       bits        bits
  //                                       (0s)      (low sur)
  lowSurrogateCodeUnit -= 0xDC00;
  
  
  // now we combine the surrogates
  // 4.
  // add the highSurrogateCodeUnit and lowSurrogateCodeUnit
  // 
  // codePoint:
  //   0x00F400 | 62464 | 0000 0000 0000 0000 1111 0100 0000 0000
  // +   0x0071 |   113 | 0000 0000 0000 0000 0000 0000 0111 0001
  //   ---------|-------|----------------------------------------
  //   0x00F471 | 62577 | 0000 0000 0000 0000 1111 0100 0111 0001
  //                                    \__________/\__________/
  //                                       top 10     bottom 10
  //                                        bits        bits
  //                                     (high sur)  (low sur)
  // 
  // now the high and low surrogates are combined. Because the high surrogate has all 0's for the
  // bottom ten bits (because of the left shift we did) and because the low surrogate has all 0's
  // for the top ten bits (because of the max possible value a low surrogate can have) the binary
  // values of the two surrogates were added without affecting eachother and now sit side-by-side.
  var codePoint = highSurrogateCodeUnit + lowSurrogateCodeUnit;
  
  
  // 5.
  // "0x010000 is subtracted from the code point"
  // so add 0x010000 to the code point
  // 
  //   0x00F471 |  62577 | 0000 0000 0000 0000 1111 0100 0111 0001
  // + 0x010000 |  65536 | 0000 0000 0000 0001 0000 0000 0000 0000
  //   ---------|--------|----------------------------------------
  //   0x01F471 | 128113 | 0000 0000 0000 0001 1111 0100 0111 0001
  codePoint += 0x010000;
  
  
  // Done!
  // our calculated code point matches the code point for the unicode caracter 'PERSON WITH BLOND
  // HAIR' (U+1F471)
  //
  // 0x01F471 | 128113 | 0000 0000 0000 0001 1111 0100 0111 000
  return codePoint;
};