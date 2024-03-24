const Contacts = require('../models/ContactsModel');

exports.index = (req, res) => {
    res.render('contacts');
}

exports.register = async (req, res) => {
    try {
        const contacts = new Contacts(req.body);
        await contacts.register();

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

    const contacts = await Contacts.findId(req.params.id);
    if(!contacts) return res.render('404');

    res.render('contactos', { contacts });
}