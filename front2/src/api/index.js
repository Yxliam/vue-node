import axios from 'axios'

export default{
     //获取类型
     frontGetAllType(data){
        return axios.post('/api/type_all_front',data)
     },
     //根据tid 获取列表
     getTidList(data){
         return axios.post('/api/type_article_list_front',data)
     },
     //根据id 获取前4阅读量
     getTop4List(data){
        return axios.post('/api/get_for_article_front',data)
     },
     //获取推荐文章
     getRecommendArticle(data){
         return axios.post('/api/get_recommend_front',data)
     },
     //获取文章
     getArticle(data){
         return axios.post('/api/get_article_front',data)
     },
     //修改文章阅读
     updateCons(data){
         return axios.post('/api/update_article_consult_front',data)
     },
     //获取轮播
     getSliderList(){
         return axios.post('/api/select_slider_front')
     },
     //首页列表图
     getHomeList(data){
         return axios.post('/api/home_list_front',data)
     },
     //首页最新文章
     getNewList(data){
         return axios.post('/api/home_new_front',data)
     },
     //首页类型列表
     getTypeList(data){
        return axios.post('/api/home_type_list_front',data)
     },
     //搜索
     searchList(data){
        return axios.post('/api/home_search_front',data)
     }

}