const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const userFolderPath = path.join(__dirname, "storage", "user");

function create(user) {
    user.id = crypto.randomBytes(16).toString("hex");
    const filePath = path.join(userFolderPath, `${user.id}.json`);
    const fileData = JSON.stringify(user);
    fs.writeFileSync(filePath, fileData, "utf8");
    return user;
}

module.exports = { 
    create
}
