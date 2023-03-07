/**
 * Implement Readable
 *
 *  - Readable 을 확장한 Class 정의
 *    - _read() 메소드를 overriding
 *    - _read() 메소드 안에서 this.push() 를 사용하여 데이터를 전달할 수 있음
 *      - this.push()에 값은 null로 전달하면 스트림이 멈춤 (break 와 같은 역할)
 *      - 스트림은 제한없이 데이터가 무한정으로 흐를 수도 있음
 * */
const { Readable } = require('stream');

class Counter extends Readable {
  #i = 1;

  _read(size) {
    if (this.#i === 10) {
      this.push(null);
      return;
    }

    this.push(this.#i.toString());
    this.#i += 1;
  }
}

/**
 * Readable은 pipe() 메소드를 가지고 있음
 *  pipe()로 기록을 할 수 있는 Writable 과 연결하면 둘 사이에 파이프가 생겨서
 *  '막혀있던 데이터가 흘러나간다' 라고 이해하면 좋음
 *  (Writable이 Readable로 부터 값을 읽어와야 한다고 인식하고 데이터를 읽기 시작)
 * */
const counter = new Counter();
counter.pipe(process.stdout);
