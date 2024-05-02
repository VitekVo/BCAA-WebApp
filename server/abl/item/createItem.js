const itemDao = require("../../dao/item-dao.js");

async function createItem(req, res) {
    itemData = req.body;

    let item = {
        "id": "",
        "type": itemData.type, //type: main, side, dessert, beverage
        "name": itemData.name,
        "price": itemData.price
    };

    item = itemDao.create(item);

    res.json(item);
}

module.exports = createItem;
