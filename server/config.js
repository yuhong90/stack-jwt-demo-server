const serverConfig = {
    port: 3001,
    serverStartTime: new Date().toLocaleString("en-GB", { timeZone: "Asia/Singapore" })
};

const secrets = {
    jwtSecret: 'stackconf2018',
    adminPwd: 'stackconfadmin',
    tokenIssuer: 'stackconf-auth-service',
    tokenAudience: 'stackconf-api-service'
}

module.exports.serverConfig = serverConfig;
module.exports.secrets = secrets;
