const nodeMailer = require("../config/nodemailer");

exports.forgetPassword= (user,forget) => {
    let htmlString = nodeMailer.renderTemplate({forget:forget}, "/forget/forget_password.ejs");
    nodeMailer.transporter.sendMail({
        from: 'jabirmt7824@gmail.com',
        to: user.email,
        subject: "forget password",
        html: htmlString
    },(err,info)=>{
        if(err)
        {
            console.log("errror in sending forget password mail",err);
            return;
        }
        console.log("message sent",info);
        return;
    });
}