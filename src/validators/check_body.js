const { check } = require("express-validator");

function check_register(){
    return [
        check('name')
            .notEmpty().withMessage('name is reuqired')
        ,
        check('email')
            .notEmpty().withMessage('email is reuqired')
            .isEmail().withMessage('email is not valid')
        ,
        check('password')
            .notEmpty().withMessage('password is reuqired')
            .isLength({ min : 5 }).withMessage('password is no secure')
    ]
}

function check_login(){
    return [
        check('email')
            .notEmpty().withMessage('email is reuqired')
            .isEmail().withMessage('email is not valid')
        ,
        check('password')
            .notEmpty().withMessage('password is reuqired')
            .isLength({ min : 5 }).withMessage('password is no secure')
    ]
}

function check_verify(){
    return [
        check('email')
            .notEmpty().withMessage('email is reuqired')
        ,
        check('verify_code')
            .notEmpty().withMessage('verify code is reuqired')
        ,
    ]
}

function check_post(){
    return [
        check('title')
            .notEmpty().withMessage('title is reuqired')
        ,
        check('content')
            .notEmpty().withMessage('content code is reuqired')
        ,
    ]
}

module.exports = {
    check_register ,
    check_login ,
    check_verify ,
    check_post
}