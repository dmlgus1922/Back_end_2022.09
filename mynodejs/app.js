const express = require('express');     // 설치된 express 사용 선언
const app = express();   // express를 실행해 app 변수에 대입
                         // 127.0.0.1  포트번호가 없음
const router = require('./router/router.js');
const DBrouter = require('./router/DBrouter.js')
const EJSrouter = require('./router/EJSrouter.js');

const bodyParser = require('body-parser');

let ejs = require('ejs');

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended : false}));
// post방식일 때 body영역을 분석해주는 미들웨어로 bodyparser 등록
app.use(router);    // 미들웨어로 router를 등록
app.use(DBrouter)
app.use(EJSrouter);

app.listen(3000);   // 현재 서버 파일의 port번호 등록

