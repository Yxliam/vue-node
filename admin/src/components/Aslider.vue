<template>
    <nav class="aside-nav">
        <ul class="aside-nav-list">
            <router-link to="/admin/article"  tag="li" active-class="active" class="aside-nav-list">
                <i class="icon el-icon-edit-outline"></i>发布文章
            </router-link>
            <router-link to="/admin/list" tag="li" active-class="active" class="aside-nav-list">
                <i class="icon el-icon-document"></i>文章管理
            </router-link>
            <router-link to="/admin/types" tag="li" active-class="active" class="aside-nav-list">
                <i class="icon el-icon-setting"></i>栏目管理
            </router-link>
            <router-link to="/admin/about" tag="li" active-class="active" class="aside-nav-list">
                <i class="icon el-icon-message"></i>关于我
            </router-link>
        </ul>
    </nav>
</template>
<script>
export default {
  
}
</script>
<style scoped lang="scss">

.aside-nav{
    height: 100%;
    background-color: black;
    .aside-nav-list{
        .aside-nav-list{
            position: relative;
            height:48px;
            line-height: 48px;
            padding-left: 30px;
            font-size: 16px;
            color: #dedede;
            cursor: pointer;
            .icon{
                margin-right: 10px;
            }
            .iconfont{
                position: absolute;
                top: 0;
                left: 17px;
                }
            &.active{
                background: rgba(176, 175, 168, 0.3);
                color: white;
            }
            &:hover{
                color:red;
                background: rgba(176, 175, 168, 0.3);
            }

           
            
        }
    }
}
</style>
