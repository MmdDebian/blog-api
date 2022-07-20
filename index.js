global.config = require('./config/configs.json');
global.response = require('./src/utils/response');

const express =require('express') ;
const winston = require('winston');
const database = require('./src/db/connection');

const port = config.http_prot || 3500 ;
const app = express() ;


app.use(express.urlencoded({ extended : false}));
app.use(express.static('public'));
app.use(express.json());


// error handler 
process.on('uncaughtException', (ex)=>{
    console.log('uncaught exception');
    winston.error(ex.message,ex);
    process.exit(1);
});

process.on('unhandledRejection', (ex)=>{
    console.log('unhandleRejection');
    winston.error(ex.message,ex);
    process.exit(1);
});
  
winston.add(new winston.transports.File({filename: 'logfile.log'}));
  


app.use('/api' , require('./src/routes/index'));

app.listen(port , ()=>{
    database.authenticate()
    .then(()=>{
        console.log('connect to database')
    })
    .catch((err)=>{
        console.error(err)
    })

    console.log('app runing on port ' + port)
})