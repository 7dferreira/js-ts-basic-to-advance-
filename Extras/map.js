//Map -> retorna sempre um array com o mesmo tamanho, mas com valores alterados.

//Ex: Multiplicar os valores do array por 2.

const numeros = [5, 50, 80, 1, 2, 3, 5, 8, 7, 11, 15, 22, 27];

const dobro = numeros.map(valor => valor * 2);
console.log(dobro);

//Ex: retorne apenas uma string com o nome da pessoa.
//Ex: remova a chave nome do objeto.
//Ex: adicione uma chave id em cada objeto(id).

const pessoas = [
    {nome: 'Luiz', idade: 62}, // Array que tem 1 objeto em cada indice.
    {nome: 'Maria', idade: 23},
    {nome: 'Eduardo', idade: 55},
    {nome: 'Letícia', idade: 19},
    {nome: 'Rosana', idade: 32},
    {nome: 'Wallace', idade: 47},
];

const nomes = pessoas.map(obj => obj.nome);
console.log(nomes);

const idades = pessoas.map(obj => ({ idade: obj.idade }));
console.log(idades);

const ids = pessoas.map((obj, indice) => {
    const newObj = {...obj};
    newObj.id = indice + 1;
    return newObj;
});
console.log(ids);

/* ----------------------------------------------------------------------------------------------------------------------------------- */



const pessoas2 = [
    {id: 3, nome: 'Luiz'},
    {id: 2, nome: 'Maria'},
    {id: 1, nome: 'Helena'},
];

// const novasPessoas = {};
// Como é um objeto, fazemos destructuring.
/* for (const {id, nome} of pessoas2) {
    novasPessoas[id] = { id, nome };
} */

// ao faszermos a desestruturação deparamo-nos com um problemas: a ordem dos objetos foi alterada 
// e as chaves passaram a ser strings.

// for (const pessoa of pessoas2) {
//     const { id } = pessoa;
//     novasPessoas[id] = { ...pessoa }
// }

// para corrigirmos este problemas precisamos de utilziar um map.

// console.log(novasPessoas);

const novasPessoas = new Map();
for (const pessoa of pessoas2) {
    const { id } = pessoa;
    novasPessoas.set(id, { ...pessoa })

}

// for (const [identifier, { id, nome }] of novasPessoas) {
//     console.log(identifier, id, nome);
    
// }

novasPessoas.delete(2);
console.log(novasPessoas);