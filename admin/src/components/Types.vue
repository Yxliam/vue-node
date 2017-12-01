<template>
  <div class="list-table">
      <h1 class="list-h1">栏目管理</h1>
      <div class="types-box">
        <el-button type="primary" @click="dialogFormVisible = true">添加栏目</el-button>
      </div>
      <el-dialog title="栏目管理" :visible.sync="dialogFormVisible">
        <el-form :model="form" :rules="rules" ref="form">
          <el-form-item label="栏目名称" prop="typeName"  :label-width="formLabelWidth">
            <el-input v-model="form.typeName"  auto-complete="off"></el-input>
          </el-form-item>
          
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitForm('form')">{{btnText}}</el-button>
        </div>
      </el-dialog>
      <template>
        <el-table
            :data="tableData"
            border
            style="width: 100%">
             <el-table-column
            prop="id"
            label="id"
            width="300">
            </el-table-column>
          
            <el-table-column
            prop="type_name"
            label="栏目"
            width="300">
            </el-table-column>
            <el-table-column
            prop="time"
            label="日期"
            width="180">
            </el-table-column>
            <el-table-column
           
            label="操作">
             <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
            </el-table-column>
        </el-table>
    </template>
  </div>
</template>
<script>
import api from '../api'
  export default {
    data() {
      return {
        loading:'',
        tableData: [],
        itemId:'',
        dialogFormVisible: false,
        btnText:'添 加',
        isAdd:true,
        form: {
          typeName: '',
        },
        formLabelWidth: '120px',
        rules:{
          typeName:{required: true, message: '请输入栏目名称', trigger: 'blur'}
        }
      }
    },
    activated:function(){
      this.openFullScreen();
      this.getTypeList();
    },
    methods:{
       openFullScreen() {
        this.loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
      },
      getTypeList(){
        let _this = this;
        api.localTypeAll()
          .then(res=>{
             var resData = res.data;
             _this.loading.close();
            if(resData.code == 2){
              _this.tableData = resData.data.list
            }
          })
      },
      handleEdit(index,row){
        this.itemId  = row.id;
        this.isAdd = false
        this.btnText = '编 辑'
        this.dialogFormVisible = true;
        this.form.typeName = row.type_name;
      
      },
      handleDelete(index,row){
        var self = this;
         this.$confirm('你是否要删除此栏目？')
            .then(_ => {
              api.localTypeDel({id:row.id})
                .then(res=>{
                    var resData = res.data;
                  if(resData.code == 2 ){
                    this.$message({
                                      type: 'success',
                                      message: '删除成功'
                                    })
                     self.getTypeList();
                                                                     
                  }else{
                     this.$message.error(resData.msg);
                  }
                })
            })
      },
      editForm(){
         let self = this;
         let formData = {typeName:this.form.typeName,id:this.itemId};
          api.localTypeEdit(formData).then(res=>{
              var resData = res.data;
            if(resData.code == 2 ){
                self.itemId = '';
                this.$message({
                                type: 'success',
                                message: '修改成功'
                              })

                this.dialogFormVisible = false;
                self.getTypeList();                      
                self.form.typeName = '';    
              }else{
                this.$message.error(resData.msg);
              }
          }).catch(err=>{
              this.$message.error(err);
          })
      },
    addForm(){
        var self = this;
          api.localAddType(this.form).then(res=>{
              var resData = res.data;
            if(resData.code == 2 ){
                this.$message({
                                type: 'success',
                                message: '添加成功'
                              })

                this.dialogFormVisible = false;
                self.getTypeList();                      
                self.form.typeName = '';                  
              }else{
                this.$message.error(resData.msg);
              }
          }).catch(err=>{
              this.$message.error(err);
          })
    },
    submitForm(formName) {
            this.$refs[formName].validate((valid) => {
              if (valid) {
                if(this.isAdd){
                   this.addForm();

                }else{
                  this.editForm();
                }
               
              } else {
                console.log('error submit!!');
                return false;
              }
            });
          },
    }
  }
</script>
<style scoped>
    .list-table{
        padding:0 10px;
        overflow: hidden;
    }
    .list-h1{
        margin:20px 0;
        padding-bottom:10px;
        border-bottom:1px solid #dedede;
    }
    .types-box{
      margin-bottom:10px;
    }

</style>
