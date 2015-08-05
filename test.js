'use strong';

const vinylProps = require('./');
const File = require('vinyl');
const test = require('tape');

test('vinyl-properties', t => {
  t.plan(3);

  t.equal(vinylProps.name, 'vinylProperties', 'should have a function name.');

  t.throws(
    () => vinylProps(123),
    /TypeError.*must be a string or an array\./,
    'should throw a type error when the argument is neither string nor array.'
  );

  t.throws(
    () => vinylProps(['a', ['b'], 123]),
    /TypeError.*must be a string\./,
    'should throw a type error when the array contains non-string items.'
  );
});

test('vinyl-properties with an array of properties', t => {
  t.plan(3);

  const stream = vinylProps(['path', 'contents'])
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

test('vinyl-properties with a property string', t => {
  t.plan(1);

  vinylProps('path')
  .on('finish', function() {
    t.deepEqual(this.path, ['bar'], 'should get file properties.');
  })
  .end(new File({path: 'bar'}));
});
