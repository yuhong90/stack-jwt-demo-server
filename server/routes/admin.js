const express = require('express');
const answerList = require('../data/answers');
const { secrets } = require('../config');

const adminRouter = express.Router();

adminRouter.get('/reset', function (req, res) {
    if (req.query.pwd !== secrets.adminPwd) {
        res.status(403).send({ error: 'Forbidden' });
        return;
    }
    Object.keys(answerList).forEach(item => {
        console.log('deleting answer', item);
        delete answerList[item];
    });
    let data = { answers: answerList };
    res.status(200).send(data);
});

module.exports = adminRouter;