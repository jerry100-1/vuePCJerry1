<template>
    <div class="particulars-container">
        <div class="particulars-header">
            当前位置:&nbsp;<el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home/notification/notificationList' }">通知管理</el-breadcrumb-item>
            <el-breadcrumb-item>通知</el-breadcrumb-item>
            <el-breadcrumb-item style="color:red">编辑</el-breadcrumb-item>
            <!-- <el-breadcrumb-item>活动详情</el-breadcrumb-item> -->
        </el-breadcrumb>
        </div>

        <div class="particulars-info" style="border-bottom:none;">
            <!--<img src="./userInfoimages/矩形14拷贝.png" alt="">-->

            <div class="parCenter">
                <el-form ref="form" :model="form" label-width="120px">
                    <el-form-item label="通知名称">
                        <el-input v-model="form.title" placeholder="关山街七一七区卫生服务中心"></el-input>
                    </el-form-item>
                    <el-form-item label="通知内容">
                        <el-input type="textarea" v-model="form.detail" placeholder="新春伊始,万象更新...."></el-input>
                    </el-form-item>
                    <el-form-item label="状态">

                        <el-radio-group v-model="form.status" style="margin-left:20px;">
                            <el-radio label="显示"></el-radio>
                            <el-radio label="隐藏"></el-radio>
                        </el-radio-group>

                    </el-form-item>

                    <el-form-item>

                        <el-button id="btnSub6"  type="primary" @click="addNoti" style="width:160px;margin-left:20px;">提交</el-button>

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
                innaddressTitle:"接种单位",
                textDes:"查找",
                zoom:16,
                nid:"",
                center:[121.59996,31.197646],
                form: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    title:"",
                    status:"",
                    detail:"",
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                },
                options2: [{
                    value: '选项1',
                    label: '黄金糕'
                }],
                value2: '',
            }
        },
        methods:
            {
                addNoti(){
                    // alert(this.form .status);
                  if(this.form.status=="显示")
                  {
                      this.form.status=1;
                  }else {
                      this.form.status=-1;
                  }
                    console.log("编辑页面接收到的id是:"+this.$route.params.id)
                    console.log("编辑页面接收到的title是:"+this.$route.params.title)
                    console.log("编辑页面接收到的detail是:"+this.$route.params.detail)
                    console.log("编辑页面接收到的status是:"+this.$route.params.status);
                    let token=localStorage.getItem('token');
                    this.$http.get('/admin/Notice/add',{
                        params:{
                            token,
                            apitype:1,
                            nid:this.$route.params.id,
                            title:this.form.title,
                            detail:this.form.detail,
                            status:this.form.status
                        }
                    }).then(response=>{
                        //this.userList=response.data.result.list;

                        if(response.data.status==1)
                        {
                            //console.log("新增成功!");

                            this.$message({
                                showClose: true,
                                message: '编辑成功!',
                                type: 'success'
                            });
                            this.$router.push("/home/notification/notificationList")

                        }else {

                            this.$message.error(response.data.message);

                            // this.$message({
                            //     showClose: true,
                            //     message: '编辑失败,标题和内容不能为空!',
                            //     type: 'warning'
                            // });
                        }
                        console.log("这是编辑页面");
                        console.log(response)
                    }).catch(response=>{

                    })
                },
            }
        ,
        created()
        {
            // this.addNoti();

            this.form.title=this.$route.params.title;
            this.form.detail=this.$route.params.detail;
            this.form.status=this.$route.params.status;


       //     alert("你好,你接收的status的状态是"+this.$route.params.status);

            if(this.$route.params.status==1)
            {
                this.form.status="显示";
            }else{
                this.form.status="隐藏";
            }


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
