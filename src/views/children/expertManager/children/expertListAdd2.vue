<template>
    <div class="particulars-container" style="height:1200px!important;">
        <div class="particulars-header">
            当前位置:&nbsp;<el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home/expertManager/expertList' }">专家管理</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/home/expertManager/expertList' }">专家列表</el-breadcrumb-item>
            <el-breadcrumb-item>新增</el-breadcrumb-item>
            <!-- <el-breadcrumb-item>活动详情</el-breadcrumb-item> -->
        </el-breadcrumb>
        </div>

        <div class="particulars-info" style="border-bottom:none;">
            <!--<img src="./userInfoimages/矩形14拷贝.png" alt="">-->

            <div class="parCenter">
                <img src="@/assets/images/leftImg6.png" class="leftImg3" alt="">

                <el-form id="form" ref="form" :model="form" label-width="140px">


                    <!--<el-form-item>-->

                        <!--<div>-->
                            <!--{{shour}}-->
                        <!--</div>-->

                    <!--</el-form-item>-->


                    <el-form-item label="手机号">
                        <el-input v-model="phone" ref="phoneNum" placeholder="请输入您的手机号"></el-input>
                    </el-form-item>

                    <el-form-item label="密码">
                        <el-input type="password" v-model="password" placeholder="请输入密码"></el-input>
                    </el-form-item>




                    <el-form-item>

                        <el-button id="btnSub6"  @click.native="submitTo"  type="primary" @click="" style="width:160px;">提交</el-button>

                    </el-form-item>






                </el-form>

            </div>



        </div>
    </div>
</template>
<script>
    import eventVue from '../../../../eventVue.js'
    export default {
        name: "expertListAdd2",
        data()
        {
            return{
                innaddressTitle:"接种单位",
                textDes:"查找",
                phone:"",
                password:"",
                value2: '',
                form:"",
                //接收传递过来的数据 shour  ehour  sdayIndex  edayIndex  cid  innocutionTypeIndex name introduce avatar sort
                shour:"",
                ehour:"",
                sdayIndex:"",
                type:"",
                edayIndex:"",
                asknum:"",
                cid:"",//诊所地址id
                innocutionTypeIndex:"",//专家类型
                name:"",//医生姓名
                introduce:"",//简介
                avatar:"",//头像
                sort:"",//排序序号
                phoneNum:""//电话号码
            }
        },
        methods:{
            submitTo()
            {
                if(this.phone=="")
                {
                    this.$message.error("请输入手机号码");
                    return;
                }
              var  phoneNum = this.$refs.phoneNum.value;

                if(!(/^1[34578]\d{9}$/.test(phoneNum))){
                    this.$message.error("手机号码格式有误,请重填!");
                    return false;
                }

                if(this.password=="")
                {
                    this.$message.error("请输入您的密码");
                    return;
                }
                console.log("您提交的电话号码是:"+this.phone);
                console.log("您提交的密码是:"+this.password);
                let token=localStorage.getItem('token');
                this.$http.get('/admin/expert/add',{
                    params:{
                        token,
                        apitype:1,
                        avatar:this.avatar,
                        name:this.$route.params.name,
                        introduce:this.$route.params.introduce,
                        cid:this.$route.params.cid,
                        type:this.type,
                        sday:this.$route.params.sdayIndex,
                        eday:this.$route.params.edayIndex,
                        shour:this.$route.params.shour,
                        ehour:this.$route.params.ehour,
                        sort:this.$route.params.sort,
                        mobile:this.phone,
                        pwd:this.password,
                        asknum:this.$route.params.asknum
                    }
                }).then(response=>{
                    //this.userList=response.data.result.list;
                    //this.id=response.data.result.list.id;
                    console.log("这是新增专家接口返回的数据..."+response);

                    if(response.data.status==1)
                    {
                        this.$message.success("新增专家成功");
                        this.$router.push("/home/expertManager/expertList");
                    }else
                    {
                        this.$message.error("新增专家失败请确保手机号不要重复，并且密码不能为空");
                    }


                    console.log(response);
                    //this.expertList=response.data.result.list;
                });

            },
            fn:function()
            {
                //接收传递过来的数据 shour  ehour  sdayIndex  edayIndex  cid  innocutionTypeIndex name introduce avatar sort
               eventVue.$on("releData1",(message)=>{
                   this.shour=message;
                   console.log("接收到的数据1是:"+message)
               });
                eventVue.$on("releData2",(message)=>{
                    this.ehour=message;
                    console.log("接收到的数据2是:"+message)
                });
                eventVue.$on("releData3",(message)=>{
                    this.sdayIndex=message;
                    console.log("接收到的数据3是:"+message)
                });
                eventVue.$on("releData4",(message)=>{
                    this.edayIndex=message;
                    console.log("接收到的数据4是:"+message)
                });
                eventVue.$on("releData5",(message)=>{
                    this.cid=message;
                    console.log("接收到的数据5是:"+message)
                });
                eventVue.$on("releData6",(message)=>{
                    this.innocutionTypeIndex=message;
                    console.log("接收到的数据6是:"+message)
                });
                eventVue.$on("releData7",(message)=>{
                    this.name=message;
                    console.log("接收到的数据7是:"+message)
                });
                eventVue.$on("releData8",(message)=>{
                    this.introduce=message;
                    console.log("接收到的数据8是:"+message)
                });
                eventVue.$on("releData9",(message)=>{
                    this.avatar=message;
                    console.log("接收到的数据9是:"+message)
                });
                eventVue.$on("releData10",(message)=>{
                    this.sort=message;
                    console.log("接收到的数据10是:"+message)
                });
            }
        },
        created()
        {
            this.fn();
            // history.pushState(null, null, document.URL);
            // window.addEventListener('popstate', function () {
            //     history.pushState(null, null, document.URL);
            // });
            console.log("接收传递过来的shour是"+this.$route.params.shour);
            this.shour=this.$route.params.shour;
            console.log("接收传递过来的ehour是"+this.$route.params.ehour);
            this.ehour=this.$route.params.ehour;
            console.log("接收传递过来的sday是"+this.$route.params.sday);
            this.sday=this.$route.params.sday;
            console.log("接收传递过来的eday是"+this.$route.params.eday);
            this.eday=this.$route.params.eday;
            //专家所在的卫生所id
            console.log("接收传递过来的cid是"+this.$route.params.cid);
            this.cid=this.$route.params.cid;
            //专家类型
            console.log("接收传递过来的参数专家类型66666666666666666666666是"+this.$route.params.type);
           // this.innocutionTypeIndex=this.$route.params.innocutionTypeIndex;
            console.log("接收传递过来的name是"+this.$route.params.name);
            this.name=this.$route.params.name;
            console.log("接收传递过来的introduce是"+this.$route.params.introduce);
            this.introduce=this.$route.params.introduce;
            console.log("接收传递过来的avatar是"+this.$route.params.avatar);
            this.avatar=this.$route.params.avatar;
            console.log("接收传递过来的sort是"+this.$route.params.sort);
            this.sort=this.$route.params.sort;
            console.log("接收传递过来的sort是"+this.$route.params.asknum);
            this.asknum=this.$route.params.asknum;

            console.log(this.$route.params.type);

            if(this.$route.params.type=="儿保咨询")
            {
                this.type=1;
            }else if(this.$route.params.type=="接种咨询")
            {
                this.type=2;
            }else if(this.$route.params.type=="成人咨询")
            {
                this.type=3;
            }



        }

    }
</script>

<style lang="less">
    #form
    {
        margin-top:40px;
        margin-left:-60px;
    }
    #form input
    {
        margin-left:30px;
    }
    #form button
    {
        margin-left:30px;
    }
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
        margin-left:-60px;
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
