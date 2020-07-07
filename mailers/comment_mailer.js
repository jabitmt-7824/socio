const nodeMailer = require("../config/nodemailer");

exports.newComment = (comment) => {
    let htmlString = nodeMailer.renderTemplate({comment:comment}, "/comments/new_comment.ejs")
    nodeMailer.transporter.sendMail({
        from: 'jabirmt7824@gmail.com',
        to: comment.user.email,
        subject: "new comment published",
        html: htmlString
    },(err,info)=>{
        if(err)
        {
            console.log("errror in sending new comment mail",err);
            return;
        }
        console.log("message sent",info);
        return;
    });
}