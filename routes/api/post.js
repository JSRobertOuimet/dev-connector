const express = require('express'),
      router = express.Router();

// @route   GET api/post/test
// @desc    Test Post route
// @access  Public
router.get('/test', (req, res) => res.json({ message: 'Post works.' }));

module.exports = router;