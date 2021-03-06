const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const AVATAR_PATH = path.join("/uploads/users/avatars");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
    friends: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Friendship"
    }]
});

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "..", AVATAR_PATH));
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now());
    }
});

userSchema.statics.uploadedAvatar = multer({ storage: storage }).single("avatar");
userSchema.statics.avatarPath = AVATAR_PATH;

if(!userSchema.options.toObject) userSchema.options.toObject = {};
userSchema.options.toObject.transform = function(doc, ret, options){
    delete ret.password;
    delete ret.createdAt;
    delete ret.updatedAt;
    return ret;
}

const User = mongoose.model("User", userSchema);

module.exports = User;