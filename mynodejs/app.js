const express = require('express');     // 설치된 express 사용 선언
const app = express();   // express를 실행해 app 변수에 대입
                         // 127.0.0.1  포트번호가 없음
const router = require('./router/router.js');
const DBrouter = require('./router/DBrouter.js')
const EJSrouter = require('./router/EJSrouter.js');
const Sessionrouter = require('./router/Sessionrouter.js');
const Messagerouter = require('./router/Messagerouter.js');

const bodyParser = require('body-parser');

let ejs = require('ejs');

const session = require('express-session'); // 세션 기능
const mysql_session = require('express-mysql-session');  // 세션이 저장되는 영역(mysql)

app.set('view engine', 'ejs');

let conn = require('./config/config.json');

let conn_session = new mysql_session(conn);     

app.use(session({
    secret : 'smart',
    resave : false, // 저장
    saveUninitialized : true,   // 초기화
    store : conn_session    // 저장할 곳
})); // 미들웨어로 session 기능 등록

app.use(express.static('./public'));

app.use(bodyParser.urlencoded({extended : false}));
// post방식일 때 body영역을 분석해주는 미들웨어로 bodyparser 등록
app.use(router);    // 미들웨어로 router를 등록
app.use(DBrouter)
app.use(EJSrouter);
app.use(Sessionrouter);
app.use(Messagerouter);

app.listen(3000);   // 현재 서버 파일의 port번호 등록

