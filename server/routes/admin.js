const express = require('express');
const entriesList = require('../data/entries');
const { secrets } = require('../config');

const adminRouter = express.Router();

adminRouter.get('/reset', function (req, res) {
    if (req.query.pwd !== secrets.adminPwd) {
        res.status(403).send({ error: 'Forbidden' });
        return;
    }
    Object.keys(entriesList).forEach(item => {
        console.log('deleting entry', item);
        delete entriesList[item];
    });
    let data = { entries: entriesList };
    res.status(200).send(data);
});

module.exports = adminRouter;