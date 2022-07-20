const { DataTypes , Model  , UUIDV4} = require('sequelize');
const sequelize = require('../db/connection');

class User extends Model {} ;

User.init({
    id : {
        type : DataTypes.STRING ,
        primaryKey : true , 
        defaultValue : UUIDV4
    } ,
    avatar : {
        type : DataTypes.STRING ,
    },
    name : {
        type : DataTypes.STRING , 
        defaultValue : 'user web site'
    }, 
    email : {
        type : DataTypes.STRING(100),
        allowNull : false ,
    } ,
    bio : {
        type : DataTypes.TEXT ,
    } , 
    password : {
        type : DataTypes.STRING , 
        allowNull : false ,
    },
    verify_code : {
        type : DataTypes.INTEGER ,
        defaultValue : null,
    } ,
} ,
{
    modelName : "Users" ,
    sequelize 
}
);

(async()=>{
    await User.sync({ alter : true});
})()

module.exports = User ; 
