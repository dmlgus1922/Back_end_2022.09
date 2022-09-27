const http = require('http');
const url = require('url');
const mysql = require('mysql');
const config = require('./mysql.json');
const template = require('./view/template');

http.createServer((req, res) => {
    let pathname = url.parse(req.url).pathname;
    const conn = mysql.createConnection(config);
    switch(pathname) {
    case '/':   // 초기 화면
        conn.connect();
        let sql_root = `SELECT * FROM tigers WHERE isDeleted=0`;
        conn.query(sql, (err, rows, fields) => {
            if (err)
                throw err;
            let trs = template.trsGen(rows);
            let html = template.home(trs);
            res.end(html);
        });
        conn.end()
        break;
    
    case '/create':

        break;
    case '/update':
            
        /* conn.connect();
        let sql_update = `UPDATE tigers SET ?=? WHERE ?=?;`;
        // let  */

        break;

    
    default:    //pathname이 없을 때 
        res.writeHead(404, {'Content-Type': 'text/html'});
        res.end();
    }
}).listen(3000, () => {
    console.log('로컬호스트 3000');
});