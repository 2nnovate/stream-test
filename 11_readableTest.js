const { Readable, Writable, pipeline } = require('stream');
const { createReadStream } = require('fs');
const path = require('path');

const APP_PATH = path.join(__dirname);

const fileReadStream = createReadStream(`${APP_PATH}/static/readableSteamInput.txt`, {
  highWaterMark: 1 * 1024, // chunk size 1KB
});
const inStream = new Readable({
  objectMode: true,
});

// const inStream = new Readable({
//   objectMode: true,
// });
fileReadStream.on('data', (chunk) => {
  console.log('[on data]', chunk.length);
  inStream.push({ content: chunk.toString() });
});

fileReadStream.on('end', () => {
  console.log('[end]');
  inStream.push(null);
});
fileReadStream.pipe(process.stdout);
// inStream.push({ content: 1234 });
// inStream.push({ content: 5678 });
// inStream.push({ content: 9 });
// inStream.push({ content: 10 });
// inStream.push(null);

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
// inStream.pipe(customWritable);
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

// Works well in single piping
// inStream.pipe(customWritable);
