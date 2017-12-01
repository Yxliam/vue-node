<template>
  <div class="list-table">
      <h1 class="list-h1">文章列表</h1>
      <template>
        <el-table
            :data="tableData"
            border
            style="width: 100%">
            <el-table-column
            prop="id"
            label="id"
            width="100">
            </el-table-column>
             <el-table-column
            prop="title"
            label="文章标题"
            width="500">
            </el-table-column>
            <el-table-column
            prop="tags"
            label="标签"
            width="200">
            </el-table-column>
             <el-table-column
            prop="type_name"
            label="所属栏目"
            width="100">
            </el-table-column>
            <el-table-column
            prop="time"
            label="日期"
            width="180">
            </el-table-column>
            <el-table-column 
            prop="public_state"
            label="状态"
            width="180">
            </el-table-column>
            <el-table-column
            prop="address"
            label="操作">
             <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button
                  size="mini"
                  @click="handleDisa(scope.$index, scope.row)"><span v-if="scope.row.is_public == 1">禁止</span><span v-else>发布</span></el-button>
                   <el-button
                  size="mini"
                  @click="handleSlider(scope.$index, scope.row)"><span v-if="scope.row.is_slider == 1">取消轮播</span><span v-else>设置轮播</span></el-button>
                   <el-button
                  size="mini"
                  type="danger"
                  @click="handleRecomm(scope.$index, scope.row)"><span v-if="scope.row.recommend == 1">取消推荐</span><span v-else>推荐</span></el-button>
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
        tableData: []
      }
    },
    activated:function(){
       this.openFullScreen();
      this.getList();
    },
    methods:{
      handleEdit(index,row){
          this.$router.push({
            path:'editArticle/'+row.id
          })
      },
      handleDelete(index,row){
         this.$confirm('你确定要删除这条数据吗?')
            .then(_ => {
               this.delFn(row.id)
            })
      },
      handleRecomm(index,row){
        let recommendId = row.recommend;
        if(recommendId){
            recommendId = 0
        }else{
           recommendId = 1
        }
        let obj = {id:row.id,recommedid:recommendId};
        this.recoFn(obj)

      },
      handleSlider(index,row){
        let slider_state = row.is_slider
        if(slider_state){
            slider_state = 0
        }else{
           slider_state = 1
        }
        let obj = {id:row.id,slider_state:slider_state};
        this.sliderFn(obj)

      },
      sliderFn(data){
        api.localSetSlider(data)
          .then(res=>{
             var resData = res.data;
              if(resData.code == 2){
                  this.$message({
                                  type: 'success',
                                  message: '操作成功'
                                })
                                this.getList();
              }else{
                this.$message.error(resData.msg);
              }
          })
      },
      recoFn(data){
        api.localRecommend(data)
        .then(res=>{
           var resData = res.data;
              if(resData.code == 2){
                  this.$message({
                                  type: 'success',
                                  message: '操作成功'
                                })
                                this.getList();
              }else{
                this.$message.error(resData.msg);
              }
        })
      },
      delFn(id){
        api.localDelArticle({id:id})
          .then(res=>{
            var resData = res.data;
              if(resData.code == 2){
                  this.$message({
                                  type: 'success',
                                  message: '修改成功'
                                })
                                this.getList();
              }else{
                this.$message.error(resData.msg);
              }
          })
      },
      handleDisa(index,row){
        var publicId = row.is_public;
        var state = '';
        if(publicId == 1){
            state = 2
        }else{
           state = 1
        }
        api.localUpdateState({state:state,id:row.id})
          .then(res=>{
             var resData = res.data;
              if(resData.code == 2){
                  this.$message({
                                  type: 'success',
                                  message: '修改成功'
                                })
                                this.getList();
              }else{
                this.$message.error(resData.msg);
              }
          })
      },
       openFullScreen() {
        this.loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
      },
      getList(){
        api.localArticleList()
          .then(res=>{
            this.loading.close();
            var resData = res.data;
              if(resData.code == 2){
                 this.tableData = resData.data.list
              }else{
                this.tableData = [];
              }
          })
      }
    },
  }
</script>
<style scoped>
    .list-table{
        padding:0 10px;
        overflow: hidden;
    }
    .list-h1{
        margin:20px 0;
    }

</style>
