const express = require('express');
const jwt = require('jsonwebtoken');
const uuidv1 = require('uuidv1');

const { secrets } = require('../config');
const tokenRouter = express.Router();

const generateAccessToken = (sub, type) => {
    const accessToken = {
        payload: {
            iss: secrets.tokenIssuer,
            aud: secrets.tokenAudience,
            sub: sub,
            type: type
        },
        digitalSigningSecret: secrets.jwtSecret,
        options: {
            jwtid: uuidv1(),
            algorithm: 'HS384',
            expiresIn: 60 * 3
        }
    };

    return new Promise((resolve, reject) => {
        jwt.sign(accessToken.payload, accessToken.digitalSigningSecret, accessToken.options, (err, encodedToken) => {
            if (err) {
                reject(err);
            }
            resolve({ encodedToken, payload: accessToken.payload });
        });
    });
};

tokenRouter.get('/token', function (req, res) {
    let sub = req.query.sub;
    let type = req.query.type;

    generateAccessToken(sub, type)
        .then(({ encodedToken, payload }) => {
            console.log('generate encodedToken: ', encodedToken);
            res.cookie('jwt', encodedToken, { domain: 'localhost' });
            res.status(200);
            res.json({ encodedToken, payload });
        }).catch(err => {
            res.status(400);
            res.json({ error: err });
        });
});

module.exports = tokenRouter;