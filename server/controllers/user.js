const  Model = require('../lib/mysql.js');
const createToken = require('../token/createToken.js');
class UserController{
    //用户登录 
    static async loginPost(ctx){
        //es6 解构
        //这里解构需要和 ctx.request.body 的对象属性相同
        const { username,password } = ctx.request.body;    
       await Model.dologin(username,password)
            .then(result=>{
              var res = JSON.parse(JSON.stringify(result))
              if(res.length <= 0){
                ctx.jsonReturn({
                    code:1,
                    msg:'用户名或者密码错误'
                }) 
              }else{
                  let token = createToken(username);              
                    var updateinfo =  Model.updateUserToken([token,res[0]['id']])
                    if(updateinfo){ 
                        ctx.jsonReturn({
                            code:2,
                            data:{
                                token:token,
                                username:username
                            },
                            msg:'登录成功'
                        })
                        
                   }else{
                        ctx.jsonReturn({
                            code:1,
                            msg:'登录失败'
                        }) 
                        }
                    }
                    }).catch(err=>{
                        ctx.jsonReturn({
                            code:1,
                            msg:'服务器异常'
                        }) 
                    })                  
    }
    
}

module.exports = UserController;