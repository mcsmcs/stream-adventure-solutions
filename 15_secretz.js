
var through = require('through');
var parser = require('tar').Parse();
var gunzip = require('zlib').createGunzip();
var crypto = require('crypto');
var decipher = crypto.createDecipher(process.argv[2], process.argv[3]);

parser.on('entry', function(e){
	function end(){ this.queue(' ' + e.path + '\n'); }
	
	if(e.type === 'File'){
		var md5sum = crypto.createHash('md5', {encoding: 'hex'});
		e.pipe(md5sum).pipe(through(null,end)).pipe(process.stdout);
	}
});

process.stdin.pipe(decipher).pipe(gunzip).pipe(parser);
