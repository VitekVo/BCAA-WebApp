const express = require("express");
const router = express.Router();

const listUser = require("../abl/user/listUser");
const getUser = require("../abl/user/getUser");
const createUser = require("../abl/user/createUser");
const deleteUser = require("../abl/user/deleteUser");

router.get("/list", listUser);
router.get("/get", getUser);
router.post("/create", createUser);
router.post("/delete", deleteUser);

module.exports = router;
