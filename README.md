# vinyl-properties

[![NPM version](https://img.shields.io/npm/v/vinyl-properties.svg)](https://www.npmjs.com/package/vinyl-properties)
[![Build Status](https://travis-ci.org/shinnn/vinyl-properties.svg?branch=master)](https://travis-ci.org/shinnn/vinyl-properties)
[![Coverage Status](https://img.shields.io/coveralls/shinnn/vinyl-properties.svg)](https://coveralls.io/r/shinnn/vinyl-properties)
[![devDependency Status](https://david-dm.org/shinnn/vinyl-properties/dev-status.svg)](https://david-dm.org/shinnn/vinyl-properties#info=devDependencies)

Collect [vinyl file](https://github.com/gulpjs/vinyl) properties in a [stream](https://nodejs.org/api/stream.html)

```javascript
const gulp = require('gulp');
const vinylProperties = require('vinyl-properties');

gulp.task('default', () => {
  const props = vinylProperties('relative');

  return gulp.src(['foo.js', 'bar.js'])
    .pipe(props)
    .pipe(gulp.dest('dist'))
    .on('finish', () => {
      props.relative; //=> ['foo.js', 'bar.js']
    });
});
```

## Installation

[Use npm.](https://docs.npmjs.com/cli/install)

```
npm install vinyl-properties
```

## API

```javascript
const vinylProperties = require('vinyl-properties');
```

### vinylProperties(*properties*)

*properties*: `String` or `Array` of `String` (the names of properties you want to collect)  
Return: `Object` ([stream.Transform](https://nodejs.org/api/stream.html#stream_class_stream_transform))

Every time the stream reads a [vinyl file object](https://github.com/gulpjs/vinyl#file), it pushes the value of vinyl properties you specified to the stream's properties in the same names, and pushes all of them to the `files` property.

```javascript
gulp.task('default', () => {
  const props = vinylProperties(['path', 'contents']);

  return gulp.src('*.txt')
    .pipe(props)
    .pipe(gulp.dest('dist'))
    .on('finish', () => {
      props.path; //=> ['file0.txt', 'file1.txt', ...]
      props.contents; //=> [<Buffer ... >, <Buffer ... >, ...]
      props.files; /*=>
                     [
                       {
                         path: 'file0.txt',
                         contents: <Buffer ... >
                       },
                       {
                         path: 'file1.txt',
                         contents: <Buffer ... >
                       },
                       ...
                     ]
                   */
    });
});
```

## License

Copyright (c) 2015 [Shinnosuke Watanabe](https://github.com/shinnn)

Licensed under [the MIT License](./LICENSE).
