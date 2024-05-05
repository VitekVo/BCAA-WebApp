const userDao = require("../../dao/user-dao.js")

async function getUser(req, res) {
    let userData = req.body.id;
    const user = userDao.get(userData);
    res.json(user);
}

module.exports = getUser;
