const Post = require("../../../models/post");
const Comment = require("../../../models/comment");

module.exports.index = function (req, res) {
    Post.find({}, function (err, post) {
        if (err) {
            return res.status(500).json({
                message: `error: ${err}`
            });
        }
        return res.status(200).json({
            message: "published posts",
            posts: post
        });
    });
}

module.exports.deletePost = async function (req, res) {
    try {
        let post = await Post.findById(req.params.id);
        if (post.user == req.user.id) {
            post.remove();
            await Comment.deleteMany({ post: req.params.id });
            return res.json(200,{
                message: "post and associated comments are deleted"
            });
        } else {
            return res.json(404, {
                message: "unauthorized to delete the post"
            });
        }
    } catch (err) {
        return res.json(500,{
            message: `error in deleting post: ${err}`
        });
    }
}