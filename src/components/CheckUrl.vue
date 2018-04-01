<template>
  <div class="checkUrl">
  		<div class="copyUrl">
  			<span >URL : </span>
  			<input  type="text" id="thisUrl" v-model="linkUrl">
        <button class="copyUrlButton"  @click="copyUrl">复制</button>
        <router-link :to="{name:'MyProject'}"><button>查看我的项目</button></router-link>
  		</div>
  		<div class="quickMark">
  			<span>二维码 : </span>
        <div><img :src="'http://pan.baidu.com/share/qrcode?w=150&h=150&url='+$store.state.url" alt="二维码"></div>
  		</div>
  </div>
</template>

<script>
export default {
  name: 'checkUrl',
  data () {
    return {
      linkUrl:this.$store.state.url
    }
  },
  methods:{
     copyUrl:function(){
    var Url=document.getElementById("thisUrl");
        Url.select(); // 选择对象
    document.execCommand("Copy"); // 执行浏览器复制命令
    }
  }
}
</script>

<style scoped>
	@import "../assets/css/checkUrl.css"
</style>