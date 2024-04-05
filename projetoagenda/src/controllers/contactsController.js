const Contacts = require('../models/ContactsModel');

exports.index = (req, res) => {
    res.render('contacts', { contacts: {} });
};

exports.register = async (req, res) => {
    const userId = req.session.user.email;
    try {
        const contacts = new Contacts(req.body);
        await contacts.register(userId);

        if(contacts.errors.length > 0) {
            req.flash('errors', contacts.errors);
            req.session.save(() => res.redirect('/contacts/index'));
            return;
        }
        
        req.flash('success', 'Contacto registado com sucesso.');
            req.session.save(() => res.redirect(`/contacts/index/${contacts.contacts._id}`));
            return;
    } catch(e) {
        console.log(e);
        return res.render('404');
    }
};

exports.editIndex = async function(req, res) {
    if(!req.params.id) return res.render('404');

    const userId = req.session.user.email;
    const contactId = req.params.id;

    try {
        const contacts = await Contacts.findId(contactId, userId);
        if(!contacts) return res.render('404');

        res.render('contacts', { contacts });
    } catch(e) {
        console.log(e);
        return res.send('ERRO')
    }
};

exports.edit = async function(req, res) {
    try {
        if(!req.params.id) return res.render('404');
        const contacts = new Contacts(req.body);
        await contacts.edit(req.params.id);

        if(contacts.errors.length > 0) {
            req.flash('errors', contacts.errors);
            req.session.save(() => res.redirect('/contacts/index'));
            return;
        }
        
        req.flash('success', 'Contacto editado com sucesso.');
            req.session.save(() => res.redirect(`/contacts/index/${contacts.contacts._id}`));
            return;

    } catch(e) {
        console.log(e);
        res.render('404');
    }
};

exports.delete = async function(req, res) {
    if(!req.params.id) return res.render('404');

    const contacts = await Contacts.delete(req.params.id);
    if(!contacts) return res.render('404');

    req.flash('success', 'Contacto apagado com sucesso.');
    req.session.save(() => res.redirect('/'));
    return;
};