const express = require('express');

const router = express.Router();    // express가 갖고 있는 기능 중 router를 사용

const conn = require('../config/DBConfig.js');

router.get('/plus', function(request, response) {   // plus 라우터 기능 정의 및 등록
    console.log('/plus 라우터 호출');
    console.log(parseInt(request.query.num1) + parseInt(request.query.num2));
    
    // 응답할 파일 지정. html 만들기
    response.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'});
    // 그 파일에 내용 넣기
    response.write('<html>');
    response.write('<body>');
    response.write('응답 성공<br>');
    response.write('결과값 : ' + (parseInt(request.query.num1) + parseInt(request.query.num2)));
    response.write('</body>');
    response.write('</html>');
    // 사용자에게 보여주기
    response.end();
});

router.get('/cal', function(request, response) {    // cal 라우터 기능 정의 및 등록
    // 1. 사용자가 입력한 값을 가져오기.
    let num1 = parseInt(request.query.num1);
    let num2 = parseInt(request.query.num2);
    let cal = request.query.cal;
    let result
    
    if (cal == '+'){
        result = num1 + num2;
    } else if (cal == '-') {
        result = num1 - num2;
    } else if (cal == '*') {
        result = num1 * num2;
    } else {
        result = num1 / num2;
    }

    // 사용자가 입력한 기호에 맞는 연산 결과값을 브라우저에 출력
    response.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'});
    // 그 파일에 내용 넣기
    response.write('<html>');
    response.write('<body>');
    response.write('결과값 : ' + result);
    response.write('</body>');
    response.write('</html>');
    // 사용자에게 보여주기
    response.end();
});

router.post('/Grade', (request, response)=> {
    const name = request.body.name;
    const html = parseInt(request.body.html);
    const css = parseInt(request.body.css);
    const nodejs= parseInt(request.body.nodejs);
    const android = parseInt(request.body.android);

    const avg = (html + css + nodejs + android) / 4;

    let grade;
    if (avg >= 95) {
        grade = 'A+';
    } else if (avg >= 90) {
        grade = 'A';
    } else if (avg >= 85) {
        grade = 'B+';
    } else if (avg >= 80) {
        grade = 'B';
    } else if (avg >= 75) {
        grade = 'C';
    } else {
        grade = 'F';
    }

    response.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'});
    response.write('<html>');
    response.write('<body>');
    response.write('name : ' + name + '<br>');
    response.write('html : ' + html + '<br>');
    response.write('css : ' + css + '<br>');
    response.write('nodejs : ' + nodejs + '<br>');
    response.write('android : ' + android + '<br>');
    response.write('avg : ' + avg + '<br>');
    response.write('grade : ' + grade);
    response.write('</body>');
    response.write('</html>');
    response.end();

});

router.post('/Join', (request, response) => {
    const id = request.body.id;
    const pw = request.body.pw;
    const name = request.body.name;
    const email = request.body.email;
    const tel = request.body.tel;
    const gender = request.body.gender;
    const hobby = request.body.hobby;
    const birth = request.body.birth;
    const color = request.body.color;
    const country = request.body.country;
    const talk = request.body.talk;

    response.writeHead(200, {'Content-type':'text/html; charset=utf-8'});
    
    response.write('<html>');
    response.write('<body>');

    response.write(`ID: ${id}<br>`);
    response.write(`NAME: ${name}<br>`);
    response.write(`EMAIL: ${email}<br>`);
    response.write(`TEL: ${tel}<br>`);
    response.write(`GENDER: ${gender}<br>`);
    response.write(`COUNTRY: ${country}<br>`);
    response.write(`BIRTH: ${birth}<br>`);
    response.write(`COLOR: ${color}<br>`);
    response.write(`HOBBY: ${hobby}<br>`);
    response.write(`TALK: ${talk}<br>`);

    response.write('</body>');
    response.write('</html>');

    response.end();
});

router.post('/Login', (request, response) => {
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
            response.redirect('http://127.0.0.1:5500/mynodejs/public/ex05LoginS.html');
            
        } else if (row.length == 0){
            response.redirect('http://127.0.0.1:5500/mynodejs/public/ex05LoginF.html');
        }
    });

});

router.post('/JoinDB', (request, response) => {
    const id = request.body.id;
    const pw = request.body.pw;
    const nick = request.body.nick;
    
    const sql = 'insert into member values(?, ?, ?)';
    conn.query(sql, [id, pw, nick], (err, row) => {
        if (!err) {
            console.log('입력 성공: ' + row);
            response.redirect('http://127.0.0.1:5500/mynodejs/public/ex06Main.html');
        } else {
            console.log('입력 실패: ' + err);
        }
    });
});

router.get('/Delete', (request, response) => {
    const id = request.query.id;
    const sql = 'delete from member where id=?';
    conn.query(sql, id, (err, row) => {
        if (err) {
            console.log('삭제 실패: '+ err);

        } else if (row.affectedRows > 0) {
            console.log('명령에 성공한 수: ' + row.affectedRows);
            response.redirect('http://127.0.0.1:5500/mynodejs/public/ex06Main.html');
        
        } else if (row.affectedRows == 0){
            console.log('삭제된 값이 없습니다.');
            response.redirect('http://127.0.0.1:5500/mynodejs/public/ex06Main.html');
        }
    });
});

router.post('/Update', (request, response) => {
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
            response.redirect('http://127.0.0.1:5500/mynodejs/public/ex06Main.html');
        
        } else if (row.affectedRows == 0){
            response.redirect('http://127.0.0.1:5500/mynodejs/public/ex06Main.html');
            console.log('수정된 값이 없습니다.');
        }
    });
});

router.get('/SelectAll', (request, response) => {
    
    const sql = 'select * from member';
    
    conn.query(sql, (err, row) => {
        if (err) {
            console.log('검색실패 \n', err);
        } else if (row.length > 0) {

            console.log('검색된 데이터의 수', row.length);
            
            
            response.writeHead(200, {'Content-type':'text/html; charset=utf-8'});
            response.write('<html>');
            response.write('<body>');

            response.write('<table border="1">');
            
            response.write('<tr>');

            response.write('<th>ID</th>');
            response.write('<th>PW</th>');
            response.write('<th>NICK</th>');

            response.write('</tr>');

            for (let i=0; i<row.length; i++) {
                response.write('<tr>');
                response.write('<td>'+ row[i].id + '</td>');
                response.write('<td>'+ row[i].pw + '</td>');
                response.write('<td>'+ row[i].nick + '</td>');
                response.write('</tr>');
            }

            response.write('</table>');
           
            response.write('</body>');
            response.write('</html>');
            response.end();

        } else if (row.length == 0) {
            console.log('검색된 데이터가 없습니다.');
        }

    });
});

router.get('/SelectOne', (request, response) => {
    const id = request.query.id;
    const sql = 'select * from member where id=?';
    conn.query(sql, id, (err, row) => {
        console.log(row, row.length);
        if (err) {
            console.log('검색 실패: '+ err);

        } else if (row.length > 0) {
            console.log('검색에 성공한 수: ' + row.length);

            response.writeHead(200, {'Content-type':'text/html; charset=utf-8'});
            response.write('<html>');
            response.write('<body>');

            response.write('<table border="1">');
            
            response.write('<tr>');

            response.write('<th>ID</th>');
            response.write('<th>PW</th>');
            response.write('<th>NICK</th>');

            response.write('</tr>');

            for (let i=0; i<row.length; i++) {
                response.write('<tr>');
                response.write('<td>'+ row[i].id + '</td>');
                response.write('<td>'+ row[i].pw + '</td>');
                response.write('<td>'+ row[i].nick + '</td>');
                response.write('</tr>');
            }

            response.write('</table>');
           
            response.write('</body>');
            response.write('</html>');
            response.end();

            
        
        } else if (row.length == 0){
            console.log('검색된 값이 없습니다.');
            response.redirect('http://127.0.0.1:5500/mynodejs/public/ex06Main.html');
        }
    });
});

module.exports = router;