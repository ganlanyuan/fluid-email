var gulp = require('gulp'),
	fs = require('fs'),
	path = require('path'),
	es = require('event-stream'),
	assert = require('assert'),
	colorize = require('../index.js');

describe('gulp-colorize-svgs', function() {
	it('create blue and brown variant of icon and gray variant of icon2', function(done) {
		gulp.src(__dirname + '/fixtures/{icon,icon2}.svg')
			.pipe(colorize({
				colors: {
					default: {
						blue: '6b9faf',
						brown: 'b7784b'
					},
					icon2: {
						gray: '999999'
					}
				},
				replaceColor: function(content, hex) {
					return content.replace(/fill="#(.*?)"/g, 'fill="#' + hex + '"');
				},
				replacePath: function(path, colorKey) {
					return path.replace(/\.svg/, '--' + colorKey + '.svg');
				}
			}))
			.pipe(gulp.dest(__dirname + '/results/'))
			.pipe(es.wait(function() {
				assert.equal(
					fs.readFileSync(__dirname + '/results/icon--blue.svg', 'utf8'),
					fs.readFileSync(__dirname + '/expected/icon--blue.svg', 'utf8')
				);
				assert.equal(
					fs.readFileSync(__dirname + '/results/icon--brown.svg', 'utf8'),
					fs.readFileSync(__dirname + '/expected/icon--brown.svg', 'utf8')
				);
				assert.equal(
					fs.readFileSync(__dirname + '/results/icon2--gray.svg', 'utf8'),
					fs.readFileSync(__dirname + '/expected/icon2--gray.svg', 'utf8')
				);

				fs.unlinkSync(__dirname + '/results/icon--blue.svg');
				fs.unlinkSync(__dirname + '/results/icon--brown.svg');
				fs.unlinkSync(__dirname + '/results/icon2--gray.svg');
				fs.rmdirSync(__dirname + '/results/');

				done();
			}));
	});

	it('create blue variant of icon without fill attribute', function(done) {
		gulp.src(__dirname + '/fixtures/icon-nofill.svg')
			.pipe(colorize({
				colors: {
					default: {
						blue: '6b9faf'
					}
				},
				replaceColor: function(content, hex) {
					return content.replace(/<path/g, '<path fill="#' + hex + '"');
				}
			}))
			.pipe(gulp.dest(__dirname + '/results/'))
			.pipe(es.wait(function() {
				assert.equal(
					fs.readFileSync(__dirname + '/results/icon-nofill--blue.svg', 'utf8'),
					fs.readFileSync(__dirname + '/expected/icon-nofill--blue.svg', 'utf8')
				);

				fs.unlinkSync(__dirname + '/results/icon-nofill--blue.svg');
				fs.rmdirSync(__dirname + '/results/');

				done();
			}));
	});

	it('pass through original files', function(done) {
		gulp.src(__dirname + '/fixtures/icon.svg')
			.pipe(colorize())
			.pipe(gulp.dest(__dirname + '/results/'))
			.pipe(es.wait(function() {
				assert.equal(
					fs.readFileSync(__dirname + '/results/icon.svg', 'utf8'),
					fs.readFileSync(__dirname + '/expected/icon.svg', 'utf8')
				);

				fs.unlinkSync(__dirname + '/results/icon.svg');
				fs.rmdirSync(__dirname + '/results/');

				done();
			}));
	});
});
