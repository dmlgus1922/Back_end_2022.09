const readline = require('readline');
const { buffer } = require('stream/consumers');
const r1 = readline.createInterface({
    input: process.stdin,   // standard input, terminal(keyboard)
    output: process.stdout  // standard output, terminal(monitor)
});

r1.setPrompt('숫자를 입력하세요.> ');
r1.prompt();


// I/O (input, 파일 읽기/쓰기, 데이터 통신 등) 작업은 callback 함수에서 처리
r1.on('line', buffer => { // line event -> 사용자가 enter를 친 것
    let num = parseInt(buffer);
    let evenOdd = (num%2==0) ? 'even' : 'odd';
    console.log(`입력한 숫자는 ${num}이고 ${evenOdd}입니다.`);

    r1.close();  // 끝날 때 반드시 처리해야 함
});


// let buf = r1.read()
// let num = parseFloat(buffer)
