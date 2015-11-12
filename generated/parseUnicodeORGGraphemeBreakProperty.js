module.exports = function parseUnicodeORGGraphemeBreakProperty(str) {
  var codePointTypeRanges = {};
  
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
    
    // parse the code point range and group
    var result = new RegExp(
      '^' +                        // start of line
      '([0-9A-F]{4,5})' +          // first code point (4 or 5 hex digits) - capture group 1
      '(\\.\\.([0-9A-F]{4,5}))?' + // second code point (two dots, then 4 or 5 hex digits, all optional) - capture group 2 and 3
      '\\s*;\\s*' +                // column seperator (some whitespace, a semicolon, then more whitespace) 
      '(\\w+)' +                   // group name (one or more letters) - capture group 4
      '$'                          // end of the line
    ).exec(cleanLine);
    
    if (!result) {
      throw new Error('Error parsing line ' + (i + 1) + ': "' + line + '". Does not have correct format.');
    }
    
    var startCodePointHexStr = result[1];
    var endCodePointHexStr   = result[3];
    var type                 = result[4];
    
    var startCodePoint = null;
    var endCodePoint = null;
    
    // parse the hex strings
    startCodePoint = parseInt(startCodePointHexStr, 16);
    if (isNaN(startCodePoint)) {
      throw new Error('Error parsing line ' + (i + 1) + ': "' + line + '". Code point range start "' + startCodePointHexStr + '" is not a valid hexadecimal number.');
    }
    
    if (endCodePointHexStr) {
      endCodePoint = parseInt(endCodePointHexStr, 16);
      
      if (isNaN(startCodePoint)) {
        throw new Error('Error parsing line ' + (i + 1) + ': "' + line + '". Code point range end "' + endCodePointHexStr + '" is not a valid hexadecimal number.');
      }
      
      if (endCodePoint <= startCodePoint) {
        throw new Error('Error parsing line ' + (i + 1) + ': "' + line + '". Code point range end "' + endCodePointHexStr + '"/' + endCodePoint + ' is not greater than start "' + startCodePointHexStr + '"/' + startCodePoint + '.');
      }
    }
    
    // ensure the type exists
    if (!codePointTypeRanges[type]) {
      codePointTypeRanges[type] = [];
    }
    
    // add the code point ranges to the type
    if (!endCodePoint) {
      codePointTypeRanges[type].push(startCodePoint);
    }
    else {
      codePointTypeRanges[type].push([startCodePoint, endCodePoint]);
    }
  }
  
  return codePointTypeRanges;
};