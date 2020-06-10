const Post = require("../models/post");

module.exports.createPost = function(req,res){
    Post.create({post:req.body.content,user:req.user._id},function(err,post){
        if(err)
        {
            console.log("error in creating post");
            return;
        }
        return res.redirect("back");
    })
}