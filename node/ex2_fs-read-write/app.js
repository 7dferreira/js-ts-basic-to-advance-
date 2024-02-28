const path = require("path");
const filePath = path.resolve(__dirname, "test.json");
const write = require('./modules/write');
const read = require('./modules/read');

// const people = [
//     { nome: "João" },
//     { nome: "Maria" },
//     { nome: "Alberto" },
//     { nome: "Tiago" },
//   ];
  
//   const json = JSON.stringify(people, '', 2);
//   write(filePath, json);

async function readFile(filePath) {         // a partir do momento que retornamos de uma função que é assinc, vamos retornar uma promessa.
  const data = await read(filePath);
  renderData(data);
}

function renderData(data){
  data = JSON.parse(data);
  data.forEach(val => console.log(val.nome));
}

readFile(filePath);