const fs = require('fs');
fs.readFile('07.File/tmp/from.txt','utf8',(err, data)=>{
    const txt = data.replace(/\r/g, '').split('\n')
    let result = '';
    for (let i=0; i <= txt.length-1; i++) {
        for (let k=0; k <= i; k++) {
            result += txt[i];
        }
        result += '\n';
    }
    fs.writeFile('07.File/tmp/to.txt', result, error => {
        if (error)
            console.log(error);
        fs.readFile('07.File/tmp/to.txt', 'utf-8', (err, data) => {
            console.log(data);
        });
    });
});


/* function readFilePromise(path) {
    return new Promise((resolve, reject) => {
        fs.readFile(path, 'utf8', (err, data) => {
            if (err)
                reject(err);
            else
                resolve(data);
        });
    });
}
function writeFilePromise(path) {

}

let result = '';
fs.readFile('07.File/tmp/from.txt','utf8',(err, data)=>{
    const txt = data.replace(/\r/g, '').split('\n')
    for (let i=0; i <= txt.length-1; i++) {
        for (let k=0; k <= i; k++) {
            result += txt[i];
        }
        result += '\n';
    }
})
.then(fs.writeFile('07.File/tmp/to.txt', result, error => {
    if (error)
        console.log(error);
    })
)
.then(fs.readFile('07.File/tmp/to.txt', 'utf-8', (err, data) => {
    console.log(data);
    })
);
 */

/* let result = '';
result = fs.readFile('07.File/tmp/from.txt','utf8',(err, data)=>{
    const txt = data.replace(/\r/g, '').split('\n')
    for (let i=0; i <= txt.length-1; i++) {
        for (let k=0; k <= i; k++) {
            result += txt[i];
            // console.log(result)
        }
        result += '\n';
    }
});
console.log(result);
fs.writeFile('07.File/tmp/to.txt', result, error => {
    if (error)
        console.log(error);
});

fs.readFile('07.File/tmp/to.txt', 'utf-8', (err, data) => {
    console.log(data);
});

 */