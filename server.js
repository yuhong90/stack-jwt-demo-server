const express = require('express');
const { serverConfig } = require('./server/config');

const adminRouter = require('./server/routes/admin');
const parkRouter = require('./server/routes/park');
const tokenRouter = require('./server/routes/token');
const entriesList = require('./server/data/entries');

const app = express();
const router = express.Router();

router.use('/', express.static('app/public'));
router.get('/', function (req, res) {
    res.sendFile('app/public/park.html', { root: __dirname });
});


router.get('/health', function (req, res) {
    var data = { config: serverConfig, answersSubmitted: entriesList.length };
    res.send(data);
});

// Allow cors
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader("Access-Control-Allow-Methods", "POST,GET,OPTIONS");
    res.setHeader("Access-Control-Expose-Headers", "content-type, authorization, if-none-match");
    res.setHeader("Access-Control-Allow-Headers", "content-type, authorization, if-none-match");
    next();
});

app.use('/', router);
app.use('/api', adminRouter);
app.use('/api', tokenRouter);
app.use('/api/park', parkRouter);

app.listen(app.listen(serverConfig.port, () => console.log(`App listening on port ${serverConfig.port}!`)));