const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const auth = require('..//..//middleware/auth');
const User = require('../../models/Users');
const Profile = require('../../models/Profile');
const Post = require('../../models/Post');



// @route       POST api/users
// @desc        Register user
// @access      Public
router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Email is required').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
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
        if (user) {
            return res.status(400).json({ errors: [ { msg: 'User already exists!' } ] });
        }
    
        //Get users gravatar
        const avatar = gravatar.url(email, {
            s: '200',
            r: 'pg',
            d: 'mm'
        })
        
        user = new User({
            name,
            email,
            avatar,
            password
        });
    
    
        //Encrypt password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        //Saving user to the database
        await user.save();
    

        //Payload for JWT
        //User's id is generated automatically by MongoDB
        //once we save the user to db.
        const payload = {
            user: {
                id: user.id
            }
        }

        //Return JWT
        jwt.sign(
            payload, 
            config.get('jwtSecret'),
            { expiresIn: 360000 },
            (err, token) => {
                if (err) throw err;
                res.json({ token })
            });
    
        //res.send('User registered');
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error!');
    }

})



// @route       DELETE api/users
// @desc        Delete profile, user and posts
// @access      Private
router.delete('/', auth, async (req, res) => {
    try {
        //Remove user's posts
        await Post.findOneAndDelete({ user: req.user.id });

        //Removing profile
        //Profile.findOneAndRemove() deletes the profile and returns the removed profile
        //Profile.findOneAndDelete() deletes the profile but does not return it
        await Profile.findOneAndDelete({ user: req.user.id });

        //Removing user
        await User.findOneAndDelete({ _id: req.user.id });
        

        res.json({ msg: 'User and their profile and posts deleted successfully!' });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: error.message });
    }
})


module.exports = router;