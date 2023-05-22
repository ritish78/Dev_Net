const express = require('express');
const router = express.Router();
const auth = require('.//..//../middleware/auth');

const { check, validationResult } = require('express-validator');

const User = require('..//..//models/Users');
const Profile = require('..//..//models/Profile');
const Post = require('..//..//models/Post');


// @route       POST api/post
// @desc        Create a post
// @access      Private
router.post('/', [auth,
    check('text', 'Text is required to create a post').not().isEmpty()
], async (req, res) => {
    
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try{
        const user = await User.findById(req.user.id).select('-password');
    
        const newPost = new Post({
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id
        })

        await newPost.save();

        res.status(201).json(newPost);

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error!');
    }
})



// @route       GET api/posts
// @desc        Get all posts
// @access      Private
router.get('/', auth, async (req, res) => {
    try {
        //Sorting by most recent
        const posts = await Post.find().sort({ date: -1 });

        res.json(posts);

    } catch (error) {
        console.error(error.message);
        res.status(500).send({ msg: 'Server Error!' });
    }
})




// @route       GET api/posts/:id
// @desc        Get post by its id
// @access      Private
router.get('/:id', auth, async (req, res) => {
    try {
        
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.staus(404).json({ msg: 'Post not found!' });
        }

        res.json(post);

    } catch (error) {
        console.error(error.message);
        if (error.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Post not found!' });
        }
        res.status(500).send({ msg: 'Server Error!' });
    }
})


// @route       DELETE api/posts/:id
// @desc        Delete a posts
// @access      Private
router.delete('/:id', auth, async (req, res) => {
    try {
        const posts = await Post.findById(req.params.id);

        console.log(posts);

        //Checking if the delete request for a post is sent
        //by the same user as the post creator
        if (posts.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User is not authorized!' });
        }

        //We are deleting post now after checking if the current user
        //is the creator of post. We could implement it as the first
        //statement of try catch block but it will delete the post
        //regardless of looking into user and post relations.
        await Post.findByIdAndDelete(req.params.id);

        res.json({ msg: 'Deleted post successfullt' })

    } catch (error) {
        console.error(error.message);
        if (error.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Post not found!' });
        }
        res.status(500).send({ msg: 'Server Error!!' });
    }
})



module.exports = router;