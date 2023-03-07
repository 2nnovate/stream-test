const { createReadStream } = require('fs');
const path = require('path');

const APP_PATH = path.join(__dirname);

const dummyText = createReadStream(`${APP_PATH}/static/dummyText.txt`, {
  highWaterMark: 1 * 1024, // chunk size 1KB
});

dummyText.on('data', (chunk) => {
  console.log(chunk.toString());
  // const used = Math.ceil(process.memoryUsage().heapUsed / 1024 / 1024);
  // console.log(`약 ${used}MB 메모리를 사용했습니다.`);
});

// dummyText.on('end', () => {
//   console.log('-------- end --------');
//   const used = Math.ceil(process.memoryUsage().heapUsed / 1024 / 1024);
//   console.log(`약 ${used}MB 메모리를 사용했습니다.`);
//   console.log(' ');
// });


// dummyText.pipe(process.stdout);
