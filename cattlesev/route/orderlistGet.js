const Token = require("../model/token.js");
const Orderlist = require("../model/orderlist.js");
//订单查询功能
const orderlistGet = async function(ctx) {
   	let tokenid = ctx.request.body.tokenId;
    let nowtime = Date.now();
    let result = {
        errCode: 0,
		list:''
    };
    let seachtoken = await Token.findOne({
            tokenId : tokenid
        }).exec()
		// console.log(seachtoken)
    if (!seachtoken||seachtoken.overTime<nowtime) {
        result.errCode = 1
        result.errMsg = '登录超时或者未登录，请重新登录'
        ctx.body = result
  	}else {
  		let orderconget = await Orderlist.find({
            "username" : seachtoken.userName
        }).sort({"_id":-1}).exec()
        if(orderconget.length==0){
        	result.errCode = 2
	        result.errMsg = '没有订单'
	        ctx.body = result
        }else{
        	result.errCode = 0
	        result.errMsg = '订单查询成功'
			// console.log("ok")
			console.log(orderconget)
	        result.list=orderconget
	        ctx.body = result
        }
  	}  
};
module.exports = orderlistGet;