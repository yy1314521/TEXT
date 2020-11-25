const Token = require("../model/token.js");
const Collection = require("../model/collection.js");
const User = require("../model/user.js");
const Orderlist = require("../model/orderlist.js");
//用户中心
const userCenter = async function(ctx) {
   	let tokenid = ctx.request.body.tokenId;
    let creattime = Date.now();
    let result = {
        errCode: 0
    };
	let seachtoken = await Token.findOne({
            tokenId: tokenid
     }).exec()
	if (!seachtoken||seachtoken.overtime<creattime) {
        result.errCode = 1
        result.errMsg = '登录超时或者未登录，请重新登录'
        ctx.body = result
        return
 	}else {
 		let seachtel = await User.find({
            userName:seachtoken.userName
     	}).exec()
     	let countcollection = await Collection.count({
            userName:seachtoken.userName
     	}).exec()
     	let countorder = await Orderlist.count({
            username:seachtoken.userName
     	}).exec()
        result.errCode = 0
        result.errMsg = '个人中心查询成功'
        result.list={
        	"userName":seachtoken.userName,
        	"usertel":seachtel[0].userTel,
        	"collection":countcollection,
        	"order":countorder
        }
		console.log(list)
        ctx.body = result
        return
    }   
};
module.exports = userCenter;