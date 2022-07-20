const jwt = require('jsonwebtoken');
const User = require('../models/User');

async function isAuth(req,res,next){
    const token = req.headers['x-auth-token'] ;

    if(!token){
        return response({
            res ,
            message : 'Unauthorized',
            status : 401
        })
    }

    try{
        const decode = await jwt.verify(token , config.jwt_key);
        const user =  await User.findOne({ where : {id : decode.id} })
        
        if(!user){
            throw new Error('Unauthorized')
        }

        req.user = user ;
        next()
    }
    catch(err){
        return response({
            res ,
            message : 'Unauthorized',
            status : 401
        })
    }
}

module.exports = isAuth ;