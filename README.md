
# @yaronkoresh/bases v3.0.0

### Made with much screen time & care for the community, by: Yaron Koresh, Israel.

## This project is licensed under MIT open-source license.

### Base encoding/decoding algorithm, with the ability for custom character sets of choice.

* Encode/Decode with your custom not standard base.

* Encode/Decode Integer and string types.

* Choose a custom padding char (do not choose a character from the base you have chosen).

# Example

```

// Import this package
import { Bases } from "@yaronkoresh/bases" // or: const { Bases } = await import("@yaronkoresh/bases");

// "Bases" parameters:
// parameter1: <input> a string OR integer.
// parameter2: <charset> a string of the charset, eg. "0123456789abcdef".
// parameter3: <'EncodeString'|'DecodeString'|'EncodeNumber'|'DecodeNumber'> choose the given input & action.
// optional4: [paddingChar] the padding char in the end of the result string, default is '='.

// You could alternativly choose these parameter3 values:
// 'EncodeString' could be: 1.
// 'DecodeString' could be: 0.
// 'EncodeNumber' could be: 11.
// 'DecodeNumber' could be: 10.

const stringExample = Bases(
	"My name is Yaron Koresh, but everyone here calls me Yaroni Makaroni.",
	"Gq8!(2-ABCDEFabcdef13456790",
	1
);
console.log( stringExample );
// The results: (aAC8G-b-q-a-28G-CA!8G2C-qA8-c-b8G(E-cA8-2A!-B8F8G-8A2A(8G-2A--2A8AC-c-b-28G-B-2A8-28G-!-q-F-FA!8G-a-28G2C-qA8-c-b-C8G(a-q-E-qA8-c-b-C8b

const integerExample = Bases(
	"255",
	"0123456789ABCDEF",
	'encodenumber'
);
console.log( integerExample );
// The results: FF

```

### Enjoy!
