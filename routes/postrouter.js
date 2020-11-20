const express=require("express");
const router=express.Router();
const {validate}=require('express-validation');
const {postvalidation,isexists}=require('../validators/post');
const auth=require("../config/auth");
const postcon=require('../controllers/PostController');

/**
 * Task Manage By Admin And User
 */
router.post('/',auth(["admin","user"]),validate(postvalidation),postcon.add);
router.delete('/:id',auth(["admin","user"]),postcon.removepost);
router.put('/:id',auth(["admin","user"]),validate(postvalidation),isexists,postcon.editpost);

/**
 * Task Manage By User
 */
router.get('/:id',postcon.findsinglepost);
router.get('/',auth("user"),postcon.getallpost);

module.exports=router;