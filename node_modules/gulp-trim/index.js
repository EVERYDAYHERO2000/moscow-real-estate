
var through = require('through2');

module.exports = function() {
	var stream = through.obj(function(file, enc, cb) {
		file.contents = new Buffer(file.contents.toString('utf8').trim());

		this.push(file);
		return cb();
	});

	return stream;
};
