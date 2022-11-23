module.exports = function(inp, num) {
	inp = inp.toString();
	var out = [];
	for (var i = 0; i < inp.length; i += num) {
		out.push(inp.substring(i, i + num))
	}
	return out
}
