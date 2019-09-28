<template>
    <div class="particulars-container">

        <div class="particulars-info" style="border-bottom:none;">
            <!--<img src="./userInfoimages/矩形14拷贝.png" alt="">-->

            <img class="leftImg1" src="@/assets/images/leftImg5.png" alt="">

            <div class="centerCtn">
                <!--用户-->
                
                <el-row :gutter="20">
                    <el-col :span="3">
                        <div class="grid-content leftCtn">
                            <h3>用户</h3>
                        </div>
                    </el-col>
                    <el-col :span="21">
                        <div class="grid-content rightCtn">
                            <span class="grid-con">查看留言信息</span>
                        </div>
                    </el-col>
                </el-row>

        

                <!--精品课堂-->
                <el-row :gutter="20">
                    <el-col :span="3">
                        <div class="grid-content leftCtn">
                            <h3>精品课堂</h3>
                        </div>
                    </el-col>
                    <el-col :span="21">
                        <div class="grid-content rightCtn">
                            <span class="grid-con">查看文章详情</span>
                            <span class="grid-con">修改文章</span>
                            <span class="grid-con">录入文章</span>
                            <span class="grid-con">删除文章</span>
                            <span class="grid-con">新增微课堂视频</span>
                            <span class="grid-con">编辑微课堂视频</span>
                            <span class="grid-con">删除微课堂视频</span>
                        </div>
                    </el-col>
                </el-row>

                <!--留言-->
                <el-row :gutter="20">
                    <el-col :span="3">
                        <div class="grid-content leftCtn">
                            <h3>留言</h3>
                        </div>
                    </el-col>
                    <el-col :span="21">
                        <div class="grid-content rightCtn">
                            <span class="grid-con">查看留言信息</span>
                        </div>
                    </el-col>
                </el-row>


                <!--专家管理-->
                <el-row :gutter="20">
                    <el-col :span="3">
                        <div class="grid-content leftCtn">
                            <h3>专家管理</h3>
                        </div>
                    </el-col>
                    <el-col :span="21">
                        <div class="grid-content rightCtn">
                            <span class="grid-con">查看专家详情</span>
                            <span class="grid-con">新增专家信息</span>
                            <span class="grid-con">编辑专家信息</span>
                            <span class="grid-con">删除专家信息</span>
                            <span class="grid-con">查看病症解答</span>
                            <span class="grid-con">新增病症解答</span>
                            <span class="grid-con">编辑病症解答</span>
                            <span class="grid-con">删除病症解答</span>
                        </div>
                    </el-col>
                </el-row>

                <!--卫生所管理-->
                <el-row :gutter="20">
                    <el-col :span="3">
                        <div class="grid-content leftCtn">
                            <h3>卫生所管理</h3>
                        </div>
                    </el-col>
                    <el-col :span="21">
                        <div class="grid-content rightCtn">
                            <span class="grid-con">新增卫生所</span>
                            <span class="grid-con">编辑卫生所</span>
                            <span class="grid-con">删除卫生所</span>
                        </div>
                    </el-col>
                </el-row>


                <!--项目管理-->
                <el-row :gutter="20">
                    <el-col :span="3">
                        <div class="grid-content leftCtn">
                            <h3>项目管理</h3>
                        </div>
                    </el-col>
                    <el-col :span="21">
                        <div class="grid-content rightCtn">
                            <span class="grid-con">查看疫苗详情</span>
                            <span class="grid-con">新增疫苗信息</span>
                            <span class="grid-con">编辑疫苗信息</span>
                            <span class="grid-con">删除疫苗信息</span>
                            <span class="grid-con">新增保健信息</span>
                            <span class="grid-con">编辑保健信息</span>
                            <span class="grid-con">新增体检信息</span>
                            <span class="grid-con">编辑体检信息</span>
                            <span class="grid-con">查看疫苗库存</span>
                            <span class="grid-con">修改疫苗库存</span>
                        </div>
                    </el-col>
                </el-row>


                <!--预约管理-->
                <el-row :gutter="20">
                    <el-col :span="3">
                        <div class="grid-content leftCtn">
                            <h3>预约管理</h3>
                        </div>
                    </el-col>
                    <el-col :span="21">
                        <div class="grid-content rightCtn">
                            <span class="grid-con">查看预约详情</span>
                        </div>
                    </el-col>
                </el-row>


                <!--通知管理-->
                <el-row :gutter="20">
                    <el-col :span="3">
                        <div class="grid-content leftCtn">
                            <h3>通知管理</h3>
                        </div>
                    </el-col>
                    <el-col :span="21">
                        <div class="grid-content rightCtn">
                            <span class="grid-con">查看通知</span>
                            <span class="grid-con">新增通知</span>
                            <span class="grid-con">修改通知</span>
                            <span class="grid-con">删除通知</span>
                        </div>
                    </el-col>
                </el-row>

                <!--订单管理-->
                <el-row :gutter="20">
                    <el-col :span="3">
                        <div class="grid-content leftCtn">
                            <h3>订单管理</h3>
                        </div>
                    </el-col>
                    <el-col :span="21">
                        <div class="grid-content rightCtn">
                            <span class="grid-con">查看待付款</span>
                            <span class="grid-con">查看已付款</span>
                            <span class="grid-con">查看退款</span>
                            <span class="grid-con">查看已取消</span>
                        </div>
                    </el-col>
                </el-row>

                <!--设置-->
                <el-row :gutter="20">
                    <el-col :span="3">
                        <div class="grid-content leftCtn">
                            <h3>设置</h3>
                        </div>
                    </el-col>
                    <el-col :span="21">
                        <div class="grid-content rightCtn">
                            <span class="grid-con">查看信息反馈</span>
                            <span class="grid-con">查看用户协议</span>
                        </div>
                    </el-col>
                </el-row>


            </div>


        </div>
    </div>
</template>
<script>
    export default {
        name: "authorityConfiguration",
        data() {
            return{
                list:[],
                list1:[],
            }
        },
        methods:{
            //权限列表
            getList(){
                let token=localStorage.getItem('token');
                this.$http.get('/admin/AuthRule/index_simple',{
                    params:{
                        token
                    }
                }).then(response=>{
                    console.log(response)
                    this.list1=response.data.result;
                //     this.list1.filter(item => item.title.indexOf("用户")!="-1" );
                //     this.list1= this.list1.filter(item => item.title.indexOf("用户")!="-1" );
                //     // Vue.$set(this.orderList);
                //   //  alert("当前的数组的长度是"+this.orderList.length);
                //     this.length=this.list1.length;
                })
            }
        },
        created(){
            this.getList();
        }
    }
</script>

<style lang="less">
    .grid-content h3
    {
        font-weight:bold;
        font-size:15px;
        color:#000;
        margin-right:20px;
        text-overflow:ellipsis;
        white-space:nowrap;
        overflow:hidden;
        text-align:right;
        margin-top:15px;
    }
    .leftCtn
    {
        margin-left:50px;
        margin-right:20px;
        margin-bottom:20px;
    }
    .grid-con
    {
        font-size:14px;
        margin-left:15px;
        margin-right:35px;
        width:110px;
        height:30px;
        margin-top:15px;
        display:inline-block;
        text-align:left;
        overflow:hidden;
        color:rgba(0,0,0,0.86);
    }
    .el-row {
        margin-bottom: 20px;
        &:last-child {
            margin-bottom: 0;
        }
    }
    .el-col {
        border-radius: 4px;
    }
    .bg-purple-dark {
        background: #99a9bf;
    }
    .bg-purple {
        background: #d3dce6;
    }
    .bg-purple-light {
        background: #e5e9f2;
    }
    .grid-content {
        border-radius: 4px;
        min-height: 36px;
    }

    .leftImg1
    {
        position:absolute;
        left:0px;
        top:30px;
    }
    .centerCtn
    {
        position:relative;
        left:0px;
        padding-left:40px;
        padding-top:40px;
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
        width:100%;
        height:410px;
        margin:20px auto;
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
        background:green;
    }
    .particulars-container{
        height: 980px;
        .particulars-header{
            /*display: flex;*/
            height: 80px;
            line-height: 80px;
            /*align-items: center;*/
            font-size: 14px;
            color: #656565;
            /*padding-left: 40px;*/
            /*border-bottom: 1px solid #eee;*/
        }
        .particulars-info{
            height:auto;
            position:relative;
            /*border-bottom: 1px solid #eee;*/

        }
    }
</style>
