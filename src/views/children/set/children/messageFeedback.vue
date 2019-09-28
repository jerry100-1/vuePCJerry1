<template>
    <div class="healthcenter-container messageFeedback">
        <div class="search">
            <el-input style="width:700px;" v-model="input1" placeholder="可搜索信息反馈标题"></el-input>
            <el-button class="btnSearch" @click="search" type="primary" style="margin-left:120px!important;">搜索</el-button>
        </div>
        <!-- 表格数据 -->
        <el-table :data="messageFeedbackList.slice((currentPage-1)*pagesize,currentPage*pagesize)"
                  stripe
                  style="width:100%;padding-left:0px;">
            <el-table-column prop="username" label="姓名">
                <template slot-scope="scope">
                    <span>{{scope.row.realname}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="messagefeedback" label="信息反馈">
                <template slot-scope="scope">
                    <span>{{scope.row.content}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="modifytime" label="修改时间">
                <template slot-scope="scope">
                    <span>{{scope.row.createtime_text}}</span>
                </template>
            </el-table-column>


            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            type="primary"
                            @click.native="detailOpen(scope.row)">查看</el-button>

                </template>
            </el-table-column>
        </el-table>


            <div class="block" style="text-align:center">
                <div class="page">
                    <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="currentPage"
                            :page-size="pagesize"
                            layout="total, sizes, prev, pager, next, jumper"
                            :page-sizes="[5, 10, 15, 20,25,30]"
                            :total="total">
                    </el-pagination>
                </div>
            </div>


    </div>
</template>

<script>
    export default {
        name: "messageFeedback",
        data() {
            return {
                currentPage1: 5,
                messageFeedbackList:[],
                input: "",
                input1:"",
                keyword:"",
                //分页
                currentPage: 4,
                pagesize:5,
                orderList:[],
                total:0,
                currentPage:1,
            };
        },
         methods: {
             //获取所有留言版块数据

             getMessageFeedbackList(keyword='') {
                 let token = localStorage.getItem('token');
                 this.$http.get('/admin/Feedback/index', {
                     params: {
                         token,
                         apitype: 1,
                         page: 1,
                         limit: 100,
                         keyword
                     }
                 }).then(response => {
                     //this.userList=response.data.result.list;
                     //this.id=response.data.result.list.id;
                     console.log("请求信息反馈接口数据开始...");
                     console.log(response);
                     this.messageFeedbackList = response.data.result.list;
                     console.log("此页面接收的所有总数是:" + response.data.result.total);
                     this.total = Number(response.data.result.total);
                 })
             },
             search()
             {
                 //alert("搜索开始");
                 let keyword=this.input1;
                 // alert(keyword);

                 this.getMessageFeedbackList(keyword)

             },
             //分页
             handleCurrentChange(val)
             {
                 this.currentPage=val;
                 // this.getOrderList();
             },
             handleSizeChange:function (size) {
                 this.pagesize = size;
                 this.getMessageFeedbackList();
                 console.log(this.pagesize)  //每页下拉显示数据
             },
            detailOpen(row)
            {
                console.log("当前传递的id是"+row.id);

                   this.$router.push("/home/projectSet/messageFeedbackDetail");
                 this.$router.push({
                     name: 'messageFeedbackDetail',
                     params: {
                         id:row.id
                     }
                 });
                //
                console.log("当前传递的id是"+row.id);

            },
        },
        created()
        {
           this.getMessageFeedbackList();
        }
    };
</script>

<style lang="less">
    .messageFeedback{
        overflow-y:auto!important;
        max-height:940px!important;
        &::-webkit-scrollbar
        {
            display:none;
        }
    }
    .search input {
        /* width: 600px; */
        margin-left: 95px;
        border:1px solid #009397;
    }
    .cell button
    {
        background:#00979c;
    }
    .block .el-pagination{
        margin:80px auto;
    }
    el-button.btnSearch
    {
        margin-left:125px;
    }
    .el-button--primary {
        color: #FFF;
        background-color:#00979c;
        border-color:#00979c;
    }
    .healthcenter-container
    {
        height: 940px;
        background-color: #fff;
    }
    .healthcenter-container  .search
    {
        width: 100%;
        height: 106px;
        line-height: 106px;
        display: flex;
        align-items: center;
    }
    /*.el-input {*/
    /*width: 700px;*/
    /*}*/
    .el-input__inner {
        border: 1px solid #00979c;
    }

    .search input {
        /*width: 600px;*/
        margin-left: 95px;
    }
    .search  button {
        width: 80px;
        height: 40px;
        background:#00979c;
        margin-left:100px;
    }
    .search  button:nth-child(1){
        margin-left:125px;
    }

    el-table th{
        text-align: center;
        font-size: 16px;
        color: #000;
        font-weight: bold;
        background-color: #F5F5F5;
        line-height: 50px;
    }
    el-table  td{
        text-align: center;
        font-size: 14px;
        color:#8E8E8E;
        height: 60px;
    }


</style>
