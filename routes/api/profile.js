const express = require('express'),
      router = express.Router(),
      mongoose = require('mongoose'),
      passport = require('passport'),
			
			validateProfileInput = require('../../validation/profile');
			
			User = require('../../models/User'),
      Profile = require('../../models/Profile'),

// @route   GET api/profile
// @desc    Get current user profile
// @access  Private
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
	const errors = {};
	
	Profile.findOne({ user: req.user.id })
		.populate('user', ['name', 'avatar'])
		.then(profile => {
			if(!profile) {
				errors.noProfile = 'There is no profile for this user.';

				return res
					.status(404)
					.json(errors);
			}

			res.json(profile);
		})
		.catch(err => res.status(404).json(err));
});

// @route   POST api/profile
// @desc    Create or update user profile
// @access  Private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
	const { errors, isValid } = validateProfileInput(req.body);
	const profileFields = {};

	if(!isValid) {
		return res
			.status(400)
			.json(errors);
	}

	profileFields.user = req.user.id;

	if(req.body.handle) profileFields.handle = req.body.handle;
	if(req.body.company) profileFields.company = req.body.company;
	if(req.body.website) profileFields.website = req.body.website;
	if(req.body.location) profileFields.location = req.body.location;
	if(req.body.status) profileFields.status = req.body.status;
	
	if(typeof req.body.skills !== 'undefined') {
		profileFields.skills = req.body.skills.split(',');
	}

	if(req.body.bio) profileFields.bio = req.body.bio;
	if(req.body.githubUsername) profileFields.githubUsername = req.body.githubUsername;
	
	profileFields.social = {};

	if(req.body.youtube) profileFields.social.youtube = req.body.youtube;
	if(req.body.twitter) profileFields.social.twitter = req.body.twitter;
	if(req.body.facebook) profileFields.social.facebook = req.body.facebook;
	if(req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
	if(req.body.instagram) profileFields.social.instagram = req.body.instagram;

	Profile.findOne({ user: req.user.id })
		.then(profile => {
			// Editing profile
			if(profile) {
				Profile.findOneAndUpdate(
					{ user: req.user.id },
					{ $set: profileFields },
					{ new: true }
				)
				.then(profile => res.json(profile));
			}
			// Creating a new profile
			else {
				Profile
					.findOne({ handle: profileFields.handle })
					.then(profile => {
						// Check if handle already exists
						if(profile) {
							error.handle = 'That handle already exists.';
							res.status(400).json(errors);
						}

						new Profile(profileFields)
							.save()
							.then(profile => {
								res.json(profile);
							});
					});
			}
		});
});

module.exports = router;