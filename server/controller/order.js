const express = require("express");
const router = express.Router();

const createOrder = require("../abl/order/createOrder");
const listOrder = require("../abl/order/listOrder");
const getOrder = require("../abl/order/getOrder");
const updateOrder = require("../abl/order/updateOrder");

router.post("/create", createOrder);
router.get("/list", listOrder);
router.get("/get", getOrder);
router.post("/update", updateOrder);
// router.delete("/delete", createOrder);

module.exports = router;
