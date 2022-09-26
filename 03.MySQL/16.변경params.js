const mysql = require('mysql');
const config = require('./mysql.json');

const conn = mysql.createConnection(config);

conn.connect();

let sql = `
    UPDATE tigers SET id=(?)
    WHERE id>13;`;  // 조건에 맞는 선수들이 다 9로 바뀌면서 duplicate 에러..
    // 고칠 방법을 생각해보자. where 조건을 어떻게 바꿔야 할듯
for (let i=9; i<12; i++) {
    let params = [i];
    conn.query(sql, params, (err, fields)=> {
        if (err)
            throw err;
    });
}

sql = `SELECT * FROM tigers`;
conn.query(sql, (err, rows, fields) => {
    if (err)
        throw err;
    for (let row of rows) {
        console.log(`${row.id}\t${row.player}\t${row.backNO}\t${row.position}\t${row.isDeleted}`);
    }
})
conn.end(); // 비동기라서 여기에 넣는게 바람직하다(?)

// conn.end(); 여기 넣으면 에러가 나버림.