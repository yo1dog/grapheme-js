var isCodePointOfType = require('../codePoints/isCodePointOfType');
var codePointDict     = require('../codePoints/codePointDict');


/**
 * Checks if there should be a grapheme cluster boundry between the two grapheme clusters according
 * to our custom rules. If there should be, the grapheme clusters should remain as seperate
 * grapheme clusters. If there should not be, the grapheme clusters should be combined into a
 * single grapheme cluster.
 * 
 * @param {int[]} graphemeCluster1 - First grapheme cluster.
 * @param {int[]} graphemeCluster2 - Following grapheme cluster.
 * 
 * @returns {boolean} `true` if there should be a grapheme cluster boundry between the two grapheme
 *   clusters according to our custom rules or `false` if there should not be. Always returns
 *   `true` if either `graphemeCluster1` or `graphemeCluster2` are falsy.
 */
module.exports = function shouldBeCustomGraphemeClusterBoundry(graphemeCluster1, graphemeCluster2) {
  // referencing:
  // http://www.unicode.org/reports/tr51/
  
  
  // 1.
  // Break at the start and end of text.
  
  // GBC1
  // sot÷
  // always break at the start of text
  // we will assume that if the first grapheme clutser is falsy then it is before the start of the
  // text
  // check if the first grapheme cluster is falsy
  if (!graphemeCluster1) {
    return true;
  }
  
  // GBC2
  // ÷eot
  // always break at the end of text
  // we will assume that if the second grapheme clutser is falsy then it is after the end of the
  // text
  // check if the second grapheme cluster is falsy
  if (!graphemeCluster2) {
    return true;
  }
  
  
  // 2.
  // do not break emoji modifier sequences 
  
  // GBC3
  // http://www.unicode.org/reports/tr51/#Emoji_Modifiers
  // custom_EmojiModifierBase variation*×custom_EmojiModifier
  // never break between an emoji modifier base or emoji modifier base variation sequence and an
  // emoji modifier code point
  // 
  // NOTE: Unicode does not mandate that a emoji modifer sequence is displayed as a single grapheme
  // cluster. It is up to the client to decide which emoji modifier sequences to display as a
  // one single emoji. Therefore, the sane emoji modifier sequence may be displayed as a single
  // grapheme cluster or as multiple (see the link above for more information). Since it is
  // impossible for us to know how a client will render a string, let's assume whomever created the
  // string is the authoritative source and assume all emoji modifier sequences are valid and
  // should be a single grapheme cluster.
  
  // check if the first grapheme cluster starts with a "custom_EmojiModifierBase" type code point
  // and if the second grapheme cluster starts with a "custom_EmojiModifier" type code point
  if (
    isCodePointOfType(graphemeCluster1[0], 'custom_EmojiModifierBase') &&
    isCodePointOfType(graphemeCluster2[0], 'custom_EmojiModifier')
  ) {
    return false;
  }
  
  
  // 3.
  // do not break emoji ZWJ sequences
  
  // GBC4
  // http://www.unicode.org/reports/tr51/#Multi_Person_Groupings
  // custom_Emoji .* ZWJ×Emoji
  // never break between an emoji code point (or emoji validation and/or modifier sequence) and a
  // zero width joiner code point and an emoji code point
  // 
  // NOTE: There are no restrictions on which code points can be combined with ZWJ. It is up to the
  // client to decide which emoji ZWJ sequences to display as one single emoji. Therefore, the same
  // emoji ZWJ sequence may be displayed as a single grapheme cluster or as multiple (see the link
  // above for more information). Since it is impossible for us to know how a client will render a
  // string, let's assume whomever created the string is the authoritative source and assume all
  // emoji ZWJ sequeneces are valid and should be a single grapheme cluster.
  
  // check if the first grapheme cluster starts with an "custom_Emoji" type code point and ends
  // with the 'ZERO WIDTH JOINER' code point and if the second grapheme cluster starts with an
  // "custom_Emoji" type code point
  if (
    isCodePointOfType(graphemeCluster1[0], 'custom_Emoji') &&
    graphemeCluster1[graphemeCluster1.length - 1] === codePointDict.zeroWidthJoiner &&
    isCodePointOfType(graphemeCluster2[0], 'custom_Emoji')
  ) {
    return false;
  }
  
  // GBC5
  // Any÷Any
  // break between all grapheme clusters that do not fall under any of the previous rules
  return true;
};