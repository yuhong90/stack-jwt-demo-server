const express = require('express');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const { secrets } = require('../config');

const authMiddlewareRouter = express.Router();
const TOKEN_ISSUER = secrets.tokenIssuer;
const TOKEN_AUDIENCE = secrets.tokenAudience;

authMiddlewareRouter.use(cookieParser());
authMiddlewareRouter.use((req, res, next) => {
    checkTokenValidity(req, res, next);
});

const checkTokenValidity = (req, res, next) => {
    let accessToken = req.headers.authorization ? req.headers.authorization.split(' ')[1] : '';

    if (accessToken === '') {
        res.status(401);
        res.json({ error: 'Missing token' });
        return;
    }

    jwt.verify(accessToken, secrets.jwtSecret, function (err, decoded) {
        if (err) {
            console.log('Invalid token', err);
            res.status(401);
            res.json({ error: err });
        } else {
            console.log('Decoded', decoded);
            if (decoded.iss !== TOKEN_ISSUER || decoded.aud !== TOKEN_AUDIENCE) {
                res.status(401);
                res.json({ error: 'Invalid token issuer/audience' });
            }
            req.session = decoded;
            next();
        }
    });
};

module.exports = authMiddlewareRouter;
