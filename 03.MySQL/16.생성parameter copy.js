const mysql = require('mysql');
const config = require('./mysql.json');

const conn = mysql.createConnection(config);

conn.connect();

let sql = `
    INSERT INTO tigers (player, backNO, POSITION)
    VALUES (?, ?, ?);`;
const params = ['박준표', 31, '투수'];
// 받아올 결과가 딱히 없음. 
conn.query(sql, params, (err, fields) => {
    if (err)
        throw err;

    sql = `SELECT * FROM tigers`;
    conn.query(sql, (err, rows, fields) => {
        if (err)
            throw err;
        for (let row of rows) {
            console.log(`${row.id}\t${row.player}\t${row.backNO}\t${row.position}\t${row.isDeleted}`);
        }
    })
    conn.end(); // 비동기라서 여기에 넣는게 바람직하다(?)
});
// conn.end(); 여기 넣으면 에러가 나버림.