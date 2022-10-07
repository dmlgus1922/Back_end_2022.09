var Human = function(type) {
    this.type = type || 'human';
}

Human.isHuman = function(human) {
    return human instanceof Human;
}

Human.prototype.breath = function() {
    console.log('h-a-a-a-m');
}

var Zero = function(type, firstname, lastname) {
    Human.apply(this, arguments);
    this.firstname = firstname;
    this.lastname = lastname;
}

Zero.prototype = Object.create(Human.prototype);
Zero.prototype.constructor = Zero;
Zero.prototype.sayName = function() {
    console.log(this.firstname + ' ' + this.lastname);
}

var oldZero = new Zero('human', 'Zero', 'Cho');
console.log(Human.isHuman(oldZero));
console.log(oldZero.type);
oldZero.breath();
oldZero.sayName();