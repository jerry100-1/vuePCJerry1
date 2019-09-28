<template>
    <div class="particulars-container">
        <div class="particulars-header">
            当前位置:&nbsp;<el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home/user/userInfo' }">用户管理</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/home/user/userBannerList' }">用户轮播图</el-breadcrumb-item>
            <el-breadcrumb-item style="color:red">详情</el-breadcrumb-item>
            <!-- <el-breadcrumb-item>活动详情</el-breadcrumb-item> -->
        </el-breadcrumb>
        </div>

        <div class="particulars-info" style="border-bottom:none;">
            <!--<img src="./userInfoimages/矩形14拷贝.png" alt="">-->

            <div class="parCenter">
                <el-form ref="form" :model="form" label-width="120px">
                    <el-form-item label="标题">
                        <el-input disabled="true" v-model="title" placeholder="关山街七一七区卫生服务中心"></el-input>
                    </el-form-item>
                    <el-form-item label="链接">
                        <el-input disabled="true" v-model="link" placeholder="关山街七一七区卫生服务中心"></el-input>
                    </el-form-item>

                    <el-form-item label="轮播图图片">
                        <img :src="thumb" readonly  style="width:100%;height:400px;margin-left:20px;" alt="">
                    </el-form-item>

                    <el-form-item label="所属模块区域">
                        <el-input disabled="true" v-model="placeText" placeholder="关山街七一七区卫生服务中心"></el-input>
                    </el-form-item>

                    <el-form-item label="状态">
                        <el-radio-group v-model="statusText" style="margin-left:20px;">
                            <el-radio disabled="true" label="展示"></el-radio>
                            <el-radio disabled="true" label="不展示"></el-radio>
                        </el-radio-group>
                    </el-form-item>

                    <el-form-item>

                        <el-button id="btnSub36"  type="primary" @click="goBackList" style="width:160px;margin-left:20px;">返回</el-button>

                    </el-form-item>


                </el-form>

            </div>



        </div>
    </div>
</template>
<script>
    export default {
        name: "notificationEdit",
        data()
        {

            return{
                title:"",
                link:"",
                placeText:"",
                statusText:"",
                thumb:""
            }
        },
        methods:
        {
            goBackList()
            {
                this.$router.push("/home/user/userBannerList");
            }
        }
        ,
        created()
        {
            // this.addNoti();
            console.log("详情页面接收到的id是:"+this.$route.params.id);
            console.log("详情页面接收到的title是:"+this.$route.params.title);
            this.title=this.$route.params.title;
            console.log("详情页面接收到的link是:"+this.$route.params.link);
            this.link=this.$route.params.link;
            console.log("详情页面接收到的placeText是:"+this.$route.params.placeText);
            this.placeText=this.$route.params.placeText;
            console.log("详情页面接收到的statusText是:"+this.$route.params.statusText);
            this.statusText=this.$route.params.statusText;
            console.log("详情页面接收到的thumb是:"+this.$route.params.thumb);
            this.thumb=this.$route.params.thumb;
        }
    }
</script>

<style lang="less">
    .el-breadcrumb__item:last-child .el-breadcrumb__inner, .el-breadcrumb__item:last-child .el-breadcrumb__inner a, .el-breadcrumb__item:last-child
    .el-breadcrumb__inner a:hover, .el-breadcrumb__item:last-child .el-breadcrumb__inner:hover{
        font-weight:400;
        cursor: text;
        color:#00979C!important;
    }
    #btnSub6
    {
        margin-left:0px;
    }
    #btnSub2
    {
        margin-left:0px;
        width:120px;
    }
    .el-form-item__label {
        font-weight:bold;
        font-size:20px;
    }
    #kknnvv
    {
        margin-left:0px;
    }
    .el-radio__input.is-checked .el-radio__inner {
        border-color: #00d3c2;
        background: #00d3c2;
    }
    .elText
    {
        height:auto
    }
    .el-textarea__inner {
        padding-top:50px;
        padding-bottom:50px;
        height:340px;
    }
    .specialColr
    {
        color:#009197;
    }
    .parCenter
    {
        width:90%;
        height:auto;
        /*background:red;*/
        margin:0 auto;
        margin-top:30px;
    }
    .particulars-container{
        height: 980px;
        .particulars-header{
            display: flex;
            height: 80px;
            line-height: 80px;
            align-items: center;
            font-size: 14px;
            color: #656565;
            padding-left: 40px;
            /*border-bottom: 1px solid #eee;*/
        }
        .particulars-info{
            height:auto;
            /*border-bottom: 1px solid #eee;*/

        }
    }
</style>
