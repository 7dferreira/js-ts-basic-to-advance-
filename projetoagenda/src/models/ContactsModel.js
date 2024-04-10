// tudo o que é relativo a dados e à db é com o model que vamos trabalhar.
const mongoose = require('mongoose');
const validator = require('validator');

const ContactsSchema = new mongoose.Schema({
    nome: { type: String, required: true},
    sobrenome: { type: String, required: false, default: '' },
    email: { type: String, required: false, default: '' },
    telemovel: { type: String, required: false, default: '' },
    createData: { type: Date, default: Date.now }
});

const ContactsModel = (userId) => {
    return mongoose.model(`Contacts by ${userId}`, ContactsSchema);
};

function Contacts(body) {
    this.body = body;
    this.errors = [];
    this.contacts = null;
}

Contacts.prototype.register = async function(userId) {
    this.validate();
    if(this.errors.length > 0) return;
    this.contacts = await ContactsModel(userId).create(this.body);   // é este contacto que estamos a acessar e this representa (const contacts = new Contacts(req.body);
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

Contacts.prototype.edit = async function(contactId, userId) {
    if(typeof contactId !== 'string') return;
    this.validate();
    if(this.errors.length > 0) return;
    this.contacts = await ContactsModel(userId).findByIdAndUpdate(contactId, this.body, { new: true });
    
}

// metodos estáticos

Contacts.findId = async function(contactId, userId) {
    if(typeof contactId !== 'string') return;
    const contact = await ContactsModel(userId).findById(contactId);
    return contact;
};

Contacts.findContacts = async function(userId) {
    const contacts = await ContactsModel(userId).find()
    .sort({ createData: -1 });
    return contacts;
};

Contacts.delete = async function(contactId, userId) {
    if(typeof contactId !== 'string') return;
    const contact = await ContactsModel(userId).findOneAndDelete({_id: contactId});
    return contact;
};

module.exports = Contacts;