<template>
	<div class="fav">
		<header class="fav_header" >
			<div class="fav_img">
				<router-link to="/User"><img src="../../assets/order_03.png"></router-link>
				<div>
					<h2>收藏夹</h2>
				</div>
			</div>
		</header>
		<div class="fav_main">
			<div class="fav_main_shopp">
				<div class="fav_mains" v-for="item in favlist" @click="jumpDetail(item.goodsId)">
					<div class="fav_mains_fav">
						<div>
							<router-link to="/Detail"><img :src="item.goodsImg" /></router-link>
						</div>
						<div class="fav_wen">
							<div><span>{{item.goodsName}}</span><br>
								<span>价格：￥{{item.goodsPrice}}</span></div>
						</div>
							</div>
						<div class="fav_main_left">
							<p @click="delFav(item._id)">删除</p>
						</div>
					</div>

				</div>
			</div>
			<FooterBar></FooterBar>
		</div>
</template>

<script>
	import FooterBar from '../common/fotter.vue'
	import {
		Toast
	} from 'mint-ui'
	export default {
		name: "Fav",
		components: {
			FooterBar
		},
		data() {
			return {
				favlist: []
			}
		},
		mounted() {
			this.getdataFav()
		},
		beforeRouteEnter: (to, from, next) => {
			if (localStorage.getItem('tokenId')) {
				next()
			} else {
				Toast('请登录')
				next('/')
			}
		},
		methods: {
			getdataFav() {
				this.$http.post("http://localhost:3000/collectionGet", {
					tokenId: localStorage.getItem("tokenId")
				}).then(res => {
					this.favlist = res.data.list
					// console.log(res.data.list)
				}).catch(err => {
					console.log(err)
				})
			},
			delFav(id) {
				this.$http.post("http://localhost:3000/collectionRemove", {
					tokenId: localStorage.getItem("tokenId"),
					collectionId: id
				}).then(res => {
					this.getdataFav()
				}).catch(err => {
					console.log(err)
				})
			},
			jumpDetail(goodsId) {
				this.$router.push({
					path: "/Detail",
					query: {
						id: goodsId
					}
				})
			}
		}
	}
</script>

<style>
	.fav {
		width: 1070px;
		/* height: 18vh; */
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		height: 130vh;
	}

	.fav_main {
		flex: 1;
		overflow-y: scroll;
	}

	.fav_header {
		background-color: #f9080e;
		padding: 10px;
	}

	.fav_img {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.fav_img div {
		width: 99%;
	}

	.fav_img h2 {
		color: white;
		text-align: center;
	}

	.fav_mains_fav {
		display: flex;
	}

	.fav_main_shopp {

		box-sizing: border-box;
		padding: 10px;
		background-color: #f9f8f7;
	}

	.fav_mains {
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
		align-items: flex-end;
	}

	.fav_mains span {
		font-size: 30px;
		color: #323534;
		margin-left: 10px;
		line-height: 2em;
	}

	.fav_main_left {
		width: 20%;
	}

	.fav_main_left p {
		font-size: 30px;
		color: #a4a09b;
	}
</style>
