module.exports = {
  encode: require('./codePoints/encodeCodePoints'),
  decode: require('./codePoints/decodeCodePoints'),
  
  isOfType   : require('./codePoints/isCodePointOfType'),
  isTypeValid: require('./codePoints/isCodePointTypeValid'),
  
  dict: require('./codePoints/codePointDict'),
};
