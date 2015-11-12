/*
Grapheme clustering for JavaScript with Unicode Standard Annex #29 compliance and some custom emoji
enhancements.
*/

module.exports = {
  extract: require('./lib/strings/extractGraphemeClustersFromString'),
  
  stringUtil         : require('./lib/stringUtil'),
  debugUtil          : require('./lib/debugUtil'),
  codePointUtil      : require('./lib/codePointUtil'),
  graphemeClusterUtil: require('./lib/graphemeClusterUtil'),
  surrogatePairUtil  : require('./lib/surrogatePairUtil'),
  
  
  defaults: require('./lib/defaults'),
  
  useCustomClustering: function useCustomClustering() {
    module.exports.defaults.useCustomClustering = true;
    
    return module.exports;
  },
  useLegacyClustering: function useLegacyClustering() {
    module.exports.defaults.useLegacyClustering = true;
    
    return module.exports;
  }
};