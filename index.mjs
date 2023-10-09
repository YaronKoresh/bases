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

// ../_tools_/src/Math.js
var Greater = function(a, b) {
  a = a.toString().split("");
  b = b.toString().split("");
  if (a.length > b.length) {
    return a.join("");
  }
  if (a.length < b.length) {
    return b.join("");
  }
  for (let i = 0; i < a.length; i++) {
    if (+a[i] > +b[i]) {
      return a.join("");
    }
    if (+a[i] < +b[i]) {
      return b.join("");
    }
  }
  return true;
};
var Multiply = function(...nums) {
  let ret = nums[0].toString();
  nums = nums.slice(1);
  for (let i = 0; i < nums.length; i++) {
    let num = nums[i].toString();
    if (Add(num, 0) === "0") {
      return "0";
    }
    let value = ret;
    let counter = "2";
    while (true) {
      if (Greater(counter, num) === counter) {
        break;
      }
      ret = Add(ret, value);
      counter = Add(counter, 1);
    }
  }
  return ret;
};
var Power = function(...nums) {
  let ret = nums[0].toString();
  nums = nums.slice(1);
  for (let i = 0; i < nums.length; i++) {
    let num = nums[i].toString();
    if (Add(num, 0) === "0") {
      ret = "1";
    }
    let value = ret;
    let counter = "2";
    while (true) {
      if (Greater(counter, num) === counter) {
        break;
      }
      ret = Multiply(ret, value);
      counter = Add(counter, 1);
    }
  }
  return ret;
};
var Add = function(...nums) {
  nums = nums.map((num) => num.toString().split("").reverse());
  let ret = ["0"];
  for (let i = 0; i < Math.max(...nums.map((num) => num.length)); i++) {
    let sum = 0;
    nums.map((num) => parseInt(num[i] ?? 0)).map(function(n) {
      sum += n;
    });
    sum = sum.toString().split("").reverse();
    for (let j = 0; j < sum.length; j++) {
      let index = j + i;
      ret[index] = ret[index] ?? "0";
      let n = (parseInt(ret[index]) + parseInt(sum[j] ?? 0)).toString().split("").reverse();
      ret[index] = n[0];
      if (n.length > 1) {
        index++;
        n = n.slice(1).join("");
        let retToBeChanged = ret.slice(index).reverse().join("");
        ret = ret.slice(0, index + 1);
        ret.push(...Add(retToBeChanged, n).split("").reverse());
      }
    }
  }
  return ret.reverse().join("");
};

// ../_tools_/src/Round.js
var RoundUp = function(input, factor) {
  return factor - input % factor + input;
};

// ../_tools_/src/Bits.js
var MeasureBits = function(num, roundUp = true) {
  return roundUp == true ? Math.ceil(Math.log2(num)) : Math.log2(num);
};

// ../_tools_/src/Unicode.js
var NumberToCharset = function(charset, num) {
  charset = charset.split("");
  let bs = charset.length;
  const UpdateOutputValue = function(outputCharsetIndexes2) {
    let sum = "0";
    for (let i2 = 0; i2 < outputCharsetIndexes2.length; i2++) {
      sum = Add(sum, Multiply(Power(bs, i2), outputCharsetIndexes2[i2]));
    }
    return sum;
  };
  let value = num.toString();
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
  return outputCharsetIndexes.map(function(charsetIndex) {
    return charset[+charsetIndex];
  }).reverse().join("");
};
var CharsetToNumbers = function(str, charset = null) {
  let ret = [];
  str = str.split("").reverse().join("");
  for (let i = 0; true; i++) {
    if (typeof str.codePointAt(i) === "undefined") {
      ret = ret.reverse();
      while (true) {
        if (ret.length > 0 && ret[0] === charset.split("")[0]) {
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
    return String.fromCodePoint(...nums.map((value) => parseInt(value))).toString();
  }
  let bits = MeasureBits(charset.length);
  let size = RoundUp(bits, 8) / bits;
  let ret = nums.map((value) => NumberToCharset(charset, value)).join("");
  while (true) {
    if (ret.length > 1 && ret.slice(0, 1) === charset.split("")[0]) {
      ret = ret.slice(1);
    } else {
      return ret;
    }
  }
};
var StringToBytes = function(str) {
  return [...new TextEncoder().encode(str)];
};
var BytesToString = function(...bytes) {
  bytes = [bytes].flat().flat();
  bytes = new Uint8Array(bytes);
  return new TextDecoder().decode(bytes);
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
      num = Add(num, value);
    });
    out = NumbersToCharset(num, to);
  } else if (from === null && to !== null && toFloat === true) {
    console.error("String Encoding/Decoding with some bases may be unsupported!");
    console.error("Base" + toLength + " is unfortunately one of them.");
    return false;
  } else if (from === null && to !== null) {
    let bytes = StringToBytes(str);
    let bin = bytes.map((byte) => Zeros((+byte).toString(2), 8)).join("");
    bin += "0".repeat((toBits - bin.length % toBits) % toBits);
    let bins = Split(bin, toBits);
    let values = bins.map((b) => parseInt(b, 2));
    out = NumbersToCharset(values, to);
  } else if (from !== null && to === null && fromFloat === true) {
    console.error("String Encoding/Decoding with some bases may be unsupported!");
    console.error("Base" + toLength + " is unfortunately one of them.");
    return false;
  } else if (from !== null && to === null) {
    let charsLength = Split(str, fromSize).length;
    let values = CharsetToNumbers(str, from);
    let bin = values.map((v) => Zeros(parseInt(v).toString(2), fromBits)).join("").slice(0, charsLength * 8);
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
