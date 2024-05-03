const orderDao = require("../../dao/order-dao.js")

async function getorder(req, res) {
    let orderData = req.body.id;
    const order = orderDao.get(orderData);
    res.json(order);
}

module.exports = getorder;
