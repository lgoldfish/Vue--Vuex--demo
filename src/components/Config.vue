<template>
  <div class="config">
  		<div class="preView">
  			<div class="preViewBox">
        <div class="appTitle">
          <h2>{{formData.appName}}</h2>
        </div>
  				<iframe :src="formData.url" name="ifrmname"/>
  			</div>
  			<div class="preRefresh" @click="refresh"></div>
  		</div>
  		<div class="centerLine"></div>
  		<div class="configContent">
  			<h2>基础配置</h2>
  			<form action="" method="post" @submit.prevent="submit">
  				<label for="">应用名称：</label>
  				<input id="applyName" type="text" name="appName" v-model="formData.appName" ><br>
  				<label for="data2">默认楼层：</label>
  				<select name="floorId" id="data2" v-model="formData.floorId">
  					<option value="1">F1</option>
  				</select><br>
  				<label for="">地图旋转角度(°)：</label>
  				<input id="angle1" type="number" name="rotationAngle" v-model="formData.rotationAngle"  min="0" max="360" @keyup="limit1(formData.rotationAngle)"><br>
  				<label for="">地图俯仰角度(°)：</label>
          <!-- @keyup="limit2(formData.pitchAngle)"  min="0" max="45" -->
  				<input id="angle2" type="number" name="pitchAngle" v-model="formData.pitchAngle"   ><br>
  				<label for="">视野高度(M)：</label>
				 <el-input-number v-model="formData.initSize" name="initSize" :step="100"></el-input-number>
				 <span class="reset" @click="reset1">重置</span>
  				<br>
  				<label for="">文字碰撞间距(px)：</label>
  				 <el-input-number v-model="formData.spacing" name="spacing" :step="1"></el-input-number>
  				 <span class="reset"  @click="reset2">重置</span>
  				<ul>
  					<!-- <li v-for="(postech,index) in colorConfig" :class="{'active':ind===index}" @click="changeBgc(index)">{{postech}}</li> -->
  				</ul>
  				<!-- <router-link :to="{name:'CheckUrl'}"> -->
          <button @click="CheckUrl">保存并更新URL</button>
          <!-- </router-link> -->
  			</form>
  		</div>
  </div>
</template>

<script>
import {mapMutations} from "vuex"
export default {
  name: 'config',
  data () {
    return {
    	 num1:2536112,
    	 num2:20,
       formData:{
        floorId:'',
        color:""
       },
       colorConfig:[],
       ind:""

    }
  },
  methods:{
    ...mapMutations(['CheckUrl']),
    submit:function(){
        console.log("666666666666666",this.formData)
        this.axios({
          url:'http://expo.palmap.cn:35703/config/'+this.$route.params.id,
          method:"post",
          data:this.formData,
          headers: {'Authorization': window.sessionStorage.getItem("Authorization")}
        })
        .then((res)=>{
          // console.log(res)
          this.$store.state.url=res.data.obj.url
          if(res.status==200){
            this.$router.replace({path:'/home/thisproject/checkurl'})
          }
        })
        .catch((err)=>{
          console.log(err)
        })
    },
      refresh:function(){
         console.log("555555555555",this.formData)
          this.axios({
            url:'http://expo.palmap.cn:35703/config/'+this.$route.params.id+"/refresh",
            method:"post",
            data:this.formData,
            headers: {'Authorization': window.sessionStorage.getItem("Authorization")}
          })
          .then((res)=>{
            console.log("refresh",res.data.obj.url)
            // this.formData.url=""
            this.formData.url=res.data.obj.url + `?date=${Date.now()}`
            // console.log("this.formData.url",this.formData.url)
          })
          .catch((err)=>{
            console.log(err)
          })
      },
    changeBgc:function(index){
      this.ind=index
      switch (index) {
        case 0:
        this.formData.color="ONE"
        break;
         case 1:
        this.formData.color="TWO"
        break;
         case 2:
        this.formData.color="THREE"
        break;
         case 3:
        this.formData.color="FOUR"
        break;
      }
    },
    limit1:function(value){
      if(value>360){
        this.formData.rotationAngle=360
      }
      if(value<0){
         this.formData.rotationAngle=0
      }
    },
    //  limit2:function(value){
    //   if(value>45){
    //     this.formData.pitchAngle=45
    //   }
    //   if(value<0){
    //      this.formData.pitchAngle=0
    //   }
    // },
    reset1:function(){
      this.formData.initSize=0
    },
     reset2:function(){
      this.formData.spacing=0
    }
  },
  created(){

    this.ind=this.$store.state.colorIndex
    this.getConfig=(url)=>{
      this.axios.get('http://expo.palmap.cn:35703/config/'+url, {
          headers: {'Authorization': window.sessionStorage.getItem("Authorization")}
      })
      .then( (res)=> {
        console.log("res00000",res.data);
        this.formData=res.data
        // console.log( "this.formData",this.formData.url)
        this.$store.state.projectName=res.data.projectName
        this.$store.state.url=res.data.url
        this.$store.state.urltoId=urlparams
           switch (res.data.color) {
              case "ONE":
                this.ind=0
                break;
              case "TWO":
                this.ind=1
                break;
                case"THREE":
                this.ind=2
                break;
                case "FOUR":
                this.ind=3
                break;
            }

      })
      .catch(function (error) {
        console.log(error);
      });
    }
    // if(this.$route.params.id){
      console.log("params",this.$route.params.id)
      var urlparams=this.$route.params.id
      this.getConfig(urlparams)

    // }
    // if(this.$store.state.createProjectUrl){
    //   console.log("store",this.$store.state.createProjectUrl)
    //   this.getConfig(this.$store.state.createProjectUrl)
    // }
      this.axios.get('http://expo.palmap.cn:35703/template', {
          headers: {'Authorization': window.sessionStorage.getItem("Authorization")}
      })
      .then( (res)=> {
        console.log("restemplate");
        var templates=res.data
        console.log("22222222",templates)
        for (var i=0; i<templates.length;i++){
          console.log("66666",templates[i].templateName)
          this.colorConfig.push("Style "+templates[i].templateName)
        }
        console.log(" this.colorConfig", this.colorConfig)
        // this.$store.state.templates=res.data

      })
      .catch(function (error) {
        console.log(error);
      });
   
  },
  computed:{

  }
}
</script>

<style scoped>
@import "../assets/css/config.css"
</style>
