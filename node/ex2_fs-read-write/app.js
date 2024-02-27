const path = require("path");
const filePath = path.resolve(__dirname, "test.json");
const write = require('./modules/write');

const people = [
    { nome: "João" },
    { nome: "Maria" },
    { nome: "Alberto" },
    { nome: "Tiago" },
  ];
  
  const json = JSON.stringify(people, '', 2);
  write(filePath, json);