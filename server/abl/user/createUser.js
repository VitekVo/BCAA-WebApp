const userDao = require("../../dao/user-dao.js");

async function createUser(req, res) {
    userData = req.body;

    let user = {
        "id": "",
        "role": userData.role,
        "name": userData.name,
        "job": userData.job
    };

    user = userDao.create(user);

    res.json(user);
}

module.exports = createUser;
