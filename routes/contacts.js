const express = require('express');
const router = express.Router();

// @route       GET api/contacts
// @desc        Get all users contacts
// @access      Private
router.get('/', (req, res) => {
    res.send('Get all ocntacts')
})

// @route       POST api/contacts
// @desc        Add new conatct
// @access      Private
router.post('/', (req, res) => {
    res.send('Add conatct')
})

// @route       PUT api/contacts/:id
// @desc        Update conatct
// @access      Private
router.put('/:id', (req, res) => {
    res.send('Update conatct')
})

// @route       DELETE api/contacts/:id
// @desc        Delete conatct
// @access      Private
router.delete('/:id', (req, res) => {
    res.send('Delete conatct')
})

module.exports = router;