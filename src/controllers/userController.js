const User = require('../models/User');
const Post = require('../models/Post');
const _ = require('lodash') ;
const fs = require('fs');

// Define the relationship between the user and the post
User.hasMany(Post)
Post.belongsTo(User);

exports.index = async (req,res)=>{
    response({
        res ,
        data : _.pick(req.user , ['avatar' , 'name' , 'email'])
    })
}

exports.updateUser = async (req,res)=>{
    let { name , password , avatar } = req.body ;

    if(!req.file){
        avatar = null 
    }
    else{
        avatar = req.file.path.replace(/\\/g , '/').substring(6) 
    }

    User.update({name , password , avatar}, { where : {id : req.user.id} })
    .then(()=>{
        response({
            res,
            message : 'successfuly updated' ,
        })
    })
    .catch((err)=>{
        response({status:500});
    })
}

exports.deleteAvatar = async (req,res)=>{
    let filePath = `${process.cwd()}/public/${req.user.avatar}` ;
    
    fs.unlink(filePath , (err)=>{
        User.update({avatar : null},{ where : { id : req.user.id }})
        .then(()=>{
            response({
                res,
                message : 'successFully avatar deleted'
            })
        })
    })
}

// post controller 
exports.getAllPost = async (req,res)=>{
    Post.findAll({
        include : [{
            model : User ,
            required : true
        }]
    })
    .then((data)=>{
        const result = data.map(post=>{
            return _.pick(post , ['id' , 'img', 'title' , 'content' , 'like' , 'createdAt' , 'updatedAt'])
        })
        
        response({
            res,
            data : result
        })
    })
    .catch((err)=>{
        console.error(err)
        response({
            res ,
            message : 'there is no post' ,
            status : 412
        })
    })
}
 
exports.getPostWithId = async (req,res)=>{
    const id = req.params.id ;
    
    Post.findOne({where : { id : id }})
    .then((post)=>{
        if(!post)return response({res , message : 'not found' , status : 404});
        response({
            res,
            data : _.pick(post , ['id' , 'img', 'title' , 'content' , 'like' , 'createdAt' , 'updatedAt'])
        })
    })
}

exports.createPost = async (req,res)=>{
    let { title , content , img} = req.body ;


    if(!req.file){
        img = null 
    }
    else{
        img = req.file.path.replace(/\\/g , '/').substring(6) 
    }


    Post.create({
        title ,
        content ,
        img , 
        userId : req.user.id
    })
    .then((data)=>{
        response({
            res ,
            message : "successfuly created",
            data : data,
            status : 201
        })
    })
    .catch((err)=>{
        console.error(err)
        response({res , status:500})
    })
}

exports.updatePost = async (req,res)=>{
    const id = req.params.id ; 
    const { title , content , img} = req.body ; 
    
    Post.update({title , content} , {where : {id:id}})
    .then(()=>{
        response({
            res,
            message : 'successFuly updated' ,
        })
    })
    .catch((err)=>{
        response({res , status:500})
    })
}

exports.deletePost = async (req,res)=>{
    const id = req.params.id ;

    const found = await Post.findOne({where : {id : id}}) ;

    if(!found){
        return response({
            res,
            message : 'not found' ,
            status : 404
        })
    }

    let filePath = `${process.cwd()}/public/${found.img}` ;

    fs.unlink(filePath , (err)=>{
        found.destroy()
        .then(()=>{
            response({
                res ,
                message : 'successFully deleted'
            })
        })
    })
};