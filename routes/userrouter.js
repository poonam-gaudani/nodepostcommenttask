const express=require("express");
const router=express.Router();
const {validate}=require('express-validation');
const {signup,signin}=require('../validators/validator');
const auth=require("../config/auth");
const UserCon=require("../controllers/UserController");
router.post("/assignrole",auth("admin"),UserCon.assignrole);
router.post("/",validate(signup),UserCon.registration);
router.post('/login',validate(signin),UserCon.login);
router.post('/role',UserCon.addrole);

router.get('/',UserCon.getalluser);
module.exports=router