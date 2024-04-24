const express = require("express");
const app = express();
app.use(express.json())

const userDao = require("../../dao/user-dao");
async function createUserCustomer(req, res) {

    userData = req.body;

    console.log(userData);

    let user = {
        "id": "",
        "type": "customer",
        "name": userData.name
    };

    user = userDao.create(user);

    res.json(user);
}

module.exports = createUserCustomer;
