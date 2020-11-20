const post=require('../models/Post');
const comment=require("../models/Comment");
const { isValidObjectId } = require('mongoose');
exports.add=async(req,res)=>
{
    // Find a post
    const postdata=await post.findOne({_id:req.body.post,isdeleted:false});
    if(postdata)
    {   
        // Create Comment
        commentdata=new comment({
            message:req.body.message,
            user:req.userData.id,
            post:req.body.post
        });
            //save comment   
            commentdata.save().then((comment)=>{
            // Associate post with comment
            return post.updateOne({_id:req.body.post},{$push:{comments:comment._id}})
        }).then((comment)=>{
            res.status(200).json(comment);
        }).catch((err)=>
        {
            res.status(403).json({"error":err});
        });
    }
    else
    {
        res.status(403).json({"error":"This post is not available"});
    }
    
}

// user delete comment from his own post
exports.remove=async(req,res)=>
{
    const commentdata=await comment.findOne({_id:req.params["id"]});
    console.log(commentdata.post);
    const userpost=await post.findOne({user:req.userData.id,_id:commentdata.post});
    console.log(userpost);
    if(userpost)
    {
        console.log("yes");
        comment.findOneAndUpdate({_id:req.params["id"]},{$set:{isDeleted:true,deletedBy:req.userData.id,deletedAt:new Date()}},{new:true}).then((comment)=>
        {
            return post.updateOne({_id:comment.post},{$pull:{comments:comment._id}});
        }).then((post)=>{
                res.status(200).json(post);
            }).catch((err)=>
        {
            res.json({"error":err.message})
        });
    }
    else{
        res.status(401).json({"error":"u can not delete this comment"})
    }
 
}
// user can delete his own comment
exports.removemycomment=async(req,res)=>
{
    const commentdata=await comment.findOne({_id:req.params["id"],user:req.userData.id});
    if(commentdata)
    {
        comment.findOneAndUpdate({_id:req.params["id"],isDeleted:false,deletedAt:new Date()},{$set:{isDeleted:true,deletedBy:req.userData.id}},{new:true}).then((comment)=>
        {
            return post.updateOne({_id:comment.post},{$pull:{comments:comment._id}});
        }).then((post)=>{
                res.status(200).json(post);
            }).catch((err)=>{  res.json({"error":err.message})}
            );
    }
    else
    {
        res.status(401).json({"error":"u can not delete this comment"})
    }
}

// Get Comment
exports.getallcomment=(req,res,next)=>
{
    comment.find({isDeleted:false})
    .populate({path:'user',select:'name'})
    .populate({path:'post',select:'title'}).then((comment)=>
    {
        res.status(200).json(comment);
    }).catch((err)=>{ next(err); });
}