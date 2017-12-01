const router = require('koa-router')()
const multer = require('koa-multer');//加载koa-multer模块
//checkToken作为中间件存在
const checkToken = require('../token/checkToken.js');
const User = require('../controllers/user.js');
const Type = require('../controllers/type.js');
const Article = require('../controllers/article.js');
const Front = require('../controllers/front.js')

//配置  
var storage = multer.diskStorage({  
    //文件保存路径  
    destination: function (req, file, cb) {  
      cb(null, 'uploads/')  
    },  
    //修改文件名称  
    filename: function (req, file, cb) {  
      var fileFormat = (file.originalname).split(".");  
      cb(null,Date.now() + "." + fileFormat[fileFormat.length - 1]);  
    }  
  })  
  //加载配置  
var upload = multer({ storage: storage });

//后台接口
//登录
router.post('/login',User.loginPost);
//添加栏目
router.post('/add_type',checkToken,Type.createType)
//查询所有栏目
router.post('/type_all',checkToken,Type.selectTypeAll)
//删除栏目
router.post('/del_type',checkToken,Type.delectTypeById);
//修改栏目
router.post('/edit_type',checkToken,Type.editTypeById);
//添加文章
router.post('/add_article',checkToken,Article.createArticle)
//文章列表
router.post('/get_article_list',checkToken,Article.getArticleList)
//查找文章
router.post('/get_article',checkToken,Article.getArticle)
//编辑文章
router.post('/edit_article',checkToken,Article.editArticle)
//文章状态
router.post('/update_state',checkToken,Article.updateState)
//文章删除
router.post('/del_article',checkToken,Article.delArticleById)
//缩略图上传
router.post('/upload', upload.single('file'), async (ctx, next) => {  
    console.log( ctx );
    ctx.body = {  
      filename: 'http://'+ctx.host+'/'+ctx.req.file.filename//返回文件名  
    }  
  }) 
//推荐
router.post('/set_recommend',checkToken,Article.setRecommend)
//设置轮播
router.post('/set_slider',checkToken,Article.setSliderCon)


//前台接口
router.post('/type_all_front',Type.selectTypeAll)
//根据tid 查找相关文章
router.post('/type_article_list_front',Front.articleList)
//前4阅读
router.post('/get_for_article_front',Front.getMostConstuList)
//推荐文章
router.post('/get_recommend_front',Front.getRecommend)
//获取文章
router.post('/get_article_front',Front.findArticleById)
//修改阅读
router.post('/update_article_consult_front',Front.updateConsult)
//轮播查询
router.post('/select_slider_front',Front.selectSlider)
//首页文章列表
router.post('/home_list_front',Front.homeList)
//首页最新文章
router.post('/home_new_front',Front.newList)
//首页类型文章
router.post('/home_type_list_front',Front.getTypeList)
//搜索
router.post('/home_search_front',Front.searchArticleList)


module.exports = router
