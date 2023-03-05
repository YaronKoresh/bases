const ASCII = require("./ASCII.js");
const ASCII_ENCODE = ASCII.ENCODE;
const ASCII_DECODE = ASCII.DECODE;
const ZEROS = require("./ZEROS.js");
const SPLIT = require("./SPLIT.js");

module.exports = function (...$) {

	var inp = $[0];
	var charset = $[1];
	var mode = $[2];
	var paddingChar = $[3];

	if(typeof paddingChar == "undefined"){
		paddingChar = '=';
	}

	if (mode == 1) {
		mode = 'EncodeString'
	} else if (mode == 0) {
		mode = 'DecodeString'
	} else if (mode == 11) {
		mode = 'EncodeBinary'
	} else if (mode == 10) {
		mode = 'DecodeBinary'
	}

	if (typeof inp != 'object') {
		inp = [inp]
	}

	if (typeof charset != 'object') {
		charset = charset.toString().split('')
	}

	var out = [];
	var bs = charset.length;

	if (bs < 2) {
		return ''
	}

	var bits = Math.floor(Math.log2(bs));
	var size = null;
	var multi = 8;

	while (multi % bits != 0) {
		multi += 8;
		size = multi / bits
	}

	if (mode == 'EncodeString') {
		for (var i = 0; i < inp.length; i++) {
			var result = '';
			var ascii = ASCII_DECODE(inp[i]);
			var ascii_bits = '';
			for (var j = 0; j < ascii.length; j++) {
				ascii_bits += ZEROS(ascii[j].toString(2), 8)
			}
			if (ascii_bits.length % bits != 0) {
				ascii_bits += '0'.repeat(bits - ascii_bits.length % bits)
			}
			var ordered = SPLIT(ascii_bits, bits);
			for (var j = 0; j < ordered.length; j++) {
				result += charset[parseInt(ordered[j], 2)]
			}
			if (size != null) {
				result += paddingChar.repeat((size - (result.length % size)) % size)
			}
			out.push(result)
		}
	} else if (mode == 'DecodeString') {
		for (var i = 0; i < inp.length; i++) {
			var chars = inp[i].split('');
			var result = '';
			var bin = '';
			for (var j = 0; j < chars.length; j++) {
				if (chars[j] == paddingChar) {
					break
				}
				var char = chars[j];
				var dec = charset.indexOf(char);
				if (dec == -1) {
					return false
				}
				bin += ZEROS(dec.toString(2), bits)
			}
			bin_array = SPLIT(bin, 8);
			try{
				if (bin_array[bin_array.length - 1].length < 8) {
					bin_array.pop()
				}
				for (var j = 0; j < bin_array.length; j++) {
					bin_array[j] = parseInt(bin_array[j], 2)
				}
				result += ASCII_ENCODE(bin_array);
				out.push(result);
			} catch(e) {
				console.log("Error!");
				out.push("");
			}
		}
	} else if (mode == 'EncodeBinary') {
		for (var i = 0; i < inp.length; i++) {
			var result = '';
			var ascii_bits = inp[i];
			if (ascii_bits.length % bits != 0) {
				ascii_bits += '0'.repeat(bits - ascii_bits.length % bits)
			}
			var ordered = SPLIT(ascii_bits, bits);
			for (var j = 0; j < ordered.length; j++) {
				result += charset[parseInt(ordered[j], 2)]
			}
			if (size != null) {
				result += paddingChar.repeat((size - (result.length % size)) % size)
			}
			out.push(result)
		}
	} else if (mode == 'DecodeBinary') {
		for (var i = 0; i < inp.length; i++) {
			var chars = inp[i].split('');
			var result = '';
			var bin = '';
			for (var j = 0; j < chars.length; j++) {
				if (chars[j] == paddingChar) {
					break
				}
				var char = chars[j];
				var dec = charset.indexOf(char);
				if (dec == -1) {
					return false
				}
				bin += ZEROS(dec.toString(2), bits)
			}
			bin_array = SPLIT(bin, 8);
			try{
				if (bin_array[bin_array.length - 1].length < 8) {
					bin_array.pop()
				}
				for (var j = 0; j < bin_array.length; j++) {
					bin_array[j] = parseInt(bin_array[j], 2)
				}
				result += ASCII_ENCODE(bin_array);
				out.push(result);
			} catch(e) {
				console.log("Error!");
				out.push("");
			}
		}
	}
	if (out.length == 1) {
		return out[0]
	} else {
		return out
	}
}
