// 705.484.450-52 070.987.720-03
/*
7x  0x 5x 4x 8x 4x 4x 5x 0x
10  9  8  7  6  5  4  3  2
70  0  40 28 48 20 16 15 0 = 237

11 - (237 % 11) = 5 (Primeiro dígito)
Se o número digito for maior que 9, consideramos 0.

7x  0x 5x 4x 8x 4x 4x 5x 0x 5x
11 10  9  8  7  6  5  4  3  2
77  0  45 32 56 24 20 20 0  10 = 284

11 - (284 % 11) = 2 (Segundo digito)
Se o número digito for maior que 9, consideramos 0.
*/

/* function ValidaCPF(cpfEnviado) {                                // 1 - Criamos uma função construtora que recebe o cpfEnviado.
    Object.defineProperty(this, 'cpfLimpo', {
        enumerable: true,
        get: function() {
            return cpfEnviado.replace(/\D+/g, '')               // 2 - Definimos uma propriedade dentro do nosso objeto que substitui
        }                                                       //     tudo o que não for numero por nada.
    });
}

ValidaCPF.prototype.valida = function() {                       // 3 - Queremos que o metodo validare retorne verdadeiro se o cpf for válido
    if(typeof this.cpfLimpo === 'undefined') return false;      //     e falso se não for válido.
    if(this.cpfLimpo.length !== 11) return false;               // 4 - Agora n temos acesso ao cpfEnviado por isso utilizamos cpfLimpo
    if(this.isSequencia()) return false;                        // 13 - Se a sequência for true a condição retorna false.

    const cpfParcial = this.cpfLimpo.slice(0, -2);              // 6 - O cpfParcial é criado a partir do cpfLimpo. Neste momento excluimos os ultimos 2 digitos.
    const digito1 = this.criaDigito(cpfParcial);
    const digito2 = this.criaDigito(cpfParcial + digito1);
    const novoCpf = cpfParcial + digito1 + digito2;
    //console.log(digito1);
    //console.log(digito2);

    return novoCpf === this.cpfLimpo;                                                               
};

ValidaCPF.prototype.criaDigito = function(cpfParcial) {         // 5 - Criamos um Array a partir do cpfParcial.
    const cpfArray = Array.from(cpfParcial);                    // 7 - Criamos um contador regressivo que começa a partir de 10.
    let regressivo = cpfArray.length + 1;                       // 8 - Vamos querer multiplicar o regressivo pelo valor.
    const total = cpfArray.reduce((ac, val) => {                // 9 - Agora o nosso ac é 237.
        //console.log(regressivo, val, regressivo * val);
        ac += (regressivo * Number(val));
        regressivo--;
        return ac;
    }, 0);
    //console.log(cpfArray);
    
                                                                // 10 - O resultado do primeiro digito é 5, conforme visto em cima.
    const digito = 11 - (total % 11);                           // 11 - Se o digito for maior que 9, que é o que acontece com o 2º cpf consideramos 0.
    return digito > 9 ? '0' : String(digito);                                         

};

ValidaCPF.prototype.isSequencia = function() {                          // 12 - por defeito se o cpf for uma sequencia de numeros, o cpf é sempre válido.
    const sequencia = this.cpfLimpo[0].repeat(this.cpfLimpo.length);    //      para isso não acontecer criamos um método que retorna true se o cpf for uma sequencia.
    //console.log(sequencia);
    return sequencia === this.cpfLimpo;
}

const cpf = new ValidaCPF('070.987.720-03');

if(cpf.valida()) {
    console.log('Cpf válido');
} else {
    console.log('Cpf inválido');
} */

//console.log(cpf.cpfLimpo)

/* ----------------------------------------------------------------------------------------------------------------------------------- */
 
// validação de cpf com classes

class ValidaCPF {
    constructor(cpfEnviado) {
        Object.defineProperty(this, 'cpfLimpo', {
            writable: false,
            enumerable: false,                               // ao colocar enumerable false aparece um objeto vazio ao invés de aparecer o cpf.
            configurable: false,
            value: cpfEnviado.replace(/\D+/g, '')
        })
    }

    isSequencia() {
        return this.cpfLimpo.charAt(0).repeat(11) === this.cpfLimpo;
    }

    createNewCpf() {
        const cpfNoDigits = this.cpfLimpo.slice(0, -2);
        // console.log(cpfNoDigits.length);
        const digito1 = this.geraDigito(cpfNoDigits);
        const digito2 = this.geraDigito(cpfNoDigits + digito1);
        this.newCpf = cpfNoDigits + digito1 + digito2
    }

    geraDigito(cpfNoDigits) {
        let total = 0;
        let reverso = cpfNoDigits.length + 1;

        for(let stringNumerica of cpfNoDigits) {            // ao contrário do que fizemos com a função construtora, aqui vamos iterar
            // console.log(stringNumerica, reverso);           o cpf com um ciclo for e vamos multiplicar o valor reverso pelo numero.
            total += reverso * Number(stringNumerica);
            reverso--;
        }

        const digito = 11 - (total % 11);
        return digito <= 9 ? String(digito) : '0';
    }

    valida() {
        if(!this.cpfLimpo) return false;
        if(typeof this.cpfLimpo !== 'string') return false;
        if(this.cpfLimpo.length !== 11) return false;
        if(this.isSequencia()) return false;
        this.createNewCpf();

        return this.newCpf === this.cpfLimpo;
    }
}

let validacpf = new ValidaCPF('070.987.720-03');

if(validacpf.valida()) {
    console.log('Cpf válido');
} else {
    console.log('Cpf inválido');
}