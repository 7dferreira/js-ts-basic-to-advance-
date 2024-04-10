// tudo o que é relativo a dados e à db é com o model que vamos trabalhar.

const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs');

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

    async login() {
        this.validate();            
        if(this.errors.length > 0) return;
        this.user = await LoginModel.findOne({ email: this.body.email });

        if(!this.user) {
            this.errors.push('O utilizador não existe.');
            return;
        }

        if(!bcryptjs.compareSync(this.body.password, this.user.password)) {
            this.errors.push('Password inválida');
            this.user = null;
            return;
        }
    }

    async register() {              // 3 - desencadeia o método register no controller.
        this.validate();            // 4 - por sua vez este método chama o valida, que vai validar os nossos campos.
        if(this.errors.length > 0) return;

        await this.userExists();

        if(this.errors.length > 0) return;

        const salt = bcryptjs.genSaltSync();
        this.body.password = bcryptjs.hashSync(this.body.password, salt);

        this.user = await LoginModel.create(this.body); 
    }

    async userExists() {
        this.user = await LoginModel.findOne({ email: this.body.email });
        if(this.user) this.errors.push('Este utilizador já existe.');
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

    validatePassword() {
        for (const key in this.body) {
          if (typeof this.body[key] !== "string") {
            this.body[key] = "";
          }
          this.body[key] = this.body[key].trim();
        }
    
        if (
          !this.body.oldpassword ||
          !this.body.newpassword ||
          !this.body.checkpassword
        )
          this.errors.push("Preencha todos os campos.");
    
        if (
          this.body.newpassword &&
          (this.body.newpassword.length < 5 || this.body.newpassword.length > 50)
        )
          this.errors.push("A senha deve ter entre 5 a 50 caracteres");
    
        if (this.body.newpassword !== this.body.checkpassword)
          this.errors.push("Senha de confirmacao deve ser igual a nova.");
      }

    async changePassword(sessionUser) {
        this.validatePassword();
    
        if (this.errors.length > 0) return;
    
        if (!bcryptjs.compareSync(this.body.oldpassword, sessionUser.password)) {
          this.errors.push("Senha actual invalida.");
          return;
        }
    
        const salt = bcryptjs.genSaltSync();
        sessionUser.password = bcryptjs.hashSync(this.body.newpassword, salt);
    
        this.user = await LoginModel.findByIdAndUpdate(
          sessionUser._id,
          sessionUser,
          {
            new: true,
          }
        );
      }
}

module.exports = Login;