let mongoose=require("../mong/mongo.js"),//加载mongoose对象
Schema=mongoose.Schema;
let UserSchema=new Schema({
	 userName : { type: String },              
	 passWord: {type: String},
	 userTel: {type: String}  
});
module.exports=mongoose.model("User",UserSchema)//导出model对象，名称为user，值为变量userschema

