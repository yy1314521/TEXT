const Token = require("../model/token.js");
const Collection = require("../model/collection.js");
const ObjectId = require('mongodb').ObjectID;
//收藏删除功能
const collectionRemove = async function(ctx) {
   	let tokenid = ctx.request.body.tokenId;
   	let collectionId = ctx.request.body.collectionId;
	console.log(collectionId)
    let creattime = Date.now();
    let result = {
        errCode: 0
    };
	let seachtoken = await Token.findOne({
            tokenId: tokenid
     }).exec()
	if (!seachtoken||seachtoken.overTime<creattime) {
        result.errCode = 1
        result.errMsg = '登录超时或者未登录，请重新登录'
        ctx.body = result
 }else {
     	let removecollection = await Collection.deleteOne({
            _id : ObjectId(collectionId)
        }).exec()
		result.errCode = 0
        result.errMsg = '成功删除商品收藏'
        ctx.body = result
    }   
};
module.exports = collectionRemove;