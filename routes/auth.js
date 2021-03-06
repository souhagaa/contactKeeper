const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config()
const { check, validationResult } = require('express-validator');

const router = express.Router();
const User = require('../models/User');
const auth = require('../middleware/auth')

/**
 * @swagger
 * /api/auth:
 *   get:
 *     summary: Get logged in user
 *     description: Protected route to get logged in user
 *     responses:
 *      200
*/
router.get('/', auth, async (req, res) => {
    try {

        let user = await User.findById({ _id: req.user.id }).select('-password');
        res.json(user);

    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server error')
    }
})

/**
 * @swagger
 * /api/auth:
 *   post:
 *     summary: Auth user & get token
 *     description: Auth user & get token
 *     responses:
 *      200
*/
router.post('/', [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
    ], async (req, res) => {

        const errors = validationResult(req)
        if(!errors.isEmpty()) {
            return res.status(400).json( {errors: errors.array() })
        }

        const { email, password } = req.body;

        try {

            let user = await User.findOne({ email })

            if(!user) {
                return res.status(400).json({ msg: 'Invalid Credentials' })
            }

            // check the password
            const isMatch = await bcrypt.compare(password, user.password)

            if(!isMatch) {
                return res.status(400).json({ msg: 'Wrong password'})
            }

            const payload = {
                user: {
                    id: user.id
                }
            }

            jwt.sign(payload, process.env.jwtSecret, {
                expiresIn : 360000
            }, (err, token) => {

                if(err) throw err;
                res.json({ token })
            })

        } catch (err) {

            console.error(err.message)
            res.status(500).send('Server error while logging user in')
    
        }

})

module.exports = router;
