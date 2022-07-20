const { DataTypes , Model, UUIDV1 } = require('sequelize');
const sequelize = require('../db/connection');

// createing blog model
class Post extends Model {} ; 

Post.init({
    id : {
        type : DataTypes.STRING ,
        primaryKey : true , 
        defaultValue : UUIDV1
    } ,
    userId : {
        type : DataTypes.STRING ,
        allowNull : false ,
    } ,
    img : { 
        type : DataTypes.STRING ,
    } ,
    title : {
        type : DataTypes.STRING ,
        allowNull : false ,
    } ,
    content : {
        type : DataTypes.TEXT ,
    },
} , { sequelize , modelName : 'posts' });

(async()=>{
    await Post.sync({ alter : true});
})()

module.exports = Post ;