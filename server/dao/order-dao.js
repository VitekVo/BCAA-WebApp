const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const orderFolderPath = path.join(__dirname, "storage", "order");

function create(order) {
    order.id = crypto.randomBytes(16).toString("hex");
    order.name = order.id;
    const filePath = path.join(orderFolderPath, `${order.id}.json`);
    const fileData = JSON.stringify(order);
    fs.writeFileSync(filePath, fileData, "utf8");
    return order;
}

function get(orderID) {
    const filePath = path.join(orderFolderPath, `${orderID}.json`);
    const fileData = fs.readFileSync(filePath, "utf8");
    
    return JSON.parse(fileData);
}

function list() {
    const files = fs.readdirSync(orderFolderPath);
    const orderList = files.map((file) => {
        const fileData = fs.readFileSync(path.join(orderFolderPath, file), "utf8");
        return JSON.parse(fileData);
    });
    
    return orderList;
}

function update(order) {
    try {
    const currentOrder = get(order.id);
    if (!currentOrder) return null;
    const newOrder = { ...currentOrder, ...order};
    const filePath = path.join(orderFolderPath, `${order.id}.json`);
    const fileData = JSON.stringify(newOrder);
    fs.writeFileSync(filePath, fileData, "utf8");
    return order;
    } catch (error) {
        throw {code : 'Error in update function:', message: error.message};
    }
}

module.exports = { 
    create,
    get,
    list,
    update,
}
