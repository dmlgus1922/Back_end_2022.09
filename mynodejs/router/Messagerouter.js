const express = require('express');
const conn = require('../config/DBConfig.js');
const Messagerouter = express.Router();

Messagerouter.get('/Message', (request, response) => {
    response.render('message', {
        user : request.session.user
    });
});

Messagerouter.get('/MessageLogout', (request, response) => {
    
    delete request.session.user;

    response.redirect('http://127.0.0.1:3000/message')
});

Messagerouter.post('/MessageJoin', (request, response) => {
    const email = request.body.email;
    const pw = request.body.pw;
    const tel = request.body.tel;
    const address = request.body.address;
    
    const sql = 'insert into web_member values(?, ?, ?, ?, now())';
    conn.query(sql, [email, pw, tel, address], (err, row) => {
        if (!err) {
            console.log('입력 성공: ' + row);
            response.redirect('http://127.0.0.1:3000/Message');
        } else {
            console.log('입력 실패: ' + err);
        }
    });
});

// Login 기능 구현
// 1. message.ejs form 수정
// 2. MessageLogin 라우터 구현
// 3. 로그인 성공 후 Message 페이지로 이동

Messagerouter.post('/MessageLogin', (request, response) => {
    const email = request.body.email;
    const pw = request.body.pw;
    
    const sql = 'select * from web_member where email=? and pw=?'
    conn.query(sql, [email, pw], (err, row) => {
        console.log(row.length);
        if (err) {
            console.log('검색 실패');
        } else if (row.length > 0) {

            request.session.user = {
                'email' : row[0].email,
                'tel' : row[0].tel,
                'address' : row[0].address,
            };
            console.log(row);
            response.render('message', {
                user : request.session.user
            });
            
        } else if (row.length == 0){
            response.redirect('http://127.0.0.1:5500/mynodejs/public/ex05LoginF.html');
        }
    })
});




module.exports = Messagerouter;