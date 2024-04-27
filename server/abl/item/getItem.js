const itemDao = require("../../dao/item-dao.js")

async function getItem(req, res) {
    let itemData = req.body.id;
    const item = itemDao.get(itemData);
    res.json(item);
}

module.exports = getItem;
