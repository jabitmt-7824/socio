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

module.exports.delComment = function(req,res){
    Comment.findById(req.params.id, function(error,comment){
        if(error)
        {
            console.log("error finding comment");
            return;
        }
        if(comment.user == req.user.id)
        {
            let postId = comment.post;
            comment.remove();
            Post.findByIdAndUpdate(postId,{$pull:{comments:req.params.id}},function(err){
                if(err){
                    console.log("error in updating comment field of post");
                    return;
                }
                return res.redirect("back");
            });
        }
        else{
            return res.redirect("back");
        }
    });
}