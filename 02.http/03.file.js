const http = require('http');
const fs = require('fs');
const server = http.createServer((req,res) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(html);
})
server.listen(3000);