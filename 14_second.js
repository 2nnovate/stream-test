const { Readable, Writable, pipeline } = require('stream');
const { createReadStream } = require('fs');
const path = require('path');

const APP_PATH = path.join(__dirname);

const fileReadStream = createReadStream(`${APP_PATH}/static/readableSteamInput.txt`, {
  highWaterMark: 1 * 1024, // chunk size 1KB
});
const inStream = new Readable({
  objectMode: true,
  read() {},
});

fileReadStream.on('data', (chunk) => {
  inStream.push({ content: chunk.toString() });
});

fileReadStream.on('end', () => {
  inStream.push(null);
});
fileReadStream.pipe(process.stdout);

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
