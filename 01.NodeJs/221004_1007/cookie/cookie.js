const http = require('http');

http.createServer((req, res) => {
    console.log(req.url, req.headers.cookie);
    res.writeHead(200, { 'Set-cookie': 'mycookie=test' });
    res.end('Hello cookie');
})
.listen(8083, () => {
    console.log('8083리스닝 중');
});
