const dm = require('./db-module');

// 1. 걸그룹 리스트 조회 (gid, 걸그룹 이름, 데뷔일, 히트곡명)



dm.getGirlgroupList(rows => {
    for (let row of rows) {
        console.log(`${row.gid} | ${row.name} | ${row.debut} | ${row.title}`);
    }
});


/* 
// 2. 송 리스트 조회 (sid, 노래제목, 가사, 걸그룹명)
dm.getSongList(rows => {
    for (let row of rows) {
        console.log(`${row.sid} | ${row.title} | ${row.lyrics} | ${row.name}`);
    }
});


// 3. 걸그룹 검색(gid로) (gid, 걸그룹 이름, 데뷔일, 히트곡명)
dm.getGirlgroupById(1, rows => {
    for (let row of rows) {
        console.log(`${row.gid} | ${row.name} | ${row.debut} | ${row.title}`);
    }
});


// 4. 송 검색(sid로) (sid, 노래제목, 가사, 걸그룹명)
dm.getSongById(101, rows => {
    for (let row of rows) {
        console.log(`${row.sid} | ${row.title} | ${row.lyrics} | ${row.name}`);
    }
});


// 5. 걸그룹 추가 (+조회)
dm.insertGirlgroup(['아이브', '2021-12-01', 200], () => {
    dm.getAllGirlgroup(rows => {
        for (let row of rows) {
            console.log(`${row.gid} | ${row.name} | ${row.debut} | ${row.hit_song_id}`);
        }
    });
});


// 6. 걸그룹 수정 (+조회)
dm.updateGirlgroup(['원더걸스up','2007-02-10',101,1], () => {
    dm.getAllGirlgroup(rows => {
        for (let row of rows) {
            console.log(`${row.gid} | ${row.name} | ${row.debut} | ${row.hit_song_id}`);
        }
    });
});


// 7. 걸그룹 삭제 (+조회)
dm.deleteGirlgroupByName('아이브', () => {
    dm.getAllGirlgroup(rows => {
        for (let row of rows) {
            console.log(`${row.gid} | ${row.name} | ${row.debut} | ${row.hit_song_id}`);
        }
    });
});



// 8. 송 추가 (+조회)
dm.insertSong(['love dive', '숨 참고 love dive'], () => {
    dm.getAllSong(rows => {
        for (let row of rows) {
            console.log(`${row.sid} | ${row.title} | ${row.lyrics}`);
        }
    });
});


// 9. 송 수정 (+조회)
dm.updateSong(['Love Dive', '숨 참고 Love Dive(수정)', 117], () => {
    dm.getAllSong(rows => {
        for (let row of rows) {
            console.log(`${row.sid} | ${row.title} | ${row.lyrics}`);
        }
    });
});


// 10. 송 삭제 (+조회)
dm.deleteSongByTitle('Love Dive', () => {
    dm.getAllSong(rows => {
        for (let row of rows) {
            console.log(`${row.sid} | ${row.title} | ${row.lyrics}`);
        }
    });
});

*/