const nodemailer = require('nodemailer');
const ejs = require('ejs');
const templates_directory = `${process.cwd()}/src/services/mail`;

const mail = nodemailer.createTransport({
    host :  config.mail.host ,
    port : config.mail.port, 
    auth : {
        user : config.mail.user ,
        pass : config.mail.pass
    }
})


function sendMail(template_name , data , to){
    return new Promise((resolve , reject)=>{
        ejs.renderFile(`${templates_directory}/${template_name}.ejs` , {data : data} , (err , str)=>{
            if(err){
                console.error('An error occurred on reading ' + template_name + ' mail template' + err);
                return reject()
            }

            mail.sendMail({
                from : 'Async@info.com',
                to : to,
                subject : 'online.shop.service' ,
                html : str ,
            },(err , info)=>{
                if(err) return reject()
                resolve()
            })
        })
    })
}

module.exports = sendMail ;