const express=require("express");
const router=express.Router();
const auth=require("../config/auth");
const CommentCon=require("../controllers/CommentController");
// add the comment
router.post("/",auth("user"),CommentCon.add);
router.delete("/:id",auth("user"),CommentCon.remove);
router.delete("/removecomment/:id",auth("user"),CommentCon.removemycomment);
router.get("/",CommentCon.getallcomment);
module.exports=router;