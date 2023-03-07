const pidusage = require('pidusage');
const fs = require('fs');
const path = require('path');

const main = async () => {
  console.log('[process.pid]', process.pid);

  const beforeStats = await pidusage(process.pid)
  console.log('before read file: ', beforeStats.cpu, '%');

  const APP_PATH = path.join(__dirname);
  const bigfileInMemory = fs.readFileSync(`${APP_PATH}/static/bigFile.json`);
  const afterReadFileStats = await pidusage(process.pid)
  console.log('after read file: ', afterReadFileStats.cpu, '%');

  const parsedBigFile = JSON.parse(bigfileInMemory);
  const afterParseJsonStats = await pidusage(process.pid)
  console.log('after parse json data: ', afterParseJsonStats.cpu, '%');
  console.log('[Object.keys(parsedBigFile)]', Object.keys(parsedBigFile));
};

main();
