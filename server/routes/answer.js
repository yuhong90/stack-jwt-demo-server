const express = require('express');
const answerList = require('../data/answers');
const authMiddlewareRouter = require('../middleware/authenticate');
const { secrets } = require('../config');

const answerRouter = express.Router();
const RESULT = { CORRECT: 'correct', WRONG: 'wrong' };

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

    if (req.session.ans === secrets.riddleAnswer) {
        let answer = { name: req.session.sub, status: RESULT.CORRECT };
        answerList[req.session.jti] = answer;
        res.status(200);
        res.send({ status: RESULT.CORRECT });
    } else {
        let answer = { name: req.session.sub, answer: req.session.ans, status: RESULT.WRONG };
        answerList[req.session.jti] = answer;
        res.status(200);
        res.send({ status: RESULT.WRONG });
    }
});

module.exports = answerRouter;