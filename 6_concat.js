var concat = require('concat-stream');

process.stdin.pipe(concat(function(body){
	var i, rdata = [];
	var data = body.toString();

	for (i=0; i<data.length; i++){
		rdata[i] = data[data.length-1-i];
	}

	process.stdout.write(rdata.join(''));
}));
