const joi=require('joi');
const signup={
    body:joi.object({
            name:joi.string().alphanum().min(4).max(10).required(),
            email:joi.string().email({minDomainSegments:2,tlds:{allow:['com','net']}}),
            password:joi.string().alphanum().min(6).max(10).required()
        })    
}
const signin={
    body:joi.object({
        email:joi.string().email({minDomainSegments:2,tlds:{allow:['com','net']}}),
        password:joi.string().alphanum().min(6).max(10).required()
    })    
}

module.exports={signup,signin};