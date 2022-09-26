const mysql = require('mysql');
const config = require('./mysql.json');

const conn = mysql.createConnection(config);

conn.connect();

let sql = `
    SELECT * FROM tigers
    WHERE position=(?) and isDeleted=(?)`;
const params = ['투수', 0];     // isDeleted가 0이면 현역, 1이면 은퇴
conn.query(sql, params, (err, rows, fields) => {
    if (err)
        throw err;
    for (let row of rows) {
        console.log(`${row.id}\t${row.player}\t${row.backNO}\t${row.position}\t${row.isDeleted}`);
    }
});

conn.end();
// conn.end(); 여기 넣으면 에러가 나버림.