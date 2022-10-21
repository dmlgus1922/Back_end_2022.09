const express = require('express');
const Sessionrouter = express.Router();

Sessionrouter.get('/SessionCreate', (request, response) => {
    //session 생성. 세션 공간 안에 유저라는 이름으로 스마트라는 데이터가 들어감
    request.session.user = {
        'id' : 'smart',
        'pw' : '123',
        'nick' : 'smart'
    }
    response.end();
});

Sessionrouter.get('/SessionSelect', (request, response) => {
    //session 검색
    console.log('session에 있는 user 값:', request.session.user);
});

Sessionrouter.get('/SessionDelete', (request, response) => {
    //session 삭제
    delete request.session.user;
    response.end();
});


module.exports = Sessionrouter;