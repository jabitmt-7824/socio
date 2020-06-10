const Comment = require("../models/comment");
const Post = require("../models/post");

module.exports.createComment = function(req,res){
    Post.findById(req.body.post, function(err,post){
        if(err)
        {
            Console.log("error in finding post");
            return;
        }
        if(post)
        {
            Comment.create({comment:req.body.content, user:req.user._id,post:req.body.post},function(err,comment){
                if(err)
                {
                    Console.log("error in creating comments");
                    return;
                }
                post.comments.push(comment);
                post.save();
                return res.redirect("back");
            });
        }
    })
}