const express = require("express");
const router = express.Router();

const createOrder = require("../abl/order/createOrder");

router.post("/create", createOrder);
// router.put("/update", createOrder);
// router.delete("/delete", createOrder);

module.exports = router;
