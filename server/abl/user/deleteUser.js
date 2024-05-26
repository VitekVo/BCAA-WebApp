const userDao = require("../../dao/user-dao.js");

async function deleteUser(req, res) {
    try {
        const reqParams = req.body;
        userDao.remove(reqParams.id);
        res.json({});
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
    }

module.exports = deleteUser;
