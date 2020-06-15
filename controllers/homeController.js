const Post = require("../models/post");
const User = require("../models/user");

module.exports.home = function(req,res){
//      Post.find({})
//       .populate("user")
//       .populate({
//           path:"Comments",
//           populate:{
//              path: "user"
//             }
//       })
//       .exec(function(err,post){
//          if(err){
//              console.log("error in finding posts");
//              return;
//          }
//          return res.render("home",{title:"Socio | Home",posts:post});
//      })
//  }

 Post.find({})
 .populate('user')
 .populate({
     path: 'comments',
     populate: {
         path: 'user'
     }
 })
 .exec(function(err, posts){
     User.find({},function(err,users){
         if(err)
         {
             console.log("error in finding users");
             return;
         }
        return res.render('home', {
            title: "Codeial | Home",
           posts:  posts,
           all_users:users
       }); 
     }); 
});
}






