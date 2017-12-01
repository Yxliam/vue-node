<template>
    <div class="wrapper-sticky-footer">

            <!-- Content-->
            <div class="wrap-error" style="height:10em">
                <div class="error clearfix">
                    <div class="error__left">
                        <p class="error__text">404</p>
                    </div>
                    <div class="error__right">
                        <div class="error__head">Page not found...</div>
                        <p class="error__text">We're sorry, but we can't find the page you were looking for. It's probably some thing we've done wrong but now we know about it we'll try to fix it. In the meantime, try one of this options:</p>
                        <ul class="error__list">
                            <li>
                                <span class="a-class" @click=" $router.go(-1)">返回</span>
                            </li>
                            <li>
                                <router-link to="/">返回首页</router-link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <!-- END content-->
                    
    </div>
</template>
<script>
export default {
  
}
</script>
<style scoped>
    .wrapper-sticky-footer{
            display: table;
            width: 100%;
            height: 50em;
    }
    .a-class{
            color: #337ab7;
        text-decoration: none;
        cursor: pointer;
    }
</style>
