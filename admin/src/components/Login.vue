<template>
  <div class="login-box">
      <div class="content">
          <div class="login-form">
            <h1>后台登录</h1>
           <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item class="label-item"  label="用户名" prop="username">
                <el-input v-model="ruleForm.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input type="password"  v-model="ruleForm.password"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
            </el-form-item>
            </el-form>
          </div>
             
      </div>

  </div>
</template>
<script>
import api from "../api"
  export default {
    data() {
      return {
        ruleForm: {
          username: '',
          password:'',
        },
        rules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
          ],
          password:[
              {required:true,message:'请输入密码',trigger:'blur'}
          ]
         
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            api.localLogin(this.ruleForm).then(res=>{
              var resData = res.data;
              if(resData.code == 2 ){
                   this.$message({
                                  type: 'success',
                                  message: '登录成功'
                                })
                     let token = resData.data.token;
                    let username = resData.data.username;
                    this.$store.dispatch('UserLogin', token);
                    this.$store.dispatch('UserName', username);
                    //如果用户手动输入"/"那么会跳转到这里来，即this.$route.query.redirect有参数   中文转码
                    let redirectUrl = decodeURIComponent(this.$route.query.redirect || '/admin');
                    //跳转到指定的路由
                    this.$router.push({
                        path: redirectUrl
                    });
              }else{
                this.$message.error(resData.msg);
              }
            }).catch(err=>{
               this.$message.error(err);
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style  lang="scss">
   
    .login-box{
        position:relative;
        height:100%;
            .content{
                background: url('../assets/img/bg.jpg');
                background-repeat: no-repeat;
                 position: relative;
                width: 100%;
                overflow: hidden;
                background-size: cover;
                background-position: center center;
                z-index: 1;
                 h1{
                        text-align: center;
                        padding: 20px 0;
                        font-size: 24px;
                        border-bottom: 1px solid rgba(0,150,136,.5);
                    }
                .login-form{
                        width: 390px;
                    margin: 15% auto;
                    padding:20px;
                    padding-top:0;
                    background-color: #666;
                    background-color: rgba(46,46,46,.61);
                    border-radius: 10px;
                    color: #f0f8ff;
                    box-shadow: 0 0 20px 0 #009688;
                    .el-form-item__label{
                        color:white!important;
                    }
                    .demo-ruleForm{
                        padding-top:20px;
                    }
                   
                }
            }
       
    }
</style>
