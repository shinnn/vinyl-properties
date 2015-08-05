/*!
 * vinyl-properties | MIT (c) Shinnosuke Watanabe
 * https://github.com/shinnn/vinyl-properties
*/
'use strict';

const Transform = require('stream').Transform;

module.exports = function vinylProperties(props) {
  if (!Array.isArray(props)) {
    if (typeof props !== 'string') {
      throw new TypeError(
        String(props) +
        ' is neither string nor array. ' +
        'The first argument to vinyl-properties must be a string or an array.'
      );
    }

    props = [props];
  }

  const propsCount = props.length;

  const stream = new Transform({
    objectMode: true,
    transform: function collectVinylPropertiesTransform(file, enc, cb) {
      let len = propsCount;
      const fileProps = {};

      while (len--) {
        const propName = [props[len]];
        stream[propName].push(file[propName]);
        fileProps[propName] = file[propName];
      }

      stream.files.push(fileProps);
      cb(null, file);
    }
  });

  stream.files = [];

  let propsLen = propsCount;

  while (propsLen--) {
    if (typeof props[propsLen] !== 'string') {
      throw new TypeError(
        String(props[propsLen]) +
        ' is not a string. ' +
        'Every array item in the first argument to vinyl-properties must be a string.'
      );
    }
    stream[props[propsLen]] = [];
  }

  return stream;
};
