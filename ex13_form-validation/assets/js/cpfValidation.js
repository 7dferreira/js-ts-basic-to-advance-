class ValidaCPF {
    constructor(cpfEnviado) {
        Object.defineProperty(this, 'cpfLimpo', {
            writable: false,
            enumerable: false,                            
            configurable: false,
            value: cpfEnviado.replace(/\D+/g, '')
        })
    }

    isSequencia() {
        return this.cpfLimpo.charAt(0).repeat(11) === this.cpfLimpo;
    }

    createNewCpf() {
        const cpfNoDigits = this.cpfLimpo.slice(0, -2);
        const digito1 = ValidaCPF.geraDigito(cpfNoDigits);
        const digito2 = ValidaCPF.geraDigito(cpfNoDigits + digito1);
        this.newCpf = cpfNoDigits + digito1 + digito2
    }

    static geraDigito(cpfNoDigits) {                        
        let total = 0;                                     
        let reverso = cpfNoDigits.length + 1;

        for(let stringNumerica of cpfNoDigits) {            
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

/* let validacpf = new ValidaCPF('070.987.720-03');

if(validacpf.valida()) {
    console.log('Cpf válido');
} else {
    console.log('Cpf inválido');
} */