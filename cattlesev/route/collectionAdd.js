const Token = require("../model/token.js");
const Collection = require("../model/collection.js");
const Goods= require("../model/goods.js");
const ObjectId = require('mongodb').ObjectID;
//商品收藏功能
const collectionAdd = async function(ctx) {
   	let tokenid = ctx.request.body.tokenId;
   	let goodsid = ctx.request.body.goodsId;
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
 		let seachcollection = await Collection.findOne({
            goodsId:goodsid,userName:seachtoken.userName
     	}).exec()
 		if(!seachcollection){
 			let seachgoods = await Goods.find({
           		_id : ObjectId(goodsid)
	     	}).exec()
	        collectionadd = new Collection({
	            'userName' : seachtoken.userName,
			    'creatTime' : creattime,
			    'goodsName' : seachgoods[0].goodsName,
			    'goodsPrice' : seachgoods[0].goodsPrice,
			    'goodsType': seachgoods[0].goodsType,
			    'goodsColor': seachgoods[0].goodsColor,
			    'goodsImg': seachgoods[0].goodsImg,
			    'goodsId': goodsid
	        })
	        await collectionadd.save();
	        result.errCode = 0
			// console.log(collectionadd)
	        result.errMsg = '商品收藏成功'
	        ctx.body = result
	        return
 		}else{
 			result.errCode = 2
	        result.errMsg = '商品已被收藏'
	        ctx.body = result
	        return
 		}
    }   
};
module.exports = collectionAdd;