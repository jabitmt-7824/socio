const User = require("../models/user");

module.exports.profile = function(req,res){
    return res.render("profile",{title:"Socio | Profile"});
}

module.exports.signupPage = function(req,res){
    if(req.isAuthenticated())
    {
        return res.redirect("profile");
    }
    return res.render("signup",{title:"Socio | Signup"})
}

module.exports.signinPage = function(req,res){
    if(req.isAuthenticated())
    {
        return res.redirect("profile");
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