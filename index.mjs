// ../_tools_/src/Zeros.js
var Zeros = function(str, len, side = "left") {
  str = str.toString();
  while (str.length < len) {
    if (side.toLowerCase() === "left") {
      str = "0" + str;
    } else if (side.toLowerCase() === "right") {
      str = str + "0";
    }
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
import { Multiply, Power, Subtract, Add, Greater, Divide, AddBinary } from "@yaronkoresh/math";

// ../_tools_/src/Round.js
var RoundUp = function(input, factor) {
  return factor - input % factor + input;
};

// ../_tools_/src/Bits.js
var MeasureBits = function(num, roundUp = true) {
  return roundUp == true ? Math.ceil(Math.log2(num)) : Math.log2(num);
};

// ../_tools_/src/Unicode.js
var maxUnicode = 65536;
var ToDecimal = function(str, charset = null) {
  str = str.toString();
  let ret = [];
  if (charset === null) {
    for (let i = 0; true; i++) {
      if (typeof str.codePointAt(i) === "undefined") {
        ret = ret.reverse();
        while (true) {
          if (ret.length > 1 && ret[0] === "0") {
            ret = ret.slice(1);
          } else {
            return ret.join("");
          }
        }
      }
      let char = str.split("")[i];
      let bin = str.codePointAt(i).toString(2);
      ret.push(Zeros(bin, Math.log2(maxUnicode)));
    }
  }
  for (let i = str.length - 1; i >= 0; i--) {
    let char = str.slice(0, 1);
    str = str.slice(1);
    let bin = Multiply(Power(charset.length, i), charset.indexOf(char));
    ret.push(bin);
  }
  return Add(ret, 0);
};
var FromBinary = function(bin, charset = null) {
  if (charset === null) {
    let bins2 = Split(bin, Math.log2(maxUnicode));
    let decimals = bins2.map((b) => parseInt(b, 2));
    return String.fromCodePoint([...decimals].reverse()).toString();
  }
  while (bin.slice(0, 1) === "0" && bin.length > 1) {
    bin = bin.slice(1);
  }
  let decimal = "0";
  let bins = [...bin.split("")].reverse();
  for (let i = 0; i < bin.length; i++) {
    if (bins[i] === "1") {
      let pow = Power(2, i);
      decimal = Add(decimal, pow);
    }
  }
  return FromDecimal(decimal, charset);
};
var FromDecimal = function(decimal, charset = null) {
  if (charset === null) {
    let bin = FromDecimal(decimal, "01");
    let bins = Split(bin, Math.log2(maxUnicode));
    let decimals = bins.map((b) => parseInt(b, 2));
    return String.fromCodePoint([...decimals].reverse()).toString();
  }
  decimal = Add(decimal, 1);
  let encoded = "";
  let base = charset.length;
  let cs = charset.split("");
  let index = "0";
  while (true) {
    let nextStep = Power(base, index);
    if (Greater(decimal, nextStep) !== decimal) {
      index = Subtract(index, 1);
      break;
    } else {
      index = Add(index, 1);
    }
  }
  for (let i = index; Greater(i, "0") !== "0"; i = Subtract(i, 1)) {
    let csIndex = "1";
    let pow = Power(base, i);
    if (Greater(pow, decimal) === pow) {
      if (encoded !== "") {
        encoded += cs[0];
      }
      continue;
    }
    let _pow = pow;
    let nextStep = Add(pow, _pow);
    while (Greater(decimal, nextStep) === decimal) {
      pow = nextStep;
      csIndex = Add(csIndex, 1);
      nextStep = Add(pow, _pow);
    }
    decimal = Subtract(decimal, pow);
    encoded += cs[csIndex];
  }
  return encoded;
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
    if (from === "0123456789") {
      out = FromDecimal(str, to);
    } else {
      out = ToDecimal(str, from);
    }
  } else if (from === null && to !== null && toFloat === true) {
    let bytes = StringToBytes(str);
    let hex = bytes.map((byte) => byte.toString(16)).join("");
    let deci = ToDecimal(hex.toUpperCase(), "0123456789ABCDEF");
    out = FromDecimal(deci, to);
  } else if (from === null && to !== null) {
    let bytes = StringToBytes(str);
    let bin2 = bytes.map((byte) => Zeros((+byte).toString(2), 8)).join("");
    let bin = bin2 + "0".repeat((toBits - bin2.length % toBits) % toBits);
    out = FromBinary(bin, to);
  } else if (from !== null && to === null && fromFloat === true) {
    out = BytesToString(
      Split(
        FromDecimal(ToDecimal(str, from), "0123456789ABCDEF"),
        2
      ).map(
        (hx) => ToDecimal(hx, "0123456789ABCDEF")
      )
    );
  } else if (from !== null && to === null) {
    let charsLength = Split(str, fromSize).length;
    let bin = ToBinary(str, from);
    bin = Zeros(bin, RoundUp(bin.length, 8));
    let bytes = Split(bin.slice(0, charsLength * 8), 8).map((b) => parseInt(b, 2));
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
