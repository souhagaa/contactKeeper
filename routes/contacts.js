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
router.put('/:id', (req, res) => {
    res.send('Update conatct')
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
router.delete('/:id', (req, res) => {
    res.send('Delete conatct')
})

module.exports = router;