const fs = require('fs').promises;
fs.writeFile('./write.txt', '안녕하세요')
    .then(() => {
        return fs.readFile('./write.txt');
    })
    .then((data) => {
        console.log(data.toString());
    })
    .catch((err) => {
        console.error(err);
    });
