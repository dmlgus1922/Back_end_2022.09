const mysql = require('mysql');
const config = require('./mysql.json');

const conn = mysql.createConnection(config);

conn.connect();
// 날짜가 sql에서 나오는 것처럼 보이기 위해 date format을 사용
const sql = `SELECT g.gid, g.name, DATE_FORMAT(debut,'%Y-%m-%d') AS debut, s.title FROM girl_group AS g
JOIN song AS s
ON s.sid=g.hit_song_id
ORDER BY debut;`;
conn.query(sql, (err, rows, fields) => {
    if (err)
        throw err;

    for (let row of rows) {

        console.log(`${row.gid}\t${row.name}\t${row.debut}\t${row.title}`);
    }
});

conn.end();