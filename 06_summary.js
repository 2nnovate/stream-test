/**
 * Writable은 write() end()
 * Readable은 event 핸들러를 등록해서 데이터를 처리
 *
 * Readable이 Writable과 piping 되어 있을 때
 *  - Writable이 Readable로 부터 값을 읽어와야 한다고 인식
 *  - Writable이 Readable의 read()를 호출(read 메소드 내부에서는 _read()를 사용)
 *  - Readable._read() 내부에서 호출된 push()로 전달된 데이터가 임시 버퍼에 쌓임
 *  - Writable이 임시 버퍼에 쌓인 데이터를 가져간다
 * */
const { Readable, Writable } = require('stream');

class CustomReadable extends Readable {
  #i = 1;
  // 데이터를 어떻게 읽을 것인가 (데이터를 내부에서 가지고 있어야 함)
  _read(size) {
    console.log('----- CustomReadable._read() -----');
    console.log('[size]', size);
    if (this.#i === 10) {
      this.push(null);
      return;
    }

    console.log('pushed data: ', this.#i);
    this.push(this.#i.toString());
    this.#i += 1;
  }
}

class CustomWritable extends Writable {
  // 불러온 데이터를 어떻게 쓸 것인가 (로그에 찍는 용도로만 사용)
  _write(chunk, encoding, callback) {
    console.log('----- CustomWritable._write() -----');
    console.log('CustomWritableStreamClass write', chunk.toString());
    callback();
  }
}

const customReadable = new CustomReadable();
// on 으로 이벤트 등록해서 쓰는거는 데이터를 어떻게 처리할 지 정의가 안 돼 있을때
// Readabled을 직접정의 했다면 필요없음(내부에 데이터를 가지고 있고 어떻게 처리할지 알고있음)
customReadable.on('data', (chunk) => {
  console.log('----- data event happened -----');
  console.log('[chunk]', chunk.toString());
});
const customWritable = new CustomWritable();
customReadable.pipe(customWritable);
