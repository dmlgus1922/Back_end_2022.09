const express = require('express');
const bodyParser = require('body-parser');

const dm = require('./db/tigers-module');
const template = require('./views/tigers-template');

const app = express();

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({extended:false}));


// request header의 값을 읽기
app.get('/', (req, res) => {
    dm.getList(rows => {
        const trs = template.trsGen(rows);
        const html = template.home(trs);
        res.send(html);
    });
});

app.get('/create', (req, res) => {
    const html = template.createForm();
    res.send(html);
});

app.post('/create', (req, res) => {
    const player = req.body.player;
    const backNo = parseInt(req.body.backNo);
    const position = req.body.position;
    dm.insertPlayer([player,backNo,position], () => {
        res.redirect('/');
    });
});

app.get('/update', (req, res) => { // http://localhost:3000/update?id=
    const id = parseInt(req.query.id);
    dm.getPlayer(id, rows => {
        const player = rows[0].player;
        const backNo = parseInt(rows[0].backNo);
        const position = rows[0].position;
        const html = template.updateForm(id, player, backNo, position);
        res.send(html);
    }); 
});

app.post('/update', (req, res) => {
    const id = parseInt(req.body.id);
    const player = req.body.player;
    const backNo = parseInt(req.body.backNo);
    const position = req.body.position;
    dm.updatePlayer([player, backNo, position, id], () => {
        res.redirect('/');
    });
});

app.get('/delete', (req, res) => {
    const id = parseInt(req.query.id);
    const html = template.deleteForm(id);
    res.send(html);
});

app.get('/deleteConfirm', (req, res) => {
    const id = parseInt(req.query.id);
    dm.deletePlayer(id, () => {
        res.redirect('/');
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

