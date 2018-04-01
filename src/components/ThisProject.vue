<template>
  <div class="thisProject">
  		<div class="container">
  			<div class="leftNav">
  				<ul>
  					<li class="projectName"><img src="../assets/images/ic_application.svg" alt="">{{$store.state.projectName}}</li>
  					<router-link :to="'/home/thisproject/config/'+ $store.state.urltoId"  ><li  :class="{thisProjectNav:isThisProject1}"  @click="config" >应用配置</li></router-link>
  					<router-link :to="{name:'CheckUrl'}" ><li  :class="{thisProjectNav:isThisProject2}"  @click="CheckUrl">查看链接</li></router-link>
  				</ul>
  			</div>
  			<div class="rightContent">
  				<router-view></router-view>
  			</div>
  		</div>
  </div>
</template>

<script>
// import store from "@/vuex/store"
import {mapMutations} from "vuex"
export default {
  name: 'thisProject',
  data () {
    return {
    }
  },
   computed:{
    isThisProject1(){
      return this.$store.state.navState3
    },
    isThisProject2(){
      return this.$store.state.navState4
    }
  },
  methods:{
    ...mapMutations(['config','CheckUrl'])
  }
  // ,
  // store
}
</script>

<style scoped>
	@import "../assets/css/thisProject.css"
</style>
