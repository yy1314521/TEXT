<template>
	<div class="order">
		<div class="order_header">
			<div class="order_img">
				<router-link to="/List"><img src="../../assets/order_03.png"></router-link>
				<div><h2>我的订单</h2></div>
			</div>
		</div>
		<div class="order_main" v-for="item in orderlist">
			<div class="order_main_shop">
				<p>订单编号：<em>{{item._id}}</em></p>
				<span>{{item.orderstate}}</span>
			</div>
			<div class="order_main_shopp">
				<div class="order_mains">
					<div><img :src="item.goodslist.goodsImg"/></router-link></div>
					<div><span>{{item.goodslist.goodsName}}</span><br>
					<span>颜色：{{item.goodslist.goodsColor}}</span><br>
					<span>数量：{{item.goodslist.goodsNum}}</span></div>
				</div>
				<div class="order_main_left">
					<p>￥{{item.goodslist.goodsPrice}}</p>
				</div>
			</div>
			<div class="order_bottom">
				<p>合计：<em>￥{{item.ordertotal}}</em>(含运费￥0.00)</p>
			</div>
		</div>
	</div>
</template>

<script>
	import {Toast} from 'mint-ui'
	export default{
		name:"Order",
		data(){
			return{
				orderlist:[]
			}
		},
		beforeRouteEnter:(to, from, next) => {
		    if (localStorage.getItem('tokenId')) {
		        next()
		    } else {
		       Toast('请登录')
		        next('/Login')
		    }
		 },
		mounted() {
			this.getorderlist()
		},
		methods:{
			getorderlist(){
				this.$http.post('http://localhost:3000/orderlistGet',{
					tokenId:localStorage.getItem("tokenId")
				}).then(res=>{
					this.orderlist=res.data.list;
					console.log(this.orderlist)
				}).catch(err=>{
					Toast("服务器未响应")
				})
			}
			 
		}
	}
</script>

<style>
	body{
		background-color: white;
	}
	.order{
		width: 1070px;
		height: 18vh;
		margin: 0 auto;
	}
	.order_header{
		background-color: #f9080e;
		padding: 10px;
	}
	.order_img{
		display: flex;
		justify-content: space-between;
		align-items: center;
	} 
	.order_img div{
		width: 99%;
	}
	.order_img h2{
		color: white;
		text-align: center;
	}
	.order_main_shop{
		display: flex;
		justify-content: space-between;
		box-sizing: border-box;
		padding: 10px;
		font-size: 25px;
		background-color: white;
	}
	.order_main_shop span{
		color: #f9080e;
	}
	.order_main_shop em{
		font-style: normal;
	}
	.order_main_shopp{
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
		align-items: flex-end;
		box-sizing: border-box;
		padding: 10px;
		background-color: #f9f8f7;
	}
	.order_mains{
		display: flex;
	}
	.order_mains span{
		font-size: 30px;
		color: #323534;
		margin-left: 10px;
		line-height: 2em;
	}
	.order_main_left{
		width:20%;
	}
	.order_main_left p{
		font-size: 30px;
		color: #f9080e;
	}
	.order_bottom{
		margin-top: 5px;
		background-color: #f9f8f7;
		font-size: 30px;
		box-sizing: border-box;
		padding: 20px;
	}
	.order_bottom p{
		color: #323534;
		text-align: right;
	}
	.order_bottom em{
		font-style: normal;
		color: #f9080e;
	}
</style>
