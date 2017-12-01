import Vue from 'vue'
import Router from 'vue-router'
import store from '../vuex'

const Home = resolve => require(['@/components/Home.vue'], resolve);
const Error = resolve => require(['@/components/Error.vue'], resolve);
const Login = resolve => require(['@/components/Login.vue'], resolve);
const Article = resolve => require(['@/components/Article.vue'], resolve);
const List = resolve => require(['@/components/List.vue'], resolve);
const Types = resolve => require(['@/components/Types.vue'], resolve);
const Me = resolve => require(['@/components/Me.vue'], resolve);
const EditArticle = resolve => require(['@/components/EditArticle.vue'], resolve);
Vue.use(Router)

const router =  new Router({
  mode: 'history',
  routes: [
    {
      path: '/admin',
      name: 'Home',
      component: Home,
      redirect:'/admin/article',
      meta:{
        auth:true,
        title:'首页'
      },
      children:[
        {
          path:'article',
          component:Article,
          meta:{
            auth:true,
            title:'发布文章'
          }
        },
        {
          path:'editArticle/:id',
          component:EditArticle,
          meta:{
            auth:true,
            title:'编辑文章'
          }
        }
        ,{
          path:'list',
          component:List,
          meta:{
            auth:true,
            title:'文章管理'
          }
        },{
          path:'types',
          component:Types,
          meta:{
            auth:true,
            title:'栏目管理'
          }
        },{
          path:'about',
          component:Me,
          meta:{
            auth:true,
            title:'关于我'
          }
        }
      ]
    },
    {
      path:'/login',
      component:Login,
      meta:{
        title:'登录'
      }
    },
    {
      path:'*',
      name:'Error',
      component:Error,
      meta:{
        title:'Error'
      }
    }
  ]
})
//在全局导航钩子中检查 meta 字段
router.beforeEach((to, from, next) => {
  let token = store.state.token;
  document.title = to.meta.title || document.title  
  if(to.meta.auth){
    if(token){
      return next();
    }
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  }else{
    next();
  }
});

export default router;
