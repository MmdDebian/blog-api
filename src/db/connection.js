const { Sequelize  } = require('sequelize') ;

const sequelize = new Sequelize(
    config.db.database , 
    config.db.username, 
    config.db.password ,
    {
        host : config.db.host,
        port : config.db.port ,
        dialect : 'mysql' ,
        logQueryParameters : true ,
        pool : {
            max : 5 ,
            min : 0 ,
            acquire : 3000 ,
            idle : 10000
        }
    } ,
)

module.exports = sequelize ;