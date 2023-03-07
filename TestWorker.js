const { workerData, parentPort } = require('worker_threads');
const { chunk } = workerData;

parentPort.once('message', (msg) => {
  console.log('[msg from master]', msg);
  console.log('[in worker chunk.length]', chunk.length);
  parentPort.postMessage(chunk.toString());
  parentPort.close();
});


