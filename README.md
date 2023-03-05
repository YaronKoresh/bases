
# BASES.js

### Base encoding/decoding algorithm, with the ability for custom character sets of choice

## Example:

```

var bases = require("@yaronkoresh/bases");

// => bases <=
// parameter1: <input> (a string of binary data OR a string of text).
// parameter2: <charset> (a string of the charset, eg. HEX is "0123456789abcdef").
// parameter3: <'EncodeString'|'DecodeString'|'EncodeBinary'|'DecodeBinary'> (the given data & action).
// optional4: [paddingChar] (the padding char in the end of the result string).

console.log( bases("abc","0123456789abcdef","EncodeString") );
// "616263"
// Here we have been using the hexadecimal base, but you can specify your own bases!).

console.log( bases("abcd1234","10","EncodeString") );
// "1001111010011101100111001001101111001110110011011100110011001011"
// A flipped binary base! (zero is one and one is zero).

console.log( bases("z-6$f0","ABCD","EncodeString") )
// "BDCCACDBADBCACBABCBCADAA"
// Encoding with my own base!

console.log( bases("BDCCACDBADBCACBABCBCADAA","ABCD","DecodeString") )
// "z-6$f0"
// You will get your data back, don't worry!

```

---

### ENJOY!
