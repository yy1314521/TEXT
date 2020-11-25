<template>
	<div class="login">
		<HeaderTop></HeaderTop>
		<div class="login_main">
			<h2>用户登录</h2>
			<div class="form1">
				<table>
					<tr style="border: 1px solid black;z-index: 9999;">
						<td class="td">用户名</td>
						<td><input type="text" name="username" placeholder="请输入用户名" v-model="username"></td>
					</tr>
					<tr>
						<td class="td">密码</td>
						<td><input type="text" name="password" placeholder="请输入密码" v-model="password"></td>
					</tr>
				</table>
				<div class="btn">
					<button @click="shows">登录</button>
					<button @click="redoms">重置</button>
				</div>
				<div>
					<router-link to="/Reg"><span>还没账号？</span></router-link>
				</div>

			</div>
		</div>
	</div>
</template>

<script>
	import HeaderTop from '../common/Headertop.vue'
	import {Toast} from 'mint-ui'
	export default {
		name: "Login",
		components: {
			HeaderTop
		},
		data() {
			return {
				username: '',
				password: ''
			}
		},
		methods: {
			shows() {
				if (this.username == '') {
					Toast({
						message: '用户名不能为空',
						position: 'top',
						duration: 3000
					});
					return
				}
				if (this.password == "") {
					Toast({
						message: '密码不能为空',
						position: 'top',
						duration: 3000
					});
					
					return
				}
				this.$http.post('http://localhost:3000/login', {
					username: this.username, //序利化数据
					password: this.password
				}).then((res) => {
					//登录成功后，将服务端返回的tokenid保存到localstrong中
					localStorage.setItem('tokenId', res.data.tokenId)
					Toast({
						message: '登录成功',
						position: 'top',
						duration: 3000
					});
					this.$router.push('/Main')
				}).catch((err) => {
					if (err.response.status == 401) {
						Toast({
							message: '无法访问',
							position: 'top',
							duration: 3000
						})
					}
					if (err.response.status == 404) {
						Toast({
							message: '网络超时，请稍后再试',
							position: 'top',
							duration: 3000
						});
						return
					}
					console.log(err.response.status)
				})
			},
			redoms() {
				this.username = this.password = ""
			}
		}
	}
</script>

<style>
	a {
		text-decoration: none;
		color: #323534;
	}

	body {
		background-color: #f8f7f6;
	}

	.login_main h2 {
		font-size: 30px;
		text-align: center;
		color: #666560;
		margin-top: 100px;
	}

	table {
		width: 100%;
		line-height: 3em;
		box-sizing: border-box;
		padding: 0 80px;
		/* margin: 0 auto; */
	}

	table input {
		width: 100%;
		border: 1px solid #CCCCCC;
		height: 48px;
		background-color: #f8f7f6;
	}

	table td {
		font-size: 30px;
	}

	.td {
		width: 15%;
		text-align: center;
	}

	table tr {
		/* background-color: white; */
	}

	.btn {
		width: 20%;
		padding: 10px;
		margin: 0 auto;
		text-align: center;
	}

	.btn button:first-child {
		background-color: #16a3ff;
		border-radius: 5px;
		padding: 15px 20px;
		border: none;
	}

	.btn button:last-child {
		background-color: #fe4241;
		border-radius: 5px;
		padding: 15px 20px;
		border: none;
	}

	.form1 span {
		font-size: 30px;
		text-align: center;
		display: block;
	}
</style>
