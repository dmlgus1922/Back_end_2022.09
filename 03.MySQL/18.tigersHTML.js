const fs = require('fs');
const mysql = require('mysql');
const config = require('./mysql.json');

const conn = mysql.createConnection(config);

let html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <table>
        <tr>
            <th>선수 id</th>
            <th>이름</th>
            <th>사진</th>
            <th>백넘버</th>
            <th>포지션</th>
        </tr>
`;

conn.connect();

let sql = `SELECT * FROM tigers;`;

conn.query(sql, (err, rows, fields) => {
    if (err)
        throw err;
    for (let row of rows) {
        let line = '<tr>';
        line += `<td>${row.id}</td><td>${row.player}</td><td></td><td>${row.backNO}</td><td>${row.position}</td>`;
        line += '</tr>\n';
        html += line;        
    }
    html += `
    </table>
    </body>
    </html>`;
    fs.writeFile('18.tigers.html', html, err => {

    });
});

conn.end();