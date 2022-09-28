const express=require('express');
const fs  = require('fs');
const ejs = require('ejs');     // extended Js, template engine
const app = express();

// public 폴더를 static이라 하겠다..
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// request header의 값을 읽기
app.get('/', (req, res) => {
    res.send(`<h1>Static</h1><br>`);
});

app.get('/static', (req, res) => {
    fs.readFile('./views/05.static.html', 'utf8', (err, html) => {
        res.send(html);
    });
});

app.get('/ejs', (req,res) => {
    ejs.renderFile('views/05.static.ejs', 
        {
            data:'EJS에서 보내는 데이터',
            data2:'data2'
        }, 
        (err, html) => {
            res.send(html);
        }
    );
});

// routing path별 처리해주는 함수
app.get('*', (req, res) => {   // 위의 path들을 제외한 모든 path
    res.status(404).send('Path not found.');
});


// Status code 404
app.listen(3000, () => {
    console.log('Server is running at http://127.0.0.1:3000')
});

