var fs = require('fs');
var through = require('through');
var trumpet = require('trumpet');
var tr = trumpet();

var loud = tr.select('.loud').createStream();
var upper = through(function(buf){ this.queue(buf.toString().toUpperCase()); });

loud.pipe(upper).pipe(loud);
process.stdin.pipe(tr).pipe(process.stdout);
