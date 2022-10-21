const express = require('express');

const DBrouter = express.Router();    // express가 갖고 있는 기능 중 router를 사용

const conn = require('../config/DBConfig.js');

DBrouter.post('/Login', (request, response) => {
    const id = request.body.id;
    const pw = request.body.pw;

    // if (id == 'smart' && pw == '123'){
    //     response.redirect('http://127.0.0.1:5500/mynodejs/public/ex05LoginS.html');
    // } else {
    //     response.redirect('http://127.0.0.1:5500/mynodejs/public/ex05LoginF.html');
    // }

    const sql = 'select * from member where id=? and pw=?';
    conn.query(sql, [id, pw], (err, row) => {
        console.log(row, row.length);
        if (err) {
            console.log('검색 실패: '+ err);

        } else if (row.length > 0) {

            request.session.user = id;
            
            console.log('session영역에 id 저장 성공 ', request.session.user);

            response.render('LoginS', {
                row_id : id
            });
            
        } else if (row.length == 0){
            response.redirect('http://127.0.0.1:5500/mynodejs/public/ex05LoginF.html');
        }
    });

});

DBrouter.post('/JoinDB', (request, response) => {
    const id = request.body.id;
    const pw = request.body.pw;
    const nick = request.body.nick;
    
    const sql = 'insert into member values(?, ?, ?)';
    conn.query(sql, [id, pw, nick], (err, row) => {
        if (!err) {
            console.log('입력 성공: ' + row);
            response.redirect('http://127.0.0.1:3000/Main');
        } else {
            console.log('입력 실패: ' + err);
        }
    });
});

DBrouter.get('/Delete', (request, response) => {
    const id = request.query.id;
    const sql = 'delete from member where id=?';
    conn.query(sql, id, (err, row) => {
        if (err) {
            console.log('삭제 실패: '+ err);

        } else if (row.affectedRows > 0) {
            console.log('명령에 성공한 수: ' + row.affectedRows);
            response.redirect('http://127.0.0.1:3000/Main');
        
        } else if (row.affectedRows == 0){
            console.log('삭제된 값이 없습니다.');
            response.redirect('http://127.0.0.1:3000/Main');
        }
    });
});

DBrouter.post('/Update', (request, response) => {
    // 사용자가 입력한 id의 pw를 변경하고 성공 후 Main.html 페이지로 이동
    const select = request.body.select;
    const data = request.body.data;
    const id = request.body.id;
    
    // let sql;
    // if (select =='pw'){
    //     sql = 'update member set pw=? where id=?';
    // } else {
    //     sql = 'update member set nick=? where id=?';
    // }
    const sql = `update member set ${select}=? where id=?`;

    conn.query(sql, [data, id], (err, row) => {
        if (err) {
            console.log('수정 실패: '+ err);

        } else if (row.affectedRows > 0) {
            console.log('명령에 성공한 수: ' + row.affectedRows);
            response.redirect('http://127.0.0.1:3000/Main');
        
        } else if (row.affectedRows == 0){
            response.redirect('http://127.0.0.1:3000/Main');
            console.log('수정된 값이 없습니다.');
        }
    });
});

DBrouter.get('/SelectAll', (request, response) => {
    
    const sql = 'select * from member';
    
    conn.query(sql, (err, row) => {
        if (err) {
            console.log('검색실패 \n', err);
        } else if (row.length > 0) {

            console.log('검색된 데이터의 수', row.length);
            response.render('SelectAll', {
                row_names: row
            });
            
            // response.writeHead(200, {'Content-type':'text/html; charset=utf-8'});
            // response.write('<html>');
            // response.write('<body>');

            // response.write('<table border="1">');
            
            // response.write('<tr>');

            // response.write('<th>ID</th>');
            // response.write('<th>PW</th>');
            // response.write('<th>NICK</th>');

            // response.write('</tr>');

            // for (let i=0; i<row.length; i++) {
            //     response.write('<tr>');
            //     response.write('<td>'+ row[i].id + '</td>');
            //     response.write('<td>'+ row[i].pw + '</td>');
            //     response.write('<td>'+ row[i].nick + '</td>');
            //     response.write(`<td><a href="http://127.0.0.1:3000/SelectDelete?id=${row[i].id}">삭제</a></td>`);
            //     response.write('</tr>');
            // }

            // response.write('</table>');
           
            // response.write('</body>');
            // response.write('</html>');
            // response.end();

        } else if (row.length == 0) {
            console.log('검색된 데이터가 없습니다.');
            response.redirect('http://127.0.0.1:3000/Main');
        }

    });
});

DBrouter.get('/SelectOne', (request, response) => {
    const id = request.query.id;
    const sql = 'select * from member where id=?';
    conn.query(sql, id, (err, row) => {
        console.log(row, row.length);
        if (err) {
            console.log('검색 실패: '+ err);

        } else if (row.length > 0) {
            console.log(row);
            response.render('SelectOne', {
                row_name : row
            })
        
            console.log('검색에 성공한 수: ' + row.length);    
        
        } else if (row.length == 0){
            console.log('검색된 값이 없습니다.');
            response.redirect('http://127.0.0.1:3000/Main');
        }
    });
});

DBrouter.get('/SelectDelete', (request, response) => {
    const id = request.query.id;
    const sql = 'delete from member where id=?';
    conn.query(sql, id, (err, row) => {
        if (err) {
            console.log('삭제 실패: '+ err);

        } else if (row.affectedRows > 0) {
            console.log('명령에 성공한 수: ' + row.affectedRows);
            response.redirect('http://127.0.0.1:3000/SelectAll');
        
        } else if (row.affectedRows == 0){
            console.log('삭제된 값이 없습니다.');
            response.redirect('http://127.0.0.1:3000/Main');
        }
    });
});

DBrouter.get('/Main', (request, response) => {
    response.render('Main', {
        id : request.session.user
    });
});

DBrouter.get('/Logout', (request, response) => {
    delete request.session.user
    response.render('Main', {
        id : request.session.user
    });
});


module.exports = DBrouter;