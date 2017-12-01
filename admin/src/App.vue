<template>
  <div id="app">
      <transition  name="el-fade-in-linear">  
         <router-view></router-view>
    </transition>
  </div>
</template>

<script>

export default {
  name:'app',
  data(){
    return {
     
    }
  },
 
  created() {  
    document.body.removeChild(document.getElementById('Loading')) 
    
},
}

</script>

<style>

</style>
