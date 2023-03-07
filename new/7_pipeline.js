const { Readable, Writable, pipeline } = require('stream');

class ReadableClass extends Readable {
  constructor(options) {
    super(options);
    this._data = ['Hello', 'my name is', 'Eloy'];
    this._position = 0;
  }

  _read(size) {
    const data = this._data[this._position];
    if (!data) {
      this.push(null);
      return;
    }

    this.push(`${data}`);
    this._position += 1;
  }
}

class CustomWritable extends Writable {
  _write(chunk, encoding, callback) {
    console.log(chunk.toString());
    callback();
  }
}

const readableClass = new ReadableClass();
const customWritable = new CustomWritable();
pipeline(
  readableClass,
  customWritable,
  (err) => {
    if (err) {
      // handel error
      return;
    }

    console.log('end pipeline');
  },
);
