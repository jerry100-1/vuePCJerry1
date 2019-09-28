<template>
    <div class="particulars-container">
        <div class="particulars-header">
            当前位置:&nbsp;<el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home/authorityManager/authorityConfiguration' }">权限管理</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/home/authorityManager/roleConfiguration' }">角色配置</el-breadcrumb-item>
            <el-breadcrumb-item style="color:red">编辑</el-breadcrumb-item>
            <!-- <el-breadcrumb-item>活动详情</el-breadcrumb-item> -->
        </el-breadcrumb>
        </div>

        <div class="particulars-info" style="border-bottom:none;">
            <!--<img src="./userInfoimages/矩形14拷贝.png" alt="">-->

            <div class="parCenter">

                <el-button type="button" @click.native="toBackList" style="color:#fff!important;position:absolute;right:90px;top:0px;">返回列表</el-button>


                <el-form ref="form" :model="form" label-width="160px" label-position="left">
                    <el-form-item id="firstElItem"  label="角色名称">
                        <el-input v-model="form.name2" placeholder="运营"></el-input>
                    </el-form-item>
                    <p class="form-p">权限</p>

                    <el-form-item label="用户" prop="type">
                        <el-checkbox-group v-model="ruleForm.type1">
                            <el-checkbox label="查看用户信息"></el-checkbox>
                            <el-checkbox label="冻结用户"></el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>


                    <el-form-item label="精品课堂" prop="type">
                        <el-checkbox-group v-model="ruleForm.type2">
                            <el-checkbox label="查看文章详情"></el-checkbox>
                            <el-checkbox label="修改文章"></el-checkbox>
                            <el-checkbox label="录入文章"></el-checkbox>
                            <el-checkbox label="删除文章"></el-checkbox>
                            <el-checkbox label="新增微课堂视频"></el-checkbox>
                            <el-checkbox label="编辑微课堂视频"></el-checkbox>
                            <el-checkbox label="删除微课堂视频"></el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>


                    <el-form-item label="留言" prop="type">
                        <el-checkbox-group v-model="ruleForm.type3">
                            <el-checkbox label="查看留言信息"></el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                    <el-form-item label="专家管理" prop="type">
                        <el-checkbox-group v-model="ruleForm.type4">
                            <el-checkbox label="查看专家详情"></el-checkbox>
                            <el-checkbox label="新增专家信息"></el-checkbox>
                            <el-checkbox label="编辑专家信息"></el-checkbox>
                            <el-checkbox label="删除专家信息"></el-checkbox>
                            <el-checkbox label="查看病症解答"></el-checkbox>
                            <el-checkbox label="新增病症解答"></el-checkbox>
                            <el-checkbox label="编辑病症解答"></el-checkbox>
                            <el-checkbox label="删除病症解答"></el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>



                    <el-form-item label="卫生所管理" prop="type">
                        <el-checkbox-group v-model="ruleForm.type5">
                            <el-checkbox label="新增卫生所"></el-checkbox>
                            <el-checkbox label="编辑卫生所"></el-checkbox>
                            <el-checkbox label="删除卫生所"></el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>

                    <el-form-item label="项目管理" prop="type">
                    <el-checkbox-group v-model="ruleForm.type6">
                        <el-checkbox label="查看疫苗详情"></el-checkbox>
                        <el-checkbox label="新增疫苗信息"></el-checkbox>
                        <el-checkbox label="编辑疫苗信息"></el-checkbox>
                        <el-checkbox label="删除疫苗信息"></el-checkbox>
                        <el-checkbox label="新增保健信息"></el-checkbox>
                        <el-checkbox label="编辑保健信息"></el-checkbox>
                        <el-checkbox label="新增体检信息"></el-checkbox>
                        <el-checkbox label="编辑体检信息"></el-checkbox>
                    </el-checkbox-group>
                </el-form-item>



                    <el-form-item label="预约管理" prop="type">
                        <el-checkbox-group v-model="ruleForm.type7">
                            <el-checkbox label="查看预约详情"></el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>

                    <el-form-item label="通知管理" prop="type">
                        <el-checkbox-group v-model="ruleForm.type8">
                            <el-checkbox label="查看通知"></el-checkbox>
                            <el-checkbox label="新增通知"></el-checkbox>
                            <el-checkbox label="修改通知"></el-checkbox>
                            <el-checkbox label="删除通知"></el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                    <el-form-item label="订单管理" prop="type">
                        <el-checkbox-group v-model="ruleForm.type9">
                            <el-checkbox label="查看待付款"></el-checkbox>
                            <el-checkbox label="查看已付款"></el-checkbox>
                            <el-checkbox label="查看退款"></el-checkbox>
                            <el-checkbox label="查看已取消"></el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>


                    <el-form-item label="设置" prop="type">
                        <el-checkbox-group v-model="ruleForm.type10">
                            <el-checkbox label="查看信息反馈"></el-checkbox>
                            <el-checkbox label="查看用户协议"></el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>



                    <el-form-item>

                        <el-button id="btnSub6"  type="primary" @click="" style="width:160px;">提交</el-button>

                    </el-form-item>


                </el-form>

            </div>



        </div>
    </div>
</template>
<script>
    export default {
        name: "roleConfigurationEdit",
        data()
        {
            let self =this;
            return{
                ruleForm:{
                    type1:[],
                    type2:[],
                    type3:[],
                    type4:[],
                    type5:[],
                    type6:[],
                    type7:[],
                    type8:[],
                    type9:[],
                    type10:[]
                },
               form:{
                   name2:""
               }
            }
        },
        methods:
        {
            toBackList(){
                console.log("此方法被调用了");
                this.$router.push("/home/authorityManager/roleConfiguration");
            }
        }
    }
</script>

<style lang="less">
    .backList1
    {
        width:100px;
        height:36px;
        border-radius:5px;
        color:#fff;
        line-height:36px;
        background:#009397;
        position:absolute;
        right:20px;
        top:0px;
        font-size:14px;
    }
    .parCenter form
    {
        margin-top:20px;
    }

    #firstElItem
    {
        color:#009397!important;
    }
    .el-checkbox__label {
        display: inline-block;
        width:130px;
        overflow:hidden;
        font-size: 14px;
    }
  .el-form-item lable
  {
      margin-left:-30px;
  }
    .el-checkbox__input.is-checked+.el-checkbox__label {
        color:#009397!important;
    }
    .el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner {
        background-color:#009397!important;
        border-color:#009397!important;
    }
    .el-checkbox__input.is-indeterminate:hover
    {
        border-color:#009397;
    }
    .el-checkbox__inner
    {
        border-color:#009397;
    }
    .el-checkbox__input:hover
    {
        border-color:#009397;
    }
    .form-p
    {
        color:#009397;
        /*margin-left:100px;*/
        margin-top:40px;
        font-size: 16px;
        margin-bottom:30px;
    }
     /*form input.firstElItem*/
    /*{*/
        /*color:#009397!important;*/
    /*}*/
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
        height:1100px;
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
