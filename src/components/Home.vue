<template>
  <div class="home">
	  <div class="header">
		  <div class="headerContainer">
				 <span>
			  		<img src="../assets/images/logo.png" alt="logo">
			  		<span>Einstein</span>
			  	</span>
			  	<ul>
			  		<router-link :to="{name:'MyProject'}">
			  			<li @click="myproject" :class="{navActive:isNavActive1}"><img src="../assets/images/icon1.png" alt="icon1" > 我的项目</li>
		  			</router-link>

			  		<router-link :to="{name:'CreatProject'}">
			  			<li :class="{navActive:isNavActive2}" @click="createproject"><img id="secondImage" src="../assets/images/Group3.png" alt="icon1"> 创建项目</li>
		  			</router-link>
			  	</ul>
			  	<span id="loginOut" @click="loginOut" >登 出</span>
			  	<p>{{username}}</p>
		  </div>
	  </div>
	  <div class="mainContent">
	  	<router-view></router-view>
	  </div>
  </div>
</template>

<script>
import {mapState,mapMutations} from 'vuex';
export default {
  name: 'home',
  data () {
    return {
    	username:''
    }
  },
  created(){ 
  	console.log(window.sessionStorage.getItem("username"))
  	this.username=window.sessionStorage.getItem("username")
  },
  methods:{
  	...mapMutations(['myproject','createproject']),
    loginOut:function(){
      window.sessionStorage.clear()
      this.$router.replace({path:'/'})
    }
  },
  computed:{
  	isNavActive1(){
  		return this.$store.state.navState1
  	},
  	isNavActive2(){
  		return this.$store.state.navState2
  	}
  }
}
</script>

<style scoped>
	@import "../assets/css/home.css"
</style>
