import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import CreatProject from '@/components/CreatProject'
import MyProject from '@/components/MyProject'
import Config from '@/components/Config'
import CheckUrl from '@/components/CheckUrl'
import Home from "@/components/Home"
import ThisProject from "@/components/ThisProject"

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path:'/home',
      name:'Home',
      component:Home,
      redirect:'/home/myproject',
      children:[
            {
            path: 'myproject',
            name: 'MyProject',
            component: MyProject,
            },
            {
              path: 'creatproject',
              name: 'CreatProject',
              component: CreatProject
            },
            {
              path:"thisproject",
              name:"ThisProject",
              component:ThisProject,
              redirect:"/home/thisproject/config/:id",
              children:[
                {name:'Config',path:"config/:id",component:Config},
                {name:'CheckUrl',path:"checkurl",component:CheckUrl}
              ]
            }
          ]
        }   
  ]
})
