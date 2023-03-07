const { Readable, Writable, pipeline } = require('stream');
const { createReadStream } = require('fs');
const path = require('path');

const APP_PATH = path.join(__dirname);

class CustomReadable extends Readable {
  constructor(options) {
    super(options);
    this.fileReadStream = createReadStream(`${APP_PATH}/static/readableSteamInput.txt`, {
      highWaterMark: 1 * 1024, // chunk size 1KB
    });
    this.fileReadStream.on('end', () => {
      this.push(null);
    });
  }

  _read(size) {
    const chunk = this.fileReadStream.read(size);
    if (chunk !== null) {
      this.push({ content: chunk.toString() });
    }
  }
}

class CustomWritable extends Writable {
  _write(chunk, encoding, callback) {
    console.log('----- CustomWritable._write() -----');
    console.log(chunk.content);
    callback();
  }
}

const customReadable = new CustomReadable({ objectMode: true });
const customWritable = new CustomWritable({ objectMode: true });

pipeline(
  customReadable,
  customWritable,
  (err) => {
    if (err) {
      console.log('[got error in pipeline!]', err);
      return;
    }

    console.log('end pipeline');
  }
);

customReadable.pipe(process.stdout); // add this line
