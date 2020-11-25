<template>
	<div class="userclass">
		<div class="userclass_header">
			<div class="userclass_img">
				<router-link to="/Main"><img style="background-color: white;" src="../../assets/order_03.png"></router-link>
				<div><h2>用户中心</h2></div>
			</div>
		</div>
		<div class="user_class">
		
		<div class="userclass_main">
			<div class="userclass_qq">
				<div><img src="../../assets/user_03.png"></div>
				<p>{{usercenter.userName}}</p>
			</div>
			<div class="userclass_btn">
				<button @click="loginOut">退出</button>
			</div>
		</div>
		<div class="userclass_span">
			<div><p>电话号码</p></div>
			<div><p>{{usercenter.usertel}}</p></div>
		</div>
		<div class="userclass_span">
			<div><p>收藏夹</p></div>
			<div><router-link to="/Fav"><p>{{usercenter.collection}}></p></router-link></div>
		</div>
		<div class="userclass_span">
			<div><p>订单列表</p></div>
			<div><router-link to="/Order"><p>{{usercenter.order}}></p></router-link></div>
		</div>
		</div>
		<FooterBar></FooterBar>
	</div>
</template>
<script>
	import FooterBar from '../common/fotter.vue'
	import {Toast} from 'mint-ui'
	import {MessageBox} from 'mint-ui'
	export default{
		name:"User",
		components:{
			FooterBar
		},
		data(){
			return{
				usercenter:[]
			}
		},
		mounted() {
			this.getUsercenter()
		},
		methods:{
			getUsercenter(){
				this.$http.post('http://localhost:3000/userCenter',{
					tokenId:localStorage.getItem("tokenId")
				}).then(res=>{
					this.usercenter=res.data.list
				})
			},
			 loginOut() {
			      MessageBox.confirm("确定执行此操作?").then(action => {
			        if (action) {
			          localStorage.removeItem("tokenId");
			          this.$router.push("/");
			        }
			      });
			    },
		},
		beforeRouteEnter: (to, from, next) => {
			if (localStorage.getItem('tokenId')) {
				next()
			} else {
				Toast('请登录')
				next('/')
			}
		}
	}
</script>

<style>
	a{
		color: black;
		text-decoration: none;
	}
	.userclass{
		width: 1070px;
		height: 18vh;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		height: 130vh;
	}
	.user_class{
		flex: 1;
		overflow-y: scroll;
	}
	.userclass_header{
		background-color: #f9080e;
		padding: 10px;
	}
	.userclass_img{
		display: flex;
		justify-content: space-between;
		align-items: center;
	} 
	.userclass_img div{
		width: 99%;
	}
	.userclass_img h2{
		color: white;
		text-align: center;
	}
	.userclass_main{
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 5px;
		box-sizing: border-box;
		padding: 30px;
		border-bottom: 1px solid #dcdad6;
	}
	.userclass_btn button{
		width: 150px;
		height: 80px;
		border:none;
		background-color: #f0efe3;
		font-size: 30px;
		border-radius:10px ;
	}
	.userclass_qq{
		display: flex;
		align-items: center;
		font-size: 30px;
	}
	.userclass_qq p{
		margin-left: 5px;
	}
	.userclass_span{
		display: flex;
		justify-content: space-between;
		margin-top: 5px;
		padding: 30px;
		font-size: 30px;
		border-bottom: 1px solid #dcdad6;
	}
</style>
