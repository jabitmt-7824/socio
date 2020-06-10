const Post = require("../models/post");

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
    return res.render('home', {
         title: "Codeial | Home",
        posts:  posts
    });
})
}






