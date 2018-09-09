const express = require('express');
const answerList = require('../data/answers');
const authMiddlewareRouter = require('../middleware/authenticate');

const answerRouter = express.Router();

answerRouter.get('/answers', function (req, res) {
    let data = { answers: answerList };
    res.status(200);
    res.send(data);
});

answerRouter.use(authMiddlewareRouter);

answerRouter.post('/answers', function (req, res) {
    if (!req.session.sub || !req.session.ans || !req.session.jti) {
        res.status(400);
        res.send({ error: 'Bad Request' });
        return;
    }

    let answer = { name: req.session.sub, answer: req.session.ans };
    answerList[req.session.jti] = answer;
    res.status(200);
    res.send({ youranswer: req.session });
});

module.exports = answerRouter;