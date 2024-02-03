function Conta(agencia, conta, saldo) {
    this.agencia = agencia;
    this.conta = conta;
    this.saldo = saldo;
}

Conta.prototype.levantar = function(valor) {
    if(this.saldo < valor) {
        console.log(`Saldo insuficiente: ${this.saldo}`);
        return;
    }
    
    this.saldo -= valor;
    this.verSaldo();
};
Conta.prototype.depositar = function(valor) {
    this.saldo += valor;
    this.verSaldo();
};
Conta.prototype.verSaldo = function() {
    console.log(
        `Ag/Acc: ${this.agencia}/${this.conta} | ` + 
        `Saldo: ${this.saldo.toFixed(2)}€`
    );
};

const conta1 = new Conta(11, 22, 10);
// conta1.depositar(11);
// conta1.depositar(11);
// conta1.levantar(33);
//console.log(conta1);

/* -------------------------------------------------CONTA CORRENTE------------------------------------------------------ */

// A conta corrente vai permitir definir um limite (plafond), que o utilizador pode levantar, ficando a conta com valor negativo.

function CC(agencia, conta, saldo, limite) {                        // Vamos criar outro objeto, mas desta vez uma conta corrente que vai ter um limite.
    Conta.call(this, agencia, conta, saldo);
    this.limite = limite;
}

CC.prototype = Object.create(Conta.prototype);
CC.prototype.constructor = CC;

CC.prototype.levantar = function(valor) {                           // A diferença entre este método e outro, é que este pode ser negativo.
    if(valor > (this.saldo + this.limite)) {
        console.log(`Saldo insuficiente: ${this.saldo}€`);
        return;
    }
    
    this.saldo -= valor;
    this.verSaldo();
};

const cc = new CC(11, 22, 0, 100);
cc.depositar(10);
cc.levantar(110);
cc.levantar(1);

/* -------------------------------------------------CONTA POUPANÇA------------------------------------------------------ */

// com a conta poupança vamos ter um polimorfismo. 
// fazer com que métodos se comportem de forma diferente em classes filhas de um mesmo pai caracteriza o polimorfismo.
// desta vez não vamos ter um limite.

function CP(agencia, conta, saldo) {                        
    Conta.call(this, agencia, conta, saldo);
}

CP.prototype = Object.create(Conta.prototype);
CP.prototype.constructor = CP;

console.log();

const cp = new CP(12, 33, 0)
cp.depositar(10);
cp.levantar(10);
cp.levantar(1);