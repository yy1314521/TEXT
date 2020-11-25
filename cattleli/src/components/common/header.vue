<template>
	<header>
		<div class="container">
			<div class="logo">
				<div class="logo-imgs">
					<img src="../../assets/img/360截图20201115232357708.jpg" />
				</div>
				<div class="logo-img">
					<strong>小牛电动车</strong><br />
					<strong>CALF ELECTRIC VEHICLE</strong>
				</div>
			</div>
			<div class="user">
				
					<router-link to="/User"><img src="../../assets/main_05.png"></router-link>
					<router-link to="/Fav"><img src="../../assets/main_03.png"></router-link>
				
			</div>
		</div>
	</header>
</template>

<script>
	export default {
		name: "Header",
		data() {
			return {

			}
		}
	}
</script>

<style>
	* {
		padding: 0;
		margin: 0;
	}

	header {
		width: 1070px;
		/* min-width: 1000px; */
		margin: 0 auto;
		height: 18vh;
		background-color: #f8f7f6;
	}

	.container {
		display: flex;
		justify-content: space-between;
		align-items: center;
		box-sizing: border-box;
		/* margin: 20px; */
	}

	.logo {
		display: flex;
		justify-content: space-around;
		align-items: center;
		margin-top: 10px;
	}

	.logo-imgs {
		width: 120px;
	}

	.logo img {
		width: 100%;
	}

	.logo {
		width: 35%;
	}

	strong {
		color: red;
	}

	strong:first-child {
		font-size: 40px;
	}

	.user {
		width: 20%;
		height: 13vh;
		display: flex;
		align-items: center;
		justify-content: space-around;
	}
</style>
