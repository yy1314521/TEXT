const User=require("../model/user.js");
const Token=require("../model/token.js");
const stringRandom=require("string-random");
//登录功能
async function login(ctx){
	let userName = ctx.request.body.username;
    let passWord = ctx.request.body.password;
    let result = {
        errCode: 0,
		tokenId:''
    };
	let user = await User.findOne({
            userName: userName,
            passWord: passWord
        }).exec()  
	if (!user) {
        result.errCode = 1
        result.errMsg = '账户或者密码错误！'
        ctx.body = result
        return
   }else {
        //用户已经存在
        let token=stringRandom(32);
        let time=Date.now();
        let overTime=Date.now()+1000*60*60*24;
        let seachtoken = await Token.findOne({
            userName: userName
        }).exec()
        if(!seachtoken){
        	addtoken = new Token({
	            userName: userName,              
			    tokenId:  token,
			    getTime: time,
			    overTime: overTime,
				passWord:passWord
		    })
		    try {
			    addtoken = await addtoken.save();//写入数据库
		    } catch (e) {
		        result.errMsg = 'token写入失败'
		       	return next
		    }
        }else{
        	await Token.update(
        		{userName: userName},
				{passWord:passWord},
        		{tokenId: token,getTime: time,overTime: overTime}
        	).exec()
        }
		// console.log(token)
        result.errCode = 0
        result.errMsg = '登录成功！'
        result.userName=userName
		 result.passWord=passWord
        result.tokenId =token
	    ctx.body = result
    }   
}
module.exports = login;