const Contacts = require('../models/ContactsModel');

exports.index = async(req, res) => {  
    const userId = req.session.user.email;
    const user = req.session.user;
    const contacts = await Contacts.findContacts(userId); 
    res.render('index', { contacts, user });
};

