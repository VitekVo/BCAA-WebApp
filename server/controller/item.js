const express = require("express");
const router = express.Router();

const createItem = require("../abl/item/createItem");
const deleteItem = require("../abl/item/deleteItem");
const listItem = require("../abl/item/listItem");
const getItem = require("../abl/item/getItem");


router.post("/create", createItem);
router.post("/delete", deleteItem);
router.get("/list", listItem);
router.get("/get", getItem);


module.exports = router;
