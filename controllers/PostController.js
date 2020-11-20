const post=require('../models/Post');
const {postschema}=require('../validators/validator');
exports.add=(req,res)=>
{
    postdata=new post(req.body);
    postdata.user=req.userData.id ;
    postdata.save().then((post)=>
    {
        res.status(200).json(post);
    }).catch((err)=>
    {
        next(err);
    });
}

exports.findsinglepost=async(req,res)=>
{
    var id=req.params["id"];
    const postdata=await post.findOne({_id:req.params["id"],isdeleted:false});
    if(postdata)
    {
        res.status(200).json(postdata);
    }
    else
    {
        res.status(403).json({
            "error":"This Post is not found"
        });
    }
}

/**
 * user can see other user's post
 * @param {*} req 
 * @param {*} res 
 */
exports.getallpost=(req,res)=>
{
    post.find({user:{$ne:req.userData.id},isdeleted:false})
    .populate({path:'user',select:'email'})
    .select(["-isdeleted","-createdAt","-updatedAt","-__v"])
    .then((post)=>
    {
        if(post.length<1)
        {
            res.status(401).json({
            "message":"No Post Found"
        });
        }
        else{
            res.status(200).json(post);
        }   
    }).catch((err)=>
    {
        res.status(401).json({
            "error":err
        });
    });  
}

exports.removepost=async(req,res)=>
{
    // check for the role 
    if(req.userData.role=="user")
    {
       const postdata=await post.findOne({_id:req.params["id"],user:req.userData.id});
       console.log(postdata.user);
       //user can delete his/her own post only
       if(postdata.user==req.userData.id)
       {
            post.findOneAndUpdate({_id:req.params['id']},{$set:{isdeleted:true}},{new:true}).then((post)=>{
            res.status(200).json(post);
            }).catch((err)=>
            {
                res.json({"error":err})
            });
       }
       else
       {
            res.status(401).json({"error":"You can not delete this"});
       }
    }
    if(req.userData.role=="admin")
    {    
            // admin can delte post of any user
            post.findOneAndUpdate({_id:req.params['id']},{$set:{isdeleted:true}},{new:true}).then((post)=>{
                res.status(200).json(post);
            }).catch((err)=>
            {
                res.json({"error":err})
            });
    }
}

exports.editpost=async(req,res)=>
{
      // check for the role 
      if(req.userData.role=="user")
      {
         const postdata=await post.findOne({_id:req.params["id"],user:req.userData.id});
         console.log(postdata.user);
         //user can edit his/her own post only
         if(postdata.user==req.userData.id)
         {
            post.findOneAndUpdate({_id:req.params['id']},{$set: req.body},{new:true}).then((post)=>{
                res.status(200).json(post);
            }).catch((err)=>
            {
                res.json({"error":err})
            });
         }
         else
         {
              res.status(401).json({"error":"You can not delete this"});
         }
      }
      if(req.userData.role=="admin")
      {
        post.findOneAndUpdate({_id:req.params['id']},{$set: req.body},{new:true}).then((post)=>{
            res.status(200).json(post);
        }).catch((err)=>
        {
            res.json({"error":err})
        });
      } 
}