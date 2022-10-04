const util = require('util');
const crypto = require('crypto');

const donUseMe = util.deprecate((x,y) => {
    console.log(x + y);
}, 'dontUseMe함수는 deprecated 되었으니 사용하지 마십시오.'
);
