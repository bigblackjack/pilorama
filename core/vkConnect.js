const easyvk = require('easyvk');
const path = require('path');
require('dotenv').config()

module.exports = async () => await easyvk({
    username: process.env.VK_USER,
    password: process.env.VK_PASSWORD,
    sessionFile: path.join(__dirname, '.session')
});
