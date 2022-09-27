const express=require('express');
const app = express();

// request header의 값을 읽기
app.get('/', (req, res) => {
    const agent = req.header('User-Agent');
    // const host = req.header();
    res.send(`<h3>User-Agent: ${agent}</h3><br>`);
    // res.send(`<h3>host: ${host}</h3>`);
});

// response header의 값을 설정
app.get('/set/:key/value/:value', (req, res) => {
    const key = req.params.key;
    const value = req.params.value;
    res.set(key, value); // res 헤더에 설정을 한 것.
    res.send(`<h3>key: ${key}, value: ${value}</h3>`);
})

// routing path별 처리해주는 함수
app.get('*', (req, res) => {   // 위의 path들을 제외한 모든 path
    res.status(404).send('Path not found.');
});


// Status code 404
app.listen(3000, () => {
    console.log('Server is running at http://127.0.0.1:3000')
});

