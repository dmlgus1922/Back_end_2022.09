const condition = true;

const promise = new Promise((resolve, reject) => {
    if (condition) {
        resolve('성공');
    } else {
        reject('실패');
    }
});

promise
    .then((message) => {
        console.log(`첫 번째 then: ${message}`)
        return new Promise((resolve, reject) => {
            resolve(message);
            });
    })
    .then((message2) => {
        console.log(`두 번째 then: ${message2}`);
        return new Promise((resolve, reject) => {
            reject(message2);
        });
    })
    .then((message3) => {
        console.log(`세 번째 then: ${message3}`);
    })
    .catch((error) => {
        console.error(`catch: ${error}`);
    })
    .finally(() => {
        console.log('finally: 끝');
    });