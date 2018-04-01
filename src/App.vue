<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <router-view></router-view>
  </div>
</template>

<script>
import "./assets/css/reset.css"
export default {
  name: 'app'
}
</script>

<style>
#app {
  /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
  font-family: "PingFangTC-Regular";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background-color: #FBFBFB;
}
html {
  background-color: #FBFBFB;
}


/*div[class^="controlBottomRightLayer"] .am-wingblank {
    width: 1.5rem;
}*/
</style>
