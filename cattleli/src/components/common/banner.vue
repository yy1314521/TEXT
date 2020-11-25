<template>
	<div class="banner">
		<div v-on:mouseover="stop()" v-on:mouseout="move()" class="app">
		        <transition-group tag="ul" name="image">
		            <li v-for="(items,index) in list" v-show="index===num" :key="index" >
		                <img :src="items.imgUrl" alt="">
		                <div>
		                <span v-for="(items,index) in data" class="nav" @click="change(index)" :class="{'active':index==num}">{{items}}</span>
		                </div>
		            </li>
		        </transition-group>
		    </div>
	</div>
</template>
<script>
	export default{
		name:"Banner",
		data(){
			return{
				data:['1','2','3'],
				    time:'',
				    num:0,
				    list:[{imgUrl: require('../../assets/img/sw01.cd3192a.png'),  id: '1'  },
					{imgUrl: require('../../assets/img/sw02.7854db7.png'),  id: '2'  },
					{imgUrl: require('../../assets/img/sw03.901a267.png'),  id: '3'  },
				        ],
				}
			},
			methods:{
			    play(){
			        this.time=setInterval(()=>{
			            this.num++;
			            if(this.num==3){
			                this.num=0
			            }
				
			        },2000)
			    },
			    change(i){
			        this.num=i
			    },
			    stop(){
			        clearInterval(this.time)
			    },
			    move(){
			        this.play();
			    }
			},
			created(){
			    this.play();
			},
	}
</script>

<style>
	.banner{
		width: 1070px;
		margin: 0 auto;
		height: 300px;
		/* margin-top: 13vh; */
	}
	   *{
	            margin: 0;
	            padding: 0;
	            list-style: none;
	            /* background-color: black; */
	        }
	      /*  html{
	            height: 100%;
	        }
	        body{
	            height: 100%;
	            display: flex;
	            justify-content: center;
	        } */
	        .app{
	            height: 100%;
	            width: 100%;
	            display: flex;
	            justify-content: center;
	        }
	        .banner img{
	            width: 100%;
	            height: 300px;
	        }
	        .banner li{
	            width: 100%;
	            height: 300px;
	            border: 5px solid white;
	            color: white;
	            position: absolute;
	        }
	        .banner ul{
	            width: 100%;
	            display: flex;
	            justify-content: center;
	            align-items: center;
	            overflow: hidden;
	            position: relative;
	        }
	        .nav{
	            background-color: #c3c3c3;
	            color: white;
	            margin-left: 10px;
	            font-size: 20px;
	            border-radius: 50%;
	           padding: 0 8px;
	            margin-bottom: 10px;
	            opacity: 0.5;
	        }
	        .active{
	            opacity: 1;
	        }
	        .banner li div{
	            margin-top: -30px;
	        }
	        .image-enter-active {
	            transition: all 1.5s linear
	        }
	        .image-leave-active {
	            transition: all 1.5s linear;
	        }
	        .image-enter-to {
	            transform: translateX(0);
	        }
	        .image-enter {
	            transform: translateX(100%);
	        }
	        .image-leave {
	            transform: translateX(0);
	        }
	        .image-leave-to {
	            transform: translateX(-100%);
	        }
</style>
