const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require("../models/User");
const sendMail = require('../services/mail');
const generateOTP = require('../utils/otp');

exports.register = async (req,res)=>{
    let { name , email , password } = req.body ;

    // find user by email 
    const user = await User.findOne({where : {email : email}});

    if(user){
        return response({
            res ,
            message : 'email not valid',
            status : 409
        })
    }

    password = bcrypt.hashSync(password , 12);

    const newUser = new User({
        name ,
        email ,
        password ,
        verify_code : generateOTP() ,
    });

    const result = await newUser.save();
    
    sendMail('verific_register' , {code:result.verify_code , username:result.name} , result.email)
    .then(()=>{
        return response({
            res,
            message : 'Please check the email box' ,
            data : {
                name : result.name ,
                email : result.email ,   
            },
            status : 201
        })
    })
    .catch((err)=>{
        console.error('Error sending verific email ' + err);
        response({res ,status:500});
    })

    // code is invalid in 10 minutes
    setTimeout(async()=>{
        newUser.verify_code = null;
        await newUser.save() ;
    },600000)
}

exports.login = async (req,res)=>{
    let { email , password } = req.body ;

    const user = await User.findOne({where : {email : email}});

    if(!user){
        return response({
            res ,
            message : 'email or password is not valid' ,
            staus : 400
        });
    }

    const isValid = await bcrypt.compare(password , user.password);

    if(!isValid){
        return response({
            res ,
            message : 'email or password is not valid' ,
            status : 400
        });
    }


    user.verify_code = generateOTP(); 
    
    const result = await user.save();

    sendMail('verific_login' , {code:result.verify_code , username:result.name} , result.email)
    .then(()=>{
        response({
            res,
            message : 'Please check the email box' ,
            data : {
                name : result.name ,
                email : result.email ,   
            },
        })
    })
    .catch((err)=>{
        response({res , status : 500})
    })


    // code is invalid in 50 milliseconds
    setTimeout(async()=>{
        user.verify_code = null;
        await user.save() ;
    },60000)
}


exports.verifyWithCode = async (req,res)=>{
    let { email , verify_code } = req.body ;

    let user = await User.findOne({ where : { email : email }});

    if(!user){
        return response({
            res ,
            message : 'email is not valid'
        })
    }

    if(verify_code != user.verify_code){
        return response({
            res,
            message : 'the verific code is not valid !' ,
            status : 400
        })
    }

    user.verify_code = null ;
    await user.save();

    const token = await jwt.sign({id:user.id} , config.jwt_key , {expiresIn : '20h'});

    response({
        res ,
        message : 'success verification' ,
        data : {
            token
        }
    })
}

