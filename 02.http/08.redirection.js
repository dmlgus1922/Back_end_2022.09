const http = require('http');
const server = http.createServer((req, res) => {
    res.writeHead(302,  // redirection
        {'location':'http://www.hanbit.co.kr'});
    res.end();
});

server.listen(3000, () => {
    console.log('Server running at http://www.hanbit.co.kr')
})