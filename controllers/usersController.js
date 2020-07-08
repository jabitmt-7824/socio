const User = require("../models/user");
const Friendship = require("../models/friendship");
const e = require("express");
const fs = require("fs");
const path = require("path");
const Foget = require("../models/forget");
const crypto = require("crypto");
const forgetMailer = require("../mailers/forget_password_mailer");

module.exports.profile = async function (req, res) {
    try {
        let friendStatus = "Add Friend";
        let user = await User.findById(req.params.id);
        let existFriend = await Friendship.findOne({ from_user: req.user._id, to_user: req.params.id });
        if (existFriend) {
            friendStatus = "Unfriend"
        }
        else {
            friendStatus = "Add Friend"
        }
        return res.render("profile", { title: `Socio | ${user.name} |Profile`, profile_user: user, frndStatus: friendStatus });
    }
    catch (err) {
        console.log("error:", err);
    }
}

module.exports.updateProfile = async function (req, res) {
    if (req.user.id == req.params.id) {
        try {

            let user = await User.findById(req.params.id);
            User.uploadedAvatar(req, res, function (err) {
                if (err) {
                    console.log("error", err);
                }
                console.log(req.file);
                user.name = req.body.name;
                user.email = req.body.email;
                if (req.file) {
                    if (user.avatar) {
                        if (fs.existsSync(path.join(__dirname, "..", user.avatar))) {
                            fs.unlinkSync(path.join(__dirname, "..", user.avatar));
                        }
                    }
                    user.avatar = User.avatarPath + '/' + req.file.filename;
                }
                user.save();
                req.flash("success", "Profile Updated");
                return res.redirect("back");
            });


        } catch (err) {
            req.flash("error", err);
            return res.redirect("back");
        }
    } else {
        req.flash("error", "Invalid User");
        return res.redirect("back");
    }
}

module.exports.signupPage = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect("/");
    }
    return res.render("signup", { title: "Socio | Signup" })
}

module.exports.signinPage = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect("/");
    }
    return res.render("signin", { title: "Socio | Signin" })
}

module.exports.singnupUser = async function (req, res) {
    try {
        if (req.body.password != req.body.confirm) {
            return res.redirect('back');
        }
        let user = await User.findOne({ email: req.body.email });
        if (!user) {
            await User.create(req.body);

            return res.redirect('/user/signin');
        } else {
            return res.redirect('back');
        }

    } catch (err) {
        console.log("Error", err);
        return;
    }
}

module.exports.signinUser = function (req, res) {
    req.flash("success", "You have signed in successfully");
    return res.redirect("/");
}


module.exports.signOut = function (req, res) {
    req.logout();
    req.flash("success", "yo have logged out!");
    return res.redirect("/");
}

module.exports.forgetForm = function (req, res) {
    return res.render("forget_password_form", { title: "forget password" });
}

module.exports.forgetPassword = async function (req, res) {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
        let forget = await Foget.create({ user: user._id, access_token: crypto.randomBytes(10).toString("hex"), verified: true });
        forgetMailer.forgetPassword(user, forget);
        req.flash("success", "reset password link sent to your e-mail");
        return res.redirect("/");
    }
}

module.exports.resetForm = function (req, res) {
    Foget.findOneAndUpdate({ access_token: req.params.access_token }, { verified: false }, function (err, forget) {
        if (err) {
            console.log("error in finding and updating in forget");
            return;
        }
        return res.render("reset_password", { title: "reset password", userId: forget.user });
    });
}

module.exports.resetPassword = function (req, res) {
    if (req.body.password != req.body.confirm) {
        req.flash("error", "Password and confirm password does not match");
        return res.redirect('back');
    }
    else {
        User.findByIdAndUpdate(req.params.id, { password: req.body.password }, function (err) {
            if (err) {
                console.log("error in updating password", err);
                return;
            }
            // after updating new password logout user if user is login
            req.logout();
            req.flash("success", "Password Reseted Successfully, please login using new passsword");
            return res.redirect("/");
        });
    }
}