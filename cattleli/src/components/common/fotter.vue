<template>
	<div class="fotter">
		<ul>
			<li><router-link :to="{path:'/Main'}"><i class="icon iconfont icon-shouye" ><img src="../../assets/img/main_17.png"></i></router-link><br>商城</li>
			<li><router-link :to="{path:'/List'}"><i class="icon iconfont icon-fuwu" ><img src="../../assets/img/main_21.png"></i></router-link><br>服务</li>
			<li><router-link :to="{path:'/Order'}"><i class="icon iconfont icon-dingdan" ><img src="../../assets/img/main_24.png"></i></router-link><br>订单</li>
			<li><router-link :to="{path:'/User'}"><i class="icon iconfont icon-wode" ><img src="../../assets/img/main_20.png"></i></router-link><br>我的</li>
		</ul>
	</div>
</template>

<script>
	export default{
		name:"Fotter",
		data(){
			return{
				
			}
		}
	}
</script>

<style>
	li{
		list-style: none;
	}
	.fotter{
		width: 1070px;
		margin: 0 auto;
		background-color: #110e0d;
		height: 110px;
	}
	.fotter ul{
		display: flex;
		justify-content: space-around;
		color: white;
		align-items: center;
		text-align: center;
	}
</style>
