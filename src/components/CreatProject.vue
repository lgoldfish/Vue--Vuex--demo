<template>
  <div class="creatProject">
  		<div class="container">
  			<h4>创建项目</h4>
  			<div class="searchData">
  				<form action="" method="post" @submit.prevent="createsubmit">
  					<div class="firstRow">
  						<span>项目名称 ： </span>
  						<input type="text" placeholder="请输入项目名称" name="projectName" v-model="formData.projectName">
  						<span>AppKey : </span>
  						<span>{{formData.appKey}}</span>
  						<span class="mapidleft">Map ID : </span>
  						<input type="text" name="MapId" v-model="formData.mapId">

  					</div>
  					<div class="secondRow">
  						<ul>
  							<li v-for="template in templates">
  								<input type="radio" name="colorId" v-model="formData.colorId" :value="template.templateName">Style {{template.templateName}}
  								<div><img :src="template.imgUrl" alt=""></div>
  							</li>
  						</ul>
              <div class="clearfloat"></div>
  					</div>
  					<div class="buttonForm">
              <button @click="newmyproject">确认并下一步</button>
  					</div>
  				</form>
  			</div>
  		</div>
  </div>
</template>

<script>
import {mapMutations} from 'vuex';
export default {
  name: 'creatProject',
  data () {
    return {
      formData:{
        appKey:'',
        createTime:'',
        url:'',
        dataServiceUrl:'',
        isOpen:true,
        appName:''
      },
      templates:{}
    }
  },
  methods:{
    ...mapMutations(['newmyproject']),
    createsubmit:function(){
      console.log("666666",this.formData)
      if(this.formData.mapId==2233){
        this.axios({
              url:'http://expo.palmap.cn:35703/application',
              method:"post",
              data:this.formData,
              headers: {'Authorization': window.sessionStorage.getItem("Authorization")}
            })
            .then((res)=>{
              if(res.status==200){
                // this.$store.state.createProjectUrl=res.data.obj.id
                switch (this.formData.colorId) {
                  case "ONE":
                    this.$store.state.colorIndex=0
                    break;
                  case "TWO":
                    this.$store.state.colorIndex=1
                    break;
                    case"THREE":
                    this.$store.state.colorIndex=2
                    break;
                    case "FOUR":
                    this.$store.state.colorIndex=3
                    break;
                }
                  this.$router.replace({path:"/home/thisproject/config/"+res.data.obj.id})
              }else {
                  console.log("请求API失败")
              }

            })
            .catch((err)=>{
              console.log(err)
          })
          }else {
            alert("sorry,您输入的 mapId 不存在！")
            this.$store.state.navState1=false
            this.$store.state.navState2=true

          }
        }
  },
  created(){
    console.log("window.sessionStorage.getItem(appKey)",window.sessionStorage.getItem("appKey"))
    this.formData.appKey=window.sessionStorage.getItem("appKey")
      this.axios.get('http://expo.palmap.cn:35703/template', {
          headers: {'Authorization': window.sessionStorage.getItem("Authorization")}
      })
      .then( (res)=> {
        console.log("res",res.data.length);
        this.templates=res.data
        // this.$store.state.templates=res.data

      })
      .catch(function (error) {
        console.log(error);
      });
  }
}
</script>

<style scoped>
	@import "../assets/css/creatProject.css"
</style>
