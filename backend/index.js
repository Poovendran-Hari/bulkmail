const express = require("express")
const cors = require("cors")

const app = express()
app.use(cors())
app.use(express.json())

const nodemailer = require("nodemailer")

app.listen(5000, function () {
    console.log("Server started....")
})

app.post("/sendmail", function (req, res) {

    var msg = req.body.msg
    var sub = req.body.sub
    var email = req.body.email


    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for port 465, false for other ports
        auth: {
            user: "poovendranhari@gmail.com",
            pass: "ggwp jijy dmue njyd",
        },
    });
    new Promise(async function (resolve,reject) {
        try {
            for (i = 0; i < email.length; i++) {
               await transporter.sendMail(
                    {
                        from: "poovendranhari@gmail.com",
                        to: email[i],
                        subject: sub,
                        text: msg

                    }
                )
            resolve("Success")
            
            }
        }

        catch {
            
            reject("Failed")
        }
    }).then(function(){
        res.send(true)
    }).catch(function(){
        res.send(false)
    })


})