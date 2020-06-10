const Post = require("../models/post");

module.exports.home = function(req,res){
    Post.find({}).populate("user").exec(function(err,post){
        if(err){
            console.log("error in finding posts");
            return;
        }
        return res.render("home",{title:"Socio | Home",posts:post});
    }); 
}





