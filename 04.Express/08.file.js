const express=require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const fs  = require('fs');
const app = express();

app.use(express.static(__dirname + '/public')); 
app.use(bodyParser.urlencoded({extended:false}));

// multer setting
const upload = multer({
    storage: multer.diskStorage({
        destination: __dirname + '/public/upload/',     // 저장 위치 설정
        filename: (req, file, next) => {
            next(null, file.originalname);
        }                 // next callback
    })
});

app.get('/', (req, res) => {
    res.send(`<h1>file upload</h1>`);
});

app.get('/file', (req, res) => {
    fs.readFile('./views/08.file.html', 'utf8', (err, html) => {
        res.send(html);
    });
});

app.post('/file', upload.single('image'), (req, res) => {
    const comment = req.body.comment;
    console.log(req.file);
    res.send(`<h1>Comment: ${comment}</h1>
              <h1>Filename: ${req.file.filename}</h1>`);
});

// routing path별 처리해주는 함수
app.get('*', (req, res) => {   // 위의 path들을 제외한 모든 path
    res.status(404).send('Path not found.');
});


// Status code 404
app.listen(3000, () => {
    console.log('Server is running at http://127.0.0.1:3000')
});

