const serverConfig = {
    port: process.env.PORT || 3001,
    serverStartTime: new Date().toLocaleString("en-GB", { timeZone: "Asia/Singapore" })
};

const secrets = {
    jwtSecret: 'stackconf2018',
    adminPwd: 'stackconfadmin',
    tokenIssuer: 'stackconf-auth-service',
    tokenAudience: 'stackconf-api-service',
    riddleAnswer: 'inheritance'
}

module.exports.serverConfig = serverConfig;
module.exports.secrets = secrets;
