
# @yaronkoresh/bases v5.0.1

### Base encoding/decoding algorithm, with the ability for custom character sets of choice.

- - -

### Any base (even bases with custom length & String conversion) for any kind of encoding/decoding are now supported (v5.0.0 and above).

* Converts bases with your custom not standard bases.

* Converts from/to text/number.

* Converts between bases, using safe math operations (so... no errors with high numbers).

* Choose a custom padding char (do not choose a character included inside the target charset).

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

const stringToBase62 = Bases(
	"Yaroni Makaroni",
	"0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
	1,
	""
);
console.log( stringToBase62 );
// The results: 'eqW933SeYTNa1dnrLnFx'

// ------------------------------------

const hexToDecimal = Bases(
	"FF",
	"0123456789ABCDEF",
	10,
	""
);
console.log( hexToDecimal );
// The results: "255"

// ------------------------------------

// ENJOY!

```