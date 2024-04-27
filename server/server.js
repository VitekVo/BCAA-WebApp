const express = require("express");
const app = express();

app.use(express.json());

app.get("/api", (req, res) => {
    res.json({"users": ["userOne", "userTwo", "userThree"] })
});

const userController = require("./controller/user");
const orderController = require("./controller/order");
const itemController = require("./controller/item");


app.use("/user", userController);
app.use("/order", orderController);
app.use("/item", itemController);

app.listen(5000, () => {console.log("Server started on port 5000")});
