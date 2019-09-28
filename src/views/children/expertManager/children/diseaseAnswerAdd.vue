<template>
    <div class="particulars-container">
        <div class="particulars-header">
            当前位置:&nbsp;<el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home/expertManager/expertList' }">专家管理</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/home/expertManager/diseaseAnswer' }">病症解答</el-breadcrumb-item>
            <el-breadcrumb-item>新增</el-breadcrumb-item>
            <!-- <el-breadcrumb-item>活动详情</el-breadcrumb-item> -->
        </el-breadcrumb>
        </div>

        <div class="particulars-info" style="border-bottom:none;">
            <!--<img src="./userInfoimages/矩形14拷贝.png" alt="">-->

            <div class="parCenter">
                <el-form ref="form" :model="form" label-width="120px">

                    <!--<el-form-item label="所属分类">-->
                        <!--<el-select v-model="type" placeholder="请选择病症类型" style="width:100%;">-->
                            <!--<el-option label="眼睛红肿" value="eye"></el-option>-->
                            <!--<el-option label="皮肤瘙痒" value="pifu"></el-option>-->
                        <!--</el-select>-->
                    <!--</el-form-item>-->

                    <el-form-item label="所属分类">
                        <!--<el-select v-model="cid" placeholder="请选择时间" id="selectOp1" class="weekSelect">-->
                        <!--</el-select>-->
                        <el-select v-model="value2" @change="" placeholder="请选择病症类型" style="width:100%;">
                            <el-option
                                    v-for="item in allDiseaseList"
                                    :key="item.id" prop="itemId"
                                    :label="item.name"
                                    :value="item.id"
                                    :disabled="item.disabled">
                            </el-option>
                        </el-select>
                    </el-form-item>


                    <el-form-item label="病症名称">
                        <el-input v-model="title" placeholder="红肿"></el-input>
                    </el-form-item>
                    <el-form-item label="病症答案">
                        <el-input type="textarea" v-model="answer" placeholder="眼睛红肿与睡眠有关,眼睛红肿与睡眠有关  ...."></el-input>
                    </el-form-item>


                    <el-form-item>

                        <el-button id="btnSub66"  type="primary" @click="submitBtn66" style="width:160px;margin-left:20px;">提交</el-button>

                    </el-form-item>


                </el-form>

            </div>



        </div>
    </div>
</template>
<script>
    export default {
        name: "diseaseAnswerAdd",
        data()
        {
            let self =this;
            return{
                form:{
                    desc2:""
                },
                allDiseaseList:[],
                options2: [{
                    value: '选项1',
                    label: '黄金糕'
                }],
                title:"",
                answer:"",
                value2: '',
                value3:""
            }
        },
        methods:
        {

                getAllClinicList(){
                    let token=localStorage.getItem('token');
                    this.$http.get('/admin/symptom/alltypeWeb',{
                        params:{
                            token,
                            apitype:1
                        }
                    }).then(response=>{
                        console.log("请求所有病症分类数据开始...")
                        console.log(response);
                        //this.userList=response.data.result.list;

                        this.allDiseaseList=response.data.result.list;
                        //this.code=response.data.result.list.
                        //this.id=response.data.list.id;
                        console.log("请求到的所有诊所地址的数据是:")
                        console.log(response);

                    })
                },
                submitBtn66()
                {
                    if(this.value2=="")
                    {
                        this.$message.error("请选择病症分类!")
                        return;
                    }

                    if(this.title=="")
                    {
                        this.$message.error("请输入病症名称!")
                        return;
                    }

                    if(this.answer=="")
                    {
                        this.$message.error("请输入病症答案!")
                        return;
                    }


                    let token=localStorage.getItem('token');
                    this.$http.get('/admin/symptom/add',{
                        params:{
                            token,
                            apitype:1,
                            title:this.title,
                            answer:this.answer,
                            type:this.value2
                        }
                    }).then(response=>{
                        console.log("这是新增病症解答接口返回给我的数据...")
                        console.log(response);
                        if(response.data.status==1)
                        {
                            this.$message.success("新增病症解答成功!");
                            this.$router.push("/home/expertManager/diseaseAnswer");
                        }else
                        {
                            this.$message.error("新增病症解答失败!")
                        }
                        //this.userList=response.data.result.list;
                        //获取全国省区数据;
                        //this.code=response.data.result.list.
                        //this.id=response.data.list.id;
                    })
                },
        },
        created()
        {
            this.getAllClinicList();
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
    #btnSub66
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
