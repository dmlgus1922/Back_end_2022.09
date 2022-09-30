const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const dm = require('./db/tigers-module');

const app = express();

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({extended:false}));


// request header의 값을 읽기
app.get('/', (req, res) => {
    dm.getList(rows => {
        ejs.renderFile('views/23.index.ejs', {
            rows
        }, (err, html) => {
            res.send(html);
        });
    });
});

app.get('/create', (req, res) => {
    ejs.renderFile('views/22.create.ejs', (err, html) => {
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
    const id = parseInt(req.params.id);
    console.log(id)
    dm.getPlayer(id, rows => {
        const player = rows[0].player;
        const backNo = parseInt(rows[0].backNo);
        const position = rows[0].position;
        ejs.renderFile('views/23.update.ejs', {
            id, player, backNo, position
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
    ejs.renderFile('views/23.delete.ejs', {
        id
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

