const express = require('express');
const entriesList = require('../data/entries');
const authMiddlewareRouter = require('../middleware/authenticate');

const parkRouter = express.Router();

parkRouter.get('/entries', function (req, res) {
    let data = { entries: entriesList };
    res.status(200);
    res.send(data);
});

parkRouter.use(authMiddlewareRouter);

parkRouter.post('/entries', function (req, res) {
    if (!req.session.sub || !req.session.jti) {
        res.status(400);
        res.send({ error: 'Missing sub or jti' });
        return;
    }

    let entry = { name: req.session.sub, type: req.session.type };
    entriesList[req.session.jti] = entry;
    res.status(200);
    res.send({ message: 'Welcome to STACK Amusement Park!' });
});

module.exports = parkRouter;