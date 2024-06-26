const express = require("express");
const app = express();
app.use(express.json())

const orderDao = require("../../dao/order-dao");
async function createOrder(req, res) {

    orderData = req.body;

    let order = {
        "id": "",
        "userID": orderData.userID,
        "status": "placed", // starting status is always placed  
        "name": "",
        "orderedItems": orderData.orderedItems
    };

    order = orderDao.create(order);

    res.json(order);
}

module.exports = createOrder;
