# gulp-colorize-svgs

Replaces the ```fill``` attribute value of an SVG with one or several predefined colors and adds the new files to the stream. The original file is removed from the stream.

If no colors were specified, the original files are passed through.

**Word of caution**: If an SVG does not have a ```fill``` attribute (which seems to be the case for black icons exported from Illustrator), the default ```option.replaceColor``` function won't find anything to replace and should be adapted accordingly (e.g. ```return content.replace(/<path/g, '<path fill="#' + hex + '"');```).

For complex SVGs you should probably add [cheerio](http://npmjs.com/package/cheerio) to the mix.


## Usage

First, install `gulp-colorize-svgs` as a development dependency:

```shell
npm install --save-dev gulp-colorize-svgs@git+https://git@github.com/unic/gulp-colorize-svgs.git
```

Then, add it to your `gulpfile.js`:

```javascript
var colorize = require('gulp-colorize-svgs');

gulp.task('colorize', function(){
  gulp.src(['app/icons/*.svg'])
    .pipe(colorize({
      colors: {
        // All files
        default: {
          blue: '0000ff',
          red: 'ff0000'
        },
        // Specific files
        icon2: {
          green: '00ff00'
        }
      },
      replaceColor: function(content, hex) {
        return content.replace(/fill="#(.*?)"/g, 'fill="#' + hex + '"');
      },
      replacePath: function(path, colorKey) {
        return path.replace(/\.svg/, '--' + colorKey + '.svg');
      }
    }))
    .pipe(gulp.dest('dist/icons/'));
});
```


## Options

### options.colors
Type: `Object`

Colors to use. Key corresponds to file name, "default" property is used as a fallback for unspecified files.

### options.replaceColor
Type: `Function`

SVG transformation function. Replacing every occurrence of a ```fill``` attribute by default.

### options.replacePath
Type: `Function`

Transformation function for the new file's name. Adding ```--[colorKey]``` by default.
