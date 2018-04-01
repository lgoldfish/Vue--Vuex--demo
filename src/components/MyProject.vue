<template>
  <div class="myProject">
	<div class="container">
		<h4>我的项目</h4>
		<div class="projectList">
			<div class="oneProject" @click="config" v-for="list in projectLists">
				<router-link :to="{name:'Config',params:{id:list.id}}">
				<div class="top">
					<div class="topLeft">
						<h4>{{list.projectName}}</h4>
						<span>{{list.createTime}} </span>
					</div>
					<div class="topRight">
						<img :src="'http://pan.baidu.com/share/qrcode?w=150&h=150&url='+list.url" alt="images">
					</div>
				</div>
			 </router-link>
				<div class="bottom">
					<div class="switch">
						<el-switch v-model="list.isOpen" on-color="#13ce66" off-color="#ff4949" @change="() => change(list.isOpen, list.id)" >
						</el-switch>
					</div>
					<div class="delete">
						<img  @click="deleteProject(list.id)" src="../assets/images/ui3.png" alt="delete">
					</div>
				</div>
			</div>
		</div>
		<div @click="createproject">
			<router-link :to="{name:'CreatProject'}">
		<div class="addProject">
			<div><img src="../assets/images/ic_addapp.png" alt=""></div>
			<p >添加新应用</p>
		</div>
		</router-link>
		</div>
	</div>
  </div>
</template>

<script>
import {mapMutations} from "vuex"
export default {
  name: 'myProject',
  data () {
    return {
    	projectLists:[]
    }
  },
   methods:{
    ...mapMutations(['config','createproject']),
    deleteProject:function(id){
    	this.axios.delete("http://expo.palmap.cn:35703/application/"+id,{
    		headers: {'Authorization': window.sessionStorage.getItem("Authorization")}
    	})
    	.then((res)=>{
    		console.log(res)
    		// this.$router.replace({path:'/home'})
    		this.$router.go(0)
    	})
    	.catch((err)=>{
    		console.log(err)
    	})
    },
    change:function(value, id){
    	if(value==false){
    			this.axios.get('http://expo.palmap.cn:35703/application/close/'+id, {
				      headers: {'Authorization': window.sessionStorage.getItem("Authorization")},
				  })
				  .then( (res)=> {
				    console.log(res);
				  })
				  .catch(function (error) {
				    console.log(error);
				  });
    	}
    	if(value==true){
    			this.axios.get('http://expo.palmap.cn:35703/application/open/'+id, {
				      headers: {'Authorization': window.sessionStorage.getItem("Authorization")},
				  })
				  .then( (res)=> {
				    console.log(res);
				  })
				  .catch(function (error) {
				    console.log(error);
				  });
    	}
    	console.log(value, id)
    }
  },
	  created(){
	  	this.axios.get('http://expo.palmap.cn:35703/application', {
	      headers: {'Authorization': window.sessionStorage.getItem("Authorization")},
	  })
	  .then( (res)=> {
	    console.log(res.data);
	    this.projectLists=res.data
	    // console.log( this.projectLists)
	  })
	  .catch(function (error) {
	    console.log(error);
	  });
  }
}
</script>

<style scoped>
	@import "../assets/css/myProject.css"
</style>
