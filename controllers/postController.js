const Post = require("../models/post");
const Comment = require("../models/comment");
const Like = require('../models/like');

module.exports.createPost = async function (req, res) {
    let post = await Post.create({ post: req.body.content, user: req.user.id });
    if (req.xhr) {
        post = await post.populate('user', 'name').execPopulate();
        return res.status(200).json({
            data: {
                post: post
            },
            message: "post created"
        });
    }
    req.flash("success", "post published");
    return res.redirect("back");
}

module.exports.delPost = async function (req, res) {
    try {
        let post = await Post.findById(req.params.id);
        console.log(post.user);
        console.log(req.user.id);
        if (post.user == req.user.id) {
            // CHANGE :: delete the associated likes for the post and all its comments' likes too
            await Like.deleteMany({likeable: post, onModel: 'Post'});
            await Like.deleteMany({_id: {$in: post.comments}});

            post.remove();
            await Comment.deleteMany({ post: req.params.id });
            if (req.xhr) {
                return res.status(200).json({
                    data: {
                        postId: req.params.id
                    },
                    message: "post deleted"
                });
            }
            req.flash("success", "post and associated comments are deleted");
            return res.redirect("back");
        }
        else {
            req.flash("error", "you are not authenticated to to delete this post");
            return res.redirect("back");
        }
    } catch (err) {
        req.flash("error", err);
        return res.redirect("back");
    }

}