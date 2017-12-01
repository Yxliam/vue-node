const  Model = require('../lib/mysql.js');
const moment = require('moment')
class ArticleController{
    //文章添加
    static async createArticle(ctx){
        //es6 解构
        //这里解构需要和 ctx.request.body 的对象属性相同
        const { title,content,tags,type,thumb } = ctx.request.body;    
        let time = moment().format('YYYY-MM-DD HH:mm')
        if(!title){
            ctx.jsonReturn({
                code:1,
                msg:'标题不能为空'
            })
        }
        if(!content){
            ctx.jsonReturn({
                code:1,
                msg:'内容不能为空'
            })
        }
        if(!type){
            ctx.jsonReturn({
                code:1,
                msg:'类型不能为空'
            })
        }
        await Model.selectTypeAllModel()
            .then(res=>{
                var selectInfoRes = JSON.parse(JSON.stringify(res))
                if(selectInfoRes.length <= 0){
                    ctx.jsonReturn({
                        code:1,
                        msg:'暂时无栏目，先添加栏目'
                    })
                }else{
                    var typeArr = [];
                    selectInfoRes.forEach(function(item){
                        typeArr.push(item.id)
                    });
                    function in_array(needle, haystack) {
                        for(var i in haystack) {
                         if(haystack[i] == needle) {
                          return true;
                         }
                        }
                        return false;
                    }
                    if(!in_array(type,typeArr)){
                        ctx.jsonReturn({
                            code:1,
                            msg:'栏目id不合法'
                        })
                    }
                    let seleInfo =  Model.selectTitleById(title,type);
                    return seleInfo;
                }
            })
            .then(seleInfo=>{
                var seIn = JSON.parse(JSON.stringify(seleInfo))
                if(seIn.length){
                    ctx.jsonReturn({
                        code:1,
                        msg:'该栏目下已存在此文章'
                    })
                }else{
                    let addRes = Model.addArticlModel([type,title,tags,thumb,content,time])
                    if(addRes){
                        ctx.jsonReturn({
                            code:2,
                            msg:'添加文章成功'
                        })
                    }else{
                        ctx.jsonReturn({
                            code:1,
                            msg:'失败'
                        })
                    }
                }
            })
            .catch(err=>{
                ctx.jsonReturn({
                    code:1,
                    msg:'添加失败,服务器异常'
                }) 
            })  
                     
    }
    static async getArticleList(ctx){
        let resList = await Model.selectAllArticleModel()
            .then(res=>{
                var resList = JSON.parse(JSON.stringify(res))
                if(resList.length == 0){
                    ctx.jsonReturn({
                        code:1,
                        data:{
                            list:[]
                        },
                        msg:'err'
                    })
                }
                return resList;
            })
        
            await Model.selectTypeAllModel()
                .then(typeListres=>{
                    var typeList = JSON.parse(JSON.stringify(typeListres))
                    let newList = resList.map(function(item,index){
                        typeList.forEach(function(item2,index){
                            if(item['typeid'] == item2['id']){
                                item['type_name'] = item2['type_name']
                            }
                            if(item['is_public'] == 1){
                                item['public_state'] = '发布'
                            }else{
                                item['public_state'] = '未发布' 
                            }
                        })
                        return item;                       
                    })
                    ctx.jsonReturn({
                        code:2,
                        data:{
                            list:newList
                        },
                        msg:'ok'
                    })
                }).catch(err=>{
                    ctx.jsonReturn({
                        code:1,
                        data:{
                            list:[]
                        },
                        msg:'err'
                    })
                })
        
        }
    static async getArticle(ctx){
        const{ id } = ctx.request.body;    
        console.log( id );
        if(!id || isNaN(id)){
            ctx.jsonReturn({
                code:1,
                msg:'id err'
            })
        }
        await Model.selectArticleByIdModel(id)
            .then(res=>{
                var resList = JSON.parse(JSON.stringify(res))
                if(resList.length){
                    ctx.jsonReturn({
                        code:2,
                        data:resList[0],
                        msg:'ok'
                    })
                }else{
                    ctx.jsonReturn({
                        code:1,
                        msg:'err'
                    })
                }
               
            }).catch(err=>{
                ctx.jsonReturn({
                    code:1,
                    msg:'err'
                })
            })
    }
    static async editArticle(ctx){
        //es6 解构
        //这里解构需要和 ctx.request.body 的对象属性相同
        const { title,content,tags,type,id,thumb } = ctx.request.body;    
        let time = moment().format('YYYY-MM-DD HH:mm')
        if(!title){
            ctx.jsonReturn({
                code:1,
                msg:'标题不能为空'
            })
        }
        if(!content){
            ctx.jsonReturn({
                code:1,
                msg:'内容不能为空'
            })
        }
        if(!type){
            ctx.jsonReturn({
                code:1,
                msg:'类型不能为空'
            })
        }
        await Model.selectTypeAllModel()
        .then(res=>{
            var selectInfoRes = JSON.parse(JSON.stringify(res))
            if(selectInfoRes.length <= 0){
                ctx.jsonReturn({
                    code:1,
                    msg:'暂时无栏目，先添加栏目'
                })
            }else{
                var typeArr = [];
                selectInfoRes.forEach(function(item){
                    typeArr.push(item.id)
                });
                function in_array(needle, haystack) {
                    for(var i in haystack) {
                     if(haystack[i] == needle) {
                      return true;
                     }
                    }
                    return false;
                }
                if(!in_array(type,typeArr)){
                    ctx.jsonReturn({
                        code:1,
                        msg:'栏目id不合法'
                    })
                }
                let seleInfo =  Model.selectTitleById(title,type);
                return seleInfo;
            }
        })
        .then(seleInfo=>{
            var seIn = JSON.parse(JSON.stringify(seleInfo))
            if(seIn.length){
                ctx.jsonReturn({
                    code:1,
                    msg:'改栏目下已存在此文章'
                })
            }else{
                let addRes = Model.updateArticleModel([type,title,tags,thumb,content,time,id])
                if(addRes){
                    ctx.jsonReturn({
                        code:2,
                        msg:'修改文章成功'
                    })
                }else{
                    ctx.jsonReturn({
                        code:1,
                        msg:'修改文章失败'
                    })
                }
            }
        })
        .catch(err=>{
            ctx.jsonReturn({
                code:1,
                msg:'修改失败,服务器异常'
            }) 
        })  


    }
    static  async updateState(ctx){
        const{state,id} = ctx.request.body;
        if(!state || !id){
            ctx.jsonReturn({
                code:1,
                msg:'err'
            })
        }
        await Model.updateArticleStateModel([state,id])
            .then(res=>{
                if(res){
                    ctx.jsonReturn({
                        code:2,
                        msg:'操作成功'
                    })
                }else{
                    ctx.jsonReturn({
                        code:1,
                        msg:'操作失败'
                    })
                }
            }).catch(err=>{
                ctx.jsonReturn({
                    code:1,
                    msg:'操作失败:'+err
                })
            })

    }
    static async delArticleById(ctx){
        const{ id } = ctx.request.body;
        if(!id || isNaN(id)){
            ctx.jsonReturn({
                code:1,
                msg:'id err'
            })
        }
        await Model.delArticleByIdModel(id)
            .then(res=>{
                if(res){
                    ctx.jsonReturn({
                        code:2,
                        msg:'删除成功'
                    })
                }else{
                    ctx.jsonReturn({
                        code:1,
                        msg:'删除失败'
                    })
                }
            })
    }
   //推荐
   static async setRecommend(ctx){
        const { id,recommedid } = ctx.request.body;
        if(!id || isNaN(id)){
            ctx.jsonReturn({
                code:1,
                msg:'id err'
            })
        }
        await Model.articleRecommendModel([recommedid,id])
            .then(res=>{
                if(res){
                    ctx.jsonReturn({
                        code:2,
                        msg:'操作成功'
                    })
                }else{
                    ctx.jsonReturn({
                        code:1,
                        msg:'操作失败'
                    })
                }
            })
   }
   static async setSliderCon(ctx){
    const { id,slider_state } = ctx.request.body;
    if(!id || isNaN(id)){
        ctx.jsonReturn({
            code:1,
            msg:'id err'
        })
    }
    await Model.setSliderModel([slider_state,id])
        .then(res=>{
            if(res){
                ctx.jsonReturn({
                    code:2,
                    msg:'操作成功'
                })
            }else{
                ctx.jsonReturn({
                    code:1,
                    msg:'操作失败'
                })
            }
        })
   }
}
module.exports = ArticleController;