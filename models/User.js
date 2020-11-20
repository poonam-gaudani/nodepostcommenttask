const { date, boolean } = require('joi');
const bcrypt=require('bcryptjs');
const mongoose=require('../config/config');
var userschema=mongoose.Schema(
    {
        name:{type:String,require:true},
        email:{type:String,require:true,unique:true},
        password:{type:String,require:true},
        role:{type:mongoose.Schema.Types.ObjectId,ref:"role",default:null},
        isdeleted:{type:Boolean,default:false},
    }
);
userschema.set('timestamps',true);
/**
 * check email is unique or not
 */
userschema.pre(/^save$/, true, async function (next, done) {
  try{
    const user = this;
    const record = await mongoose.models['user'].findOne({ _id: { $ne: user._id }, email: user.email, isDeleted: false });
    record ? done(new Error({status: 409, message: `"email" already exists`})) : done();
    next();
  }
  catch (err) { done(err); next(); }
});
userschema.pre('save', function(next)  {
    let user = this;
    bcrypt.hash(user.password, 10, function(error, hash) {
      if (error) {
        return next(error);
      } else {
        user.password = hash;
        next();
      }
    });
  });

userschema.methods.toJSON=function()
{
  var obj=this.toObject();
  delete obj.password;
  delete obj.createdAt;
  delete obj.updatedAt;
  delete obj.__v;
  return obj;
}
var user=mongoose.model("user",userschema,"user");
module.exports=user;