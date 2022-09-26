const mysql = require('mysql');
const config = require('./mysql.json');
/* {
    host:'localhost',
    user:'gisuser',
    password:'gispass',
    port:3306,
    database:'world'        //use world;
};

const fs = require('fs');
fs.writeFile('mysql.json', JSON.stringify(config), err => {

}); */
const connection = mysql.createConnection(config);

connection.connect();       // mysql DB 접속
const sql = `SELECT * FROM city WHERE population>9000000;`;
connection.query(sql, (err, rows, fields) => {
    if (err)
        throw err;
    // console.log(rows);      // rows는 배열
    for (let row of rows) {
        const str = `${row.ID}\t${row.Name}\t${row.CountryCode}\t${row.District}\t${row.Population}`
        console.log(str);
    }

    // console.log(fields);
});

connection.end();           // mysql DB 접속 해제
