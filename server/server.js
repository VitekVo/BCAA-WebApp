const express = require("express");
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.json("Hello world")
});

const userController = require("./controller/user");
const orderController = require("./controller/order");
const itemController = require("./controller/item");

app.use("/user", userController);
app.use("/order", orderController);
app.use("/item", itemController);

app.listen(5000, () => {console.log("Server started on port 5000")});
