// tudo o que é relativo a dados e à db é com o model que vamos trabalhar.

const mongoose = require('mongoose');
const validator = require('validator');

const LoginSchema = new mongoose.Schema({
    email: { type: String, required: true},
    password: { type: String, required: true}
});

const LoginModel = mongoose.model('Login', LoginSchema);

class Login {
    constructor(body) {
        this.body = body;
        this.errors = [];
        this.user = null;
    }

    async register() {              // 3 - desencadeia o método register no controller.
        this.validate();            // 4 - por sua vez este método chama o valida, que vai validar os nossos campos.
        if(this.errors.length > 0) return;

        try {
            this.user = await LoginModel.create(this.body);
        } catch(e) {
            console.log(e);
        }
    }

    validate() {
        this.cleanUp();             // 5 - o cleanUp vai limpar o nosso objeto

        if(!validator.isEmail(this.body.email)) this.errors.push('Email inválido!');
        if(this.body.password.length < 3 || this.body.password.length > 50) {
            this.errors.push('A password precisa ter entre 3 e 50 caracteres!');
        }
    }

    cleanUp() {
        for(const key in this.body) {
            if (typeof this.body[key] !== 'string') {
                this.body[key] = '';                        // os campos que n corresponderem a uma string vão ser convertidos pra uma string vazia.
            }
        }

        this.body = {
            email: this.body.email,
            password: this.body.password
        }
    }
}

module.exports = Login;