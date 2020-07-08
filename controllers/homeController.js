const Post = require("../models/post");
const User = require("../models/user");

module.exports.home = async function (req, res) {
    try {
        let posts = await Post.find({})
            .sort("-createdAt")
            .populate('user')
            .populate({
                path: 'comments',
                populate: {
                    path: 'user'
                },
                populate: {
                    path: 'likes'
                }
            }).populate('likes');
        let users = await User.find({});
        let friends = await User.findById(req.user._id)
        .populate({
            path: "friends",
            populate: {
                path: "to_user"
            }
        });
        return res.render('home', {
            title: "Socio | Home",
            posts: posts,
            all_users: users,
            all_friends: friends
        });

    } catch (err) {
        req.flash("error", err);
        return;
    }
}






