/**
 * Readable Stream
 *  - events
 *    - data: 데이터를 청크 단위로 전송할 때 발생되는 이벤트
 *    - end: 소비할 데이터가 없을 때 발생하는 이벤트
 *
 *  fs.createReadStream
 *    파일로부터 읽기 가능한 스트림 객체를 만듦
 *    options 객체를 통해 chunk size를 결정할 수 있음 (byte 단위, 기본 64KB)
 * */
const { createReadStream } = require('fs');
const path = require('path');

const APP_PATH = path.join(__dirname);
const fileReadStream = createReadStream(`${APP_PATH}/static/readableSteamInput.txt`, {
  highWaterMark: 1 * 1024, // chunk size 1KB
});

var chunkCounter = 1;
fileReadStream.on('data', (chunk) => {
  console.log(`--------- chunk(${chunkCounter}) ----------`);
  console.log(`chunk: ${chunk}`);
  chunkCounter += 1;
});
