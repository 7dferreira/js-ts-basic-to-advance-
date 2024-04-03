const Contacts = require('../models/ContactsModel');

exports.index = async(req, res) => {  
    const contacts = await Contacts.findContacts(); 
    res.render('index', { contacts });
};

