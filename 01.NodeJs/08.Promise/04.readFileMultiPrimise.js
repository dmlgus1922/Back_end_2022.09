const fs = require('fs');
function readFilePromis(path) {
    return new Promise((resolve, reject) => {
        fs.readFile(path, 'utf-8', (err, data) => {
            if (err)
                reject(err);
            else
                resolve(data);
        });
    });
}

readFilePromis('../07.File/tmp/a.txt')
    .then(val => {
        console.log(val);
        return  readFilePromis('../07.File/tmp/b.txt');
    })
    .then(val => {
        console.log(val);
        return  readFilePromis('../07.File/tmp/c.txt');
    })
    .then(val => { console.log(val) }
    ); 