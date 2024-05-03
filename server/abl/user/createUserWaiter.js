const userDao = require("../../dao/user-dao.js");

async function createUserWaiter(req, res) {
    userData = req.body;

    let user = {
        "id": "",
        "type": "waiter",
        "name": userData.name
    };

    user = userDao.create(user);

    res.json(user);
}

module.exports = createUserWaiter;
