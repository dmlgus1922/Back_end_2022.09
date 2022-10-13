const {
    Worker, isMainThread, parentPort,
} = require('worker_threads');

if (isMainThread) { // 부모일 때 
    const worker = new Worker(__filename);

    worker.on('message', message => {
        if (message == 'worker is done') {
            console.log("main's jobs");
        }
        console.log('worker -> main: ', message);
    });

} else {    //워커일 때
    console.log("worker's jobs");
    parentPort.postMessage('worker is done');
    parentPort.close();
}