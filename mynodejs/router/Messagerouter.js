const express = require('express');
const conn = require('../config/DBConfig.js');
const Messagerouter = express.Router();

Messagerouter.get('/Message', (request, response) => {
    // 현재 로그인한 사람에게 온 메시지 검색

    if (request.session.user) {
        const sql = 'select * from web_message where rec = ?';
        conn.query(sql, request.session.user.email, (err, row) => {
            console.log(row);
            response.render('message', {
                user : request.session.user,
                row_name : row
            });
        });
    } else {
        response.render('message', {
            user : request.session.user,
        });
    }

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
            
            response.redirect('http://127.0.0.1:3000/Message');
            
        } else if (row.length == 0){
            response.redirect('http://127.0.0.1:5500/mynodejs/public/ex05LoginF.html');
        }
    })
});

Messagerouter.get('/MessageUpdate', (request, response) => {
    
    // update.ejs파일을 랜더링
    
    response.render('update', {
        user: request.session.user
    });
});

Messagerouter.post('/MessageUpdateExe', (request, response) => {
    const email = request.session.user.email;
    const pw = request.body.pw;
    const tel = request.body.tel;
    const address = request.body.address;
    // 사용자가 입력한 pw, tel, address로 email의 정보를 수정하시오.
    const sql = 'update web_member set pw=?, tel=?, address=? where email=?';
    conn.query(sql, [pw, tel, address, email], (err, row) => {
        console.log(row);
        if (err) {
            console.log(err);
        } else {
            console.log('수정 완료');
            request.session.user = {
                'email' : email,
                'tel' : tel,
                'address' : address,
            };
            response.render('message', {
                user: request.session.user
            });
        }
    });
});

Messagerouter.get('/MessageMemberSelect', (request, response) => {
    
    const sql = 'select * from web_member';

    conn.query(sql, (err, row) => {
        console.log(row.length);
        if (err) {
            console.log('검색 실패');
        } else if (row.length > 0) {
            console.log(row);

            response.render('selectMember', {
                row_name : row
            });
            
        } else if (row.length == 0){
            response.redirect('http://127.0.0.1:3000/Message');
        }
    })
});

Messagerouter.get('/MessageDelete', (request, response) => {
    const email = request.query.email;
    const sql = 'delete from web_member where email=?';
    conn.query(sql, email, (err, row) => {
        if (err) {
            console.log('삭제 실패: '+ err);

        } else if (row.affectedRows > 0) {
            console.log('명령에 성공한 수: ' + row.affectedRows);
            response.redirect('http://127.0.0.1:3000/MessageMemberSelect');
        
        } else if (row.affectedRows == 0){
            console.log('삭제된 값이 없습니다.');
            response.redirect('http://127.0.0.1:3000/MessageMemberSelect');
        }
    });
});

Messagerouter.post('/MessageSend', (request, response) => {
    const send = request.body.send;
    const rec = request.body.rec;
    const content = request.body.content;
    
    const sql = 'insert into web_message (send, rec, content, send_date) values (?, ?, ?, now())';
    conn.query(sql, [send, rec, content], (err, row) => {
        if (!err) {
            console.log('입력 성공: ' + row);
            response.redirect('http://127.0.0.1:3000/Message');
        } else {
            console.log('입력 실패: ' + err);
        }
    });
});

module.exports = Messagerouter;