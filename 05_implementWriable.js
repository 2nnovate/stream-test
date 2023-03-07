/**
 * Implement Writeable
 *
 *  1. Writable 클래스 확장
 *    - _write() 메소드 overriding
 *    - parameters
 *      - chunk: 데이터
 *      - encoding: 인코딩 (buffer ...)
 *      - callback: 콜백함수
 *        - 인자 없이 호출하면 쓰기 성공
 *        - Error 객체와 호출하면 쓰기 실패
 * */
const { Writable } = require('stream');
const { createReadStream } = require('fs');
const path = require('path');

class CustomWritable extends Writable {
  _write(chunk, encoding, callback) {
    console.log('----- CustomWritable._write() -----');
    console.log(chunk.toString());
    callback();
  }
}

const APP_PATH = path.join(__dirname);
const fileReadStream1 = createReadStream(`${APP_PATH}/static/readableSteamInput.txt`, {
  highWaterMark: 1 * 1024, // chunk size 1KB
});

const writableStreamByClass = new CustomWritable();
fileReadStream1.pipe(writableStreamByClass);

/**
 *  2. Writable 인스턴스 생성
 *    - options 에 write 함수를 전달
 *    - parameters
 *      - chunk: 데이터
 *      - encoding: 인코딩 (buffer ...)
 *      - callback: 콜백함수
 *        - 인자 없이 호출하면 쓰기 성공
 *        - Error 객체와 호출하면 쓰기 실패
 * */
const writableStreamByInstance = new Writable({
  write: (chunk, encoding, callback) => {
    console.log('----- writable instance.write -----');
    console.log(chunk.toString());
    callback();
  }
});

const fileReadStream2 = createReadStream(`${APP_PATH}/static/readableSteamInput.txt`, {
  highWaterMark: 5 * 1024, // chunk size 5KB
});
fileReadStream2.pipe(writableStreamByInstance);
