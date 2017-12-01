import axios from '../axios'

export default{
     // 登录
  localLogin(data){
    return axios.post('/api/login',data)
  },
  //添加栏目
  localAddType(data){
    return axios.post('/api/add_type',data)
  },
  //查询所有栏目
  localTypeAll(data){
    return axios.post('/api/type_all',data)
  },
  //删除栏目
  localTypeDel(data){
    return axios.post('/api/del_type',data)
  },
  //编辑栏目
  localTypeEdit(data){
    return axios.post('/api/edit_type',data) 
  },
  //添加文章
  localAddArticle(data){
    return axios.post('/api/add_article',data)
  },
  //文章列表
  localArticleList(data){
    return axios.post('/api/get_article_list',data)
  },
  //文章查找
  localgetArticle(data){
    return axios.post('/api/get_article',data)
  },
  //编辑文章
  localEditArticle(data){
    return axios.post('/api/edit_article',data)
  },
  //修改文章状态
  localUpdateState(data){
    return axios.post('/api/update_state',data)
  },
  //删除文章
  localDelArticle(data){
    return axios.post('/api/del_article',data)
  },
  //缩略图上传
  localUpload(data){
    return axios.post('/api/upload',data)
  },
  //推荐文章
  localRecommend(data){
    return axios.post('/api/set_recommend',data)
  },
  //设置轮播
  localSetSlider(data){
    return axios.post('/api/set_slider',data)
  }
}