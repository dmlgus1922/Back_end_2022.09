class Human {
    constructor(type) {
        this.type = type;
    }
    static isHuman(human){
        return human instanceof Human;
    }
    breath() {
        console.log('h-a-a-a-m');
    }
}
class Man extends Human {
    constructor(type, firstname, lastname) {
        super(type);
        this.firstname = firstname;
        this.lastname = lastname;
    }
    sayName(){
        console.log(`성은 ${this.lastname}, 이름은 ${this.firstname}입니다.`);
    }
}

const KimUiHyeon = new Man('human', '의현', '김');

if (Human.isHuman(KimUiHyeon)){
    console.log('type:',KimUiHyeon.type);
    KimUiHyeon.breath();
    KimUiHyeon.sayName();
}