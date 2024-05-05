const userDao = require("../../dao/user-dao.js")

async function userList(req, res) {
    const userList = userDao.list();
    res.json(userList);
}

module.exports = userList;
