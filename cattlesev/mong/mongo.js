var mongoose=require("mongoose"),//加载mongoose模块
DB_URL="mongodb://localhost:27017/cattle";
mongoose.Promise=global.Promise;
//连接数据库
mongoose.connect(DB_URL,{useMongoClient:true});
//连接成功
mongoose.connection.on("connected",function(){
	console.log("Mongoose connection open to"+DB_URL)
});
//连接异常
mongoose.connection.on("error",function(err){
	console.log("Mongoose connection error:"+err)
});
//连接断开
mongoose.connection.on("disconnected",function(){
	console.log("Mongoose connection disconnected");
});
module.exports=mongoose;//到处mongoose对象