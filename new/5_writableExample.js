const { createWriteStream } = require('fs');
const path = require('path');

const APP_PATH = path.join(__dirname, '..');
const fileWriteStream = createWriteStream(`${APP_PATH}/static/textOutput.txt`);

fileWriteStream.write('This is a file.\n');
fileWriteStream.write('Created by a Stream.');
fileWriteStream.end();


