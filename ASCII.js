module.exports.DECODE = function(str){
	var byteArray = [];
	for (var i = 0; i < str.length; ++i) {
		byteArray.push(str.charCodeAt(i) & 255)
	}
	return byteArray
}

module.exports.ENCODE = function(str){
	var ret = '';
	for (var i = 0; i < buf.length; i++) {
		ret += String.fromCharCode(buf[i] & 127)
	}
	return ret
}
