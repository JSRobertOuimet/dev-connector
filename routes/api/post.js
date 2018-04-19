const express = require('express'),
      router = express.Router(),
      mongoose = require('mongoose'),
			passport = require('passport'),
			
			validatePostInput = require('../../validation/post'),

			Post = require('../../models/Post');

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

module.exports = router;