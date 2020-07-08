const Friendship = require("../models/friendship");
const User = require("../models/user");

module.exports.friends = async function (req, res) {
    try {
        let deleted = false;
        let existFriends = await Friendship.findOne({ from_user: req.user._id, to_user: req.params.id });
        if (existFriends) {

            await User.findByIdAndUpdate(req.user._id, { $pull: { friends: existFriends._id } });

            existFriends.remove();
            deleted = true;
        }
        else {
            let newFriend = await Friendship.create({ from_user: req.user._id, to_user: req.params.id });
            let user = await User.findById(req.user._id);
            user.friends.push(newFriend);
            user.save();
        }

        return res.status(200).json({
            message: "friend toggle successfull",
            data: {
                deleted: deleted
            }
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: 'Internal Server Error'
        });
    }

}