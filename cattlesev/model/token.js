var mongoose=require("../mong/mongo.js"),
Schema=mongoose.Schema;
var TokenSchema=new Schema({
	userName : { type: String },
	tokenId:{type:String},
	passWord: {type: String},
	overTime:{type:Date},
	getTime:{type:Date}
});
module.exports=mongoose.model("Token",TokenSchema) 