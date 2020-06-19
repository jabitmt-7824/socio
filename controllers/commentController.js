const Comment = require("../models/comment");
const Post = require("../models/post");

module.exports.createComment = async function (req, res) {
    try {
        let post = await Post.findById(req.body.post);
        if (post) {
            let comment = await Comment.create({ comment: req.body.content, user: req.user._id, post: req.body.post });
            post.comments.push(comment);
            post.save();
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