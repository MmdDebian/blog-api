const fs = require('fs') ;
const path = require('path');

function isCheckedFile(req,res,next){
    const file = req.file ; 

    if(!file){
        return next()
    }

    const fileExtension = ['.png' , '.gif' , '.jpg' , '.jpeg'] ;

    if(!fileExtension.includes(path.extname(file.filename))){

        const filePath = `${process.cwd()}/public/uploads/${file.filename}`

        fs.unlink(filePath , (err)=>{
            return response({
                res,
                message : 'invalid file format' ,
                status : 400
            })
        })
    }
    else{
        next()
    }
}

module.exports = isCheckedFile ;