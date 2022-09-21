const fs = require('fs');
const http = require('http');
const url = require('url');
const qs = require('querystring');

const members = [{uid: 'james', pwd: '1111', name:'James'},
                {uid: 'maria', pwd: '2222', name: 'Maria'}];

const server = http.createServer((req, res) => {
    let pathname = url.parse(req.url).pathname;
    let method = req.method;    // post인가 get인가 알아보기

    switch(pathname) {
    case '/input':
        if (method === 'GET') {     // 입력 양식 화면을 사용자에게 보여준다.
            fs.readFile('view/12.form.html', 'utf8', (err, html) => {
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.end(html);
            });
        } else {    // 메소드가 POST인 경우
            let body = '';
            req.on('data', data => {
                body += data;
            });
            // 입력 데이터로 필요한 작업을 수행 예) 로그인
            // 다음 작업을 화면을 보내줌
            req.on('end', () => {
                const param = qs.parse(body);
                const uid = param.uid;
                const pwd = param.pwd;
                let flag = true;
                for (let member of members) {
                    if (uid === member.uid && pwd === member.pwd) {
                        res.end(`<h1>welcome ${member.name}</h1>`);
                        flag = false;
                    }
                }
                if (flag)
                    res.end('<h1>Re-enter the form</h1>');
            });  // 원래는 PUT, DELETE 등 메소드가 더 있음. 근데 잘 안 쓰이기 때문에 생략
        }
        break;
    default:
        res.writeHead(404, {'Content-Type': 'text/html'});    
        res.end();
    };
    }

);

server.listen(3000, () => {
    console.log('server running at http://localhost:3000');
});
