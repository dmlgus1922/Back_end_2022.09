const http = require('http');
const url = require('url');
const fs = require('fs');
const qs = require('querystring');
const view = require('./view/index');

http.createServer((req, res) => {    
    let pathname = url.parse(req.url).pathname;
    let query = url.parse(req.url, true).query;
    switch(pathname) {
    case '/':
        if (req.id === undefined) {     // 초기화면
            fs.readdir('./data', (err, files) => {
                let list = '';
                const content = ''; // 초기 화면에 들어갈 데이터
                const title = '웹 기술';
                console.log(files);
                for (let file of files) {
                    const title = file.substring(0,file.length-4); // .txt를 제외
                    list += `<li><h3><a href="/?id=${title}">${title}</a></h3></li>`;
                }
                const html = view.index(title, list, content);
                res.end(html);
            });

        } else {    // 개별 아이템에 대한 화면

        }
        break;
    default:
        res.writeHead(404, {'Content-Type': 'text/html'});    
        res.end();
    }
}).listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});