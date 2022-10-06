const http = require('http');
const fs = require('fs').promises;
const fs2 = require('fs');

const server1 = http.createServer(async (req, res) => {
    try{
        const data = await fs.readFile('./server2.html');
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(data);
    } catch (err) {
        console.log(err);
        res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' });    // 500~ 서버 문제
        res.end(err.message)
    }
});

server1.listen(8080);

server1.on('listening', () => {console.log('8080리스닝 중')});
