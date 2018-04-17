const express = require('express'),
			router = express.Router(),
			gravatar = require('gravatar'),
			bcryptjs = require('bcryptjs'),
			User = require('../../models/User');

// @route   GET api/user/test
// @desc    Test User route
// @access  Public
router.get('/test', (req, res) => res.json({ message: 'User works.' }));

// @route   GET api/user/register
// @desc    Register user
// @access  Public
router.post('/register', (req, res) => {
	User.findOne({ email: req.body.email })
		.then(user => {
			if(user) {
				return res.status(400).json({ email: 'This email already exists.' });
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

				bcryptjs.genSalt(10, (err, salt) => {
					bcryptjs.hash(newUser.password, salt, (err, hash) => {
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

module.exports = router;