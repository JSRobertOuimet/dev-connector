const express = require('express'),
      router = express.Router();

// @route   GET api/auth/test
// @desc    Test Auth route
// @access  Public
router.get('/test', (req, res) => res.json({ message: 'Auth works.' }));

module.exports = router;