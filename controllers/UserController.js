const user=require('../models/User');
const role=require('../models/Role');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const {userschema}=require('../validators/validator');
exports.addrole=(req,res)=>
{
    var roledata=new role({
        message: req.body.user,
        user   : req.userData.id,
        post   : req.body.post,
    });
    console.log(roledata);
    roledata.save().then(
        (role)=>
            {
                console.log(role);
            }
    ).catch(
        (err)=>
            {
                console.log(err.message);
            }
    );
}

exports.registration=async(req,res,next)=>
{
    const roledata=await role.findOne({role:'user'});
    if(!roledata){console.log('It seems that the system role are not generated yet.')}
    var userdata=new user(
        req.body
    );
    userdata.role=roledata._id;
    console.log(userdata);
    userdata.save().then((user)=>
    {
        res.status(200).json(user);
    }).catch((err)=>{
        next(err);
    });
}
exports.login=(req,res,next)=>
{
    var email=req.body.email;
    var password=req.body.password;
    user.findOne({email:email}).select("_id email password role").populate("role",["role"]).then(
        user=>
        {
            if(!user)
        {
            res.status(400).json({message:"This email is not registered"})   
        }
        bcrypt.compare(password,user.password, function(err, isMatch) {
            if (err)throw err;
            if(isMatch)
            {
                var token=jwt.sign({id:user._id,email:user.email,role:user.role.role},'secret',{expiresIn:"10h"});
                console.log(token);
                res.status(200).json(user);
            }
            else
            {
                res.status(401).json({message:"Password is incorrect"});
            }
          });
        }
    ).catch((err)=>{
        next(err);
    });
}

// Admin assign admin role to user
exports.assignrole=async(req,res,next)=>
{
    const roledata=await role.findOne({role:'admin'});
    if(!roledata){console.log('It seems that the system role are not generated yet.')}
    const userdata=await user.findOne({_id:req.body.user});
    if(userdata.role==roledata._id)
    {
        const err=new Error('this user is already admin');
        err.statusCode=401;
        throw err;
    }
    else{
        user.findOneAndUpdate({_id:req.body.user},{$set:{role:roledata._id}},{new:true}).then(user=>{
            res.status(200).json(user);
        }).catch(next);
    }
}

exports.getalluser=(req,res,next)=>
{
   user.find().then((user)=>{
    res.json(user);
  }).catch((err)=>console.log(err));
}