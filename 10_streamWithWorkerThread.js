// const path = require('path');
// const ThreadStream = require('thread-stream');
// globalThis = require('globalthis')();
//
// const testStream = new ThreadStream({
//   filename: path.join(__dirname, 'TestWorker.js'),
//   // workerData: { dest: path.join(__dirname, '/static/writableStreamOutput.txt') },
//   workerData: { dest: path.join(__dirname, '/static/writeTest.txt') },
// });
//
// let chunkCounter = 1;
// testStream.on('data', (chunk) => {
//   console.log('[chunkCounter]', chunkCounter);
//   console.log('[chunk]', chunk);
//   chunkCounter ++;
// });
//
// testStream.on('end', () => {
//   console.log('[last chunk counter]', chunkCounter);
//   console.log('[end data]');
// });
//
// console.log('[testStream]', testStream);
// testStream.write(1234);
// testStream.on('finish', (...args) => {
//   console.log('[is finished]');
// });
// testStream.end();
// testStream.flushSync();

// testStream.flush(() => {
//   testStream.write('hello');
//   testStream.write(' ');
//   testStream.write('world');
//
//   // Synchronous flushing
//   testStream.flushSync();
//   testStream.end();
// })
const { Writable } = require('stream');
const { Worker } = require('worker_threads');
const { cpus } = require('os');
const { createReadStream } = require('fs');
const path = require('path');
const _ = require('lodash');

console.log('[1111]', 1111);
// const numOfCpus = cpus().length;
const numOfCpus = 1;
class CustomWritable extends Writable {
  constructor() {
    super();
    this._threads = new Set();
    this._chunkCounter = 1;
  }

  _write(chunk, encoding, callback) {
    console.log('[total per stream chunk.length]', chunk.length);
    let min = 1;
    let max = chunk.length;
    const range = Math.ceil((max - min) / numOfCpus); // 10_000_000 max를 8개의 쓰레드에 분배를 해서 처리하기 위해서

    let start = min;
    for (let core = 0; core < numOfCpus; core++) {
      const wStart = start;
      const slicedChunk = chunk.slice(wStart, wStart * range);
      const worker = new Worker(path.join(__dirname, 'TestWorker.js'), {
        workerData: { chunk: slicedChunk },
      });
      start += range;

      worker.on('error', (err) => {
        throw err;
      });

      worker.on('exit', () => {
        this._threads.delete(worker);
        if (this._threads.size === 0) {
          console.log('[all worker done]');
          console.log('[process.nextTick start]');
          process.nextTick(callback);
          console.log('[process.nextTick end]');
        }
      });

      worker.on('message', (msg) => {
        this._chunkCounter += 1;
      });

      worker.postMessage('ping');

      this._threads.add(worker);
    }
  }
}

const APP_PATH = path.join(__dirname);
const fileReadStream = createReadStream(`${APP_PATH}/static/readableSteamInput.txt`, {
  highWaterMark: 1 * 1024, // chunk size 1KB
});

const writableStreamByClass = new CustomWritable();
writableStreamByClass.on('finish', () => {
  console.log('[done]');
});
fileReadStream.pipe(writableStreamByClass);
