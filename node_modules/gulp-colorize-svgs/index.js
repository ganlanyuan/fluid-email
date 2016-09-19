'use strict';

var util = require('gulp-util'),
	Stream = require('stream'),
	path = require('path'),
	_ = require('lodash');

module.exports = function(options) {
	var stream = Stream.Transform({
			objectMode: true
		});

	options = _.merge({
		colors: {},
		replaceColor: function(content, hex) {
			return content.replace(/fill="#(.*?)"/g, 'fill="#' + hex + '"');
		},
		replacePath: function(path, colorKey) {
			return path.replace(/\.svg/, '--' + colorKey + '.svg');
		}
	}, options || {});

	stream._transform = function(file, unused, cb) {
		var contents = file.contents.toString(),
			fileName = path.basename(file.path).replace(path.extname(file.path), ''),
			colors = options.colors[fileName] || options.colors['default'],
			coloredContents,
			coloredFile;

		if (file.isNull() || _.size(colors) === 0) {
			this.push(file);

			return cb();
		}

		_.each(colors, _.bind(function(hex, key) {
			coloredContents = options.replaceColor(contents, hex);

			coloredFile = new util.File({
				base: file.base,
				path: options.replacePath(file.path, key),
				contents: new Buffer(coloredContents)
			});

			this.push(coloredFile);
		}, this));

		cb();
	};

	stream._flush = function(cb) {
		cb();
	};

	return stream;
};
