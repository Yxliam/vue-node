<template>
  <div>
       <!-- header slider -->
        <div class="slate_gray">
            <div class="container">
                <div class="row header_news_panel">
                    <!-- Tab panes -->
                    <div class="col-sm-8 tab-content tab-content_mob-p0">
                        <div role="tabpanel" :class="index == activeItem ? 'tab-pane fade in active' : 'tab-pane fade' " v-for="(slider,index) in sliderList" :key="slider.id">
                            <img :src="slider.thumb" alt="main img" class="tab-pane__img">
                            <div class="header_news_text tab-pane__block">
                                <p class="tab-pane__category yel_line" v-html="slider.type_name"></p>
                                <router-link class="tab-pane__title" :to="'/post/'+slider.id" v-html="slider.title"></router-link>
                                <p class="tab-pane__text" v-html="slider.title"></p>
                            </div>
                        </div>
                        
                    </div>
                    <!-- END Tab panes -->
                    <!-- Nav tabs -->
                    <div class="col-sm-4 news-tabs">
                        <p class="news-tabs__title h2">图文</p>
                        <ul class="news-tabs__nav nav nav-tabs shadow_text" role="tablist">
                            <li role="presentation" @click="activeItem=index" :class="activeItem == index ? 'active' : ''" v-for="(slider,index) in sliderList" :key="slider.id">
                                <a href="javascript:void(0)" role="tab" data-toggle="tab">
                                    <span class="time" v-html="slider.time"></span>
                                    {{slider.title}}
                                </a>
                            </li>
                           
                        </ul>
                    </div>
                    <!-- END Nav tabs -->
                </div>
            </div>
        </div>
        <!-- END header slider -->
        <!-- top news-->
        <section>
            <!-- top news -->
            <!-- title -->
            <div class="wrap wrap_white">
                <div class="container title">
                    <h1 class="title__h1 underscore">热门文章</h1>
                </div>
            </div>
            <!-- END title -->
            <div class="wrap wrap_gray pt20">
                <div class="container">
                    <div class="row">
                            <div class="col-sm-6" >
                            <div class="thumbnail thumbnail_big" v-if="hotArticle">
                                <img :src="hotArticle.thumb" height="349" width="560" alt="News">
                                <div class="caption thumbnail__caption">
                                    <div class="news caption__news">
                                        <p class="news__category yellow-line" v-html="hotArticle.tags"></p>
                                        <router-link :to="'/post/'+hotArticle.id" class="news__head" v-html="hotArticle.title"></router-link>
                                        <p class="news__desc"  v-html="hotArticle.title"></p>
                                    </div>
                                    <div class="posted">
                                        <span class="posted__date"  v-html="hotArticle.time"></span>
                                        <ul class="posted__icon">
                                            <li>
                                                <span>
                                                <i class="icon-comment-empty"></i>{{ hotArticle.comment}}
                                            </span>
                                            </li>
                                            <li>
                                                <span>
                                                <i class="icon-eye"></i>{{ hotArticle.consult}}
                                            </span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            </div>
                        <div class="col-sm-3" v-for="item in fourList" :key="item.id">
                            <div class="thumbnail thumbnail_small">
                                <router-link :to="'/post/'+item.id" class="thumbnail__link">
                                    <img :src="item.thumb" height="153" width="270" alt="News">
                                </router-link>
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

                    <div class="row">
                         <div class="col-sm-3" v-for="item in articleList" :key="item.id">
                            <div class="thumbnail thumbnail_small">
                                <router-link :to="'/post/'+item.id" class="thumbnail__link">
                                    <img :src="item.thumb" height="153" width="270" alt="News">
                                </router-link>
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
                <!-- btn load-->
                <div class="ajax_load" style="top:10px;" @click="getHomeListFont" v-if="loadMore">
                    <i class="icon-arrows-cw"></i>Load more
                    <svg width="128" height="40" viewBox="0 0 128 40" xmlns="http://www.w3.org/2000/svg">
                        <rect x='0' y='0' fill='none' width='128' height='40'></rect>
                    </svg>
                </div>
                <div class="no-think-box"  v-else>
                    <h2 class="no-text">我可是有底线的</h2>
                </div>
                <!-- END btn load-->
            </div>
            <!-- /container-->
        </section>
        <!-- /top news -->
        <section class="wrap wrap_gray">
            <div class="container">
                <div class="row">
                    <div class="col-sm-9 projects">
                        <div class="projects__title">
                            <h2 class="block-title__h2">广告</h2>
                        </div>
                        <!-- <div class="projects__row">
                            <div class="special special_big">
                                <img src="static/img/content/spec1.jpg" height="311" width="551" alt="image" class="special__img">
                                <div class="special__box">
                                    <h5 class="special__category yel_line">Special project</h5>
                                    <a href="#" class="special__link">Lorem ipsum dolor sit amet</a>
                                    <p class="special__desc">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                                </div>
                            </div>
                            <div class="special special_small">
                                <img src="static/img/content/spec2.jpg" height="311" width="285" alt="image" class="special__img">
                                <div class="special__box">
                                    <h5 class="special__category yel_line">Special project</h5>
                                    <a href="#" class="special__link">Lorem ipsum dolor</a>
                                    <p class="special__desc">Duis aute irure dolor in reprehenderit in voluptate velit.</p>
                                </div>
                            </div>
                        </div> -->
                    
                        <!-- banner -->
                        <div class="banner">
                            <img src="static/img/content/banner.jpg" height="221" width="850" alt="image" class="banner__img">
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
        <section class="wrap wrap_gray">
            <div class="container">
                <div class="row">
                    <div class="col-sm-9">
                        <div class="row" v-for="(itemList,index) in typeListArr" :key="index">
                            <div class="block-title col-sm-12">
                                <h2 class="block-title__h2">{{ itemList.type }}
                                <router-link class="block-title__view-all" :to="'/list_front/'+itemList.typeid" data-hover="See all">See all</router-link>
                            </h2>
                            </div>

                            <div class="col-sm-4" v-for="(item,index2) in itemList.list.slice(0,3)"   :key="item.id">
                                <div class="thumbnail thumbnail_small">
                                    <router-link :to="'/post/'+item.id" class="thumbnail__link">
                                        <img :src="item.thumb" height="153" width="270" alt="News">
                                    </router-link>
                                    <div class="caption thumbnail__caption">
                                        <div class="news caption__news">
                                            <p class="news__category yellow-line" v-html="item.type_name"></p>
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
                    
                    <div class="col-sm-3">
                        <div class="block-title">
                            <h2 class="block-title__h2">最新文章</h2>
                        </div>
                        <div class="wrap-redaction wrap-redaction_white">
                            <div class="redaction redaction_line" v-for="newitem in newList" :key="newitem.id">
                                <p class="redaction__category yel_line" v-html="newitem.type_name"></p>
                                <router-link :to="'/post/'+newitem.id" class="redaction__title" v-html="newitem.title"></router-link>
                                <p class="redaction__text" v-html="newitem.title"></p>
                                <p class="redaction__time" v-html="newitem.time"></p>
                            </div>
                           
                        </div>
                    </div>
                </div>
            </div>
        </section>
  </div>
</template>
<script>
import api from "../api"
export default {
    data(){
        return{
            page:1,
            sliderList:[],
            activeItem:0,
            typeList:[],
            hotArticle:{},
            fourList:[],
            articleList:[],
            loadMore:true,
            newList:[],
            typeListArr:[]
        }
    },
    created:function(){
         this.typeList = this.$store.state.activeType;
         //轮播
        this.getList()
        this.getHot();
        this.getTop4()
        this.getHomeListFont();
        this.getNewListFront();
        this.getTypeListFront();
    },
    methods:{
        getTypeListFront(){
            api.getTypeList()  
                .then(res=>{
                     var resData = res.data;
                    if(resData.code == 2){
                       this.typeListArr = resData.data.list;
                                
                    }
                })

        },
        getNewListFront(){
            api.getNewList()
                .then(res=>{
                    var resData = res.data;
                    if(resData.code == 2){
                        resData.data.list.forEach(item=>{
                             this.typeList.forEach(element => {
                                    if(element.id == item.typeid){
                                        item['type_name'] = element.type_name
                                    }      
                                });
                                this.newList.push(item)     
                        })
                       
                                
                    }
                })
        },
        getList(){
            api.getSliderList()
                .then(res=>{
                     var resData = res.data;
                    if(resData.code == 2){
                        resData.data.list.forEach(item=>{
                             this.typeList.forEach(element => {
                                    if(element.id == item.typeid){
                                        item['type_name'] = element.type_name
                                    }      
                                });
                                this.sliderList.push(item)     
                        })
                       
                                
                    }
                })
        },
        //获取4
       getTop4(){
           api.getTop4List()
            .then(res=>{
                var resData = res.data;
                if(resData.code == 2){
                    this.fourList = resData.data.list;
                }
            })
       },
       getHomeListFont(){
           api.getHomeList({page:this.page})
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
        getHot(){
            api.getRecommendArticle()
                .then(res=>{
                    var resData = res.data;
                    if(resData.code == 2){
                       this.hotArticle = resData.data.list[0]
                    }
                })
        }
    }
}
</script>
<style scoped lang="scss">
    .tab-pane__img{
        height:30rem;
    }
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
