const dm = require('./db-module');

/* dm.getList(rows => {
    for (let row of rows) {
        console.log(row.id, row.player);
    }
}); */

/* dm.insertPlayer(['테스트',100,'포지션'], () => {
    dm.getList(rows => {
        for (let row of rows) {
            console.log(row.id, row.player);
        }
    });
}); */

/* dm.getPlayer(1, rows => {
    for (let row of rows) {
        console.log(row.id, row.player, row.position);
    }
}); */

/* dm.updatePlayer(['테스트2', 99, '포지션2',24], () => {
    dm.getPlayer(24, rows => {
        for (let row of rows) {
            console.log(row.id, row.player, row.position);
        }
    });
}) */

/* dm.deletePlayer(24, () => {
    dm.getList(rows => {
        for (let row of rows) {
            console.log(row.id, row.player, row.position);
        }
    });
}); */
/* 
dm.getPlayersByPosition('외야수', rows => {
    for (let row of rows) {
        console.log(row.id, row.player, row.backNO, row.position);
    }
});
 */

/* dm.getPlayersOrderByBackNo(1, rows => {
    for (let row of rows) {
        console.log(row.id, row.player, row.backNO, row.position);
    }
}); */

dm.getPlayerByOrder('player', 0, rows => {
    for (let row of rows) {
        console.log(row.id, row.player, row.backNO, row.position);
    }
});