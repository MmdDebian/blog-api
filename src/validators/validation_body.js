const { validationResult } = require('express-validator');


function validationBody(req,res){
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.status(400).send({
            message : 'validation error' , 
            data : errors.array().map(err=>err.msg)
        })

        return false
    }

    return true 
}


function validate(req,res,next){
    if(!validationBody(req,res)){
        return ;
    }

    next()
}

module.exports = validate ;