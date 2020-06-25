const User = require("../models/user");
const e = require("express");
const fs = require("fs");
const path = require("path");

module.exports.profile = function (req, res) {
    User.findById(req.params.id, function (err, user) {
        return res.render("profile", { title: `Socio | ${user.name} |Profile`, profile_user: user });
    });
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