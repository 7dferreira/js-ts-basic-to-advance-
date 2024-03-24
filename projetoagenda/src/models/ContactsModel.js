// tudo o que é relativo a dados e à db é com o model que vamos trabalhar.

const mongoose = require('mongoose');
const validator = require('validator');

const ContactsSchema = new mongoose.Schema({
    nome: { type: String, required: true},
    sobrenome: { type: String, required: false, default: '' },
    email: { type: String, required: false, default: '' },
    telemovel: { type: String, required: false, default: '' },
    createData: { type: Date, default: Date.now },
});

const ContactsModel = mongoose.model('Contacts', ContactsSchema);

function Contacts(body) {
    this.body = body;
    this.errors = [];
    this.contacts = null;
}

Contacts.findId = async function(id) {
    if(typeof id !== 'string') return;
    const user = await ContactsModel.findById(id);
    return user;
};

Contacts.prototype.register = async function() {
    this.validate();
    if(this.errors.length > 0) return;
    this.contacts = await ContactsModel.create(this.body);
};

Contacts.prototype.validate = function() {
    this.cleanUp();             

    if(this.body.email && !validator.isEmail(this.body.email)) this.errors.push('Email inválido!');
    if(!this.body.nome) this.errors.push('Nome é um campo obrigatório.');
    if(!this.body.email && !this.body.telemovel) {
        this.errors.push('Email ou telemóvel precisa ser enviado.');
    } 
}

Contacts.prototype.cleanUp = function() {
    for(const key in this.body) {
        if (typeof this.body[key] !== 'string') {
            this.body[key] = '';                        
        }
    }

    this.body = {
        nome: this.body.nome,
        sobrenome: this.body.sobrenome,
        email: this.body.email,
        telemovel: this.body.telemovel
    };
};

module.exports = Contacts;