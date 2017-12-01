var mysql = require('mysql');
var config = require('../config/index.js')

//定义pool池
var pool  = mysql.createPool({
    host     : config.dev.database.HOST,
    user     : config.dev.database.USERNAME,
    password : config.dev.database.PASSWORD,
    database : config.dev.database.DATABASE
  });

let query = function( sql, values ) {
    
      return new Promise(( resolve, reject ) => {
        pool.getConnection(function(err, connection) {
          if (err) {
            resolve( err )
          } else {
            connection.query(sql, values, ( err, rows) => {
              if ( err ) {
                reject( err )
              } else {
                resolve( rows )
              }
              //回收pool
              connection.release()
            })
          }
        })
      })
    
    }
    //登录查询用户
let dologin = function(username,password){
    let _sql = `select * from user where username = "${username}" and password = "${password}"`;
    return query(_sql)
}
//登录更新token
let updateUserToken = function(value){
  let _sql = "update user set token = ? where id = ?;"
  return query(_sql,value)
}

//添加文章
let addArticlModel = function(value){
  let _sql  = "insert into article (typeid,title,tags,thumb,content,time) values(?,?,?,?,?,?)"
  return query(_sql,value)
}
//查询栏目下的文章是否存在
let selectTitleById = function(title,type){
  let _sql = `select * from article where title = "${title}" and typeid = "${type}" `;
  return query(_sql)
}
//添加栏目
let addTypeModel = function(value){
  let _sql = 'insert into types (type_name,time) values(?,?)'
  return query(_sql,value)
}
//根据栏目名称查询
let selectTypeModelByType = function(value){
  let _sql = `select * from types where type_name ="${value}" `;
  return query(_sql)
}

//查询所有的栏目
let selectTypeAllModel = function(){
  let _sql = `select * from types`;
  return query(_sql)
}
//删除栏目根据栏目id
let delTypeByIdModel = function(id){
  let _sql = `delete from types where id = "${id}"`;
  return query(_sql)
}
let editTypeByIdModel = function(value){
  let _sql = "update types set type_name = ?,time = ? where id = ?";
  return query(_sql,value)
}
//获取所有文章
let selectAllArticleModel = function(value){
    let _sql = `select * from article`;
    return query(_sql)
}

//根据id查找文章
let selectArticleByIdModel = function(id){
  let _sql = `select * from article where id = "${id}"`;
  return query(_sql);
}

//文章编辑
let updateArticleModel = function(value){
  let _sql = "update article set typeid = ?,title = ?,tags = ?,thumb = ? ,content = ?,time = ? where id =?"
  return query(_sql,value)
}
//文章公开和禁止切换
let updateArticleStateModel = function(value){
  let _sql = "update article set is_public = ? where id = ?"
  return query(_sql,value)
}

//删除文章
let delArticleByIdModel = function(id){
  let _sql = `delete from article where id = "${id}"`;
  return query(_sql)
}

//推荐文章
let articleRecommendModel = function(data){
  let _sql = "update article set recommend = ? where id = ?"
  return query(_sql,data)
}
//设置轮播
let setSliderModel = function(data){
  let _sql = "update article set is_slider = ? where id =?"
  return query(_sql,data)
}



//前台
let selectArticleByTypeIdModel = function(tid,page){
  let _sql = `select * from article where typeid = "${tid}" limit ${(page-1)*8},8;`
  return query(_sql);
}

//根据tid 查询热门文章
let selectArticleByTypeHotModel = function(id){
  let _sql = '';
  if(id){
    _sql = `SELECT * FROM article where typeid = "${id}" ORDER BY consult DESC limit 0,4`    
  }else{
     _sql = `SELECT * FROM article  ORDER BY consult DESC limit 0,4`
  }
  return query(_sql)
}

//查找推荐文章一条
let getRecommendModel = function(id){
  let _sql = '';
  if(id){
     _sql = `SELECT * FROM article where typeid = "${id}" and recommend = 1 ORDER BY recommend DESC limit 0,1`    
  }else{
    _sql = `SELECT * FROM article where  recommend = 1 ORDER BY recommend DESC limit 0,1` 
  }
  return query(_sql)
}

let updateConsultModel = function(data){
  let _sql = 'update article set consult = ? where id = ?'
  return query(_sql,data)
}

//查询轮播
let selectSliderModel = function(){
  let _sql = `SELECT * FROM article where is_slider = 1 ORDER BY is_slider DESC limit 0,4`
  return query(_sql)
}
//首页列表(不包括 热门和轮播 )
let homeListModel = function(page){
  let _sql = `SELECT * FROM article where is_slider = 0 and recommend = 0 ORDER BY time DESC limit ${(page-1)*4},4;`
  return query(_sql) 
}

//首页类型 (3条输出)
let homeTypeListModel = function(){
  let _sql = `SELECT * FROM article where is_public = 1 ORDER BY time DESC`;
  return query(_sql)
}

//首页最新文章
let newArticleListModel = function(){
  let _sql = `SELECT * FROM article where is_public = 1 ORDER BY time DESC limit 0,3`;
  return query(_sql)
}

//搜索
let searchArticleListModel = function(title,page){
  let _sql = `SELECT * FROM article where is_public = 1 and  title like "%${title}%" ORDER BY time DESC limit ${(page-1)*12},12`;
  return query(_sql)
}











module.exports = {
    dologin,
    updateUserToken,
    addArticlModel,
    addTypeModel,
    selectTypeModelByType,
    selectTypeAllModel,
    delTypeByIdModel,
    editTypeByIdModel,
    selectTitleById,
    selectAllArticleModel,
    selectArticleByIdModel,
    updateArticleModel,
    updateArticleStateModel,
    delArticleByIdModel,
    selectArticleByTypeIdModel,
    selectArticleByTypeHotModel,
    articleRecommendModel,
    getRecommendModel,
    updateConsultModel,
    setSliderModel,
    selectSliderModel,
    homeListModel,
    homeTypeListModel,
    newArticleListModel,
    searchArticleListModel

}