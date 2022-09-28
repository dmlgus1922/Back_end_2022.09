const express = require('express');

const shoppingRouter = express.Router();

shoppingRouter.get('/list', (req, res) => {
    res.send(`<h1>http://localhost:300/shopping/list</h1>`);
});

shoppingRouter.get('/cart', (req, res) => {
    res.send(`<h1>http://localhost:300/shopping/cart</h1>`);
});

module.exports = shoppingRouter;