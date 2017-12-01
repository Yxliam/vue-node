<template>
 <div>
    
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm form-box">
  <el-form-item label="标题" prop="title">
    <el-input v-model="ruleForm.title"></el-input>
  </el-form-item>
  <el-form-item label="栏目" prop="type">
    <el-select v-model="ruleForm.type" placeholder="请选择栏目">
      <el-option v-for="item in typeList" :key="item.id" :label="item.type_name" :value="item.id"></el-option>
    </el-select>
</el-form-item>
<el-form-item label="标签" prop="tags">
    <el-input v-model="ruleForm.tags"></el-input>
  </el-form-item>
  <el-form-item label="缩略图" width="200">
    <el-col :span="5">
        <el-upload
          class="upload-demo"
          action="/api/upload"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :on-success="handleSuccess"
          multiple
          :limit="1"
          :on-exceed="handleExceed"
         >
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
    </el-col>
    <el-col :span="5">
      <img width="150" height="150" :src="ruleForm.thumb" alt="" >
    </el-col>
  </el-form-item>
  <el-form-item label="内容" prop="content">
       <div id="editor">
            <mavon-editor v-model="ruleForm.content" style="height: 100%"></mavon-editor>
        </div>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">添 加</el-button>
  </el-form-item>
</el-form>
 </div>
</template>

<script>
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import api from '../api'
  export default {
    data() {
      return {
        loading:'',
          typeList:[],    
        ruleForm: {
          title: '',
          content:'',
          tags:'',
          type:'',
          thumb:'',
        },
        rules: {
          title: [
            { required: true, message: '请输入文章标题', trigger: 'blur' },
           
          ],
          type:[ 
            {type:'number', required: true, message: '请选择栏目', trigger: 'change' }
          ]
        }
      };
    },
    methods: {
       openFullScreen() {
        this.loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
      },
        handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handleSuccess(res,file){
          console.log( res);
          this.ruleForm.thumb = res.filename;
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      getArticle(id){
        let self = this;
        api.localgetArticle({id:id})
          .then(res=>{
            var resData = res.data;
              if(resData.code == 2){
                self.ruleForm = resData.data;
                 self.ruleForm['type'] = resData.data['typeid']
                 console.log( self.ruleForm );
              }
           
          })
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            api.localEditArticle(this.ruleForm)
              .then(res=>{
                var resData = res.data;
                if(resData.code == 2){
                    this.$message({
                                  type: 'success',
                                  message: '修改成功'
                                })
                      this.$router.push({
                        path:'/admin/list'
                      })
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
    },
    activated:function(){
      var _this = this;
      let aid = this.$route.params.id;
       this.openFullScreen();
        this.getArticle(aid);      
       api.localTypeAll()
        .then(res=>{
          _this.loading.close();
             var resData = res.data;
            if(resData.code == 2){
              _this.typeList = resData.data.list
            }
        })
        //文章获取
    },
  components: {
            'mavon-editor': mavonEditor
        }
  }
</script>

<style  scoped lang="scss">
   
   
     #editor {
        margin: auto;
        width: 80%;
        height: 580px;
    }
</style>
