const express = require('express'),
      router = express.Router(),
      mongoose = require('mongoose'),
      passport = require('passport');

// @route   GET api/profile/test
// @desc    Test Profile route
// @access  Public
router.get('/test', (req, res) => res.json({ message: 'Profile works.' }));

// @route   GET api/profile/test
// @desc    Test Profile route
// @access  Public

module.exports = router;