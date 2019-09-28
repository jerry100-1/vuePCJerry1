<template>
    <div class="particulars-container">
        <div class="particulars-header">
            当前位置:&nbsp;<el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home/expertManager/expertList' }">专家管理</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/home/expertManager/expertList' }">专家列表</el-breadcrumb-item>
            <el-breadcrumb-item>编辑</el-breadcrumb-item>
            <!-- <el-breadcrumb-item>活动详情</el-breadcrumb-item> -->
        </el-breadcrumb>
        </div>

        <div class="particulars-info" style="border-bottom:none;">
            <!--<img src="./userInfoimages/矩形14拷贝.png" alt="">-->

            <div class="parCenter">
                <img src="@/assets/images/leftImg4.png" class="leftImg3" alt="">

                <el-form ref="form" :model="form" label-width="100px">

                    <el-form-item label="手机号">
                        <el-input class="accountInput" v-model="form.name" placeholder="1800000000"></el-input>
                    </el-form-item>

                    <el-form-item label="密码">
                        <el-input class="accountInput" type="password" v-model="form.name4" placeholder="**************"></el-input>
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
        name: "expertListEdit",
        data()
        {
            let self =this;
            return{
                form:{
                    desc2:""
                },
                innaddressTitle:"接种单位",
                textDes:"查找",
                zoom:16,
                resource: '',
                center:[121.59996,31.197646],
                form: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    name4:"",
                    delivery: false,
                    type: [],
                    resource: '',
                    desc1: '',
                    desc2:"",
                    desc3:"",
                    name1:"",
                    name2:"",
                    desc4:"",
                },
                options2: [{
                    value: '选项1',
                    label: '黄金糕'
                }, {
                    value: '选项2',
                    label: '双皮奶',
                    disabled: true
                }, {
                    value: '选项8',
                    label: '蚵仔煎'
                }, {
                    value: '选项10',
                    label: '龙须面'
                }, {
                    value: '选项3600',
                    label: '北京烤鸭'
                }],
                value2: '',
            }
        }
    }
</script>

<style lang="less">
    .botPartSelect
    {
        display:inline-block;
        margin-top:20px;
    }
    .spanEndText
    {
        display:inline-block;
        color:red!important;
        margin-left:30px;
    }
    .parCenter input
    {
        width:400px;
    }
    .minddleSpab
    {
        color:rgba(0,0,0,0.36);
    }
    .el-breadcrumb__item:last-child .el-breadcrumb__inner, .el-breadcrumb__item:last-child .el-breadcrumb__inner a, .el-breadcrumb__item:last-child
    .el-breadcrumb__inner a:hover, .el-breadcrumb__item:last-child .el-breadcrumb__inner:hover{
        font-weight:400;
        cursor: text;
        color:#00979C!important;
    }
    .el-radio__input.is-checked .el-radio__inner {
        border-color: #00979C!important;
        background: #00979C!important;
    }
    .el-radio__input.is-checked+.el-radio__label {
        color: #00979C!important;
    }
    .weekSelect
    {
        width:180px;
    }
    .kkImg1
    {
        width:60px;
        height:60px;
        border-radius:50%;
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
        position:relative;
    }
    .parCenter form
    {
        margin-top:30px;
    }
    .leftImg3
    {

        margin-left:0px;
        padding-left:0px;
        margin-left:-90px;
    }
    .particulars-container{
        height:1300px;
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
