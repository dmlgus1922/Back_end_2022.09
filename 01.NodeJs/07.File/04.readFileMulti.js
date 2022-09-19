const fs = require('fs');

// 순서 보장이 되지 않는다.
/* console.log('순서 보장이 안됨');
fs.readFile('tmp/a.txt', 'utf-8', (err, bufA) => {
    console.log(bufA);
});
fs.readFile('tmp/b.txt', 'utf-8', (err, bufB) => {
    console.log(bufB);
});
fs.readFile('tmp/c.txt', 'utf-8', (err, bufC) => {
    console.log(bufC);
});
 */

// 순서 보장 방법
fs.readFile('tmp/a.txt','utf-8', (err,bufA) => {
    console.log('순서 보장1');
    console.log(bufA);
    fs.readFile('tmp/b.txt', 'utf-8', (err, bufB) => {
        console.log(bufB);
        fs.readFile('tmp/c.txt', 'utf-8', (err, bufC) => {
            console.log(bufC);
        });        
    });
});


fs.readFile('tmp/a.txt','utf-8', (err,bufA) => {
    fs.readFile('tmp/b.txt', 'utf-8', (err, bufB) => {
        fs.readFile('tmp/c.txt', 'utf-8', (err, bufC) => {
            console.log('순서 보장2');
            console.log(bufA);
            console.log(bufB);
            console.log(bufC);
        });        
    });
});