// const fs = require('fs'); // fs라는 외부 모듈을 불러오기 파이썬 import
const path = require('path');

console.log(__dirname); // 이 프로그램이 있는 위치(directory)
console.log(__filename); // 이 프로그램의 파일 이름(경로)

// 상대 경로(relative path)
const relPath = 'tmp/textFile.txt';

// 절대 경로(absolute path)
const absPath = path.join(__dirname, 'tmp', 'textFile.txt'); 
// 폴더든 파일 이름이든 다 문자열이니 알아서 걍 이어주는 것 같다.
console.log(absPath);

