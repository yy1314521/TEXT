const User=require("../model/user.js");
//注册功能
const reg=async function(ctx){
	let userName = ctx.request.body.username;
    let passWord = ctx.request.body.password;
	let userTel = ctx.request.body.tel;
	let result={
		errCode:0
	};
	let user=await User.findOne({
		userName
	}).exec()//exec()返回一个buffer类型，发过来的字节流大小不超过200
	let tel=await User.findOne({
		userTel
	}).exec()
	if(!tel){
		if(!user){
			user = new User({
			                userName,
			                passWord,
			                userTel
			            })
		}else{
			//用户名已存在
			result.errCode=1
			result.errMsg="用户名重复了！请换一个！"
			ctx.body=result
			return
		}
		try{
			//写入数据库
			user=await user.save();
			result.errCode=0;
			result.errMsg="注册成功"
			ctx.body=result
		}catch(e){
			console.log("md,err==",e)
		}
	}else{
		result.errCode=3
		result.errMsg="手机号已被注册"
		ctx.body=result
		return
	}
}
module.exports=reg;