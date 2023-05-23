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
            return res.status(404).json({ msg: 'Post not found!' });
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
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ msg: 'Post not found!' });
        }

        //Checking if the delete request for a post is sent
        //by the same user as the post creator
        if (post.user.toString() !== req.user.id) {
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
        console.log(error);
        if (error.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Post not found!' });
        }
        res.status(500).send({ msg: 'Server Error!' });
    }
})




// @route       POST api/posts/like/:postId
// @desc        Like/Unlike a post by its id
// @access      Private
router.post('/like/:postId', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);

        if (!post) {
            return res.status(404).json({ msg: 'Post not found!' });
        }

        //We get the index of current user if the user's id
        //is in the list of likes array of the post
        const index = post.likes.findIndex(like => {
            return like.user.toString() === req.user.id;
        });

        //If the user has not liked the post, we add the user's id
        //to the likes array. And if the user has already liked the
        //post, we remove the user's id from the likes array.
        if (index == -1) {
            post.likes.push({ user: req.user.id });
        } else {
            post.likes.splice(index, 1);
        }

        await post.save();

        res.json(post.likes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error!');
    }
})



// @route       POST api/post/comment/:post_id
// @desc        Comment on a post
// @access      Private
router.post('/comment/:post_id', [auth,
    check('text', 'Text is required to comment').not().isEmpty()
], async (req, res) => {
    
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try{
        const user = await User.findById(req.user.id).select('-password');
        const post = await Post.findById(req.params.post_id);

        const newComment = {
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id
        }

        post.comments.push(newComment);

        await post.save();

        res.status(201).json(post.comments);

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error!');
    }
})




// @route       DELETE api/post/comment/:post_id/:comment_id
// @desc        Delete a comment of a post by their id
// @access      Private
router.delete('/comment/:post_id/:comment_id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.post_id);

        if (!post) {
            return res.status(404).json({ msg: 'Post does not exists!' });
        }

        //Retrieve the comment to delete
        const comment = post.comments.find(comment => comment.id === req.params.comment_id);

        //Checking if the comment exists
        if (!comment) {
            return res.status(404).json({ msg: 'Comment does not exists!' });
        }

        //Check user
        if (comment.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User is not authorized!' });
        }


        //Get index of comment to remove
        const indexOfCommentToRemove = post.comments.findIndex(comment => {
            return comment.user.toString() === req.user.id;
        });

        post.comments.splice(indexOfCommentToRemove, 1);

        await post.save();

        res.json(post.comments);

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error!');
    }
})


module.exports = router;