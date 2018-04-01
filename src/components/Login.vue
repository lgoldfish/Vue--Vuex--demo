<template>
  <div class="login">
  <div class="bgc">
      <div class="userLogin">
        <div class="title">
            <img src="../assets/images/logo2.png" alt="icon">
            <span>Einstein</span>
        </div>
        <form method="post" @submit.prevent="submit">
            <div class="formtop">
                <div class="username">
                    <input type="text" name="username" v-model="username" placeholder="请输入账号">
                </div>
                <div class="middleLine"></div>
                <div class="password">
                    <input type="password" name="password"  v-model="password" placeholder="请输入密码">
                </div>
            </div>
            <div class="isRemenber">
              <!--   <input type="radio"> <span>记住密码</span> -->
            </div>
            <div v-if="loginStatus==401" class="warning">
                <p>登陆失败，账号或密码错误</p>
            </div>
            <div class="button" >
            <button @click="myproject">登录</button>
            </div>
        </form>
    </div>
  </div>
  </div>
</template>

<script>
import {mapState,mapMutations} from 'vuex';
export default {
  name: 'login',
  data () {
    return {
      username:"",
      password:"",
      loginStatus:null
    }
  },
  methods:{
    ...mapMutations(['myproject']),
    submit:function () {
      // console.log(this.username,this.password)
    //  this.axios({
    //     method:"post",
    //     data:{
    //       username:this.username,
    //       password:this.password
    //     },
    //     url:"http://expo.palmap.cn:35703/user/login"
    //  })
    //  .then((res)=>{
    //     console.log("123",res.data)
        // res.data.status==200
        // if(res.data.status==200){
          window.sessionStorage.clear()
          window.sessionStorage.setItem("username", this.username);
          // window.sessionStorage.setItem("Authorization", res.data.token);
          // window.sessionStorage.setItem("appKey", res.data.appKey);
          this.$router.replace({path:'/home'})
        // }else {
        //    this.loginStatus=401
        // }

    //  })
    //  .catch((error)=>{
    //   console.log(error)
    //  })
    }
  }
}
</script>

<style scoped>
	@import "../assets/css/login.css"
</style>
