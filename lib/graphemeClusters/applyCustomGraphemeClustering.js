var shouldBeCustomGraphemeClusterBoundry = require('./shouldBeCustomGraphemeClusterBoundry');


/**
 * Applies additional *custom* grapheme clustering to a series of grapheme clusters. It uses custom
 * rules to further combine (cluster) grapheme clusters. These rules are not part of any offical
 * unicode standard. Thus, this function will result in grapheme clustering that deviates from
 * Unicode Standard Annex #29. The main reson for this deviation is due to grapheme clustering that
 * may render differently on different clients. Meaning, this function will create grapheme
 * clusters that are not explicitly mandated by unicode stanards to be displayed as a grapheme
 * cluster. For example the emoji modifier sequence:
 * 
 * <U+1F468 U+1F3FF> (<'MAN' 'EMOJI MODIFIER FITZPATRICK TYPE-6'>)
 * 
 * will be displayed as a single grapheme cluster (emoji-of-a-man-with-dark-skin) on some clients
 * and as two grapheme clusters (emoji-of-a-man and dark-color-swatch) on others. For another
 * example, the emoji zero-width-joniner sequence:
 * 
 * <U+1F468 U+200D U+2764 U+FE0F U+200D U+1F48B U+200D U+1F469>
 * (<'WOMAN' 'ZWJ' 'HEAVY BLACK HEART' 'VARIATION SELECTOR-16' 'ZWJ' 'KISS MARK' 'ZWJ' 'WOMAN'>)
 * 
 * will be displayed as a single grapheme cluster
 * (emoji-of-two-women-kissing-with-a-heart-between-them) on some clients and as 4 grapheme
 * clusters (emoji-of-a-woman, emoji-of-a-heart, emoji-of-a-kiss-mark, and emoji-of-a-woman) on
 * others.
 * 
 * This can cause problems. For example, let's say you wanted to limit a text field to only 3
 * visible characters (3 grapheme clusters). If someone on an iOS device entered the above
 * unicode sequnence, they would see only one emoji and they would expect to be able to enter 2
 * more characters. Lets say that person saved that text and then another user viewed that text on
 * an Android device. The user on the Android device would see 4 emojis and wouldn't understand
 * how the author was able to insert more than the max number of allowed characters.
 * 
 * @param {int[][]} Grapheme clusters to apply our custom clustering to.
 * 
 * @returns {int[][]} array of grapheme clusters that have been clustered according to our custom
 *   grapheme clustering rules.
 */
module.exports = function applyCustomGraphemeClustering(graphemeClusters) {
  var customGraphemeClusters = [];
  var customGaphemeCluster = [];
  
  for (var i = 0; i < graphemeClusters.length; ++i) {
    var graphemeCluster     = graphemeClusters[i];
    var nextGraphemeCluster = graphemeClusters[i + 1]; // will be falsy on the last iteration
    
    // add the code points from the current grapheme cluster to the current custom grapheme cluster
    customGaphemeCluster = customGaphemeCluster.concat(graphemeCluster);
    
    // check if there should be a grapheme cluster boundry between the current and next grapheme
    // clusters according to our custom rules
    if (shouldBeCustomGraphemeClusterBoundry(graphemeCluster, nextGraphemeCluster)) {
      // there should be a boundry between the grapheme clusters
      // we should end the current custom grapheme cluster and start a new one
      
      // add the current custom grapheme cluster to the list
      customGraphemeClusters.push(customGaphemeCluster);
      
      // start a new custom grapheme cluster
      customGaphemeCluster = [];
    }
  }
  
  // return the custom grapheme clusters we found
  return customGraphemeClusters;
};