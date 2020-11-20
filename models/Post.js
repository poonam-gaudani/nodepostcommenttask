const mongoose=require('../config/config');
const Schema=mongoose.Schema;
const ObjectId=Schema.Types.ObjectId;
const postschema=Schema(
    {
        title      :{type:String,require:true},
        description:{type:String,require:true},
        user       :{type:ObjectId,ref:'user',require:true},
        comments   :[{type:ObjectId,ref:'comment',default:null}], 
        isdeleted  :{type:Boolean,default:false}  
    }
);
postschema.set('timestamps',true);

postschema.methods.toJSON=function()
{
  var obj=this.toObject();
  delete obj.createdAt;
  delete obj.updatedAt;
  delete obj.__v;
  return obj;
}
const post=mongoose.model("post",postschema,"posts");
module.exports=post;