const Token = require("../model/token.js");
const Orderlist = require("../model/orderlist.js");
const Goods = require("../model/goods.js")
const Objectid = require("mongodb").ObjectID;
//订单添加功能
const orderlistAdd = async function(ctx) {
   	let tokenid = ctx.request.body.tokenId;
   	let goodslist = ctx.request.body.orderList;
   	let ordertotal = ctx.request.body.orderTotal;
	let goodsId = ctx.request.body.goodsId;
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
        result.con=seachtoken
        ctx.body = result
	}else {
		// let goods = await Goods.find({
		// 	_id : Objectid(goodsId)
		// }).exec()
        orderlistadd = new Orderlist({
            'username' : seachtoken.userName,
		    'creattime' : creattime,
		    'orderstate' : "nopay",
		    'goodslist' : goodslist,
		    'ordertotal':ordertotal
        })
        await orderlistadd.save()
        result.errCode = 0
		// console.log(orderlistadd)
		result.list = orderlistadd
        result.errMsg = '订单增加成功'
        ctx.body = result
    }
};
module.exports = orderlistAdd;