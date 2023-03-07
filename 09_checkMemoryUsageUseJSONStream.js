/**
 * 스트림 사용 vs 미사용 메모리 사용량 비교
 * JSONStream 사용 버전
 * */
const { createReadStream } = require('fs');
const path = require('path');
const JSONStream = require('JSONStream');

const APP_PATH = path.join(__dirname);
const bigfileInStream = createReadStream(`${APP_PATH}/static/bigFile.json`);

/**
 * - path에 ".."를 사용하면 배열의 각 아이템별로 스트림을 흘릴 수 있다.
 * - header 이벤트를 통해 path에 포함되지 않은 값들을 받아올 수 있음. (JSONStream 고유 이벤트)
 * */
bigfileInStream.pipe(JSONStream.parse('bulkWriteInfo..'))
  .on('data', (data) => {
    const perData = process.memoryUsage().heapUsed / 1024 / 1024;
    console.log(`The script (perData) uses approximately ${perData} MB`);
  })
  .on('header', (data) => {
    console.log('header:', data)
  })
  .on('end', () => {
    const onEndUsed = process.memoryUsage().heapUsed / 1024 / 1024;
    console.log(`The script (on end) uses approximately ${onEndUsed} MB`);
  });

const used = process.memoryUsage().heapUsed / 1024 / 1024;
console.log(`The script uses approximately ${used} MB`);
