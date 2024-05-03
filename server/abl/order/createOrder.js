const express = require("express");
const app = express();
app.use(express.json())

const orderDao = require("../../dao/order-dao");
async function createOrder(req, res) {

    orderData = req.body;

    let order = {
        "id": "",
        "userID": "Table 1",
        "status": "pending", // pending, being prepared, served, paid 
        "name": "",
        "orderedItems": orderData
    };

    order = orderDao.create(order);

    res.json(order);
}

module.exports = createOrder;
