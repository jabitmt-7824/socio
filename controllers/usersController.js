const User = require("../models/user");

module.exports.profile = function(req,res){
    User.findById(req.params.id,function(err,user){
        return res.render("profile",{title: `Socio | ${user.name} |Profile`,profile_user:user});
    }); 
}

module.exports.updateProfile = function(req,res){
    if(req.user.id == req.params.id)
    {
        User.findByIdAndUpdate(req.params.id, req.body, function(err){
            if(err){
                console.log("error in updating user profile");
                return;
            }
            return res.redirect("back");
        });
    }
}

module.exports.signupPage = function(req,res){
    if(req.isAuthenticated())
    {
        return res.redirect("/");
    }
    return res.render("signup",{title:"Socio | Signup"})
}

module.exports.signinPage = function(req,res){
    if(req.isAuthenticated())
    {
        return res.redirect("/");
    }
    return res.render("signin",{title:"Socio | Signin"})
}

module.exports.singnupUser = function(req,res){
    if (req.body.password != req.body.confirm){
        return res.redirect('back');
    }
    User.findOne({email: req.body.email}, function(err, user){
        if(err){
            console.log('error in finding user in signing up'); 
            return;
        }

        if (!user){
            User.create(req.body, function(err, user){
                if(err){
                    console.log('error in creating user while signing up'); 
                    return;
                }

                return res.redirect('/user/signin');
            });
        }else{
            return res.redirect('back');
        }

    });
}

module.exports.signinUser = function(req,res){
    return res.redirect("/");
}


module.exports.signOut = function(req,res){
    req.logout();
    return res.redirect("/");
}