const fs=require('fs');
const path = require('path');

const rawUsers = fs.readFileSync(path.join(__dirname + "/../users.json"), "utf8");

const users = JSON.parse(rawUsers);

module.exports = users;