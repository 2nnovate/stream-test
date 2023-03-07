const { Readable, Writable, pipeline } = require('stream');
const path = require('path');

const inStream = new Readable({
  objectMode: true,
});
inStream.push({ content: 1234 });
inStream.push({ content: 5678 });
inStream.push({ content: 9 });
inStream.push({ content: 10 });
inStream.push(null);

class CustomWritable extends Writable {
  constructor(options = {}) {
    super(options);
  }

  _write(chunk, encoding, callback) {
    console.log('----- CustomWritable._write() -----');
    console.log(chunk.content);
    callback();
  }
}
const customWritable = new CustomWritable({ objectMode: true });
pipeline(
  inStream,
  customWritable,
  (err) => {
    if (err) {
      console.log('[got error in pipeline!]', err);
      return;
    }

    console.log('end pipeline');
  }
);
