const Post = require("../models/post");
const Comment = require("../models/comment");
const Like = require("../models/like");

module.exports.toggleLike = async function(req,res){
    try{
        let likable;
        let deleted = false;
        if(req.query.type == "post"){
            likable = await Post.findById(req.query.id).populate("likes");
        }
        else{
            likable = await Comment.findById(req.query.id).populate("likes");
        }
        let existingLike = await Like.findOne({user:req.user.id, likable:req.query.id, onModel:req.query.type});
        if(existingLike){
            likable.likes.pull(existingLike);
            likable.save();
            existingLike.remove();
            deleted = true;
        }else{
            let newLike = await Like.create({user:req.user.id, likable:req.query.id, onModel:req.query.type});
            likable.push(newLike);
            likable.save();
        }
        return res.json(200,{
            message:"toggle work successfully",
            data:{
                deleted:deleted
            }
        });
    }
    catch(err)
    {
        console.log("error",err);
        return res.json(500,{
            message:"internal server error"
        });
    }
    
}