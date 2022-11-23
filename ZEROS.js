module.exports = function(str, len) {
	str = str.toString();
	while (str.length < len) {
		str = '0' + str
	}
	return str
}
