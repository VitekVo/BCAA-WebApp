const itemDao = require("../../dao/item-dao.js");

async function deleteItem(req, res) {
    try {
        const reqParams = req.body;
        itemDao.remove(reqParams.id);
        res.json({});
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
    }

module.exports = deleteItem;
