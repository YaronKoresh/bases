
# @yaronkoresh/bases v4.0.0

### Made with much screen time & care for the community, by: Yaron Koresh, Israel.

### This project is licensed under MIT open-source license.

### Base encoding/decoding algorithm, with the ability for custom character sets of choice.

* Converts bases with your custom not standard bases.

* Converts from/to text/number.

* Converts between bases, using safe math operations (so... no errors with high numbers).

* Choose a custom padding char (do not choose a digit OR a character included inside the charset).

### Some bases, are still unsupported, for String type encoding / decoding (Number conversion is fully supported).

# Example

```

// ------------------------------------

// Import this package
import { Bases } from "@yaronkoresh/bases"; // or: const { Bases } = await import("@yaronkoresh/bases");

// ------------------------------------

// "Bases" parameters:
// parameter1: <input> the input to be converted.
// parameter2: <charset> a string of the charset, eg. "0123456789abcdef".
// parameter3: <'EncodeString'|'DecodeString'|'EncodeNumber'|'DecodeNumber'> choose the given input & action.
// optional4: [paddingChar] the padding char in the end of the result string, default is '='.

// You could alternativly choose these parameter3 values:
// 'EncodeString' could be: 1.
// 'DecodeString' could be: 0.
// 'EncodeNumber' could be: 11.
// 'DecodeNumber' could be: 10.

// ------------------------------------

const stringToBase64 = Bases(
	"My name is Yaron Koresh, but everyone here calls me Yaroni Makaroni.",
	"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
	1
);
console.log( stringToBase64 );
// The results: 'TXkgbmFtZSBpcyBZYXJvbiBLb3Jlc2gsIGJ1dCBldmVyeW9uZSBoZXJlIGNhbGxzIG1lIFlhcm9uaSBNYWthcm9uaS4='

// ------------------------------------

const hexToDecimal = Bases(
	"FF",
	"0123456789ABCDEF",
	10,
	""
);
console.log( hexToDecimal );
// The results: 255

// ------------------------------------

// ENJOY!

```