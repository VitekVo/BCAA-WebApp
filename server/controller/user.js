const express = require("express");
const router = express.Router();

const createUserCustomer = require("../abl/user/createUserCustomer");
//const createUserWaiter = require("../abl/user/createUserWaiter");
//const createUserCheff = require("../abl/user/createUserCheff");

router.post("/create/customer", createUserCustomer);
//router.post("/create/waiter", createUserWaiter);
//router.post("/create/cheff", createUserCheff);


module.exports = router;
