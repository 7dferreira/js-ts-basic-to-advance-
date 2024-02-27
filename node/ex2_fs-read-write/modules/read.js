const fs = require("fs").promises;

module.exports = (filePath, data) => {
    fs.readFile(filePath, data, { flag: "w" }); 
};
