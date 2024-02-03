// Ao desacoplar os métodos de dentro da função, podemos atribuir os métodos a outros objectos.
// A esta composição chamamos "mixing".

const falar = {
    falar() {
        console.log(`${this.nome} está a falar.`);
    },
};    

const comer = {
    comer() {
        console.log(`${this.nome} está a comer.`);
    },
};

const beber = {
    beber() {
        console.log(`${this.nome} está a beber.`);
    },
};

const pessoaPrototype = { ...falar, ...comer, ...beber };
// const pessoaPrototype = Object.assign({}, falar, comer, beber)

function criaPessoa(nome, sobrenome) {      
    /* const pessoaPrototype = {
        falar() {
            console.log(`${this.nome} está a falar.`);
        },

        comer() {
            console.log(`${this.nome} está a comer.`);
        },

        beber() {
            console.log(`${this.nome} está a beber.`);
        },
    } */

    return Object.create(pessoaPrototype, {      // Com isto retornamos uma pessoa, um novo obj, com o respetivo prototype  
        nome: { value: nome },                   // e onde podemos atribuir propriedades às nossas chaves.
        sobrenome: { value: sobrenome }
    })
}

const p1 = criaPessoa('Luiz');
console.log(p1.falar());


