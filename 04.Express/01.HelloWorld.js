const express=require('express');
const app = express();

// use - 무언가를 사용하겠다. Middleware 적용
// http method = get, post, put, delet, all
// listen - 대기
app.get('/', (req, res) => {
    res.send('<h1>Hello World<h1>');
});

// routing path별 처리해주는 함수
app.get('*', (req, res) => {   // 위의 path들을 제외한 모든 path
    res.status(404).send('Path not found.');
});


// Status code 404
app.listen(3000, () => {
    console.log('Server is running at http://127.0.0.1:3000')
});

