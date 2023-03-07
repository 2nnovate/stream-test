const pidusage = require('pidusage');
const fs = require('fs');
const path = require('path');
const { Writable } = require('stream');

class WritableStream extends Writable {
  _write(chunk, encoding, callback) {
    // console.log(chunk.toString());
    callback();
  }
}

const main = async () => {
  console.log('[process.pid]', process.pid);

  const beforeStats = await pidusage(process.pid);
  console.log('before read file: ', beforeStats.cpu, '%');

  const APP_PATH = path.join(__dirname);
  const jsonStream = fs.createReadStream(`${APP_PATH}/static/bigFile.json`);
  jsonStream.on('data', (data) => {
    //
  });
  jsonStream.on('end', () => console.log('end!'));

  const writableStream = new WritableStream();
  jsonStream.pipe(writableStream);

  const afterStreamingStats = await pidusage(process.pid)
  console.log('after stream file: ', afterStreamingStats.cpu, '%');
};

main();
