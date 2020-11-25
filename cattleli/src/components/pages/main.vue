<template>
	<div class="contal">
		<HeaderTop></HeaderTop>
		<div class="main">
			<Banner></Banner>
			<nav>
				<ul>
					<li><router-link to="/List"><a href="#"><i class="icon iconfont icon-diandongche01"><img src="../../assets/img/main_06.png" /></i><br><span>整车热卖</span></a></router-link></li>
					<li><a href="#"><i class="icon iconfont icon-remai"><img src="../../assets/img/main_09.png" /></i><br><span>热卖配件</span></a></li>
					<li><a href="#"><i class="icon iconfont icon-mendian"><img src="../../assets/img/main_11.png" /></i><br><span>线下门店</span></a></li>
					<li><a href="#"><i class="icon iconfont icon-zhoubianyou"><img src="../../assets/img/main_03.png" /></i><br><span>文化周边</span></a></li>
				</ul>
			</nav>
			<div class="hot-car">
				<h2>整车热卖</h2>
				<div class="cart-list" >
					<div class="recommend"><img src="../../assets/img/n1s.jpg"></div>
					<div class="rec-list">
						<ul>
							<!-- <li v-for="(car,index) in cartlist">
								<a href="" @click="showDetails(car.id)"><img :src="imgUrl+car.goodsImg"></a>
							</li> -->
						</ul>
					</div>
				</div>
			</div>
			<div class="hot-parts">
				<!-- <h2>热卖配件</h2> -->
				<div class="part-list">
					<div class="rec-list">
						<ul>
							<!-- <li><img src="../../assets/af6c22bf.jpg"></li>
						<li><img src="../../assets/b02be514.jpg"></li>
						<li><img src="../../assets/b31476c6.jpg"></li>
						<li><img src="../../assets/bdfadaa9.jpg"></li> -->
						</ul>
					</div>
				</div>
			</div>
		</div>
		<FooterBar></FooterBar>
	</div>

</template>

<script>
	import HeaderTop from '../common/header.vue'
	import FooterBar from '../common/fotter.vue'
	import Banner from '../common/banner.vue'
	import {Toast} from 'mint-ui'
	export default {
		name: "Main",
		components: {
			HeaderTop,
			FooterBar,
			Banner
		},
		data() {
			return {
				
				
			}
		}
		}
</script>

<style>
	.contal {
		display: flex;
		flex-direction: column;
		height: 130vh;
	}

	.main {
		width: 1070px;
		margin: 0 auto;
		flex: 1;
		overflow-y: scroll;
	}

	nav {
		background-color: #f4f3f2;
	}

	.main nav ul {
		display: flex;
		justify-content: space-around;
		align-items: center;
		text-align: center;
	}

	.main a {
		text-decoration: none;
		color: #323534;

	}

	.hot-car h2 {
		font-size: 30px;
		color: red;
		margin-left: 5px;
	}

	.hot-parts h2 {
		font-size: 30px;
		color: red;
		margin-left: 5px;
	}

	/* 	.hot-parts .rec-list ul{
		display: flex;
		justify-content: space-around;
	}
	.hot-parts .rec-list li{
		width: 25%;
		border: 1px solid #ccc;
		box-sizing: border-box;
		padding: 5px;
	} */
	.hot-parts .rec-list li:hover {
		border: 1px solid #f1fda0;
	}

	.hot-parts .rec-list img {
		width: 100%;
	}
</style>
