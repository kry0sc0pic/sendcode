require('dotenv').config()
const express = require('express');
const requestIp = require('request-ip');
const moment = require('moment');
const app = express();
const nodemailer = require('nodemailer');
const { default: axios } = require('axios');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: process.env.SENDER,
        pass: process.env.PASS
    }
});

app.use(express.json());
app.post('/api/sendMail',async (req,res)=>{
    
    var ip = requestIp.getClientIp(req);
    console.log(ip+" | POST /sendMail");
    try {
        var email = req.body.email;
        var code = req.body.code;
        if(code && email){
            await transporter.sendMail({
            
                from: "IDWTGMEPTMS",
                to: email,
                subject: "Uploaded Code",
                text: `Hello!\nYour Source Code File is attached below\n\nThank you for using IDWTGMEPTMS!`,
                attachments: [
                  {
                    filename: "code.py",
                    content: code
                  }
                ],
            });
            if(process.env.LOGGING_ENABLED==1){
                try {
                    axios.post(process.env.LOG_WEBHOOK,{
                        content: `\`${ip}\` | POST /sendMail\n\`${moment().toString()}\`\nReciever: \`${email}\`\nStatus Code: \`200\` ✔️\nUploaded Code: \n\`\`\`py\n${code}\n\`\`\``
                    });
                } catch(e){
                    console.log("Discord Ratelimit:",e)
                }
            }
            res.status(200).send({
                message: "Mail Sent",
                error: null
            });
        } else {
            if(process.env.LOGGING_ENABLED==1){
                try {
                    axios.post(process.env.LOG_WEBHOOK,{
                        content: `\`${ip}\` | POST /sendMail\n\`${moment().toString()}\`\nReciever: \`${email}\`\nStatus Code: \`400\` ❌\nError:\n\`\`\`\nEmpty Variables\n\`\`\`Uploaded Code: \n\`\`\`py\n${code}\n\`\`\``
                    });
                } catch (error) {
                    console.log("Discord Ratelimit",error)
                }
            }
           
            res.status(400).send({
                message: "Invalid Request",
                error: null
            });
        }
        
    } catch(e){
        console.log(e);
        if(process.env.LOGGING_ENABLED==1){
            try {
                axios.post(process.env.LOG_WEBHOOK,{
                    content: `\`${ip}\` | POST /sendMail\n\`${moment().toString()}\`\nReciever: \`${email}\`\nStatus Code: \`500\` ❌\nError:\n\`\`\`\n${e}\n\`\`\`Uploaded Code: \n\`\`\`py\n${code}\n\`\`\``
                });
            } catch(e){
                console.log("Discord Ratelimit");
            }
        }
        res.status(500).send({
            error: e,
            message: "Internal Server Error"
        });
        console.log(e);
    }
});

app.use('/',express.static('./build'));

app.listen(process.env.PORT, () => {
    console.log(`idwtgmeptms listening on port ${process.env.PORT}!`);
});