const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const itemFolderPath = path.join(__dirname, "storage", "item");

function create(item) {
    item.id = crypto.randomBytes(16).toString("hex");
    const filePath = path.join(itemFolderPath, `${item.id}.json`);
    const fileData = JSON.stringify(item);
    fs.writeFileSync(filePath, fileData, "utf8");
    return item;
}

function list() {
    const files = fs.readdirSync(itemFolderPath);
    const itemList = files.map((file) => {
        const fileData = fs.readFileSync(path.join(itemFolderPath, file), "utf8");
        return JSON.parse(fileData);
    });
    
    return itemList;
}

function get(itemID) {
    const filePath = path.join(itemFolderPath, `${itemID}.json`);
    const fileData = fs.readFileSync(filePath, "utf8");
    
    return JSON.parse(fileData);
}

function remove(itemID) {
    try {
      const filePath = path.join(itemFolderPath, `${itemID}.json`);
      fs.unlinkSync(filePath);
      return {};
    } catch (error) {
      if (error.code === "ENOENT") {
        return {};
      }
      throw { code: "failedToRemoveItem", item: error.item };
    }
  }
  

module.exports = { 
    create,
    list,
    get,
    remove
}
