const serverConfig = {
    port: 3000,
    serverStartTime: new Date().toLocaleString("en-GB", { timeZone: "Asia/Singapore" })
};

const secrets = {
    jwtSecret: 'stackconf2018',
    adminPwd: 'stackconfadmin'
}

module.exports.serverConfig = serverConfig;
module.exports.secrets = secrets;
