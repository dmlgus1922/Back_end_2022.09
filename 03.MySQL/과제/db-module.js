const mysql = require('mysql');
const config = require('./mysql.json');

module.exports = {
    getConnection: function() {
        const conn = mysql.createConnection(config);
        conn.connect(err => {
            if (err) {
                console.log('mysql connetion error');
                console.log(err);
            }
        });
        return conn;
    },
    getGirlgroupList: function(callback) {
        const conn = this.getConnection();
        const sql = `SELECT g.gid,g.name,DATE_FORMAT(g.debut,'%Y-%m-%d') AS debut, s.title 
                        FROM girl_group AS g
                        JOIN song AS s
                        ON g.hit_song_id=s.sid;`;
        conn.query(sql, (err, rows, fields) => {
            if (err)
                throw err;
            callback(rows);
        });
        conn.end();
    },
    getSongList: function(callback) {
        const conn = this.getConnection();
        const sql = `SELECT s.sid, s.title, s.lyrics, g.name
                        FROM girl_group AS g
                        JOIN song AS s
                        ON g.hit_song_id=s.sid;`;
        conn.query(sql, (err, rows, fields) => {
            if (err)
                throw err;
            callback(rows);
        });
        conn.end();
    },
    getGirlgroupById: function(gid, callback) {
        const conn = this.getConnection();
        const sql = `SELECT g.gid, g.name, DATE_FORMAT(g.debut,'%Y-%m-%d') AS debut, s.title
                        FROM girl_group AS g
                        JOIN song AS s
                        ON g.hit_song_id=s.sid
                        WHERE g.gid=?;`;
        conn.query(sql, gid, (err, rows, fields) => {
            if (err)
                throw err;
            callback(rows);
        });
        conn.end();
    },
    getSongById: function(sid, callback) {
        const conn = this.getConnection();
        const sql = `SELECT s.sid, s.title, s.lyrics, g.name
                        FROM song AS s
                        JOIN girl_group AS g
                        ON g.hit_song_id=s.sid
                        WHERE s.sid=?;`;
        conn.query(sql, sid, (err, rows, fields) => {
            if (err)
                throw err;
            callback(rows);
        });
        conn.end();
    },
    insertGirlgroup : function(params, callback) {
        const conn = this.getConnection();
        const sql = `INSERT INTO girl_group (name, debut, hit_song_id)
                        VALUES (?, ?, ?);`;
        conn.query(sql, params, (err, fields) => {
            if (err)
                throw err;
            callback();
        });
        conn.end();
    },
    getAllGirlgroup: function(callback) {
        const conn = this.getConnection();
        const sql = `SELECT gid, name, DATE_FORMAT(debut,'%Y-%m-%d') AS debut, hit_song_id FROM girl_group;`;
        conn.query(sql, (err, rows, fields) => {
            if (err)
                throw err;
            callback(rows);
        });
        conn.end();
    },
    updateGirlgroup: function(params, callback) {
        const conn = this.getConnection();
        const sql = `UPDATE girl_group SET name=?, debut=?, hit_song_id=?
                    WHERE gid=?;`;
        conn.query(sql,params, (err, fields) => {
            if (err)
                throw err;
            callback();
        });
        conn.end();
    },
    deleteGirlgroupByName: function(name, callback) {
        const conn = this.getConnection();
        const sql = `DELETE FROM girl_group WHERE name=?;`;
        conn.query(sql, name, (err, fields) => {
            if (err)
                throw err;
            callback();
        });
        conn.end();
    },
    insertSong: function(params, callback) {
        const conn = this.getConnection();
        const sql = `INSERT INTO song (title, lyrics)
                        VALUES (?, ?);`;
        conn.query(sql, params, (err, fields) => {
            if (err)
                throw err;
            callback();
        });
        conn.end();
    },
    getAllSong: function(callback) {
        const conn = this.getConnection();
        const sql = `SELECT * FROM song;`;
        conn.query(sql, (err, rows, fields) => {
            if (err)
                throw err;
            callback(rows);
        });
        conn.end();
    },
    updateSong: function(params, callback) {
        const conn = this.getConnection();
        const sql = `UPDATE song SET title=?, lyrics=?
                        WHERE sid=?;`;
        conn.query(sql, params, (err, rows, fields) => {
            if (err)
                throw err;
            callback();
        });
        conn.end();
    },
    deleteSongByTitle: function(title, callback) {
        const conn = this.getConnection();
        const sql = `DELETE FROM song WHERE title=?;`;
        conn.query(sql, title, (err, fields) => {
            if (err)
                throw err;
            callback();
        });
        conn.end();
    }
};