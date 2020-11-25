const Good=require("../model/goods.js");
//商品列表功能
const goodslist=async function(ctx){
	let ctx_query=ctx.query;
	let num=parseInt(ctx_query.num);
	let goodType=parseInt(ctx_query.goodsType);
	let page=parseInt(ctx_query.page);
	let skip=num*(page-1);
	let result={
		errCode:0
	};
	let goods = await Good.find({"goodsType":goodType}).limit(num).skip(skip)
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
module.exports = goodslist;