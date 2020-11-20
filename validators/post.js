const joi=require('joi');
const joiobjectid=require('../utils/joi-objectid')(joi);
const post=require('../models/Post');
exports.postvalidation={
    body:joi.object(
        {
            title:joi.string().alphanum().min(3).max(20).required(),
            description:joi.string().min(6).max(10).required()
        }
    )    
}
exports.isexists=async(req,res,next)=>
{
    try{
        const user=req.user;
        const postdata=await post.findOne({_id:req.params.id,isdeleted:false});
        if(postdata)
        {
            res.status(200).json('found');
        }
        else{
            res.status(200).json('not found');
        }
    }
    catch(err){next(err)}
};