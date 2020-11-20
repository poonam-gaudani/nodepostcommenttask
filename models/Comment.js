const mongoose=require('../config/config');
const Schema=mongoose.Schema;
const ObjectId=Schema.Types.ObjectId;
const commentschema=Schema(
    {
        message       : { type: String, require: true },
        user          : { type: ObjectId, ref:'user', default: null },
        post          : { type: ObjectId, ref:'post', default: null },
        isDeleted     : { type: Boolean, default: false },
        deletedBy     : { type: ObjectId, ref:'user', default: null },
        deletedAt     : { type: Date, default: null },
    },
   {
      timestamps:true
   }
);
commentschema.methods.toJSON=function()
{
  var obj=this.toObject();
  delete obj.createdAt;
  delete obj.updatedAt;
  delete obj.__v;
  return obj;
}
module.exports=mongoose.model("comment",commentschema,"comments");