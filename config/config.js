var mongoose=require('mongoose');
mongoose.connect(process.env.MONGODBURI, {useUnifiedTopology: true, useNewUrlParser: true})
.then(()=>console.log('Database is successfully Created'))
.catch((err)=>console.log(err));
module.exports=mongoose;