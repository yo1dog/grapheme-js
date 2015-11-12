var graphemeBreakProperty = require('./unicodeORGGraphemeBreakProperty.json');
var emojiData             = require('./unicodeORGEmojiData.json');

(function createCodePointToTypeCodePointsMap() {
  // start with the code point types from the grapheme break properties
  var codePointTypeToCodePointsMap = graphemeBreakProperty.codePointTypeRanges;
  
  // add some custom types from the emoji data
  // add the emoji, emoji modifier, and emoji mondifier base code point types
  
  // "custom_Emoji" - all emoji code points
  // http://www.unicode.org/reports/tr51/#def_emoji_character
  // "A character that is recommended for use as emoji."
  codePointTypeToCodePointsMap.custom_Emoji = [];
  
  // "all emoji modifier code points" - all emoji modifier code points 
  // http://www.unicode.org/reports/tr51/#def_emoji_modifier
  // "A character that can be used to modify the appearance of a preceding emoji in an emoji
  // modifier sequence"
  codePointTypeToCodePointsMap.custom_EmojiModifier = [];
  
  // "custom_EmojiModifierBase" - all emoji code points that can be modified with emoji modifier code points
  // http://www.unicode.org/reports/tr51/#def_emoji_modifier_base
  // "A character whose appearance can be modified by a subsequent emoji modifier in an emoji
  // modifier sequence."
  codePointTypeToCodePointsMap.custom_EmojiModifierBase = [];
  
  // for each emoji data entry...
  for (var i = 0; i < emojiData.emojis.length; ++i) {
    var emoji = emojiData.emojis[i];
    
    // custom_Emoji
    // "These are the characters listed in [emoji-data]."
    codePointTypeToCodePointsMap.custom_Emoji.push(emoji.codePoint);
    
    // custom_EmojiModifier
    // "These characters have an [emoji-data] Field 3 value of 'modifier'."
    if (emoji.modifierStatus === 'modifier') {
      codePointTypeToCodePointsMap.custom_EmojiModifier.push(emoji.codePoint);
    }
    
    // custom_EmojiModifierBase
    // "These characters have an [emoji-data] Field 3 value of either 'primary' or 'secondary'"
    else if (emoji.modifierStatus === 'primary' || emoji.modifierStatus === 'secondary') {
      codePointTypeToCodePointsMap.custom_EmojiModifierBase.push(emoji.codePoint);
    }
  }
  
  console.log(JSON.stringify(codePointTypeToCodePointsMap, null, '  '));
})();