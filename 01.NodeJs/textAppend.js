const fs = require('fs');
/*
fs.readFile('07.File/tmp/from.txt','utf8',(err, data)=>{
    const txt = data.replace(/\r/g, '').split('\n')  // \r은 윈도우에만 있음.
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
 */

fs.readFile('07.File/tmp/from.txt','utf8',(err, data) => {
    const dataArray = data.split('\n').map(s => s.trim()); // \r 지우는 것
    let output = '';
    dataArray.forEach((item, index) => {
        line = '';
        for (let i=0; i<index+1; i++) {
            line += item;
        }
        output = dataArray.length-1 == index 
                ? output + line
                : output + line + '\n';
    });
    fs.writeFile('07.File/tmp/to.txt', output, err => {
        if (err)
            console.log(err);
    });
});