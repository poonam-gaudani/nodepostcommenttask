const express=require("express");
const router=express.Router();
const dotenv=require("dotenv").config();
const userrouter=require("./routes/userrouter");
const bodyparser=require("body-parser");
const user=require('./models/User');
const {validate,ValidationError,Joi}=require('express-validation');
const app=express();
var swaggerUi=require("swagger-ui-express");
var swaggerDoc=require("./swagger.json");
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
    extended:true
}));

app.use('/myapi',swaggerUi.serve,swaggerUi.setup(swaggerDoc));

app.use("/users",userrouter);
app.use("/post",require("./routes/postrouter"));
app.use("/comment",require("./routes/commentrouter"));  

// Error handler middleware

app.use((req,res,next)=>
{
        res.status(404).json({
        "error":"Page Not Found"
        });
        next(err);
});
app.use((err,req,res,next)=>{
  if (err instanceof ValidationError) {
    return res.status(err.statusCode).json({
      success:0,
      message:err.details.body[0].message})
  }
     res.status(err.statusCode||500).json({
            success:0,
            message:err.message
        });
    });

   
const port=process.env.PORT;
console.log(dotenv.parsed);
app.listen(port,console.log("server running on"+ port));
