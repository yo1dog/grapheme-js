var graphemejs = require('../graphemejs');

var assert = require('assert');


// hello $$$$$$$$$$ manana manana ZALGOT world (43)
var str =
  '\u0068\u0065\u006C\u006C\u006F\u0020\uD83D\uDC71\uD83C\uDFFF\uD83D\uDC78\uD83C\uDFFC\uD83D\uDE4B\uD83D' +
  '\uDC87\uD83C\uDFFF\uD83D\uDE45\uD83C\uDFFD\uD83D\uDE47\uD83C\uDFFC\uD83D\uDC69\u200D\u2764\uFE0F\u200D' +
  '\uD83D\uDC69\uD83D\uDC68\u200D\uD83D\uDC69\u200D\uD83D\uDC67\u200D\uD83D\uDC66\uD83D\uDC68\u200D\uD83D' +
  '\uDC69\u200D\uD83D\uDC67\uD83D\uDC6A\u0020\u006D\u0061\u00F1\u0061\u006E\u0061\u0020\u006D\u0061\u006E' +
  '\u0303\u0061\u006E\u0061\u0020\u005A\u0351\u036B\u0343\u036A\u0302\u036B\u033D\u034F\u0334\u0319\u0324' +
  '\u031E\u0349\u035A\u032F\u031E\u0320\u034D\u0041\u036B\u0357\u0334\u0362\u0335\u031C\u0330\u0354\u004C' +
  '\u0368\u0367\u0369\u0358\u0320\u0047\u0311\u0357\u030E\u0305\u035B\u0341\u0334\u033B\u0348\u034D\u0354' +
  '\u0339\u004F\u0342\u030C\u030C\u0358\u0328\u0335\u0339\u033B\u031D\u0333\u0021\u033F\u030B\u0365\u0365' +
  '\u0302\u0363\u0310\u0301\u0301\u035E\u035C\u0356\u032C\u0330\u0319\u0317\u0020\u0077\u006F\u0072\u006C' +
  '\u0064';

var graphemeClusters = graphemejs.extract(str, false, true);


assert.strictEqual(graphemeClusters.length, 43);

assert.deepEqual(graphemeClusters[0],  [0x68]); // h
assert.deepEqual(graphemeClusters[1],  [0x65]); // e
assert.deepEqual(graphemeClusters[2],  [0x6C]); // l
assert.deepEqual(graphemeClusters[3],  [0x6C]); // l
assert.deepEqual(graphemeClusters[4],  [0x6F]); // o

assert.deepEqual(graphemeClusters[5],  [0x20]); // 'SPACE'

assert.deepEqual(graphemeClusters[6],  [0x1F471, 0x1F3FF]);                                           // <'PERSON WITH BLOND HAIR' 'EMOJI MODIFIER FITZPATRICK TYPE-6'> - Person with blonde hair and dark skin
assert.deepEqual(graphemeClusters[7],  [0x1F478, 0x1F3FC]);                                           // <'PRINCESS' 'EMOJI MODIFIER FITZPATRICK TYPE-3'> - Pricess with medium skin
assert.deepEqual(graphemeClusters[8],  [0x1F64B]);                                                    // 'HAPPY PERSON RAISING ONE HAND' - Person with hand in the air and dark skin
assert.deepEqual(graphemeClusters[9],  [0x1F487, 0x1F3FF]);                                           // <'HAIRCUT' 'EMOJI MODIFIER FITZPATRICK TYPE-6'> - Person with dark skin getting their hair cut
assert.deepEqual(graphemeClusters[10], [0x1F645, 0x1F3FD]);                                           // <'FACE WITH NO GOOD GESTURE' 'EMOJI MODIFIER FITZPATRICK TYPE-4'> - Person with darker skin crossing their arms
assert.deepEqual(graphemeClusters[11], [0x1F647, 0x1F3FC]);                                           // <'PERSON BOWING DEEPLY', 'EMOJI MODIFIER FITZPATRICK TYPE-3'> - Person with medium skin bowing
assert.deepEqual(graphemeClusters[12], [0x1F469, 0x200D, 0x2764, 0xFE0F, 0x200D, 0x1F469]);           // <'WOMAN' 'ZERO WIDTH JOINER' 'HEAVY BLACK HEART' 'VARIATION SELECTOR-16' 'ZERO WIDTH JOINER' 'WOMAN'> - Two women with a heart between them
assert.deepEqual(graphemeClusters[13], [0x1F468, 0x200D, 0x1F469, 0x200D, 0x1F467, 0x200D, 0x1F466]); // <'MAN' 'ZERO WIDTH JOINER' 'WOMAN' 'ZERO WIDTH JOINER' 'GIRL' 'ZERO WIDTH JOINER' 'BOY'> - A family with a man, a woman, a girl, and a boy
assert.deepEqual(graphemeClusters[14], [0x1F468, 0x200D, 0x1F469, 0x200D, 0x1F467]);                  // <'MAN' 'ZERO WIDTH JOINER' 'WOMAN' 'ZERO WIDTH JOINER' 'GIRL'> - A family with a man, a woman, and a girl
assert.deepEqual(graphemeClusters[15], [0x1F46A]);                                                    // 'FAMILY' - A family

assert.deepEqual(graphemeClusters[16], [0x20]); // 'SPACE'

assert.deepEqual(graphemeClusters[17], [0x6D]); // m
assert.deepEqual(graphemeClusters[18], [0x61]); // a
assert.deepEqual(graphemeClusters[19], [0xF1]); // ñ ('LATIN SMALL LETTER N WITH TILDE')
assert.deepEqual(graphemeClusters[20], [0x61]); // a
assert.deepEqual(graphemeClusters[21], [0x6E]); // n
assert.deepEqual(graphemeClusters[22], [0x61]); // a

assert.deepEqual(graphemeClusters[23], [0x20]); // 'SPACE'

assert.deepEqual(graphemeClusters[24], [0x6D]);        // m
assert.deepEqual(graphemeClusters[25], [0x61]);        // a
assert.deepEqual(graphemeClusters[26], [0x6E, 0x303]); // <n ('LATIN SMALL LETTER N') 'COMBINING TILDE'> - 'n' with tilde above it
assert.deepEqual(graphemeClusters[27], [0x61]);        // a
assert.deepEqual(graphemeClusters[28], [0x6E]);        // n
assert.deepEqual(graphemeClusters[29], [0x61]);        // a

assert.deepEqual(graphemeClusters[30], [0x20]); // 'SPACE'

assert.deepEqual(graphemeClusters[31], [0x5A, 0x351, 0x36B, 0x343, 0x36A, 0x302, 0x36B, 0x33D, 0x34F, 0x334, 0x319, 0x324, 0x31E, 0x349, 0x35A, 0x32F, 0x31E, 0x320, 0x34D]); // <Z ('LATIN CAPITAL LETTER Z') 'COMBINING LEFT HALF RING ABOVE' 'COMBINING LATIN SMALL LETTER M' 'COMBINING GREEK KORONIS' ...> - 'Z' with lots of decorations
assert.deepEqual(graphemeClusters[32], [0x41, 0x36B, 0x357, 0x334, 0x362, 0x335, 0x31C, 0x330, 0x354]);                                                                       // <A ('LATIN CAPITAL LETTER A') 'COMBINING LATIN SMALL LETTER M' 'COMBINING RIGHT HALF RING ABOVE' 'COMBINING TILDE OVERLAY' ...> - 'A' with lots of decorations
assert.deepEqual(graphemeClusters[33], [0x4C, 0x368, 0x367, 0x369, 0x358, 0x320]);                                                                                            // <L ('LATIN CAPITAL LETTER L') 'COMBINING LATIN SMALL LETTER C' 'COMBINING LATIN SMALL LETTER U' 'COMBINING LATIN SMALL LETTER D' ...> - 'L' with lots of decorations
assert.deepEqual(graphemeClusters[34], [0x47, 0x311, 0x357, 0x30E, 0x305, 0x35B, 0x341, 0x334, 0x33B, 0x348, 0x34D, 0x354, 0x339]);                                           // <G ('LATIN CAPITAL LETTER G') 'COMBINING INVERTED BREVE' 'COMBINING RIGHT HALF RING ABOVE' 'COMBINING DOUBLE VERTICAL LINE ABOVE' ...> - 'G' with lots of decorations
assert.deepEqual(graphemeClusters[35], [0x4F, 0x342, 0x30C, 0x30C, 0x358, 0x328, 0x335, 0x339, 0x33B, 0x31D, 0x333]);                                                         // <O ('LATIN CAPITAL LETTER O') 'COMBINING GREEK PERISPOMENI' 'COMBINING CARON' 'COMBINING CARON' ...> - 'O' with lots of decorations
assert.deepEqual(graphemeClusters[36], [0x21, 0x33F, 0x30B, 0x365, 0x365, 0x302, 0x363, 0x310, 0x301, 0x301, 0x35E, 0x35C, 0x356, 0x32C, 0x330, 0x319, 0x317]);               // <T ('LATIN CAPITAL LETTER T') 'COMBINING DOUBLE OVERLINE' 'COMBINING DOUBLE ACUTE ACCENT' 'COMBINING LATIN SMALL LETTER I' ...> - 'T' with lots of decorations 

assert.deepEqual(graphemeClusters[37], [0x20]); // 'SPACE'

assert.deepEqual(graphemeClusters[38], [0x77]); // w
assert.deepEqual(graphemeClusters[39], [0x6F]); // o
assert.deepEqual(graphemeClusters[40], [0x72]); // r
assert.deepEqual(graphemeClusters[41], [0x6C]); // l
assert.deepEqual(graphemeClusters[42], [0x64]); // d