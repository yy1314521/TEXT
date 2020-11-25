const Goods = require("../model/goods.js");
const ObjectId = require('mongodb').ObjectID;
//商品详情功能
const goodscon = async function(ctx) {
	let ctx_query = ctx.query;
	let goodsId=ctx_query.goodsId;
    let result = {
        errCode: 0
    };
    let goods = await Goods.find({
    	"_id" : ObjectId(goodsId)}
    ).exec()
	if(goods==''){
		result.errCode = 1
        result.errMsg = '没有找到查询结果'
        ctx.body = result
        return
	}else{
		result.errCode = 0
        result.errMsg = '查询到结果'
        result.list=goods
        ctx.body = result
        return
	}
};
module.exports = goodscon;