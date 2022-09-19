// 비동기적(Asynchronous)으로 파일 읽기 - 권장 사항

const fs = require('fs');
fs.readFile('tmp/textFisle.txt', 'utf-8', (err, data) => {
    /* 나중에 production(실제 서비스해주는 상황)에서는 에러 처리를 반드시 할 것
    if (err)
        console.log(err);
    else
        console.log('파일에서 읽은 데이터: ', data); */
    // 파일의 에러는 잘 발생하지 않으므로 error 처리 부분을 생략하는 경우가 많다.
    console.log('파일에서 읽은 데이터: ', data);
});

// 보통 이렇게 파일을 읽어와서 처리하는 코드는 대부분 콜백 함수에 있다.