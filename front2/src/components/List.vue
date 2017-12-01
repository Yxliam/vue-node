<template>
  <div>
      <section>
            <!-- top news -->
            <div class="wrap wrap_white">
                <div class="container title">
                    <h2 class="title__h1 underscore" v-html="typeTitle"></h2>
                </div>
            </div>
            <div class="wrap wrap_gray pt20">
                <div class="container">
                    <div class="row"> 
                        <!-- <div class="col-sm-6" v-if="recommendList">
                            <div class="thumbnail thumbnail_big">
                                <img :src="recommendList.thumb" height="349" width="560" alt="News">
                                <div class="caption thumbnail__caption">
                                    <div class="news caption__news">
                                        <p class="news__category yellow-line" v-html="recommendList.tags"></p>
                                        <router-link :to="'/post/'+recommendList.id" class="news__head" v-html="recommendList.title"></router-link>
                                        <p class="news__desc"  v-html="recommendList.title"></p>
                                    </div>
                                    <div class="posted">
                                        <span class="posted__date"  v-html="recommendList.time"></span>
                                        <ul class="posted__icon">
                                            <li>
                                                <span>
                                                <i class="icon-comment-empty"></i>{{ recommendList.comment}}
                                            </span>
                                            </li>
                                            <li>
                                                <span>
                                                <i class="icon-eye"></i>{{ recommendList.consult}}
                                            </span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-3" v-for="item in fourList" :key="item.id">
                            <div class="thumbnail thumbnail_small">
                                <a href="news.html" class="thumbnail__link">
                                    <img :src="item.thumb" height="153" width="270" alt="News">
                                </a>
                                <div class="caption thumbnail__caption">
                                    <div class="news caption__news">
                                        <p class="news__category yellow-line" v-html="item.tags"></p>
                                       
                                         <router-link :to="'/post/'+item.id" class="news__link">
                                            <p class="news__text" v-html="item.title"></p>
                                         </router-link>
                                    </div>
                                    <div class="posted">
                                        <span class="posted__date" v-html="item.time"></span>
                                        <ul class="posted__icon">
                                            <li>
                                                <span>
                                                <i class="icon-comment-empty"></i>{{item.comment}}
                                            </span>
                                            </li>
                                            <li>
                                                <span>
                                                <i class="icon-eye"></i>{{item.consult}}
                                            </span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div> -->

                        <div class="col-sm-3" v-for="item in articleList" :key="item.id">
                            <div class="thumbnail thumbnail_small">
                                <a href="news.html" class="thumbnail__link">
                                    <img :src="item.thumb" height="153" width="270" alt="News">
                                </a>
                                <div class="caption thumbnail__caption">
                                    <div class="news caption__news">
                                        <p class="news__category yellow-line" v-html="item.tags"></p>
                                       
                                         <router-link :to="'/post/'+item.id" class="news__link">
                                            <p class="news__text" v-html="item.title"></p>
                                         </router-link>
                                    </div>
                                    <div class="posted">
                                        <span class="posted__date" v-html="item.time"></span>
                                        <ul class="posted__icon">
                                            <li>
                                                <span>
                                                <i class="icon-comment-empty"></i>{{item.comment}}
                                            </span>
                                            </li>
                                            <li>
                                                <span>
                                                <i class="icon-eye"></i>{{item.consult}}
                                            </span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                       
                    </div>
                </div>
                <div class="ajax_load" style="top:10px;" @click="getList" v-if="loadMore">
                    <i class="icon-arrows-cw"></i>Load more
                    <svg width="128" height="40" viewBox="0 0 128 40" xmlns="http://www.w3.org/2000/svg">
                        <rect x='0' y='0' fill='none' width='128' height='40'></rect>
                    </svg>
                </div>
                <div class="no-think-box"  v-else>
                    <h2 class="no-text">我可是有底线的</h2>
                </div>
            </div>
            <!-- /container-->
        </section>
        <!-- /top news -->
        <section class="wrap wrap_gray">
            <div class="container">
                <div class="row">
                    <div class="col-sm-9 projects">
                       
                        <!-- banner -->
                        <div class="banner">
                            <img src="/static/img/content/banner.jpg" height="221" width="850" alt="image" class="banner__img">
                            <div class="banner__box">
                                <p class="banner__text first-text">Advertising</p>
                                <p class="banner__text second-text">Here</p>
                                <a href="#" class="banner__link">Get Now</a>
                            </div>
                        </div>
                        <!-- END banner -->
                    </div>
                 <div class="col-sm-3">
                        <div class="block-title">
                            <h2 class="block-title__h2">联系我</h2>
                        </div>
                        <div class="twitter">
                            <div class="twitter__header">
                                <p class="twitter__header__name">676557432@qq.com</p>
                                <p class="twitter__header__text">Hello, world</p>
                            </div>
                           
                        </div>
                    </div>
                </div>
            </div>
        </section>
  </div>
</template>
<script>
import api from '../api'
export default {
   data(){
       return{
           page:1,
           aid:'',
           typeTitle:'',
           recommendList:{},
           fourList:[],
           loadMore:true,
           articleList:[],
       }
   },
//    watch:{
//        '$route'(){
//            let aid = this.$route.params.tid
//            console.log( aid );
//             this.getTop4(aid);
//             this.getReco(aid);
//             this.getList(aid,this.page)
//        }
//    },
   activated:function(){
       this.aid = this.$route.params.tid
       if(!this.aid || isNaN(this.aid)){
           this.$router.push({
               path:'/err'
           })
       }
       this.page = 1;
        let typeList = this.$store.state.activeType;
        typeList.forEach(element => {
           if(element.id == this.aid){
               this.typeTitle = element.type_name
           }      
        });
       this.getTop4(this.aid);
       this.getReco(this.aid);
       this.getList(this.aid,this.page)     
   },
   methods:{

       getList(typeid,page){
           api.getTidList({tid:this.aid,page:this.page})
            .then(res=>{
                var resData = res.data;
                if(resData.code == 2){
                    this.page ++    
                    resData.data.list.forEach(item=>{
                            this.articleList.push(item)     
                    })
                             
                }else{
                    this.loadMore = false
                }
            })
       },
       //获取4
       getTop4(typeid){
           api.getTop4List({pid:typeid})
            .then(res=>{
                var resData = res.data;
                if(resData.code == 2){
                    this.fourList = resData.data.list;
                }
            })
       },
       getReco(typeid){
           api.getRecommendArticle({pid:typeid})
            .then(res=>{
                var resData = res.data;
                if(resData.code == 2){
                    this.recommendList = resData.data.list[0];
                }
            })
       }    
   }
}
</script>
<style scoped lang="scss">
    .thumbnail_big{
        img{
           
            height:31rem;
        }
    }
    .thumbnail_small{
        img{
            height:10rem;
        }
    }
    .no-think-box{
        width:100%;
        text-align: center;
        .no-text{
            position: relative;
               &:after{
                  content:"";
                  position: absolute;
                  bottom:-10px;
                  left:50%;
                  margin-left:-30px;
                    border-bottom:2px solid #f38844;
                    width:60px;
                    color:red;
                    font-weight:bold;
               }   
            }
    }
    
</style>
