const Comment = require("../models/comment");
const Post = require("../models/post");
const commentMailer = require("../mailers/comment_mailer");
const queue = require("../config/kue");
const commentMailsWorker = require("../workers/comment_email_worker");
const Like = require('../models/like');

module.exports.createComment = async function (req, res) {
    try {
        let post = await Post.findById(req.body.post);
        if (post) {
            let comment = await Comment.create({ comment: req.body.content, user: req.user.id, post: req.body.post });
            post.comments.push(comment);
            post.save();
            comment = await comment.populate('user','name email').execPopulate();
            // commentMailer.newComment(comment);
            // let job = queue.create("emails",comment).save(function (err){
            //     if(err){
            //         console.log("errror in enqueue emails worker",err);
            //         return;
            //     }
            //     console.log("emails worker is enqueued",job.id);
            // });
            if(req.xhr){
                return res.status(200).json({
                    data:{
                        comment:comment
                    },
                    message: "comment created"
                });
            }
            req.flash("success", "comment published");
            return res.redirect("back");
        }

    } catch (err) {

        req.flash("error", err);
        return res.redirect("back");
    }

}

module.exports.delComment = async function (req, res) {
    try {
        let comment = await Comment.findById(req.params.id);
        if (comment.user == req.user.id) {
            let postId = comment.post;
            comment.remove();
            await Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.id } });
            // CHANGE :: destroy the associated likes for this comment
            await Like.deleteMany({likeable: comment._id, onModel: 'Comment'});
            
            if(req.xhr){
                return res.status(200).json({
                    data:{
                        commentId: req.params.id
                    },
                    message: "comment deleted"
                });
            }
            req.flash("success","comment deleted");
            return res.redirect("back");

        }
        else {
            req.flash("error","you are not authenticated to delete this cooment");
            return res.redirect("back");
        }

    } catch (err) {
        req.flash("error",err);
        return res.redirect("back");
    }

}