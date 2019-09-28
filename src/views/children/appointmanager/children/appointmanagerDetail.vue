<template>
    <div class="particulars-container">
        <div class="particulars-header">
            当前位置:&nbsp;<el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home/appointmanager/appointmanagerList' }">预约管理</el-breadcrumb-item>
            <el-breadcrumb-item>预约</el-breadcrumb-item>
            <el-breadcrumb-item style="color:red">详情</el-breadcrumb-item>
            <!-- <el-breadcrumb-item>活动详情</el-breadcrumb-item> -->
        </el-breadcrumb>
        </div>

        <div class="particulars-info" style="border-bottom:none;">
            <!--<img src="./userInfoimages/矩形14拷贝.png" alt="">-->

            <img class="leftImg1" src="@/assets/images/wwdf1.png" alt="">

            <div class="centerCtn">
                <table>
                    <tr><td class="leftTd">预约人姓名</td><td class="rightTd">{{appointmentDetail.realname}}</td></tr>
                    <tr><td class="leftTd">预约项目</td><td class="rightTd">{{appointmentDetail.typeText}}</td></tr>
                    <tr><td class="leftTd">预约时间</td><td class="rightTd">{{appointmentDetail.bespeaktimeText}}</td></tr>
                    <tr><td class="leftTd">预约诊所</td><td class="rightTd">{{appointmentDetail.title}}</td></tr>
                    <tr><td class="leftTd">排号</td><td class="rightTd">{{appointmentDetail.number}}</td></tr>
                    <tr><td class="leftTd">剩余排号时间</td><td class="rightTd">{{appointmentDetail.timedown}}</td></tr>
                </table>

                <input class="btnBackList" type="button" value="返回列表" @click="goBackList">

            </div>


        </div>
    </div>
</template>
<script>
    export default {
        name: "appointmanagerDetail",
        data() {
            return{
                appointmentDetail:""
            }
        },
        methods:{
            getAppointmentDetail(){
                let token=localStorage.getItem('token');
                this.$http.get('/admin/bespeak/webDetail',{
                    params:{
                        token,
                        page:1,
                        bid:this.$route.params.id
                    }
                }).then(response=>{
                    //this.userList=response.data.result.list;
                    //this.id=response.data.result.list.id;
                    console.log("请求预约数据开始...");
                    console.log(response);
                   this.appointmentDetail=response.data.result.info;
                })
            },
            goBackList(){
                 // alert(this.$route.params.path);
                    this.$router.go(-1);

                    this.$router.push("/home/appointmanager/appointmanagerFinish");
                // if(this.$route.params.path==="/home/appointmanager/appointmanagerList")
                // {
                //     alert("123");
                //     // this.$router.replace("/home/appointmanager/appointmanagerList");
                //     this.$router.replace({path:"/home/appointmanager/appointmanagerList"})
                //     // this.$router.push({
                //     //     name:"appointmanagerList",
                //     //     params:{}
                //     // });
                // }else if(this.$route.params.path==="/home/appointmanager/appointmanagerNumber")
                // {
                //     alert("456");
                //     this.$router.replace({path:"/home/appointmanager/appointmanagerNumber"})
                //     // this.$router.replace("/appointmanagerNumber");
                //     // this.$router.push({
                //     //     name:"appointmanagerNumber",
                //     //     params:{}
                //     // });
                // }else if(this.$route.params.path==="/home/appointmanager/appointmanagerWait")
                // {
                //     alert("789");
                //     this.$router.replace({path:"/home/appointmanager/appointmanagerWait"})
                //      // this.$router.replace("/appointmanagerWait");
                //     // this.$router.push({
                //     //     name:"appointmanagerWait",
                //     //     params:{}
                //     // });
                // }else if(this.$route.params.path==="/home/appointmanager/appointmanagerFinish")
                // {
                //     this.$router.replace({path:"/home/appointmanager/appointmanagerFinish"})
                //     // this.$router.replace("/appointmanagerFinish");
                //     alert("101");
                //     // this.$router.push({
                //     //     name:"appointmanagerFinish",
                //     //     params:{}
                //     // });
                // }else if(this.$route.params.path==="/home/appointmanager/appointmanagerCancel")
                // {
                //
                //     alert("102");
                //     this.$router.replace({path:"/home/appointmanager/appointmanagerCancel"})
                //     // this.$router.replace("/home/appointmanager/appointmanagerCancel");
                //     // this.$router.push({
                //     //     name:"appointmanagerCancel",
                //     //     params:{}
                //     // });
                // }
              //  alert(this.$route.params.path);
              //  this.$router.replace("/home/appointmanager/appointmanagerList");
                //this.$router.go(-1);
            }
        },
        created()
        {
           // console.log(this.$route.params.id);
            this.getAppointmentDetail();
        }
    }
</script>

<style lang="less">
    input.btnBackList
    {
        background: #009793;
        height:36px;
        line-height:36px;
        color:#fff;
        width:120px;
        margin-top:20px;
        outline:none;
        border-radius: 5px;
        font-size:13px;
        letter-spacing:2px;
        margin-right:100px;
    }
    td.leftTd
    {
        text-align:right;
        font-size:13px;
        color:rgba(0,0,0,0.56);
        height:36px;
    }
    td.rightTd
    {
        text-align:left;
        font-size:13px;
        color:#333;
        height:36px;
        text-indent:20px;
        font-weight:bold;
    }
    .wrapLAR
    {
        margin-top:20px;
    }
    .el-breadcrumb__item:last-child .el-breadcrumb__inner, .el-breadcrumb__item:last-child .el-breadcrumb__inner a, .el-breadcrumb__item:last-child
    .el-breadcrumb__inner a:hover, .el-breadcrumb__item:last-child .el-breadcrumb__inner:hover{
        font-weight:400;
        cursor: text;
        color:#00979C!important;
    }
    .leftImg1
    {
        position:absolute;
        left:0px;
        top:30px;
    }
    .backBtn
    {
        width:120px;
        height:36px;
        background:#009397;
        color:#fff;
        text-align:center;
        line-height:36px;
        font-size:13px;
        margin-top:40px;
        float: right;
        position:absolute;
        right:0px;
        border-radius:5px;
        bottom:10px;
    }
    h3.cellElement1
    {
        color:#002165;
        font-size:20px;
        font-weight:bold;
    }
    .cellElement2
    {
        margin-top:10px;
    }
    .cellElement2-1
    {
        color:rgba(0,0,0,0.36);
    }
    .cellElement2-2
    {
        color:#009793;
        font-size:15px;
        margin-left:15px;
    }
    .cellElement3
    {
        font-size:13px;
        line-height:30px;
        margin-top:52px;
        color:rgba(0,0,0,0.66);
    }
    h5.cellElement4
    {
        font-size:14px;
        float: right;
        display:block;
        margin-top:30px;
    }
    .centerCtn
    {
        width:570px;
        height:410px;
        position:absolute;
        top:90px;
        text-align:left;
        left:10%;
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
            position:relative;
            /*border-bottom: 1px solid #eee;*/

        }
    }
</style>
