// ../_tools_/src/ConvertBytes.js
var Decode = function(text) {
  let result = [];
  let i = 0;
  text = encodeURI(text ?? "");
  while (i < text.length) {
    let c = text.charCodeAt(i++);
    if (c == 37) {
      result.push(parseInt(text.substr(i, 2), 16));
      i += 2;
    } else {
      result.push(c);
    }
  }
  return result;
};
var Encode = function(bytes) {
  let result = [], i = 0;
  while (i < bytes.length) {
    let c = bytes[i];
    if (c < 128) {
      result.push(String.fromCharCode(c));
      i++;
    } else if (c > 191 && c < 224) {
      result.push(String.fromCharCode((c & 31) << 6 | bytes[i + 1] & 63));
      i += 2;
    } else {
      result.push(String.fromCharCode((c & 15) << 12 | (bytes[i + 1] & 63) << 6 | bytes[i + 2] & 63));
      i += 3;
    }
  }
  return result.join("");
};

// ../_tools_/src/Zeros.js
var Zeros = function(str, len) {
  str = str.toString();
  while (str.length < len) {
    str = "0" + str;
  }
  return str;
};

// ../_tools_/src/Split.js
var Split = function(inp, num) {
  inp = inp.toString();
  var out = [];
  for (var i = 0; i < inp.length; i += num) {
    out.push(inp.substring(i, i + num));
  }
  return out;
};

// ../_tools_/src/Bases.js
var Bases = function(inp, charset, mode, paddingChar = "=") {
  if (mode == 1) {
    mode = "EncodeString";
  } else if (mode == 0) {
    mode = "DecodeString";
  } else if (mode == 11) {
    mode = "EncodeNumber";
  } else if (mode == 10) {
    mode = "DecodeNumber";
  }
  if (typeof inp == "string") {
    inp = inp.split("");
  } else if (typeof inp == "number") {
    inp = [inp];
  }
  for (var i = 0; i < inp.length; i++) {
    if (typeof inp[i] == "number") {
      inp[i] = String.fromCharCode(inp[i]);
    }
  }
  inp = inp.join("");
  if (typeof charset != "object") {
    charset = charset.toString().split("");
  }
  var out = [];
  var bs = charset.length;
  if (bs < 2) {
    return "";
  }
  var bits = Math.floor(Math.log2(bs));
  var size = null;
  var multi = 8;
  while (multi % bits != 0) {
    multi += 8;
    size = multi / bits;
  }
  if (mode.toLowerCase() == "encodenumber") {
    let UpdateOutputValue = function() {
      let sum = 0;
      for (let i2 = 0; i2 < outputCharsetIndexes.length; i2++) {
        sum += Math.pow(bs, i2) * outputCharsetIndexes[i2];
      }
      outputValue = sum;
    }, Power = function() {
      return Math.pow(bs, outputIndexOutOfUsage);
    };
    let value = inp;
    let outputCharsetIndexes = [];
    let outputIndexOutOfUsage = 0;
    let power = Power();
    let outputValue = 0;
    while (power <= value) {
      outputCharsetIndexes.push(0);
      outputIndexOutOfUsage++;
      power = Power();
    }
    let currentOutputIndex = outputIndexOutOfUsage - 1;
    while (currentOutputIndex >= 0) {
      let indexValue = Math.pow(bs, currentOutputIndex);
      while (outputValue + indexValue <= value) {
        outputCharsetIndexes[currentOutputIndex]++;
        outputValue += indexValue;
      }
      currentOutputIndex--;
    }
    out = outputCharsetIndexes.map(function(charsetIndex) {
      return charset[charsetIndex];
    }).reverse().join("");
    return out;
  } else if (mode.toLowerCase() == "decodenumber") {
    let value = 0;
    let outputCharsetIndexes = inp.split("").reverse().map(function(char2, index) {
      value += charset.indexOf(char2) * Math.pow(bs, index);
    });
    return value;
  } else if (mode.toLowerCase() == "encodestring") {
    var result = "";
    var ascii = Decode(inp);
    var ascii_bits = "";
    for (var j = 0; j < ascii.length; j++) {
      ascii_bits += Zeros(ascii[j].toString(2), 8);
    }
    if (ascii_bits.length % bits != 0) {
      ascii_bits += "0".repeat(bits - ascii_bits.length % bits);
    }
    var ordered = Split(ascii_bits, bits);
    for (var j = 0; j < ordered.length; j++) {
      result += charset[parseInt(ordered[j], 2)];
    }
    if (size != null) {
      result += paddingChar.repeat((size - result.length % size) % size);
    }
    out = result;
    return out;
  } else if (mode.toLowerCase() == "decodestring") {
    var chars = inp.split("");
    var result = "";
    var bin = "";
    for (var j = 0; j < chars.length; j++) {
      if (chars[j] == paddingChar) {
        break;
      }
      var char = chars[j];
      var dec = charset.indexOf(char);
      if (dec == -1) {
        return false;
      }
      bin += Zeros(dec.toString(2), bits);
    }
    let bin_array = Split(bin, 8);
    try {
      if (bin_array[bin_array.length - 1].length < 8) {
        bin_array.pop();
      }
      for (var j = 0; j < bin_array.length; j++) {
        bin_array[j] = parseInt(bin_array[j], 2);
      }
      result += Encode(bin_array);
      out = result;
    } catch (e) {
      console.log("Error!");
      return null;
    }
    return out;
  }
};
export {
  Bases
};
