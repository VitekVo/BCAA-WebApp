const express = require("express");
const router = express.Router();

const listUser = require("../abl/user/listUser");
const getUser = require("../abl/user/getUser");
const createUserCustomer = require("../abl/user/createUserCustomer");
const createUserEmployee = require("../abl/user/createUserEmployee");


router.get("/list", listUser);
router.get("/get", getUser);
router.post("/create/customer", createUserCustomer);
router.post("/create/employee", createUserEmployee);

module.exports = router;
