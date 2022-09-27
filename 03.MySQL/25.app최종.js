const http = require('http');
const url = require('url');
const dm = require('./db-module');

const template = require('./view/template');
const qs = require('querystring');

http.createServer((req, res) => {
    let pathname = url.parse(req.url).pathname;
    let query = url.parse(req.url, true).query;
    
    switch(pathname) {
    case '/':   // 초기 화면
        dm.getList(rows => {
            const trs = template.trsGen(rows);
            const html = template.home(trs);
            res.end(html);
        });
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
                dm.insertPlayer([player,backNO,position], () => {
                    res.writeHead(302, {'Location':'/'});
                    res.end();
                });
            });
        }
        break;
    
    case '/update':
        if (req.method == 'GET') {      // 수정 입력할 form 보여주기
            const id = parseInt(query.id);
            dm.getPlayer(id, rows => {
                const player = rows[0].player;
                const backNO = rows[0].backNO;
                const position = rows[0].position;
                const html = template.updateForm(id, player, backNO, position);
                res.end(html);
            });
            
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

                dm.updatePlayer([player, backNO, position, id], () => {
                    res.writeHead(302, {'Location':'/'});
                    res.end();
                });
            });
        }
        break;
    
    case '/delete':
        const id = parseInt(query.id);
        const html = template.deleteForm(id);
        res.end(html);
        break;

    case '/deleteConfirm':{
        const id = parseInt(query.id);
        dm.deletePlayer(id, () => {
            res.writeHead(302, {'Location':'/'});
            res.end();
        });
        break;
        }

    default:    //pathname이 없을 때 
        res.writeHead(404, {'Content-Type': 'text/html'});
        res.end();
    }
}).listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});