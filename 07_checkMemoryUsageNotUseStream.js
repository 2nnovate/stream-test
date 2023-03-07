/**
 * 스트림 사용 vs 미사용 메모리 사용량 비교
 * 미사용 버전
 * */
const { readFileSync } = require('fs');
const path = require('path');

const APP_PATH = path.join(__dirname);
const bigfileInMemory = readFileSync(`${APP_PATH}/static/bigFile.json`);

const parsedData = JSON.parse(bigfileInMemory);
console.log('[Object.keys(parsedData)]', Object.keys(parsedData));

const used = process.memoryUsage().heapUsed / 1024 / 1024;
console.log(`The script uses approximately ${used} MB`);
