const userDao = require("../../dao/user-dao.js");
async function createUserCustomer(req, res) {

    userData = req.body;

    let user = {
        "id": "",
        "type": "customer",
        "name": userData.name
    };

    user = userDao.create(user);

    res.json(user);
}

module.exports = createUserCustomer;
