const express = require('express');
const router = express.Router();
const validate = require('../validators/validation_body');

const { 
    check_login, 
    check_register, 
    check_verify 
} = require('../validators/check_body');

const { 
    register , 
    login , 
    verifyWithCode,
} = require('../controllers/authController');


router.post(
    '/register' ,
    check_register() ,
    validate ,
    register
)


router.post(
    '/login' ,
    check_login() ,
    validate ,
    login
)

router.post(
    '/verify',
    check_verify() ,
    validate ,
    verifyWithCode
)

module.exports = router ;