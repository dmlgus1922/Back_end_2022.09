// Promise
// Producer
function delayP(ms) {
    return new Promise((resolve, reject) => {
        try {
            setTimeout(() => {
                resolve('성공');    // resolve는 성공했을 때, 
            },ms);
        } catch(e) {
            reject('실패');     // reject는 실패했을 때 실행
        }
    });
}

// Consumer
delayP(1000)
    /* .then((val) => {
        console.log(val);
    }) */
    .then(console.log)
    .catch(console.log);
    // .catch(err => { console.log(err) });


