'use strict';

var vinylProps = require('./');
var File = require('vinyl');
var test = require('tape');

test('vinyl-properties', function(t) {
  t.plan(3);

  t.equal(vinylProps.name, 'vinylProperties', 'should have a function name.');

  t.throws(
    vinylProps.bind(null, 123),
    /TypeError.*must be a string or an array\./,
    'should throw a type error when the argument is neither string nor array.'
  );

  t.throws(
    vinylProps.bind(null, ['a', ['b'], 123]),
    /TypeError.*must be a string\./,
    'should throw a type error when the array contains non-string items.'
  );
});

test('vinyl-properties with array of properties', function(t) {
  t.plan(3);

  var stream = vinylProps(['path', 'contents'])
  .on('finish', function() {
    t.deepEqual(
      this.contents,
      [null, new Buffer('a')],
      'should get file properties.'
    );
    t.deepEqual(
      this.path,
      ['foo', undefined],
      'should push `null` if the file does not have the target property.'
    );
    t.deepEqual(
      this.files,
      [
        {
          path: 'foo',
          contents: null
        },
        {
          path: undefined,
          contents: new Buffer('a')
        }
      ],
      'should set `files` property.'
    );
  });

  stream.write(new File({path: 'foo'}));
  stream.write(new File({contents: new Buffer('a')}));

  stream.end();
});

test('vinyl-properties with a string of properties', function(t) {
  t.plan(1);

  vinylProps('path')
  .on('finish', function() {
    t.deepEqual(this.path, ['bar'], 'should get file properties.');
  })
  .end(new File({path: 'bar'}));
});
