var shouldBeEncodedInSurrogatePair = require('./shouldBeEncodedInSurrogatePair');


/**
 * Encodes the given code point into a UTF-16 surrogate pair.
 * 
 * @param {int} codePoint - Code point to encode.
 * 
 * @returns {int[]} encoded surrogate pair. Index `0` is the high surrogate code unit. Index `1` is
 *   the low surrogate code unit.
 * @throws if the given code point should not be encoded into a surrogate pair.
 */
module.exports = function encodeSurrogatePair(codePoint) {
  // referencing:
  // https://en.wikipedia.org/wiki/UTF-16#U.2B10000_to_U.2B10FFFF
  
  // make sure the code point should be encoded as a surrogate pair
  if (!shouldBeEncodedInSurrogatePair(codePoint)) {
    throw new Error('Code point ' + codePoint + ' should not be encoded in a surrogate pair.');
  }
  
  // To encode a code point in a surrogate pair:
  // "0x010000 is subtracted from the code point"
  // "The top ten bits ... are added to 0xD800 to give the ... high surrogate"
  // "The low ten bits ... are added to 0xDC00 to give the ... low surrogate"
  
  
  // for the examples below I will be using the code point:
  // 0x01F471 | 128113 | 0000 0000 0000 0001 1111 0100 0111 0001
  // 
  // which is the code point for the 'PERSON WITH BLOND HAIR' (U+1F471) unicode character which
  // encodes into the UTF-16 surrogate pair code units:
  // highSurrogateCodeUnit = 0xD83D | 55357 | 0000 0000 0000 0000 1101 1000 0011 1101
  // lowSurrogateCodeUnit  = 0xDC71 | 56433 | 0000 0000 0000 0000 1101 1100 0111 0001
  
  
  // 1.
  // "0x010000 is subtracted from the code point"
  // subtract 0x010000 from the code point
  // 
  //   0x01F471 | 128113 | 0000 0000 0000 0001 1111 0100 0111 0001
  // - 0x010000 |  65536 | 0000 0000 0000 0001 0000 0000 0000 0000
  //   ---------|--------|----------------------------------------
  //   0x00F471 |  62577 | 0000 0000 0000 0000 1111 0100 0111 0001
  codePoint -= 0x010000;
  
  
  // create the high surrogate code unit
  // 2.
  // "The top ten bits ..."
  // we need to seperate just the top 10 bits to use as the high surrogate
  // we do this by shifting the binary value of code point to the right 10 bits. This moves all the
  // bits to the right 10 spaces which gets rid of the bottom 10 bits and leaves us with just the
  // top 10 bits at the right.
  //
  // highSurrogateCodeUnit:
  // 0x00F471 |  62577 | 0000 0000 0000 0000 1111 0100 0111 0001
  //          |        | >> 10
  // ---------|--------|----------------------------------------
  //   0x003D |    61  | 0000 0000 0000 0000 0000 0000 0011 1101
  //                                    \__________/\__________/
  //                                       top 10     bottom 10
  //                                        bits        bits
  //                                        (0s)     (high sur)
  //
  // as you can see the top 10 bits have moved to the bottom 10 bits and the previous bottom 10
  // bits were bumped off.
  var highSurrogateCodeUnit = codePoint >> 10;
  
  
  // 3.
  // "The top ten bits ... are added to 0xD800 to give the ... high surrogate"
  // add 0xD800 to the high surrogate
  // 
  // highSurrogateCodeUnit:
  //   0x003D |    61 | 0000 0000 0000 0000 0000 0000 0011 1101
  // + 0xD800 | 55296 | 0000 0000 0000 0000 1101 1000 0000 0000
  //   -------|-------|----------------------------------------
  //   0xD83D | 55357 | 0000 0000 0000 0000 1101 1000 0011 1101
  highSurrogateCodeUnit += 0xD800;
  
  
  // create the low surrogate code unit
  // 4.
  // "The low ten bits ..."
  // we need to seperate just the bottom 10 bits to use as the low surrogate
  // we do this by replacing all bits with 0s expect the 10 right-most bits (bit masking).
  // 
  // lowSurrogateCodeUnit:
  // 0x01F471 | 128113 |   0000 0000 0000 0001 1111 0100 0111 0001
  //          |        | & 0000 0000 0000 0000 0000 0011 1111 1111
  // ---------|--------|------------------------------------------
  //   0x0071 |    113 |   0000 0000 0000 0000 0000 0000 0111 0001
  //                                      \__________/\__________/
  //                                         top 10     bottom 10
  //                                          bits        bits
  //                                          (0s)      (low sur)
  //
  // as you can see, all bits were replaced with 0s except the bottom 10 which were unaffected.
  // pre-ECMAScript 6 javascript does not allow you to specify binary literals, so we use 0x03FF
  // which has a binary value of:
  // 0000 0000 0000 0000 0000 0011 1111 1111
  var lowSurrogateCodeUnit = codePoint & 0x03FF;
  
  
  // 5.
  // "The low ten bits ... are added to 0xDC00 to give the ... low surrogate"
  // add 0xDC00 to the low surrogate
  // 
  // lowSurrogateCodeUnit:
  //   0x0071 |   113 | 0000 0000 0000 0000 0000 0000 0111 0001
  // + 0xDC00 | 56320 | 0000 0000 0000 0000 1101 1100 0000 0000
  //   -------|-------|----------------------------------------
  //   0xDC71 | 56433 | 0000 0000 0000 0000 1101 1100 0111 0001
  lowSurrogateCodeUnit += 0xDC00;
  
  
  // Done!
  // our calculated surrogate pair matches the UTF-16 encoded 'PERSON WITH BLOND HAIR' (U+1F471)
  // unicode character surrogate pair
  // highSurrogateCodeUnit = 0xD83D | 55357 | 0000 0000 0000 0000 1101 1000 0011 1101
  // lowSurrogateCodeUnit  = 0xDC71 | 56433 | 0000 0000 0000 0000 1101 1100 0111 0001
  return [highSurrogateCodeUnit, lowSurrogateCodeUnit];
};