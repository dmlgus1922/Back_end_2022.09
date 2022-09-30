const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const dm = require('./db/tigers-module');
const pm = require('path');     // path module

const app = express();
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended:false}));
const path = pm.join(__dirname, 'views/common');

// request header의 값을 읽기
app.get('/', (req, res) => {
    const menu = {ho:1, cr:0, up:0};
    dm.getList(rows => {
        ejs.renderFile('views/32.index.ejs', {
            path, rows, menu        // path: path, rows: rows
        }, (err, html) => {
            res.send(html);
        });
    });
});

app.get('/create', (req, res) => {
    const menu = {ho:0, cr:1, up:0};
    ejs.renderFile('views/32.create.ejs', {
        path, menu
    }, (err, html) => {
        res.send(html);
    });
});

app.post('/create', (req, res) => {
    const player = req.body.player;
    const backNo = parseInt(req.body.backNo);
    const position = req.body.position;
    dm.insertPlayer([player,backNo,position], () => {
        res.redirect('/');
    });
});

app.get('/update/:id', (req, res) => { // http://localhost:3000/update/123
    const menu = {ho:0, cr:0, up:1};
    const id = parseInt(req.params.id);
    console.log(id)
    dm.getPlayer(id, rows => {
        const player = rows[0].player;
        const backNo = parseInt(rows[0].backNo);
        const position = rows[0].position;
        ejs.renderFile('views/32.update.ejs', {
            id, player, backNo, position, path, menu
        }, (err, html) => {
            res.send(html);
        });
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

app.get('/delete/:id', (req, res) => { // http://localhost:3000/delete/123
    const id = parseInt(req.params.id);
    ejs.renderFile('views/32.delete.ejs', {
        id, path
    }, (err, html) => {
        res.send(html);
    });
});

app.get('/deleteConfirm/:id', (req, res) => {
    const id = parseInt(req.params.id);
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

