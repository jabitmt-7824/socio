const Post = require("../models/post");
const Comment = require("../models/comment");

module.exports.createPost = function (req, res) {
    Post.create({ post: req.body.content, user: req.user._id }, function (err, post) {
        if (err) {
            req.flash("error",err);
            return res.redirect("back");
        }
        req.flash("success","post published");
        return res.redirect("back");
    })
}

module.exports.delPost = async function (req, res) {
    try {
        let post = await Post.findById(req.params.id);
        if (post.user == req.user.id) {
            post.remove();
            await Comment.deleteMany({ post: req.params.id });
            req.flash("success","post and associated comments are deleted");
            return res.redirect("back");
        }
        else {
            req.flash("error","you are not authenticated to to delete this post");
            return res.redirect("back");
        }
    } catch (err) {
        req.flash("error",err);
        return res.redirect("back");
    }

}