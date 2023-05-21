const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const User = require('../../models/Users');


// @route       GET api/auth
// @desc        Get user info
// @access      Private
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error!');
    }
})


// @route       POST api/auth
// @desc        Authenticate user and get token
// @access      Private
router.post('/', [
    check('email', 'Email is required').isEmail(),
    check('password', 'Please enter a valid password').exists()
], async (req, res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        //If there are errors
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;
    console.log(req.body);


    try {
        let user = await User.findOne({ email });

        //Check if user exists
        if (!user) {
            return res.status(400).json({ errors: [ { msg: 'Invalid Credentials!' } ] });
        }
    
        //Checking if the hash of provided password is same as
        //the hashed password saved in our MongoDB
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ errors: [ { msg: 'Invalid Credentials!' } ] });
        }

        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(
            payload, 
            config.get('jwtSecret'),
            { expiresIn: 360000 },
            (err, token) => {
                if (err) throw err;
                res.json({ token })
            });
    
        //Return JSWT
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error!');
    }

})




module.exports = router;