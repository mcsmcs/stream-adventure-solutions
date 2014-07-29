var combine = require('stream-combiner');
var split = require('split');
var through = require('through');
var gzip = require('zlib').createGzip();

var genre = {};

var tr = through(function write(buf){ 
	
	var obj;
	if (buf) { obj = JSON.parse(buf.toString()); }

	if(obj && obj.type === 'genre'){
		if (genre.name){ this.queue(JSON.stringify(genre) + '\n'); }
		genre = { name: obj.name };
	} 
	else if (obj && obj.type){ 
		if (genre[obj.type + 's'] === undefined){ genre[obj.type + 's'] = []; }
		genre[obj.type + 's'].push(obj.name);
	}
	else if (buf.toString() === ''){ this.queue(JSON.stringify(genre) + '\n'); }

});

module.exports = function () {
	return combine(
		split(),
		tr,
		gzip
	);
};
