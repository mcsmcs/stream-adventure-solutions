var duplex = require('duplexer');
var through = require('through');

module.exports = function(counter){
	var count = {};
	
	function write(data){
		if (count[data.country]){ count[data.country] += 1; }
		else { count[data.country] = 1; }
	}

	function end(){	counter.setCounts(count); }
	
	var input = through(write, end);

	return duplex(input, counter);
};