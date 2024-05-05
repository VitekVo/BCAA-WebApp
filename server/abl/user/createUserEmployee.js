const userDao = require("../../dao/user-dao.js");

async function createUserEmployee(req, res) {
    userData = req.body;

    let user = {
        "id": "",
        "role": "employee",
        "name": userData.name,
        "job": userData.job
    };

    user = userDao.create(user);

    res.json(user);
}

module.exports = createUserEmployee;
