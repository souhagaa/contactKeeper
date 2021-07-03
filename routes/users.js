const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const User = require('../models/User')

// @route       POST api/users
// @desc        Register a user
// @access      Public

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Register a user
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
        .isLength({ min: 6})
    ], (req, res) => {

    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        console.log("error api/users");
        return res.status(400).json( {errors: errors.array() })
    }
    res.send('passed')
})

module.exports = router;