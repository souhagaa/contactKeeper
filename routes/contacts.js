const express = require('express');
const { check, validationResult } = require('express-validator');

const User = require('../models/User')
const Contact = require('../models/Contact')

const auth = require('../middleware/auth')

const router = express.Router();

/**
 * @swagger
 * /api/contacts:
 *   get:
 *     summary: Get all user's contacts
 *     description: Protected route to get all user's contacts
 *     responses:
 *      200
*/
router.get('/', auth, async (req, res) => {
    
    try {
        // We're using the auth middleware so we have access 
        // to the user through req.user
        const contacts = await Contact.find({ user: req.user.id}).sort({ date: -1})
        res.json(contacts)

    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server error while fetching contacts')
    }

})

// @route       POST api/contacts
// @desc        Add new conatct
// @access      Private
router.post('/', [ auth, [
    check('name', 'Name is required').not().isEmpty()
] ],async(req, res) => {
     const errors = validationResult(req)
        if(!errors.isEmpty()) {
            return res.status(400).json( {errors: errors.array() })
        }
    const { name, email, phone, type} = req.body;

    try {

        const newContact = new Contact({
            name, 
            email, 
            phone, 
            type,
            user: req.user.id
        })

        const contact = await newContact.save()
        res.status(201).json(contact)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server error while creating new contact')
    }



})

/**
 * @swagger
 * /api/contacts/:id:
 *   put:
 *     summary: Update conatct
 *     description: Protected route to update a conatct
 *     responses:
 *      200
*/
router.put('/:id', auth, async(req, res) => {
    const { name, email, phone, type} = req.body;

    // Build conatct object
    const contactFields = {}
    if(name) contactFields.name = name;
    if(email) contactFields.email = email;
    if(phone) contactFields.phone = phone;
    if(type) contactFields.type = type;

    try {

        let contact = await Contact.findById(req.params.id)

        if(!contact) return res.status(404).json({msg: 'Contact not found'})

        // Make sure user owns the contact
        if(contact.user.toString() !== req.user.id){
            return res.status(401).json({msg: 'Not authorized'})
        }

        contact = await Contact
            .findByIdAndUpdate(req.params.id, 
            {$set: contactFields},
            {new: true});
        
        res.json(contact)

    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server error while updating contact')
    }
})

/**
 * @swagger
 * /api/contacts/:id:
 *   delete:
 *     summary: Delete conatct
 *     description: Protected route to delete conatct
 *     responses:
 *      200
*/
router.delete('/:id', auth, async(req, res) => {

    try {

        let contact = await Contact.findById({_id: req.params.id})

        if(!contact) return res.status(404).json({msg: 'Contact not found'})
        // Make sure user owns the contact
        if(contact.user.toString() !== req.user.id){
            return res.status(401).json({msg: 'Not authorized'})
        }

        contact = await Contact.findByIdAndRemove(req.params.id);

        res.status(200).json({ msg: 'Contact deleted'})
       } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error while updating contact')
       }
    
})

module.exports = router;