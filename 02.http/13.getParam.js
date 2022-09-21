const http = require('http');
const url = require('url');

http.createServer((req,res) => {
    let query = url.parse(req.url, true).query;
    // console.log(query);
    // localhost:3000/?name=admin&region=asia
    console.log(query.name, query.region);
    res.end(`<h1>${JSON.stringify(query)}</h1>`); // 쿼리를 스트링으로 바꿔서 화면에 보이기
}).listen(3000, () => {
    console.log('server running at http://localhost:3000');
});