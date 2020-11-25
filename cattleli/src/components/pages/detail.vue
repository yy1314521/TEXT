<template>
	<div class="detail">
		<header class="detail_header">
			<div class="detail_img">
				<router-link to="/List"><img src="../../assets/order_03.png"></router-link>
				<div>
					<h2>商品详情</h2>
				</div>
			</div>
		</header>
		<div class="detail_main">
			<div class="detail_imges">
				<img :src="goodsImg" />
			</div>
		</div>
		<div class="detail_shop">
			<div class="detail_shop_p">
				<h1>{{goodsName}}</h1>
				<h2>价格：￥<em>{{goodsPrice}}</em></h2>
				<p>颜色：{{goodsColor}}</p>
				<div class="detail_input">

					<div class="detail_inputs">
						数量：
						<button @click="goodsNum>1?goodsNum--:1">-</button>
						<input type="number" class="number" v-model="goodsNum" />
						<button @click="goodsNum++">+</button>
					</div>
				</div>
			</div>
		</div>
		<div class="detail_text">
			<p>{{goodsInfo}}</p>
		</div>
		<div class="detail_fotter">
			<div class="detail_fotter_left">
				<p>合计：<em>￥{{totalprice()}}</em></p>
			</div>
			<div class="detail_fotter_right">
				<div class="detail_fotter_input1">
					<button :class='active?"":"active"' @click="addFav">加入收藏</button>
				</div>
				<div class="detail_fotter_input2">
					<button @click="PostlistORrder">立即购买</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {
		Toast
	} from 'mint-ui'
	export default {
		name: "Detail",
		data() {
			return {
				active: true,
				goodsId: '', //	商品编号
				favId: '', //	收藏编号
				goodsImg: '', //	商品图片（解决异步获取图片失败问题）
				goodsName: '', //	商品名称
				goodsPrice: '', //	商品价格
				goodsColor: '', //	商品颜色
				goodsNum: 1, //	商品数量
				goodsInfo: '', //	商品简介
				orderList: ''
			} //	订单列表			
		},
		mounted() {
			this.getdetail(),
			this.getdataFav()
		},
		methods: {
			// 身份验证
			beforeRouteEnter: (to, from, next) => {
				if (localStorage.getItem('tokenId')) {
					next()
				} else {
					Toast('请登录')
					next('/')
				}
			},
			getdetail() {
				this.$http.get('http://localhost:3000/goodscon', {
					params: {
						goodsId: this.$route.query.id
					}
				}).then((res) => {
					this.goodsId = res.data.list[0]._id,
						this.goodsImg = res.data.list[0].goodsImg,
						this.goodsName = res.data.list[0].goodsName,
						this.goodsPrice = res.data.list[0].goodsPrice,
						this.goodsColor = res.data.list[0].goodsColor,
						this.goodsNum = res.data.list[0].goodsNum,
						this.goodsInfo = res.data.list[0].goodsInfo
				}).catch(err => {
					Toast("服务器无响应，商品详情信息获取失败");
				})
			},
			//获取收藏
			getdataFav() {
				this.$http.post("http://localhost:3000/collectionGet", {
					tokenId: localStorage.getItem("tokenId")
				}).then(res => {
					// console.log(res);
					if (res.data.errorCode == 0) {
						let arr = res.data.list
						for (var i = 0; i < arr.length; i++) {
							if (arr[i].goodsId == this.goodsId) {
								this.active = false
								this.favId = arr[i]._id
							}
						}
					}
				})
			},

			totalprice() {
				return this.goodsNum * this.goodsPrice
			},
			PostlistORrder() {
				this.orderList = {
					goodsImg: this.goodsImg,
					goodsName: this.goodsName,
					goodsColor: this.goodsColor,
					goodsInfo: this.goodsInfo,
					goodsPrice: this.goodsPrice
				}
				this.$http.post("http://localhost:3000/orderlistAdd", {
					tokenId: localStorage.getItem("tokenId"),
					orderList: this.orderList,
					orderTotal: this.totalprice(),
					goodsId: this.goodsId
				}).then(res => {
					Toast({
						message: '订单提交成功',
						position: 'center',
						duration: 3000
					});
					this.orderList = "",
						this.$router.push('/Order')
				}).catch(err => {
					Toast("服务器未响应")
				})
			},
			addFav() {
				//console.log(this.goodsId)
				if (this.active) {
					this.active = false
					// 执行添加收藏夹
					this.$http.post('http://localhost:3000/collectionAdd', {
							tokenId: localStorage.getItem('tokenId'),
							goodsId: this.goodsId
						})
						.then(res => {
							Toast("商品收藏成功");
							console.log(res)
						})
						.catch(err => {
							console.log(err)
						})
				} else {
					this.active = true
					// 执行移除收藏夹
					this.$http.post('http://localhost:3000/collectionRemove', {
							tokenId: localStorage.getItem('tokenId'),
							collectionId: this.favId
						})
						.then(res => {
							Toast("商品移除成功");
							//console.log(res)
						})
						.catch(err => {
							console.log(err)
						})
				}
			}

		}
	}
</script>

<style>
	.active {
		background: #ccc !important;
		color: #7b7b7b !important
	}

	body {
		background-color: #f0efed;
	}

	.detail {
		width: 1070px;
		height: 18vh;
		margin: 0 auto;
	}

	.detail_header {
		background-color: #f9080e;
		padding: 10px;
	}

	.detail_img {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.detail_img div {
		width: 99%;
	}

	.detail_img h2 {
		color: white;
		text-align: center;
	}

	.detail_imges img {
		width: 100%;
	}

	.detail_shop {
		margin-top: 5px;
		background-color: white;
		box-sizing: border-box;
		padding: 10px;
	}

	.detail_shop_p {
		line-height: 3em;
	}

	.detail_shop_p h1 {
		font-size: 35px;
		color: #323534;
	}

	.detail_shop_p h2 {
		font-size: 30px;
		color: #F9080E;
	}

	.detail_shop_p em {
		font-style: normal;
	}

	.detail_shop_p p {
		font-size: 30px;
		color: #808181;
		font-weight: 1000;
	}

	.detail_input {
		font-size: 30px;
		color: #808181;
		font-weight: 1000;
	}

	.detail_inputs button {
		width: 50px;
		height: 30px;
		margin: 0px;
		border: 2px solid #CCCCCC;
		text-align: center;
		margin-left: -9px;
		background-color: white;
	}

	.detail_inputs button:first-child {
		border-radius: 5px;
		border-top-right-radius: 0px;
		border-bottom-right-radius: 0px;
	}

	.detail_inputs button:last-child {
		border-radius: 5px;
		border-top-left-radius: 0px;
		border-bottom-left-radius: 0px;
	}

	.detail_inputs .number {
		width: 50px;
		height: 25px;
		margin: 0px;
		border: 2px solid #CCCCCC;
		text-align: center;
		margin-left: -9px;
		background-color: white;
		/* border-radius: 5px;
		border-top-left-radius: 0px;
		border-bottom-left-radius: 0px; */
	}

	.detail_text {
		background-color: white;
		margin-top: 5px;
		box-sizing: border-box;
		padding: 10px;
	}

	.detail_text p {
		font-size: 30px;
		text-indent: 2em;
		line-height: 2em;
		color: #323534;
	}

	.detail_fotter {
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: #fafaf9;
		margin-top: 5px;
	}

	.detail_fotter p {
		font-size: 30px;
		color: #f9080e;
		margin-left: 10px;
	}

	.detail_fotter em {
		font-style: normal;
	}

	.detail_fotter_right {
		display: flex;
	}

	.detail_fotter_input1 button {
		padding: 30px;
		background-color: #ffc300;
		color: white;
		border: none;
		font-size: 30px;
	}

	.detail_fotter_input2 button {
		padding: 30px;
		background-color: #f9080e;
		color: white;
		border: none;
		font-size: 30px;
	}
</style>
