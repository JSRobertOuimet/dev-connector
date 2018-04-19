const express = require('express'),
      router = express.Router(),
      mongoose = require('mongoose'),
			passport = require('passport'),

			validatePostInput = require('../../validation/post'),

			Profile = require('../../models/Profile');
			Post = require('../../models/Post');

// @route   GET api/posts
// @desc    Get all posts
// @access  Public
router.get('/', (req, res) => {
	Post
		.find()
		.sort({ data: -1 })
		.then(posts => res.json(posts))
		.catch(err => res.status(404).json({ noPostsFound: 'No post found.' }));
});

// @route   GET api/posts/:id
// @desc    Get specific post
// @access  Public
router.get('/:id', (req, res) => {
	Post
		.findById(req.params.id)
		.then(post => res.json(post))
		.catch(err => res.status(404).json({ noPostFound: 'No post found.' }));
});

// @route   POST api/posts
// @desc    Create post
// @access  Private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
	const { errors, isValid } = validatePostInput(req.body);

	if(!isValid) {
		return res.status(400).json(errors);
	}

	const newPost = new Post({
		user: req.user.id,
		text: req.body.text,
		name: req.body.name,
		avatar: req.body.avatar
	});

	newPost
		.save()
		.then(post => res.json(post));
});

// @route   POST api/posts/:id
// @desc    Delete specific post
// @access  Private
router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
	Profile
		.findOne({ user: req.user.id })
		.then(profile => {
			Post
				.findById(req.params.id)
				.then(post => {
					if(post.user.toString() !== req.user.id) {
						res.status(401).json({ notAuthorized: 'User not authorized.' });
					}

					post
						.remove()
						.then(() => res.json({ message: 'Post successfully deleted.' }))
						.catch(err => res.status(404).json({ postNotFound: 'Post not found.'}));
				});
		});
});

module.exports = router;