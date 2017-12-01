<template>
  <div id="app">
     <HeaderBar></HeaderBar>
      <transition v-if="tranShow" :name="transitionName">  
          <keep-alive><router-view :key="key" class="child-view"></router-view> </keep-alive>
    </transition>
     <FooterBar v-if="showFoot"></FooterBar>
  </div>
</template>

<script>
import HeaderBar from './components/Header'
import FooterBar from './components/Footer'
export default {
  name:'app',
  data(){
    return {
      transitionName: 'slide-left',
      showFoot:false,
      tranShow:false,
    }
  },
  //监听路由的路径，可以通过不同的路径去选择不同的切换效果 
 watch: { 
  '$route' (to, from) { 
      if(to.path == '/'){ 
        this.transitionName = 'slide-right'; 
      }else{ 
        this.transitionName = 'slide-left'; 
      } 
    } 
  },
  created() {  
    document.body.removeChild(document.getElementById('Loading')) 
    
},
mounted(){
  this.tranShow = true
  let _this = this 
  //解决刷新的时候和动画 出现会有重绘的现象
  setTimeout(function(){
   _this.showFoot = true  
  },0)
},
  components:{
    HeaderBar,
    FooterBar,
  },
  computed: {
    key() {
        return this.$route.name !== undefined? this.$route.name +new Date(): this.$route +new Date()
    }
 }
}

</script>

<style>
.child-view { 

 width: 100%; 
 height: 100%; 
 transition: all .5s cubic-bezier(.55,0,.1,1); 
} 
.slide-left-enter, .slide-right-leave-active {  
  opacity: 0;  
  -webkit-transform: translate(30px, 0);  
  transform: translate(30px, 0);  
}  
.slide-left-leave-active, .slide-right-enter {  
  opacity: 0;  
  -webkit-transform: translate(-30px, 0);  
  transform: translate(-30px, 0);  
}  
</style>
