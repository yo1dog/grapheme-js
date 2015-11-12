var isCodePointOfType    = require('../codePoints/isCodePointOfType');
var isCodePointTypeValid = require('../codePoints/isCodePointTypeValid');


/**
 * Checks if there should be a grapheme cluster boundry between the two code points according to
 * Unicode Standard Annex #29 (http://www.unicode.org/reports/tr29/). If there is, the two code
 * units should be split into two seperate grapheme clusters. If not, the two code units should be
 * part of the same grapheme cluster.
 * 
 * @param {int}     codePoint1            - First code point.
 * @param {int}     codePoint2            - Following code point.
 * @param {boolean} [useLegacyClustering] - If legacy (`true`) or extended (`false`) grapheme
 *   clusters should be used. In most causes extended grapheme clusters (`false`) shoud be used.
 *   From http://www.unicode.org/reports/tr29/#Grapheme_Cluster_Boundaries - "The Unicode Standard
 *   provides default algorithms for determining grapheme cluster boundaries, with two variants:
 *   legacy grapheme clusters and extended grapheme clusters. The most appropriate variant depends
 *   on the language and operation involved. However, the extended grapheme cluster boundaries are
 *   recommended for general processing, while the legacy grapheme cluster boundaries are
 *   maintained primarily for backwards compatibility with earlier versions of this specification."
 * 
 * @returns {boolean} `true` if there is a grapheme cluster boundry between the two code points or
 *   `false` if there is not. Always returns `true` if either `codePoint1` or `codePoint2` are
 *   falsy.
 */
module.exports = function isGraphemeClusterBoundry(codePoint1, codePoint2, useLegacyClustering) {
  // referencing:
  // http://www.unicode.org/reports/tr29/#Grapheme_Cluster_Boundary_Rules
  
  
  // 1.
  // "Break at the start and end of text."
  
  // GB1
  // http://www.unicode.org/reports/tr29/#GB1
  // "sot÷"
  // always break at the start of text
  // we will assume that if the first code point is falsy then it is before the start of the text
  // check if the first code point is falsy
  if (!codePoint1) {
    return true;
  }
  
  // GB2
  // http://www.unicode.org/reports/tr29/#GB2
  // "÷eot"
  // always break at the end of text
  // we will assume that if the second code point is falsy then it is after the end of the text
  // check if the second code point is falsy
  if (!codePoint2) {
    return true;
  }
  
  
  // 2.
  // "Do not break between a CR and LF. Otherwise, break before and after controls."
  
  // GB3
  // http://www.unicode.org/reports/tr29/#GB3
  // "CR×LF"
  // never break between a CR and LF. The means that CRLF (\r\n) should be concidered a single
  // grapheme cluster.
  // check if the first code point is a CR and the second code point is a LF type code point
  if (
    isCodePointOfType(codePoint1, 'CR') &&
    isCodePointOfType(codePoint2, 'LF')
  ) {
    return false;
  }
  
  // GB4
  // http://www.unicode.org/reports/tr29/#GB4
  // "(Control|CR|LF)÷"
  // always break after controls
  // check if the first code point is a "Control", "CR", or "LF" type code point
  if (isCodePointOfType(codePoint1, ['Control', 'CR', 'LF'])) {
    return true;
  }
  
  // GB5 
  // http://www.unicode.org/reports/tr29/#GB5
  // "÷(Control|CR|LF)"
  // always break before controls
  // check if the second code point is a "Control", "CR", or "LF" type code point
  if (isCodePointOfType(codePoint2, ['Control', 'CR', 'LF'])) {
    return true;
  }
  
  
  // 3.
  // "Do not break Hangul syllable sequences."
  
  // GB6
  // http://www.unicode.org/reports/tr29/#GB6
  // "L×(L|V|LV|LVT)"
  // never break between Hangul syllable sequences, they should be concidered a grapheme cluster
  // check if the first code point is an "L" type code point and the second code point is an "L",
  // "V", "LV" or "LVT" type code point
  if (
    isCodePointOfType(codePoint1, 'L') &&
    isCodePointOfType(codePoint2, ['L', 'V', 'LV', 'LVT'])
  ) {
    return false;
  }
  
  // GB7
  // http://www.unicode.org/reports/tr29/#GB7
  // "(LV|V)×(V|T)"
  // never break between Hangul syllable sequences, they should be concidered a grapheme cluster
  // check if the first code point is an "LV" or "V"" type code point and the second code point is
  // a "V" or "T" type code point 
  if (
    isCodePointOfType(codePoint1, ['LV', 'V']) &&
    isCodePointOfType(codePoint2, ['V', 'T'])
  ) {
    return false;
  }
  
  // GB8
  // http://www.unicode.org/reports/tr29/#GB8
  // "(LVT|T)×T"
  // never break between Hangul syllable sequences, they should be concidered a grapheme cluster
  // check if the first code point is an "LVT" or "T" type code point and the second code point is
  // a "T"" type code point 
  if (
    isCodePointOfType(codePoint1, ['LVT', 'T']) &&
    isCodePointOfType(codePoint2, 'T')
  ) {
    return false;
  }
  
  
  // 4.
  // "Do not break between regional indicator symbols."
  
  // GB8a
  // http://www.unicode.org/reports/tr29/#GB8a
  // "Regional_Indicator×Regional_Indicator"
  // never break between regional indicators
  // check if the first and second code points are "Regional_Indicator" type code points
  if (
    isCodePointOfType(codePoint1, 'Regional_Indicator') &&
    isCodePointOfType(codePoint2, 'Regional_Indicator')
  ) {
    return false;
  }
  
  
  // 5.
  // "Do not break before extending characters."
  
  // GB9
  // http://www.unicode.org/reports/tr29/#GB9
  // "×Extend"
  // never break before an extending type code point
  // check if the second code point is an "Extend" type code point
  if (isCodePointOfType(codePoint2, 'Extend')) {
    return false;
  }
  
  
  // 6.
  // "Only for extended grapheme clusters:"
  // "Do not break before SpacingMarks, or after Prepend characters."
  
  // only apply rules GB9a and GB9b if we are using extended grapheme clusters and not legacy
  // grapheme clusters
  if (!useLegacyClustering) {
    
    // GB9a
    // http://www.unicode.org/reports/tr29/#GB9a
    // "×SpacingMark"
    // never break before a spacing mark type code point
    // check if the first code point is a "SpacingMark" type code point
    if (isCodePointOfType(codePoint1, 'SpacingMark')) {
      return false;
    }
    
    // the prepend code points are reserved, but at the time of writing this there are none. Let's
    // check to make sure the "Prepend" code point type exists before attempting to use it
    if (isCodePointTypeValid('Prepend')) {
      
      // GB9b
      // http://www.unicode.org/reports/tr29/#GB9b
      // "Prepend×"
      // never break after a prepend type code point
      // check if the first code point is a "Prepend" type code point
      if (isCodePointOfType(codePoint1, 'Prepend')) {
        return false;
      }
    }
  }
  
  
  // 7.
  // "Otherwise, break everywhere."
  
  // GB10
  // http://www.unicode.org/reports/tr29/#GB10
  // "Any÷Any"
  // break between all characters that do not fall under any of the previous rules
  return true;
};