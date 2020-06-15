const Post = require("../models/post"); 
const Comment = require("../models/comment");

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

module.exports.delPost = function(req,res){
    Post.findById(req.params.id, function(error,post){
        if(error){
            console.log("error in finding post");
            return;
        }
        if(post.user == req.user.id)
        {
            post.remove();
            Comment.deleteMany({post: req.params.id},function(error,comment){
                if(error)
                {
                    console.log("error in deleting comments");
                    return;
                }
                return res.redirect("back");
            })
        }
        else{
            return res.redirect("back");
        }
    });
}