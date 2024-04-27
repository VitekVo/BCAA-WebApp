const userDao = require("../../dao/user-dao.js");
async function createUserCheff(req, res) {

    userData = req.body;

    let user = {
        "id": "",
        "type": "cheff",
        "name": userData.name
    };

    user = userDao.create(user);

    res.json(user);
}

module.exports = createUserCheff;
