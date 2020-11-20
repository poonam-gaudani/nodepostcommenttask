const mongoose=require('../config/config');
const Schema=mongoose.Schema;
const roleschema=new Schema(
    {
        role:{
            type:String,
            required:true
        }
    },
    {
        timestamps:true
    }
);
const role=mongoose.model("role",roleschema,"roles");
module.exports=role;