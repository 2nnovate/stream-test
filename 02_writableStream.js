/**
 * Writable Stream
 *  - functions
 *    - write(): 데이터 쓰기
 *    - end(): 쓰기 종료 (종료 이후 다시 쓸 수 없음)
 * */

/**
 * Write Stream examples
 *
 *  1. Nodejs 내장 스트림
 *    process.stdout: 표준 출력 스트림 객체 (Writalbe)
 *    console.log는 process.stdout를 사용하여 구현한 함수
 * */
process.stdout.write('First, Hello, world!');
process.stdout.write('Second, Hello, world!!');

/**
 * console.log는 아래와 같이 정의돼 있음
 *
 * console.log = function (d) {
 *   process.stdout.write(d + '\n');
 * };
 * */
console.log('First, Hello, world!');
console.log('Second, Hello, world!!');

/**
 *  2. fs.createWritableStream
 *    파일에 데이터를 순차척으로 흘려 보내면서 기록
 * */
const { createWriteStream } = require('fs');
const path = require('path');

const APP_PATH = path.join(__dirname);
const fileWriteStream = createWriteStream(`${APP_PATH}/static/writableStreamOutput.txt`);
fileWriteStream.write('This is a file.\n');
fileWriteStream.write('Created by a Stream.');
fileWriteStream.end();

// 종료된 스트림에 다시 쓰려고 하면 에러 발생
// fileWriteStream.write('Can I write again?');

