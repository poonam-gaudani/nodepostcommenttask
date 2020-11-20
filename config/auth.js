const jwt=require('jsonwebtoken');
/**
 * 
 * @param {* check the role} roles 
 */
const auth=roles=>(req, res, next)=>
{
    try
    {
        var token=req.headers.authorization.split(" ")[1];
        var decode=jwt.verify(token,'secret');
        req.userData=decode;
        if(roles.includes(req.userData.role))
        {
            next();
        }
        else
        {
            res.status(401).json({
                message:"Unauthorize"
            })
        }
    }catch(error){
        res.status(401).json({    error:"Invalid Token"})
    }
}
module.exports=auth