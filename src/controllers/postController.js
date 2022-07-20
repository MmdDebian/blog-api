const Post = require('../models/Post');
const User = require('../models/User');
const { Op } = require('sequelize');
const _ = require('lodash');


exports.searchPost = async (req,res)=>{
    const params = req.query.search ;
    console.log(params)

    Post.findAll({
        include :[{
            model : User ,
            required : true ,
        }],
        where : {
            content : {
                [Op.like] : '%'+params+'%'
            }
        }
    })
    .then((data)=>{
        if(!data)return response({res , message : 'not found' , status : 404});

        const result = data.map(post=>{
            return _.pick(post , ['img','title','content' , 'createdAt','updatedAt' ,'User.name' , 'User.avatar'])
        })

        response({
            res,
            data : result
        })
    })
}