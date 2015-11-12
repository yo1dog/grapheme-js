module.exports = {
  extract              : require('./graphemeClusters/extractGraphemeClusters'),
  applyCustomClustering: require('./graphemeClusters/applyCustomGraphemeClustering'),
  
  isBoundry            : require('./graphemeClusters/isGraphemeClusterBoundry'),
  shouldBeCustomBoundry: require('./graphemeClusters/shouldBeCustomGraphemeClusterBoundry')
};