const bcrypt = require('bcryptjs'),
			express = require('express'),
			router = express.Router(),
			jwt = require('jsonwebtoken'),
			gravatar = require('gravatar'),
			passport = require('passport'),
			
			validateRegisterInput = require('../../validation/register'),
			validateLoginInput = require('../../validation/login'),
			
			User = require('../../models/User'),
			keys = require('../../config/keys');

// @route   POST api/user/register
// @desc    Register user
// @access  Public
router.post('/register', (req, res) => {
	const { errors, isValid } = validateRegisterInput(req.body);

	if(!isValid) {
		return res
			.status(400)
			.json(errors);
	}

	User.findOne({ email: req.body.email })
		.then(user => {
			if(user) {
				errors.email = 'This email already exists.';

				return res
					.status(400)
					.json(errors);
			}
			else {
				const avatar = gravatar.url(req.body.email, {
					size: '200',
					rating: 'pg',
					default: 'mm'
				});

				const newUser = new User({
					name: req.body.name,
					email: req.body.email,
					avatar,
					password: req.body.password
				});

				bcrypt.genSalt(10, (err, salt) => {
					bcrypt.hash(newUser.password, salt, (err, hash) => {
						if(err) throw err;
						newUser.password = hash;
						newUser
							.save()
							.then(user => res.json(user))
							.catch(err => console.log(err));
					});
				});
			}
		});
});

// @route   POST api/user/login
// @desc    Return JWT Token
// @access  Public
router.post('/login', (req, res) => {
	const email = req.body.email,
				password = req.body.password,
				{ errors, isValid } = validateLoginInput(req.body);

	if(!isValid) {
		return res
			.status(400)
			.json(errors);
	}

	User
		.findOne({ email })
		.then(user => {
			if(!user) {
				errors.email = 'User not found.';
				
				return res
					.status(404)
					.json(errors);
			}
			bcrypt
				.compare(password, user.password)
				.then(isMatch => {
					if(isMatch) {
						const payload = {
							id: user.id,
							name: user.name,
							avatar: user.avatar
						};

						jwt
							.sign(payload, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
								res.json({ success: true, token: 'Bearer ' + token
							});
						});
					}
					else {
						errors.password = 'Password is incorrect.';

						return res
							.status(400)
							.json(errors);
					}
				});
		});
});

// @route   GET api/user/current
// @desc    Return current user
// @access  Private
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
	res.json({
		id: req.user.id,
		name: req.user.name,
		email: req.user.email
	});
});

module.exports = router;