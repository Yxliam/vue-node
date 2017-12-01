<template>
    <div>
        <!-- Header -->
        <header id="header" class="header">
            <div class="header__top">
                <div class="container">
                    <div class="row">
                        <div class="col-sm-3">
                            <div class="wrap-logo" style="padding-bottom:18px;">
                                <router-link to="/" class="logo"></router-link>
                            </div>
                        </div>
                        <div class="col-sm-offset-2 col-md-offset-5 col-sm-6 col-md-4 hidden-xs">
                            <div class="col-xs-4 col-sm-5">
                                
                            </div>
                            <div class="col-xs-6 col-sm-7">
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="wsmenucontent overlapblackbg"></div>
            <div class="wsmenuexpandermain slideRight">
                <a id="navToggle" class="animated-arrow slideLeft">
                    <span></span>
                </a>
            </div>
            <div class="header_down">
                <div class="container">
                    <div class="wrapper clearfix bigmegamenu">
                        <!--Main Menu HTML Code-->
                        <nav class="wsmenu slideLeft clearfix">
                            <ul class="mobile-sub wsmenu-list">
                                <li class="visible-xs">
                                    <form class="navbar-form mob_search" role="search">
                                        <div class="form-group">
                                            <input type="text" v-model="searchText"  class="form-control" placeholder="Search">
                                        </div>
                                        <button type="submit" class="btn btn-search">
                                            <i class="icon-search"></i>
                                        </button>
                                    </form>
                                </li>

                                <li>
                                    <span class="wsmenu-click"></span>
                                    <router-link to="/" active-class="active">首页</router-link>
                                </li>
                                <li v-for="type in typeList" :key="type.id">
                                   <span class="wsmenu-click"></span> 
                                    <router-link :to="'/list_front/'+type.id"  active-class="active">{{ type.type_name }}</router-link>
                                </li>
                                   
                                
                                
                                </li>
                                <li class="navbar-right hidden-xs">
                                    <div class="navbar-form" role="search">
                                        <div class="form-group">
                                            <input type="text" v-model="searchText" @keyup.enter="searchFn"  class="form-control" placeholder="输入文章标题">
                                        </div>
                                        <button type="button" @click="searchFn" class="btn btn-search">
                                            <i class="icon-search"></i>
                                            <br/>Search
                                        </button>
                                    </div>
                                </li>
                                <li>
                                    <div class="visible-xs col-sm-offset-5 col-sm-4">
                                        <div class="col-sm-5">
                                            
                                        </div>
                                        <div class="col-sm-7">
                                           
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </nav>
                        <!--Menu HTML Code-->
                    </div>
                </div>
            </div>
        </header>
        <!-- END header -->
       
    </div>
</template>
<script>
import api from '../api'
export default {
    data(){
        return{
            searchText:' ',
            typeList:[],
        }
    },
    methods:{
        searchFn(event){
            this.$store.dispatch('handleSearch',this.searchText)  
            this.$router.push({
                path:'/search/'+this.searchText
            })
        },
        getAllType(){
            api.frontGetAllType()
                .then(res=>{
                    let resData = res.data
                    if(resData.code == 2){
                        this.typeList = resData.data.list;
                         this.$store.dispatch('handleList',this.typeList)  
                    }
                })
        }
    },
    mounted:function(){
        this.getAllType();      
    }
}
</script>
<style>

</style>
