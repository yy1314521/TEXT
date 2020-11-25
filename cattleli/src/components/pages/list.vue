<template>
	<div class="list">
		<HeaderTop></HeaderTop>
		<div class="list_main">
			<div class="banner"><img src="../../assets/img/n1s.jpg"></div>
			<ul>
				<li v-for="car in carList"><a href="javascript:void(0)" @click="showDetail(car._id)"><img :src="car.goodsImg" />
						<p>{{car.goodsName}}</p>
					</a>
				</li>
			</ul>
		</div>

		<FooterBar></FooterBar>
	</div>
</template>

<script>
	import HeaderTop from '../common/header.vue'
	import FooterBar from '../common/fotter.vue'
	import {
		Toast
	} from 'mint-ui'
	export default {
		name: "List",
		components: {
			HeaderTop,
			FooterBar
		},
		data() {
			return {
				carList: [],
				num: 4, // 数量
				goodType: 1, // 页码
			}
		},
		mounted() {
			this.getData()
		},
		methods: {
			getData() {
				this.$http.get('http://localhost:3000/goodslist', {
						params: {
							num: 4,
							goodsType: 1,
							page: 1
						}
					})
					.then((res) => {
						this.carList = res.data.list
					}).catch(error => {
						Toast("服务器无响应，商品列表获取失败");
					})
			},
			showDetail(thisid) {
				this.$router.push({
					path: '/Detail',
					query: {
						id: thisid
					}
				})
			}
		}
	}
</script>

<style>
	a{
		color: #888888;
		text-decoration: none;
		text-align: center;
		}
	body {
		background-color: #fafaf9;
	}

	.list {
		display: flex;
		flex-direction: column;
		height: 130vh;
	}

	.list_main {
		flex: 1;
		overflow-y: scroll;
	}

	.list_main img {
		width: 100%;
	}
.list_main ul{
		background-color: white;
		text-align: center;
	}
	.list_main ul img{
		width: 50%;
	}

	.list_main li {
		margin-top: 10px;
		font-size: 30px;
	}
</style>
