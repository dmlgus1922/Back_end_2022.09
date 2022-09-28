const express=require('express');
const bodyParser = require('body-parser');
const fs  = require('fs');
const app = express();

// public 폴더를 static이라 하겠다..
app.use(express.static(__dirname + '/public'));

// 
app.use(bodyParser.urlencoded({extended:false}));


// request header의 값을 읽기
app.get('/', (req, res) => {
    res.send(`<h1>Body-parser middleware</h1>`);
});

app.get('/login', (req, res) => {
    fs.readFile('./views/06.login.html', 'utf8', (err, html) => {
        res.send(html);
    });
});

app.post('/login', (req, res) => {
    const uid = req.body.uid;   // 사용자가 form에서 입력한 것.(name 속성으로 받는듯)
    const pwd = req.body.pwd;
    res.send(`<h1>사용자ID: ${uid}, 사용자pwd: ${pwd}</h1>`);
});

// routing path별 처리해주는 함수
app.get('*', (req, res) => {   // 위의 path들을 제외한 모든 path
    res.status(404).send('Path not found.');
});


// Status code 404
app.listen(3000, () => {
    console.log('Server is running at http://127.0.0.1:3000')
});

