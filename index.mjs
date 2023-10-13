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
import { Add as Add2, Multiply as Multiply2, Power as Power2, Greater as Greater2 } from "@yaronkoresh/math";

// ../_tools_/src/Unicode.js
import { Multiply, Power, Add, Greater } from "@yaronkoresh/math";

// ../_tools_/src/Round.js
var RoundUp = function(input, factor) {
  return factor - input % factor + input;
};

// ../_tools_/src/Bits.js
var MeasureBits = function(num, roundUp = true) {
  return roundUp == true ? Math.ceil(Math.log2(num)) : Math.log2(num);
};

// ../_tools_/src/Unicode.js
var CharsetToNumbers = function(str, charset = null) {
  let ret = [];
  str = str.split("").reverse().join("");
  for (let i = 0; true; i++) {
    if (typeof str.codePointAt(i) === "undefined") {
      ret = ret.reverse();
      while (true) {
        if (ret.length > 1 && ret[0] === charset.split("")[0]) {
          ret = ret.slice(1);
        } else {
          return ret;
        }
      }
    }
    ret.push(
      charset === null ? str.codePointAt(i).toString() : Multiply(Power(charset.length, i), charset.indexOf(str.split("")[i]))
    );
  }
};
var NumbersToCharset = function(nums, charset = null) {
  nums = [nums].flat();
  if (charset === null) {
    return String.fromCodePoint(...nums.map((value2) => parseInt(value2))).toString();
  }
  let bits = MeasureBits(charset.length);
  let size = RoundUp(bits, 8) / bits;
  charset = charset.split("");
  let bs = charset.length;
  const UpdateOutputValue = function(outputCharsetIndexes2) {
    let sum = "0";
    for (let i2 = 0; i2 < outputCharsetIndexes2.length; i2++) {
      sum = Add(sum, Multiply(Power(bs, i2), outputCharsetIndexes2[i2]));
    }
    return sum;
  };
  let value = Add(nums).toString();
  let outputCharsetIndexes = ["0"];
  let outputIndexOutOfUsage = 1;
  let power = Power(bs, outputIndexOutOfUsage);
  let outputValue = "0";
  while (Greater(power, value) !== power) {
    outputCharsetIndexes.push("0");
    outputIndexOutOfUsage++;
    power = Power(bs, outputIndexOutOfUsage);
  }
  let currentOutputIndex = outputIndexOutOfUsage - 1;
  while (currentOutputIndex >= 0) {
    let indexValue = Power(bs, currentOutputIndex);
    outputValue = UpdateOutputValue(outputCharsetIndexes);
    let _outputValue = Add(indexValue, outputValue);
    while (Greater(_outputValue, value) !== _outputValue) {
      outputCharsetIndexes[currentOutputIndex] = Add(outputCharsetIndexes[currentOutputIndex], 1);
      outputValue = _outputValue;
      _outputValue = Add(indexValue, outputValue);
    }
    currentOutputIndex--;
  }
  let ret = outputCharsetIndexes.map(function(charsetIndex) {
    return charset[+charsetIndex];
  }).reverse().join("");
  while (true) {
    if (ret.length > 1 && ret.slice(0, 1) === charset[0]) {
      ret = ret.slice(1);
    } else {
      return ret;
    }
  }
};
var StringToBytes = function(str) {
  let e = new TextEncoder();
  let arr = e.encode(str);
  return [...arr];
};
var BytesToString = function(...bytes) {
  bytes = [bytes].flat().flat();
  bytes = new Uint8Array(bytes);
  let d = new TextDecoder();
  return d.decode(bytes);
};

// ../_tools_/src/Bases.js
var Bases = function(str, charset, mode, padding = "=") {
  let from = null;
  let to = null;
  if (mode.toString() === "1" || mode.toString().toLowerCase() === "encodestring") {
    to = charset;
  } else if (mode.toString() === "0" || mode.toString().toLowerCase() === "decodestring") {
    from = charset;
  } else if (mode.toString() === "11" || mode.toString().toLowerCase() === "encodenumber") {
    from = "0123456789";
    to = charset;
  } else if (mode.toString() === "10" || mode.toString().toLowerCase() === "decodenumber") {
    to = "0123456789";
    from = charset;
  }
  str = str.toString();
  from = from === null ? from : from.toString();
  to = to === null ? to : to.toString();
  let toLength = to === null ? null : to.length;
  if (typeof toLength === "number" && toLength < 2) {
    return null;
  }
  let toBits = toLength === null ? null : MeasureBits(toLength);
  let toFloatBits = toLength === null ? null : MeasureBits(toLength, false);
  let toSize = toBits === null ? null : RoundUp(toBits, 8) / toBits;
  let toFloat = toFloatBits !== parseInt(toFloatBits);
  let fromLength = from === null ? null : from.length;
  if (typeof fromLength === "number" && fromLength < 2) {
    return null;
  }
  let fromBits = fromLength === null ? null : MeasureBits(fromLength);
  let fromFloatBits = fromLength === null ? null : MeasureBits(fromLength, false);
  let fromSize = fromBits === null ? null : RoundUp(fromBits, 8) / fromBits;
  let fromFloat = fromFloatBits !== parseInt(fromFloatBits);
  let num = "";
  let out = [];
  if (from === to) {
    return str;
  }
  if (from !== null) {
    let re = new RegExp("(" + padding + "){1,}$", "g");
    str = str.replaceAll(re, "");
  }
  if (from !== null && to !== null) {
    CharsetToNumbers(str, from).reverse().map(function(value) {
      num = Add2(num, value);
    });
    out = NumbersToCharset(num, to);
  } else if (from === null && to !== null && toFloat === true) {
    let hex = StringToBytes(str).map((byte) => NumbersToCharset(byte, "0123456789ABCDEF")).map((hx) => Zeros(hx, 2)).join("");
    out = NumbersToCharset(CharsetToNumbers(hex, "0123456789ABCDEF"), to);
  } else if (from === null && to !== null) {
    let bytes = StringToBytes(str);
    let bin2 = bytes.map((byte) => Zeros((+byte).toString(2), 8)).join("");
    let bin = bin2 + "0".repeat((toBits - bin2.length % toBits) % toBits);
    let values = CharsetToNumbers(bin, "01");
    out = NumbersToCharset(values, to);
  } else if (from !== null && to === null && fromFloat === true) {
    out = BytesToString(Split(NumbersToCharset(CharsetToNumbers(str, from), "0123456789ABCDEF"), 2).map((hx) => CharsetToNumbers(hx, "0123456789ABCDEF")));
  } else if (from !== null && to === null) {
    let charsLength = Split(str, fromSize).length;
    let values = CharsetToNumbers(str, from);
    let bin = NumbersToCharset(values, "01");
    let bin2 = Split(bin, fromBits).map((v) => Zeros(v, fromBits)).join("").slice(0, charsLength * 8);
    let bytes = Split(bin, 8).map((b) => parseInt(b, 2));
    out = BytesToString(bytes);
  }
  if (toSize !== null) {
    out += padding.repeat((toSize - out.length % toSize) % toSize);
  }
  return out;
};
export {
  Bases
};
