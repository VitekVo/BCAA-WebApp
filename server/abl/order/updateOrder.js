const orderDao = require("../../dao/order-dao")

async function updateOrder(req, res) {
    let order = req.body;
    const updatedOrder = orderDao.update(order);
    console.log(order);
    res.json(updatedOrder);
}

module.exports = updateOrder
