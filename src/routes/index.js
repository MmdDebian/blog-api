const express = require('express');
const error = require('../middlewares/error');
const router = express.Router();

router.use('/auth' , require('./auth'));
router.use('/user' , require('./user'));
router.use('/post' , require('./post'));
router.use(error);
module.exports = router ;