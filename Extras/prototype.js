function Produto(nome, preco) {
    this.nome = nome;
    this.preco = preco;

    // Agora já n precisamos de criar métodos dentro do objeto, pois temos o prototype para esse fim.
}

Produto.prototype.desconto = function(percentual) {
    this.preco = this.preco - (this.preco * (percentual / 100));
};

Produto.prototype.aumento = function(percentual) {
    this.preco = this.preco + (this.preco * (percentual / 100));
};

const p1 = new Produto('gorro', 50);
/* p1.desconto(50);
/* console.log(p1); */ 

// Literal
const p2 = {
    nome: 'caneca',
    preco: 15
};

/* Object.setPrototypeOf(p2, Produto.prototype);

/* p2.aumento(20);
console.log(p2) */ 

const p3 = Object.create(Produto.prototype, {
    preco: {
        writable: true,
        configurable: true,
        enumerable: true,
        value: 100
    },
    tamanho: {
        writable: true,
        configurable: true,
        enumerable: true,
        value: 42
    }
});
/* p3.preco = 113; */
p3.aumento(10);
console.log(p3);