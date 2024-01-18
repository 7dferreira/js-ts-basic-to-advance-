//Produto -> aumento, desconto
//camisola = cor, caneca = material

function Produto(nome, preco) {
    this.nome = nome;
    this.preco = preco
}

Produto.prototype.aumento = function(quantia) {
    this.preco += quantia;
};

Produto.prototype.desconto = function(quantia) {
    this.preco -= quantia;
};

/* ----------------------------------------------------OBJ CAMISOLA---------------------------------------------------------------- */

function Camisola(nome, preco, cor) { // Camisola é uma especialização de produto.
    Produto.call(this, nome, preco);  // Camisola herda tudo o que produto tem mas camisola também pode ter as suas caracteristicas especificas.
    this.cor = cor;
}

// prototype é um objecto vazio que vem pronto para ser usado.

Camisola.prototype = Object.create(Produto.prototype);
Camisola.prototype.constructor = Camisola;  // É imporante que o objeto camisola fique associado ao seu contrutor e não apenas linkado ao produto.

Camisola.prototype.aumento = function(percentagem) {
    this.preco = this.preco + (this.preco * (percentagem / 100));
};

const camisola = new Camisola('Gola alta', 7.5, 'Preta');
camisola.aumento(100);
/* console.log(camisola); */

/* ----------------------------------------------------OBJ CANECA---------------------------------------------------------------- */

function Caneca(nome, preco, material, stock) {
    Produto.call(this, nome, preco);          // nome e preço são argumentos do produto.
    this.material = material;

    Object.defineProperty(this, 'stock', {
        enumerable: true,
        configurable: false,
        get: function() {
            return stock;
        },
        set: function(valor) {
            if(typeof valor !== 'number') return;
            stock = valor;
        }
    })
}

Caneca.prototype = Object.create(Produto.prototype);
Caneca.prototype.constructor = Caneca;

const caneca = new Caneca('Sagres', 1.5, 'Vidro', 5);
caneca.stock = 100;             // SETTER
console.log(caneca.stock);      // GETTER
console.log(caneca);




