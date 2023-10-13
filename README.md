# About:

### Base encoding/decoding algorithm, with the ability for custom character sets of choice.

# Example 1 - Base62 String Encoding without padding:

```
import { Bases } from "@yaronkoresh/bases";
// or: const { Bases } = await import("@yaronkoresh/bases");

// Step 1: Write a string !
const str = "Hello!";

// Step 2: Paste the charset of Base62 !
const chset = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

// Step 3: Write 1 or "EncodeString" !
const mode = 1;

// Step 4: Choose an empty string as the padding character !
const pad = "";

// Step 5: Encode the string into the charset !
const encoded = Bases( str, chset, mode, pad );

console.log( encoded );
// The results: "MbPS3UBt"
```

# Example 2 - Binary String Decoding:

```
import { Bases } from "@yaronkoresh/bases";
// or: const { Bases } = await import("@yaronkoresh/bases");

// Step 1: Write a binary string !
const str = "10010000110010101101100011011000110111100100001";

// Step 2: Write the binary charset !
const chset = "01";

// Step 3: Write 0 or "DecodeString" !
const mode = 0;

// Step 4: Decode the string back from the binary charset !
const decoded = Bases( str, chset, mode );

console.log( decoded );
// The results: "Hello!"
```

# Example 3 - Hex Number Encoding:

```
import { Bases } from "@yaronkoresh/bases";
// or: const { Bases } = await import("@yaronkoresh/bases");

// Step 1: Choose a number !
const str = "4582";

// Step 2: Write the hex charset !
const chset = "0123456789ABCDEF";

// Step 3: Write 11 or "EncodeNumber" !
const mode = "EncodeNumber";

// Step 4: Encode the chosen number into hex !
const encoded = Bases( str, chset, mode );

console.log( encoded );
// The results: "11E6"
```

# Example 4 - Decode a number from decimal (no change will happen):

```
import { Bases } from "@yaronkoresh/bases";
// or: const { Bases } = await import("@yaronkoresh/bases");

// Step 1: Write a number !
const str = "123";

// Step 2: Write the decimal charset !
const chset = "0123456789";

// Step 3: Write 10 or "DecodeNumber" !
const mode = "10";

// Step 4: Decode the decimal number to itself, without padding !
const decoded = Bases( str, chset, mode, "" );

console.log( decoded );
// The results: "123"
```

# License:

### This project is licensed under MIT open-source license.