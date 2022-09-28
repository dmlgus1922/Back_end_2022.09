// MIME: Multipurpose Internet Mail Extensions
const express=require('express');
const fs  = require('fs');
const app = express();

// request header의 값을 읽기
app.get('/', (req, res) => {
    res.send(`<h1>MIME: Multipurpose Internet Mail Extensions</h1><br>`);
});

app.get('/image', (req, res) => {
    fs.readFile('public/cat.jpg', (err, image) => {
        res.type('image/jpg');  // MIME type
        res.send(image);
    });
});

app.get('/audio', (req, res) => {
    fs.readFile('public/mp3_sample.mp3', (err, audio) => {
        res.type('audio/mp3');  // MIME type
        res.send(audio);
    });
});

app.get('/video', (req, res) => {
    fs.readFile('public/mp4_sample.mp4', (err, video) => {
        res.type('video/mp4');  // MIME type
        res.send(video);
    });
});

// routing path별 처리해주는 함수
app.get('*', (req, res) => {   // 위의 path들을 제외한 모든 path
    res.status(404).send('Path not found.');
});


// Status code 404
app.listen(3000, () => {
    console.log('Server is running at http://127.0.0.1:3000')
});

