/**
 * 스트림 사용 vs 미사용 메모리 사용량 비교
 * 스트림 사용 버전
 * */
const { createReadStream } = require('fs');
const path = require('path');

const APP_PATH = path.join(__dirname);
const bigfileInStream = createReadStream(`${APP_PATH}/static/bigFile.json`);

let jsonText = '';
bigfileInStream.on('data', (chunk) => {
  jsonText += chunk.toString();
});
bigfileInStream.on('end', () => {
  console.log('------- on end -------');
  const parsedData = JSON.parse(jsonText);
  console.log('[Object.keys(parsedData)]', Object.keys(parsedData));

  const used = process.memoryUsage().heapUsed / 1024 / 1024;
  console.log(`The script uses approximately ${used} MB`);
});

const used = process.memoryUsage().heapUsed / 1024 / 1024;
console.log(`The script uses approximately ${used} MB`);
