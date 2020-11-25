const Token = require("../model/token.js");
const Collection = require("../model/collection.js");
const ObjectId = require('mongodb').ObjectID;
//收藏查询功能
const collectionGet = async function(ctx) {
   	let tokenid = ctx.request.body.tokenId;
	
    let creattime = Date.now();
    let result = {
        errCode: 0,
		list:''
    };
	let seachtoken = await Token.findOne({
            tokenId: tokenid
     }).exec()

	if (!seachtoken||seachtoken.overTime<creattime) {
        result.errCode = 1
        result.errMsg = '登录超时或者未登录，请重新登录'
        ctx.body = result
 	}else {
 		let seachcollection = await Collection.find({
            userName:seachtoken.userName
     	}).exec()
		console.log("ok")	 
 		if(seachcollection==""){
	        result.errCode = 2
	        result.errMsg = '没有商品被收藏'
	        ctx.body = result
 		}else{
 		   result.errCode = 0
	        result.errMsg = '商品收藏查询成功'
			
	        result.list=seachcollection
	        ctx.body = result
		}
    }   
};
module.exports = collectionGet;