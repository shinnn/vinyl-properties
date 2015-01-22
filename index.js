/*!
 * vinyl-properties | MIT (c) Shinnosuke Watanabe
 * https://github.com/shinnn/vinyl-properties
*/
'use strict';

var through = require('through2');

module.exports = function vinylProperties(props) {
  if (!Array.isArray(props)) {
    if (typeof props !== 'string') {
      throw new TypeError(
        props +
        ' is neither string nor array. ' +
        'The first argument to vinyl-properties must be a string or an array.'
      );
    }

    props = [props];
  }

  var propsCount = props.length;

  var stream = through.obj(function(file, enc, cb) {
    var len = propsCount;
    var fileProps = {};

    while (len--) {
      var propName = [props[len]];
      stream[propName].push(file[propName]);
      fileProps[propName] = file[propName];
    }

    stream.files.push(fileProps);
    cb(null, file);
  });

  stream.files = [];

  var propsLen = propsCount;

  while (propsLen--) {
    if (typeof props[propsLen] !== 'string') {
      throw new TypeError(
        props[propsLen] +
        ' is not a string. ' +
        'Every array item in the first argument to vinyl-properties must be a string.'
      );
    }
    stream[props[propsLen]] = [];
  }

  return stream;
};
