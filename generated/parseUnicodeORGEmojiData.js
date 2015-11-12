module.exports = function parseUnicodeORGEmojiData(str) {
  var emojis = [];
  
  // replace \r\n with \n
  str = str.replace(/\r\n/g, '\n');
  
  // split the string into lines
  var lines = str.split('\n');
  
  // for each line...
  for (var i = 0; i < lines.length; ++i) {
    var line = lines[i];
    
    // remove comments and trim
    var cleanLine = line.replace(/#.*/, '').trim();
    
    // skip empty lines
    if (cleanLine.length === 0) {
      continue;
    }
    
    // parse the emoji information
    var result = new RegExp(
      '^' +                                 // start of line
      '([0-9A-F]{4,5})' +                   // code point (4 or 5 hex digits) - capture group 1
      '( ([0-9A-F]{4,5}))?' +               // modifier code point (4 or 5 hex digits) - capture group 3
      '\\s*;\\s*' +                         // ;
      '(text|emoji)' +                      // type ("text" or "emoji") - capture group 4
      '\\s*;\\s*' +                         // ;            
      '(L1|L2|NA)' +                        // level ("L1", "L2", or "NA") - capture group 5
      '\\s*;\\s*' +                         // ;
      '(modifier|primary|secondary|none)' + // modifier status ("modifier", "primary", "secondary", or "none") - capture group 6
      '\\s*;\\s*' +                         // ;
      '(([zajwx]( [zajwx])*|NA))' +         // sources (sequence of "z", "a", "j", "w", "x", and spaces or "NA") - capture group 7
      '$'                                   // end of the line
    ).exec(cleanLine);
    
    if (!result) {
      throw new Error('Error parsing line ' + (i + 1) + ': "' + line + '". Does not have correct format.');
    }
    
    var codePointHexStr         = result[1];
    var modifierCodePointHexStr = result[3];
    var type                    = result[4];
    var level                   = result[5];
    var modifierStatus          = result[6];
    var sources                 = result[7];
    
    var codePoint;
    var modifierCodePoint;
    
    // parse the hex strings
    codePoint = parseInt(codePointHexStr, 16);
    if (isNaN(codePoint)) {
      throw new Error('Error parsing line ' + (i + 1) + ': "' + line + '". Code point "' + codePointHexStr + '" is not a valid hexadecimal number.');
    }
    
    if (modifierCodePointHexStr) {
      modifierCodePoint = parseInt(modifierCodePointHexStr, 16);
      if (isNaN(modifierCodePoint)) {
        throw new Error('Error parsing line ' + (i + 1) + ': "' + line + '". Modifier code point "' + modifierCodePointHexStr + '" is not a valid hexadecimal number.');
      }
    }
    else {
      modifierCodePoint = null;
    }
    
    // get the comment from the original line
    var comment;
    
    result = /#(.*)/.exec(line);
    if (result) {
      comment = result[1].trim();
    }
    
    // create the emoji info
    var emoji = {
      codePoint        : codePoint,
      modifierCodePoint: modifierCodePoint,
      type             : type,
      level            : level,
      modifierStatus   : modifierStatus,
      sources          : sources,
      description      : comment
    };
    
    emojis.push(emoji);
  }
  
  return emojis;
};