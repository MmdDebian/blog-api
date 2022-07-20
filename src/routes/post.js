const express = require('express');
const router = express.Router();
const controller = require('../controllers/postController') ;

router.get('/' , controller.searchPost)

module.exports = router ;