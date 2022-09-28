const express = require('express');

const app = express();
app.use(express.static(__dirname + '/public'));

const bbsRouter = express.Router();
const userRouter = express.Router(); 
const shoppingRouter = require('./routes/07.shoppingRouter');

app.use('/bbs', bbsRouter);
app.use('/user', userRouter);
app.use('/shopping', shoppingRouter);


app.get('/', (req, res) => {
    res.send(`<h1>Router</h1>`);
});

bbsRouter.get('/list', (req, res) => {
    res.send(`<h1>http://localhost:300/bbs/list</h1>`);
});

bbsRouter.get('/write', (req, res) => {
    res.send(`<h1>http://localhost:300/bbs/write</h1>`);
});

bbsRouter.get('/update', (req, res) => {
    res.send(`<h1>http://localhost:300/bbs/update</h1>`);
});

userRouter.get('/list', (req,res) => {
    res.send(`<h1>http://localhost:300/user/list</h1>`);
});

userRouter.get('/register', (req,res) => {
    res.send(`<h1>http://localhost:300/user/register</h1>`);
});

userRouter.get('/update', (req,res) => {
    res.send(`<h1>http://localhost:300/user/update</h1>`);
});


// routing path별 처리해주는 함수
app.get('*', (req, res) => {
    res.status(404).send('Path not found.');
});

app.listen(3000, () => {
    console.log('Server is running at http://127.0.0.1:3000')
});

