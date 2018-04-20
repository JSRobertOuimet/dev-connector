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
	Post.find().sort({ data: -1 })
		.then(posts => res.json(posts))
		.catch(err => res.status(404).json({ noPostsFound: 'No post found.' }));
});

// @route   GET api/posts/:id
// @desc    Get specific post
// @access  Public
router.get('/:id', (req, res) => {
	Post.findById(req.params.id)
		.then(post => res.json(post))
		.catch(err => res.status(404).json({ noPostFound: 'No post found.' }));
});

// @route   POST api/posts
// @desc    Create post
// @access  Private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
	const { errors, isValid } = validatePostInput(req.body);

	if(!isValid) {
		res.status(400).json(errors);
	}

	const newPost = new Post({
		user: req.user.id,
		text: req.body.text,
		name: req.body.name,
		avatar: req.body.avatar
	});

	newPost.save()
		.then(post => res.json(post));
});

// @route   POST api/posts/:id
// @desc    Delete specific post
// @access  Private
router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
	Profile.findOne({ user: req.user.id })
		.then(profile => {
			Post.findById(req.params.id)
				.then(post => {
					if(post.user.toString() !== req.user.id) {
						res.status(401).json({ notAuthorized: 'User not authorized.' });
					}

					post.remove()
						.then(() => res.json({ message: 'Post successfully deleted.' }));
					})
					.catch(err => res.status(404).json({ postNotFound: 'Post not found.'}));
		});
});

// @route   POST api/posts/like/:id
// @desc    Like post
// @access  Private
router.post('/like/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
	Profile.findOne({ user: req.user.id })
		.then(profile => {
			Post.findById(req.params.id)
				.then(post => {
					if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
						res.status(400).json({ alreadyLiked: 'User already liked this post.' });
					}

					post.likes.unshift({ user: req.user.id });
					post.save().then(post => res.json(post));
				})
				.catch(err => res.status(404).json({ postNotFound: 'Post not found.'}));
		});
});

// @route   POST api/posts/unlike/:id
// @desc    Unlike post
// @access  Private
router.post('/unlike/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
	Profile.findOne({ user: req.user.id })
		.then(profile => {
			Post.findById(req.params.id)
				.then(post => {
					if(post.likes.filter(like => like.user.toString() === req.user.id).length = 0) {
						res.status(400).json({ notLikedYet: 'You have not yet liked this post.' });
					}

					const removeIndex = post.likes
						.map(item => item.user.toString())
						.indexOf(req.user.id);

					post.likes.splice(removeIndex, 1);
					post.save().then(post => res.json(post));
				})
				.catch(err => res.status(404).json({ notLikedYet: 'You have not yet liked this post.'}));
		});
});

// @route   POST api/posts/comments/:id
// @desc    Add comment to post
// @access  Private
router.post('/comments/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
	const { errors, isValid } = validatePostInput(req.body);

	if(!isValid) {
		res.status(400).json(errors);
	}

	Post.findById(req.params.id)
		.then(post => {
			const newComment = {
				text: req.body.text,
				name: req.body.name,
				avatar: req.body.avatar,
				user: req.user.id
			};

			post.comments.unshift(newComment);
			post.save()
				.then(post => res.json(post));
		})
		.catch(err => res.status(404).json({ postNotFound: 'No post found.' }));
});

// @route   DELETE api/posts/comment/:id/:comment_id
// @desc    Delete comment from post
// @access  Private
router.delete('/comment/:id/:comment_id', passport.authenticate('jwt', { session: false }), (req, res) => {
	Post.findById(req.params.id)
		.then(post => {
			if(post.comments.filter(comment => comment._id.toString() === req.params.comment_id).length === 0) {
				res.status(404).json({ commentNotExists: 'Comment doesn\'t exist.' });
			}

			const removeIndex = post.comments
				.map(item => item._id.toString())
				.indexOf(req.params.comment_id);

			post.comments.splice(removeIndex, 1);
			post.save()
				.then(post => res.json(post));
		})
		.catch(err => res.status(404).json({ postNotFound: 'No post found.' }));
});

module.exports = router;