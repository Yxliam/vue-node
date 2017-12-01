<template>
  <!-- content-->
                <div class="wrap wrap_gray pt20">
                    <div class="container">
                        <div class="row" v-if="searchList.length>0">
                            <div class="col-sm-3" v-for="item in searchList"  :key="item.id">
                                <div class="thumbnail thumbnail_small" >
                                    <a href="news.html" class="thumbnail__link">
                                        <img :src="item.thumb" height="153" width="270" alt="News">
                                    </a>
                                    <div class="caption thumbnail__caption">
                                        <div class="news caption__news">
                                            <p class="news__category yellow-line">Economy</p>
                                            <a href="news.html" class="news__link">
                                                <p class="news__text" v-html="item.title"></p>
                                            </a>
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
                      
                        <div class="no-think-box no-think-box2"  v-else>
                             <h2 class="no-text">搜索不到您想要的内容，换别的关键字尝试下！</h2>
                        </div>
                    </div>
                    <div class="ajax_load" @click="getSearchList" v-if="loadMore">
                        <i class="icon-arrows-cw"></i>Load more
                        <svg width="128" height="40" viewBox="0 0 128 40" xmlns="http://www.w3.org/2000/svg">
                            <rect x='0' y='0' fill='none' width='128' height='40'></rect>
                        </svg>
                    </div>
                     <div class="no-think-box"  v-else>
                        <h2 class="no-text">我可是有底线的</h2>
                 </div>
                </div>
                <!-- END content-->
            </div>
</template>
<script>
import api from '../api'
export default {
    data(){
        return{
            page:1,
            search:'',
            loadMore:true,
            searchList:[],
        }
    },
    methods:{
        getSearchList(){
             console.log( this.searchList );
            api.searchList({page:this.page,title:this.search})
                .then(res=>{
                     var resData = res.data;
                    if(resData.code == 2){
                        this.loadMore = true;
                        this.page ++    
                        resData.data.list.forEach(item=>{
                                this.searchList.push(item)     
                        })
                    }else{
                        this.loadMore = false
                    }
                })
        }
    },
    activated:function(){
        this.search = this.$store.state.search
        this.getSearchList();
    },
}
</script>
<style scoped lang="scss">
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
                  margin-left:-60px;
                    border-bottom:2px solid #f38844;
                    width:120px;
                    color:red;
                    font-weight:bold;
               }   
            }
    }
    .no-think-box2{
        min-height:40rem;
    }
</style>
