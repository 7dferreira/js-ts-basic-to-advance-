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
conta1.depositar(11);
conta1.depositar(11);
conta1.levantar(33);
//console.log(conta1);

function CC(agencia, conta, saldo, limite) {

}