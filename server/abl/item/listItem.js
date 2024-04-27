const itemDao = require("../../dao/item-dao.js")

async function itemList(req, res) {
    const itemList = itemDao.list();
    res.json(itemList);
}

module.exports = itemList;
