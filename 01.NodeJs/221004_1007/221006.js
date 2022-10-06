class VarClass {
    constructor() {
        this.state = '';
        this.result = '';
    }
    ret() {
        return new VarClass;
    }
    on() {
        return new VarClass;
    }
    resolve(msg) {
        this.result = msg;
        this.state = 'resolved';
        return this;
    }
    reject(msg) {
        this.result = msg;
        this.state = 'rejected';
        return this;
    }
    then(func) {
        if (this.state == 'resolved'){
            func(this.result);
        }
        return this;
    }
    catch(func) {
        if (this.state == 'rejected') {
            func(this.result);
        }
        return this;
    }
}

let tempVar1 = new VarClass();
tempVar1.reject('실패하진 않았어요');

tempVar1
    .then((msg)=> {console.log(msg)})
    .resolve('성공했어요')
    .catch((msg)=> {console.log(msg)})
    .then((msg)=> {console.log(msg)});

let tempVar2 = tempVar1.ret().on();