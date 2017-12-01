<template>
    <div class="page">
        <header class="clearfix">
            <a  href="http://twinkle77.cn"><img src="../assets/logo.png" alt="logo.png" width="160px" class="logo fl"></a>
            <div class="logout fr">
                <span>{{this.$store.state.username}}</span>
                <i class="el-icon-d-arrow-right logout" @click.stop="logout">退出</i>
            </div>
        </header>
        <aside>
            <Aslide></Aslide>
        </aside>
        <section class="session">
            <transition name="slide">
                <keep-alive><router-view></router-view></keep-alive>
            </transition>
        </section>
        

    </div>
</template>
<script>
import Aslide from './Aslider'
export default {
    data(){
        return{
          
        }
    },
    methods:{
        logout(){
            this.$confirm('确认退出？')
            .then(_ => {
               this.$store.dispatch('UserLogout');
               this.$router.push({
                   path:'/login'
               })
            })
           
        },
        
    },
  components:{
      Aslide
  }
}
</script>
<style scoped lang="scss">
.slide-enter-active{
    transition: all .2s ease
}
.slide-enter{
    transform: translateX(300px);
    
}
.slide-leave-active{
    opacity: 0;

}
    .page{
       position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        header{
            position: fixed;
            top:0;
            left:0;
            right:0;
            width:100%;
            height:60px;
            box-shadow:0px 1px 2px #969696;
            a{
                display: inline-block;
                height:60px;
                img{
                    display: block;
                    height:60px;
                }
            }
            border-bottom:1px solid black;
            .logout{
                cursor: pointer;
                display: inline-block;
                margin-right:10px;
               margin-top:10px;
            }
        }
    }
    aside{
        position: fixed;
        left: 0;
        top: 60px;
        bottom: 0;
        width: 160px;
    }
    section{
        position: absolute;
        min-width: 630px;
        top: 70px;
        left: 160px;
        right: 0;
        bottom: 0;
        background-color: white;;
    }
</style>
