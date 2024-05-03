const orderDao = require("../../dao/order-dao.js")

async function orderList(req, res) {
    const orderList = orderDao.list();
    res.json(orderList);
}

module.exports = orderList;
