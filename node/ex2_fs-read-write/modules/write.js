const fs = require("fs").promises;

// flag: w apaga tudo o que estiver dentro do arquivo 
// caso ele já exista eflag: a, faz o append (acrescenta).

module.exports = (filePath, data) => {
    fs.writeFile(filePath, data, { flag: "w" }); 
};
