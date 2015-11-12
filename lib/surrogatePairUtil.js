module.exports = {
  encode: require('./surrogatePairs/encodeSurrogatePair'),
  decode: require('./surrogatePairs/decodeSurrogatePair'),
  
  isSurrogatePair: require('./surrogatePairs/isSurrogatePair'),
  shouldBeEncoded: require('./surrogatePairs/shouldBeEncodedInSurrogatePair')
};