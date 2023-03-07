const pidusage = require('pidusage');
const StreamObject = require( 'stream-json/streamers/StreamObject');
const { Writable } = require('stream');

const process = require('process');
const fs = require('fs');
const path = require('path');

const main = async () => {
  console.log('[process.pid]', process.pid);
  const beforeStats = await pidusage(process.pid);
  console.log('before read file: ', beforeStats.cpu, '%');

  const jsonStream = StreamObject.withParser();
  const processingStream = new Writable({
    async write(chunk, encoding, callback) {
      // console.log('[chunk]', chunk);
      const afterStreamingStats = await pidusage(process.pid)
      console.log('after stream file: ', afterStreamingStats.cpu, '%');
      callback();
    },
    objectMode: true,
  });

  const APP_PATH = path.join(__dirname);
  fs.createReadStream(`${APP_PATH}/static/bigFile.json`)
    .pipe(jsonStream.input)
    .pipe(processingStream);

  const afterStreamingStats = await pidusage(process.pid)
  console.log('after stream file: ', afterStreamingStats.cpu, '%');
};

main();
