const http = require('http');
const url = require('url');
const mysql = require('mysql');
const config = require('./mysql.json');
const template = require('./view/template');
const qs = require('querystring');

http.createServer((req, res) => {
    let pathname = url.parse(req.url).pathname;
    let query = url.parse(req.url, true).query;
    const conn = mysql.createConnection(config);
    switch(pathname) {
    case '/':   // 초기 화면
        conn.connect();
        const sql = `SELECT * FROM tigers WHERE isDeleted=0`;
        conn.query(sql, (err, rows, fields) => {
            if (err)
                throw err;
            const trs = template.trsGen(rows);
            const html = template.home(trs);
            res.end(html);
        });
        conn.end();
        break;
    
    case '/create':
        if (req.method == "GET"){   // 입력 폼 보여주기
            let html = template.createForm();
            res.end(html);
        } else {    // 사용자 입력 -> DB
            let body='';
            req.on('data', data => {
                body += data;
            });
            req.on('end', () => {
                const param = qs.parse(body);
                const player = param.player;
                const backNO = parseInt(param.backNO);
                const position = param.position;

                const conn = mysql.createConnection(config);
                conn.connect();
                const sql = `INSERT INTO tigers (player, backNO, position)
                VALUES (?, ?, ?);`;
                conn.query(sql, [player, backNO, position], (err, fields) => {
                    if (err)
                    throw err;
                    
                    res.writeHead(302, {'Location':'/'});
                    res.end();
                });
                conn.end();
            });
        }
        break;
    case '/update':
        if (req.method == 'GET') {      // 수정 입력할 form 보여주기
            const id = parseInt(query.id);
            const conn = mysql.createConnection(config);
            conn.connect();
            const sql = `SELECT * FROM tigers WHERE id=? and isDeleted=0;`;
            conn.query(sql, id, (err, rows, fields) => {
                if (err)
                    throw err;
                const player = rows[0].player;
                const backNO = rows[0].backNO;
                const position = rows[0].position;
                const html = template.updateForm(id, player, backNO, position);
                res.end(html);
            });
            conn.end();
        } else {        // DB에 수정하기
            let body='';
            req.on('data', data => {
                body += data;
            });
            req.on('end', () => {
                const param = qs.parse(body);
                const id = parseInt(param.id);
                const player = param.player;
                const backNO = parseInt(param.backNO);
                const position = param.position;

                const conn = mysql.createConnection(config);
                conn.connect();
                const sql = `UPDATE tigers SET player=?, backNO=?, position=?
                            WHERE id=?;`;
                conn.query(sql, [player, backNO, position, id], (err, fields) => {
                    if (err)
                    throw err;
                    
                    res.writeHead(302, {'Location':'/'});
                    res.end();
                });
                conn.end();
            });
        }

        break;

    
    default:    //pathname이 없을 때 
        res.writeHead(404, {'Content-Type': 'text/html'});
        res.end();
    }
}).listen(3000, () => {
    console.log('로컬호스트 3000');
});