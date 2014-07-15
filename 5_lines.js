var through = require('through');
var split = require('split');

var tr = through(function(line){ 
	
	var data = line.toString();
	this.count++;
	
	if (this.count % 2 === 0){ data = line.toUpperCase(); }
	else{ data = line.toLowerCase(); }

	this.queue(data + '\n'); 
});
tr.count = 0;

process.stdin.pipe(split()).pipe(tr).pipe(process.stdout);
