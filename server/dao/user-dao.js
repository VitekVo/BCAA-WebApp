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

function list() {
    const files = fs.readdirSync(userFolderPath);
    const userList = files.map((file) => {
        const fileData = fs.readFileSync(path.join(userFolderPath, file), "utf8");
        return JSON.parse(fileData);
    });
    
    return userList;
}

function get(userID) {
    const filePath = path.join(userFolderPath, `${userID}.json`);
    const fileData = fs.readFileSync(filePath, "utf8");
    
    return JSON.parse(fileData);
}

module.exports = { 
    create,
    list,
    get
}
