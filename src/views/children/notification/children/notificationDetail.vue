<template>
    <div class="particulars-container">
        <div class="particulars-header">
            当前位置:&nbsp;<el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home/notification/notificationList' }">通知管理</el-breadcrumb-item>
            <el-breadcrumb-item>通知</el-breadcrumb-item>
            <el-breadcrumb-item style="color:red">详情</el-breadcrumb-item>
            <!-- <el-breadcrumb-item>活动详情</el-breadcrumb-item> -->
        </el-breadcrumb>
        </div>

        <div class="particulars-info" style="border-bottom:none;">
            <!--<img src="./userInfoimages/矩形14拷贝.png" alt="">-->

            <img class="leftImg1" src="@/assets/images/leftImg.png" alt="">

            <div class="centerCtn">
                <h3 class="cellElement1" v-html="title"></h3>
                <div class="cellElement2">
                    <span class="cellElement2-1" refs="detail">2019-03-06</span>
                    <!--<span class="cellElement2-2" v-html="type">传控健康</span>-->
                </div>
                <div class="cellElement3" v-html="detail" >
                    新春伊始,万象更新.新春伊始,万象更新.新春伊始,万象更新.新春伊始,万象更新.新春伊始,万象更新.
                    新春伊始,万象更新.新春伊始,万象更新.新春伊始,万象更新.新春伊始,万象更新.新春伊始,万象更新.新春伊始,万象更新.
                    新春伊始,万象更新.新春伊始,万象更新.新春伊始,万象更新.新春伊始,万象更新.新春伊始,万象更新.
                    新春伊始,万象更新.新春伊始,万象更新.新春伊始,万象更新.新春伊始,万象更新.新春伊始,万象更新.
                    新春伊始,万象更新.新春伊始,万象更新.新春伊始,万象更新.新春伊始,万象更新.新春伊始,万象更新.
                </div>
                <!--<h5 class="cellElement4">XXXXXX有限公司</h5>-->

                <input type="button" value="返回列表" class="backBtn" @click="goBackList">
            </div>


        </div>
    </div>
</template>
<script>
    export default {
        name: "notificationDetail",
        data() {
            return{
                id:"",
                uid:"",
                title:"",
                detail:"",
                createtime:"",
                createtime_text:"",
                unixTimestamp:"",
                commonTime:"",
                type:""

            }
        },
        methods:{
            goBackList(){
                // console.log(this.$route.params.id);
                this.$router.push("/home/notification/notificationList")
            },
            notifyDetail(){
                let token=localStorage.getItem('token');
                // this.id=this.$route.query.id;

                //this.id = Number(this.$route.params.id);
                console.log("接收到的参数是:"+this.$route.params.id);
                this.$http.get('/admin/Notice/detail',{
                    params:{
                        token,
                        id:this.$route.params.id,
                        apitype:1
                    }
                }).then(response=>{
                    //this.userList=response.data.result.list;

                    console.log("这是返回的数据!");
                    this.notiDetail=response.data.result.list;
                    this.title=response.data.result.title;
                    this.detail=response.data.result.detail;
                    this.createtime=response.data.result.createtime;
                    this.createtime_text=response.data.result.createtime_text;
                    this.type=response.data.result.type;
                    console.log(response);
                    console.log(this.title);
                    console.log(this.detail);
                    console.log(this.createtime);
                    console.log(this.createtime_text);


                    this.createtime=response.data.result.createtime;
                    // this.mytime=this.createtime.toLocaleString();
                    this.createtime=this.createtime;
                   // console.log(res)

                    var   unixTimestamp = new Date(this.createtime*1000) ;
                    var  commonTime = unixTimestamp.toLocaleString();
                    // alert(commonTime);
                     this.$refs.detail.innerHTML=commonTime;

                })
            }
        },
        created()
        {
            this.notifyDetail();
            //this.id=this.$router.params.id;
            //   console.log("接收到的参数是:"+this.id);
            console.log(this.id);

            // this.uid = Number(this.$route.params.id)
            // console.log(uid);
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
        margin-right:90px;
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
        margin-right:140px;
    }
    .centerCtn
    {
        width:570px;
        height:410px;
        position:absolute;
        top:90px;
        text-align:left;
        left:50%;
        margin-left:-280px;
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
