import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

const Home = resolve => require(['@/components/Home.vue'], resolve);
const Error = resolve => require(['@/components/Error.vue'], resolve);
const Post = resolve => require(['@/components/Detail.vue'], resolve);
const List = resolve => require(['@/components/List.vue'], resolve);
const Search = resolve => require(['@/components/Search.vue'], resolve);


export default new Router({
  mode: 'history',
  scrollBehavior(to, from, savedPosition){
    if(savedPosition){
      return savedPosition;
    }
    if(to.meta.scrollTop === true){
      return { x: 0, y: 0 };
    }
  },
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path:'/post/:aid',
      name:'Post',
      component:Post,
      meta: { scrollTop: true } 
    },{
      path:'/list_front/:tid',
      name:'List',
      component:List
    },
    {
      path:'/search/:text',
      name:'Search',
      component:Search
    },
    {
      path:'*',
      name:'Error',
      component:Error
    }
  ]
})
