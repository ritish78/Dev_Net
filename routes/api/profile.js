const express = require('express');
const router = express.Router();
const request = require('request');
const config = require('config');
const auth = require('../../middleware/auth');
const { check, validationResult, header } = require('express-validator');


const Profile = require('../../models/Profile');
const User = require('../../models/Users');
const Post = require('../../models/Post');


// @route       GET api/profile/me
// @desc        Get current user's profile
// @access      Private
router.get('/me', auth, async (req, res) => {
    try {
        const profile = await Profile
                            .findOne({ user: req.user.id })
                            .populate('user', ['name', 'avatar']);
        
        if (!profile) {
            return res.status(400).json({ msg: 'No profile found for this user' });
        }

        res.json(profile);

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error!');
    }
})



// @route       POST api/profile
// @desc        Create or update current user's profile
// @access      Private
router.post('/', [auth, [
    check('status', 'Status is required').not().isEmpty(),
    check('skills', 'Skills is required').not().isEmpty()
]], async (req, res) => {
    
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }


    //Build Profile object
    const profileFields = {};
    profileFields.social = {};
    profileFields.user = req.user.id;


    const fieldsToEnterProfile = [ 'company', 'website', 'location', 'status', 'skills', 'bio', 'githubusername', 'discord', 'youtube', 'twitter', 'linkedin', 'facebook' ];
    const userInputData = Object.keys(req.body);

    for (key of userInputData) {
        if (fieldsToEnterProfile.includes(key)) {
            if (key === 'skills' && typeof req.body.skills !== 'undefined') {
                profileFields[key] = req.body.skills.split(',');
            } else if (['discord', 'youtube', 'twitter', 'linkedin', 'facebook'].includes(key) && req.body[key]) {
                profileFields.social[key] = req.body[key];
            } else if (req.body[key]) {
                profileFields[key] = req.body[key];
            }
        }
    }


    try {
        let profile = await Profile.findOne({ user: req.user.id });

        console.log('Profile of the current user: ', profile);
        
        if (profile) {
            //Updating the profile if profile exists
            profile = await Profile.findOneAndUpdate(
                    { user: req.user.id }, 
                    { $set: profileFields },
                    { new: true }
                );

            return res.status(200).json(profile);
        }

        //Creating the new user if profile does not exists
        profile = new Profile(profileFields);

        
        await profile.save();

        res.status(201).json(profile);

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error!');
    }
})



// @route       GET api/profile
// @desc        Get all profiles
// @access      Public
router.get('/', async (req, res) => {
    try {
        const profiles = await Profile.find().populate({ model: 'user', path: 'user', select: ['name', 'avatar']});
        res.status(200).json(profiles);

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: error.message });
    }
})


// @route       GET api/profile/user/:user_id
// @desc        Get profile by the user ID
// @access      Public
router.get('/user/:user_id', async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.params.user_id }).populate({ model: 'user', path: 'user', select: ['name', 'avatar']});

        if (!profile) {
            return res.status(400).json({ msg: 'Profile does not exists of the searched user' })
        }
        res.status(200).json(profile);

    } catch (error) {
        console.error(error.message);

        if (error.kind == 'ObjectId') {
            return res.status(400).json({ msg: 'Profile does not exists of the searched user' });
        }

        res.status(500).json({ msg: error.message });
    }
})



// @route       DELETE api/profile
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




// @route       POST api/profile/experience
// @desc        Add profile experience
// @access      Private
router.post('/experience', [auth,
    check('title', 'Title is required').not().isEmpty(),
    check('company', 'Company is required').not().isEmpty(),
    check('from', 'Starting date is required').not().isEmpty()
], async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { 
        title, 
        company, 
        location, 
        from, 
        to, 
        current, 
        description 
    } = req.body;

    const newExperience = {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    };

    
    try {
        
        const profile = await Profile.findOne({ user: req.user.id });
        
        console.log(profile);

        profile.experience.push(newExperience);


        await profile.save();

        return res.status(201).json(profile);

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error!');
    }

});



// @route       POST api/profile/experience/:exp_id
// @desc        Update user's profile experience
// @access      Private
router.post('/experience/:exp_id', auth, async (req, res) => {

    const {
        title, 
        company, 
        location, 
        from, 
        to, 
        current, 
        description 
    } = req.body;

    try {
        const updatedExperience = {
            title, 
            company, 
            location, 
            from, 
            to, 
            current, 
            description 
        };

        const profile = await Profile.findOne({ user: req.user.id });
        
        const experienceIndexToUpdate = profile.experience
                                    .map(exp => exp.id)
                                    .indexOf(req.params.exp_id);
        
        //If we don't have the same experience id in MongoDB as user passed in
        //parameters, we don't update anything. 
        if (experienceIndexToUpdate === -1) {
            return res.status(400).json({ msg: 'Invalid Experience ID!' });
        }
        
        profile.experience.splice(experienceIndexToUpdate, 1, updatedExperience);

        await profile.save();

        res.json(profile);

    } catch (error) {
        console.error(error.message);
        res.status(500).send({ msg: 'Server Error!!' });
    }
});




// @route       DELETE api/profile/experience/:exp_id
// @desc        DELETE user's profile experience by their id
// @access      Private
router.delete('/experience/:exp_id', auth, async (req, res) => {
    try {

        const profile = await Profile.findOne({ user: req.user.id });

        const experienceIndexToDelete = profile.experience
                                        .map(exp => exp.id)
                                        .indexOf(req.params.exp_id);
        
        //If we don't have the same experience id in MongoDB as user passed in
        //parameters, we don't update anything. 
        if (experienceIndexToDelete === -1) {
            return res.status(400).json({ msg: 'Invalid Experience ID!' });
        }

        profile.experience.splice(experienceIndexToDelete, 1);

        await profile.save();

        res.json(profile);

    } catch (error) {
        console.error(error.message);
        res.status(400).json({ msg: 'Deletion of experience unsuccessful' });
    }
})



// @route       POST api/profile/education
// @desc        Add profile education
// @access      Private
router.post('/education', [auth,
    check('school', 'School name is required').not().isEmpty(),
    check('degree', 'Degree is required').not().isEmpty(),
    check('fieldOfStudy', 'degree is required').not().isEmpty(),
    check('from', 'Starting date is required').not().isEmpty()
], async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { 
        school, 
        degree, 
        fieldOfStudy, 
        from, 
        to, 
        current, 
        description 
    } = req.body;

    const newEducation = {
        school,
        degree,
        fieldOfStudy,
        from,
        to,
        current,
        description
    };

    try {

        const profile = await Profile.findOne({ user: req.user.id });

        profile.education.unshift(newEducation);


        await profile.save();

        return res.status(201).json(profile);

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error!');
    }

});



// @route       POST api/profile/education/:edu_id
// @desc        Update user's profile education info
// @access      Private
router.post('/education/:edu_id', auth, async (req, res) => {

    const {
        school, 
        degree, 
        fieldOfStudy, 
        from, 
        to, 
        current, 
        description 
    } = req.body;

    try {
        const updatedEducation = {
            school, 
            degree, 
            fieldOfStudy, 
            from, 
            to, 
            current, 
            description 
        };

        const profile = await Profile.findOne({ user: req.user.id });
        
        const educationIndexToUpdate = profile.education
                                    .map(edu => edu.id)
                                    .indexOf(req.params.edu_id);
        
        //If we don't have the same education id in MongoDB as user passed in
        //parameters, we don't update anything. 
        if (educationIndexToUpdate === -1) {
            return res.status(400).json({ msg: 'Invalid Education ID!' });
        }
        
        profile.education.splice(educationIndexToUpdate, 1, updatedEducation);

        await profile.save();

        res.json(profile);

    } catch (error) {
        console.error(error.message);
        res.status(500).send({ msg: 'Server Error!' });
    }
});




// @route       DELETE api/profile/education/:edu_id
// @desc        DELETE user's profile education by their id
// @access      Private
router.delete('/education/:edu_id', auth, async (req, res) => {
    try {

        const profile = await Profile.findOne({ user: req.user.id });

        const educationIndexToDelete = profile.education
                                        .map(edu => edu.id)
                                        .indexOf(req.params.edu_id);
        
        //If we don't have the same education id in MongoDB as user passed in
        //parameters, we don't update anything. 
        if (educationIndexToDelete === -1) {
            return res.status(400).json({ msg: 'Invalid Education ID!' });
        }

        profile.education.splice(educationIndexToDelete, 1);

        await profile.save();

        res.json(profile);

    } catch (error) {
        console.error(error.message);
        res.status(400).json({ msg: 'Deletion of education unsuccessful' });
    }
})



// @route       GET api/profile/github/:username
// @desc        Get user's github repo from their username
// @access      Public
router.get('/github/:username', (req, res) => {
    try {

        const options = {
            uri: `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${config.get('githubClientID')}&client_secret=${config.get('githubSecret')}`,
            method: 'GET',
            headers: { 'user-agent': 'node-js' }
        };

        request(options, (error, response, body) => {
            if (error) console.error(error);

            if (response.statusCode !== 200) {
                return res.status(404).json({ msg: 'Github profile was not found!' });
            }

            res.json(JSON.parse(body));
        })


    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error!');
    }
})


module.exports = router;