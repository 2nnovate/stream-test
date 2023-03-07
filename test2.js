/**
 * Writeable을 직접 구현
 *  Writeable은 데이터를 기록할 수 있는 종착역을 추상화한 것
 *  Readable은 Writable에 연결되어야 데이터가 흐른다 (데이터가 흐를 종착역/대상이 지정되어야 흐르기 시작)
 * */
const { Writable } = require('stream');

/**
 * 1. Writable 객체를 확장
 * 확장 시 _write 메소드를 override 해야 함
 * */
class CustomWritableStreamClass extends Writable {
  _write(chunk, encoding, callback) {
    console.log('CustomWritableStreamClass write', chunk.toString());
    callback();
  }
}
const customWritableStream = new CustomWritableStreamClass();
// process.stdin.pipe(customWritableStream);

/**
 * 2. Writable 객체를 생성자로 생성
 * 생성하면서 options에 write 함수를 전달
 * */
const customWritableInstance = new Writable({
  write(chunk, encoding, callback) {
    console.log('customWritableInstance write', chunk.toString());
    callback()
  },
})
process.stdin.pipe(customWritableInstance);

process.stdin.push('stream1 pushed');
process.stdin.push('stream2 pushed');
process.stdin.push('stream3 pushed');
process.stdin.push(null);

