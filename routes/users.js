const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const router = express.Router();
const User = require('../models/User')

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Register a user given name, email and password
 *     description: Registers a user so he can have an account to keep their contacts
 *     responses:
 *      200
*/
router.post('/', [
    check('name', 'Name is required')
        .not()
        .isEmpty(),
    check('email', 'Please include a valid email')
        .isEmail(),
    check('password', 'Please enter a password with 6 or more characters')
        .isLength({ min: 6 })
    ], async (req, res) => {

    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json( {errors: errors.array() })
    }

    const { name, email, password } = req.body;
    try {
        // check if user already exists
        let user = await User.findOne({ email })

        if (user) {
            res.status(400).json({ msg: 'User already exists'})
        } else {

            user = new User({
            name,
            email,
            password
            })

            const salt = await bcrypt.genSalt(10)

            user.password = await bcrypt.hash(password, salt)

            await user.save();

            // object we want to send in the token, we want to send back the user's id
            const payload = {
                user: {
                    id: user.id
                }
            }

            jwt.sign(payload, config.get('jwtSecret'), {
                expiresIn : 360000
            }, (err, token) => {

                if(err) throw err;
                res.json({ token })
            })

            }
        
        
    } catch(err) {
        console.error(err.message)
        res.status(500).send('server error while user registering')
    }
    
})

module.exports = router;