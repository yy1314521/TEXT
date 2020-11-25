<template>
	<div class="reg">
		<HeaderTop></HeaderTop>
		<div class="reg_main">
			<h2>用户注册</h2>
			<div class="form">
				<table>
					<tr style="border: 1px solid black;z-index: 9999;">
						<td class="td" >用户名</td>
						<td><input type="text" name="username" placeholder="请输入用户名" v-model="username"></td>
					</tr>
					<tr>
						<td class="td" >密码</td>
						<td><input type="password" name="password" placeholder="请输入密码" v-model="password"></td>
					</tr>
					<tr>
						<td class="td" > 确认密码</td>
						<td><input type="password" name="pwd" placeholder="请输入密码" v-model="pwd"></td>
					</tr>
					<tr>
						<td  class="td" >手机号</td>
						<td><input type="text" name="tel" placeholder="请输入手机号" v-model="tel"></td>
					</tr>
				</table>
				<div class="btn">
					<button @click="regiser">注册</button>
					<button @click="redom">重置</button>
				</div>
				<div><router-link to="/"><span>我有账号</span></router-link></div>
				
			</div>
		</div>
	</div>
</template>

<script>
	import HeaderTop from '../common/Headertop.vue'
	import {Toast} from 'mint-ui'
	export default{
		name:"Reg",
		components:{
			HeaderTop
		},
		data(){
			return{
				username:'',
				password:'',
				pwd:'',
				tel:''
			}
		},
		methods:{
			regiser(){
				if(this.username==''){
					Toast({
						message:'用户名不能为空',
						position:'top',
						duration:3000
					});
					return
				}
				if(this.password==""){
					Toast({
						message:'密码不能为空',
						position:'top',
						duration:3000
					});
					return
				}
				if(this.password!=this.pwd){
					Toast({
						message:'两次密码不一致',
						position:'top',
						duration:3000
					});
					return
				}
				if(this.tel==''){
					Toast({
						message:'手机号不能为空',
						position:'top',
						duration:3000
					});
					return
				}
				this.$http.post('http://localhost:3000/reg',{
					username:this.username,//序利化数据
					password:this.password,
					tel:this.tel
				})
				.then((res)=>{
					console.log(res)
					if(res.data.errCode==1){
						Toast({
							message:res.data.errMsg,
							position:'top',
							duration:3000
						});
						return
					}
					if(res.data.errCode==3){
						Toast({
							message:res.data.errMsg,
							position:'top',
							duration:3000
						});
						return
					}
					Toast({
						message:res.data.errMsg,
						position:'top',
						duration:3000
					});
					this.$router.push('/')//编程式路由，直接跳转登录页
				})
				.catch((err)=>{
					Toast({
						message:'服务器没响应',
						position:'center',
						duration:3000
					})
					console.log(err.response.status)
				})
			},
			redom(){
				this.username=this.password=this.pwd=this.tel=""
			}
		}
	}
</script>

<style>
	body{
		background-color: #f8f7f6;	
	}
	a{
		text-decoration: none;
		color: #323534;
	}
	.reg_main h2{
		font-size: 30px;
		text-align: center;
		color: #666560;
		margin-top: 100px;
	}
	/* .form{
		box-sizing: border-box;
		padding: 30px;
	} */
	table{
		width: 100%;
		line-height: 3em;
		box-sizing: border-box;
		padding:0 80px;
		/* margin: 0 auto; */
	}
	table input{
		width: 100%;
		border: 1px solid #CCCCCC;
		height: 48px;
		background-color: #f8f7f6;
	}
	table td{
		font-size: 30px;
	}
	.td{
		width: 15%;text-align: center;
	}
	table tr{
		/* background-color: white; */
	}
	.btn{
		width: 20%;
		padding: 10px;
		margin: 0 auto;
		text-align: center;
	}
	.btn button:first-child{
		background-color: #16a3ff;
		border-radius:5px ;
		padding:15px 20px;
		border: none;
	}
	.btn button:last-child{
		background-color: #fe4241;
		border-radius:5px ;
		padding: 15px 20px;
		border: none;
	}
	.form span{
		font-size: 30px;
		text-align: center;
		display: block;
	}
</style>
