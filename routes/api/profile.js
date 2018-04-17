const express = require('express'),
      router = express.Router();

// @route   GET api/profile/test
// @desc    Test Profile route
// @access  Public
router.get('/test', (req, res) => res.json({ message: 'Profile works.' }));

module.exports = router;