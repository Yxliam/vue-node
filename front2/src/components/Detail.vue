<template>
  <!-- header slider -->
        <div class="wrapper">
            <article class="container articles">
                <div class="row">
                    <div class="col-sm-4 col-md-3 right_sidebar hidden-xs hidden-sm" data-spy="affix" data-offset-top="112" data-offset-bottom="80">
                        <div class="news-tabs">
                            <p class="news-tabs__title h2">News feed</p>
                            <ul class="news-tabs__nav nav nav-tabs shadow_text" role="tablist">
                                <li role="presentation" class="active">
                                    <a href="#home" role="tab" data-toggle="tab">
                                        <span class="time">today, 12:30</span>
                                        Volkswagen hit by multiple probes in US
                                    </a>
                                </li>
                                <li role="presentation">
                                    <a href="#profile" role="tab" data-toggle="tab">
                                        <span class="time">today, 12:30</span>
                                        Volkswagen hit by multiple probes in US
                                    </a>
                                </li>
                                <li role="presentation">
                                    <a href="#messages" role="tab" data-toggle="tab">
                                        <span class="time">today, 12:30</span>
                                        Volkswagen hit by multiple probes in US
                                    </a>
                                </li>
                                <li role="presentation">
                                    <a href="#settings" role="tab" data-toggle="tab">
                                        <span class="time">today, 12:30</span>
                                        Volkswagen hit by multiple probes in US
                                    </a>
                                </li>
                                <li role="presentation">
                                    <a href="#home" role="tab" data-toggle="tab">
                                        <span class="time">today, 12:30</span>
                                        Volkswagen hit by multiple probes in US
                                    </a>
                                </li>
                                <li role="presentation">
                                    <a href="#profile" role="tab" data-toggle="tab">
                                        <span class="time">today, 12:30</span>
                                        Volkswagen hit by multiple probes in US
                                    </a>
                                </li>
                                <li role="presentation">
                                    <a href="#messages" role="tab" data-toggle="tab">
                                        <span class="time">today, 12:30</span>
                                        Volkswagen hit by multiple probes in US
                                    </a>
                                </li>
                                <li role="presentation">
                                    <a href="#settings" role="tab" data-toggle="tab">
                                        <span class="time">today, 12:30</span>
                                        Volkswagen hit by multiple probes in US
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-sm-12 col-md-9 p0 wrap-headline">
                        <img src="/static/img/content/banner.jpg" alt="img" class="wrap-headline__img">
                        <div class="headline clearfix">
                            <div class="headline__data">
                                <a href="category.html" class="headline__category headline__category_orange" v-html="typeTitle"></a>
                                <p class="headline__category" v-html="article.time"></p>
                            </div>
                           
                        </div>
                    </div>
                    <div class="col-sm-12 col-md-9 article_text">
                        <div class="current">
                            <h1 class="text-center yel_line current__title" v-html="article.title"></h1>
                            <div class="current__text" v-html="compiledMarkdown">

                            </div>
                        </div>
                    </div>
                    <div class="col-sm-12 col-md-9 tags">
                        <p>标签:</p>
                        <ul>
                            <li v-for="tag in tagsCompile" :key="tag">
                                <a href="#" title="World" class="font" v-html="tag"></a>
                            </li>
                           
                        </ul>
                    </div>
                    <div class="col-sm-9 col-md-8 col-lg-6 comments">
                        <p class="comments__title">评论区</p>
                    </div>
                </div>
            </article>
        </div>
</template>
<script>
import api from "../api"
import marked from 'marked'
export default {
  data(){
      return{
          id:'',
          typeTitle:'',
          article:{}
      }
  },
  computed:{
   compiledMarkdown () {
     return marked(this.article.content, { sanitize: true })
   },
   tagsCompile(){
       console.log(this.article.tags);
       return this.article.tags.split(',')
   }
 },
  methods:{
      getArtic(obj){
        api.getArticle(obj)
            .then(res=>{
                 var resData = res.data;
                if(resData.code == 2){
                    if(resData.data.list.length){
                         this.article = resData.data.list[0];
                        this.updateConst({id:this.id,consult:this.article.consult+1})         
                         let typeList = this.$store.state.activeType;
                        typeList.forEach(element => {
                            if(element.id == this.article.typeid){
                                this.typeTitle = element.type_name
                            }      
                        });           
                    }else{
                        this.$router.push({
                            path:'/err'
                        })
                    }
                }
            })
      },
      updateConst(obj){
          api.updateCons(obj)
      }
  },
  activated:function(){
      this.id = this.$route.params.aid
      let obj = {id:this.id}
      this.getArtic(obj);
       
    
  }
}
</script>
<style>

</style>
