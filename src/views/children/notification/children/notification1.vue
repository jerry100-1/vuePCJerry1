<template>
    <div class="notification1-container">
        <div class="notification1-main">

            <div class="block">

                <el-row class="row1">
                    <el-col :span="4">
                        <el-date-picker id="date1"
                                        v-model="value1"

                                        type="date"
                                        popper-class=""
                                        placeholder="开始时间"
                                        format="yyyy 年 MM 月 dd 日"
                                        value-format="yyyy-MM-dd">
                            <i class="iconfont icon-location"></i>
                        </el-date-picker>
                    </el-col>
                    <el-col :span="4">

                        <el-date-picker id="date2"
                                        v-model="value2"
                                        prefix-icon="iconfont icon-location"
                                        type="date"
                                        popper-class=""
                                        placeholder="结束时间"
                                        format="yyyy 年 MM 月 dd 日"
                                        value-format="yyyy-MM-dd">
                            <i class="iconfont icon-location"></i>
                        </el-date-picker>

                    </el-col>
                    <el-col :span="6">

                        <el-input v-model="input" id="input1"  placeholder="请输入内容"></el-input>

                    </el-col>

                    <el-col :span="10">

                        <el-col :span="5">
                            <el-button type="primary" id="btnSearch1" style="background:red !important;">搜索</el-button>
                        </el-col>

                        <el-col :span="5">
                            <el-button type="primary" id="btnExcel1">新增</el-button>
                        </el-col>

                    </el-col>

                </el-row>


                <el-row>
                    <el-table
                            :data="tableData"
                            style="width:100%;margin:0 auto;text-align:center" :row-class-name="tableRowClassName">
                        <el-table-column
                                label="通知名称"
                                width="400">
                            <template slot-scope="scope">
                                <i class="el-icon-time"></i>
                                <span style="margin-left: 10px">{{ scope.row.date }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="状态"
                                width="480">
                            <template slot-scope="scope">
                                <el-popover trigger="hover" placement="top">
                                    <p>姓名: {{ scope.row.name }}</p>
                                    <p>住址: {{ scope.row.address }}</p>
                                    <div slot="reference">
                                        {{scope.row.name }}
                                    </div>
                                </el-popover>
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="修改时间"
                                width="480">
                            <template slot-scope="scope">
                                <el-popover trigger="hover" placement="top">
                                    <p>姓名: {{ scope.row.name }}</p>
                                    <p>住址: {{ scope.row.address }}</p>
                                    <div slot="reference">
                                        {{ scope.row.name }}
                                    </div>
                                </el-popover>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="scope">
                                <el-button style="background:#009397;color:#fff;border:none;border-radius:3px;"
                                           size="mini"
                                           @click="skip">编辑</el-button>
                                <el-button style="background:#009397;color:#fff;border:none;border-radius:3px;"
                                           size="mini"
                                           type="danger"
                                           @click="handleDelete(scope.$index, scope.row)">删除</el-button>

                                <el-button style="background:#009397;color:#fff;border:none;border-radius:3px;"
                                           size="mini"
                                           type="danger"
                                           @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>




                </el-row>


                <el-row>

                    <div class="block kkelpaginate" style="">
                        <el-pagination
                                :page-size="100"
                                layout="total, sizes, prev, pager, next, jumper"
                                :page-sizes="[100, 200, 300, 400]"
                                :total="400">
                        </el-pagination>
                    </div>
                </el-row>




                <!--<span class="demonstration">使用 value-format</span>-->
                <!--<div class="demonstration">值：{{ value11 }}</div>-->

            </div>


            <div class="search">
                <!--<el-input v-model="input" placeholder="可搜索姓名/手机号/接种单位"></el-input>-->
                <!--<el-button type="primary">搜索</el-button>-->
                <!--<el-button type="primary">导出</el-button>-->

            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name:'notification1',
        data () {
            return {
                currentPage1: 5,
                currentPage2: 5,
                currentPage3: 5,
                currentPage4: 4,
                input:'',
                value1:"",
                value2:"",
                input1:"",
                tableData: [{
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1517 弄'
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1519 弄'
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                }]
            }
        },
        methods: {
            skip(){
                // const self = this;
                console.log("90909090909")
                this.$router.push("/home/notification/notificationEdit");
                console.log("80808080")
            },
            handleDelete(index, row) {
                console.log(index, row);
            },
            tableRowClassName({row, rowIndex}) {
                if (rowIndex === 1) {
                    return 'warning-row';
                } else if (rowIndex === 2) {
                    return 'success-row';
                }
                return '';
            },

            //表格
            handleEdit(index, row) {


            },
            //跳转页面
            skip(){
                // this.$router.push('/notification/notificationEdit')
                this.$router.push("/home/notification/notificationEdit");
            },

            //分页
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },
            //弹窗
            open7() {
                this.$confirm('是否确定冻结?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '冻结成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消冻结'
                    });
                });
            }
        }
    };
</script>

<style lang="less">
    #btnSearch1
    {
        margin-left:20px;
        background:#009793;
    }
    .kkelpaginate
    {
        float:right;margin-top:60px;
    }
    el-table-column
    {
        border: none;
    }
    .el-table--border, .el-table--group{
        border: none;
    }
    .el-table__header-wrapper th:nth-last-of-type(2){
        border: none;
    }
    .el-table--border td:nth-last-of-type(1){
        border: none;
    }
    .el-table--border::after, .el-table--group::after{
        width: 0;
    }
    .tableRowClassName
    {
        border-bottom:none;
    }
    .el-table .warning-row {
        background:#fff;
    }
    .el-table .success-row {
        background:#f2f2f2;
    }
    .el-button
    {
        background:#009397;
    }
    .el-button-danger {
        color: #FFF;
        background:#009397;
        border-color: #F56C6C;
    }

    .row1
    {
        margin: 40px auto;
        margin-top:40px;
        text-align:center;
        margin-left:40px;
    }
    #date1,#date2,#input1
    {
        border:none;
        border:1px solid #009397;
    }
    .el-table th>.cell {
        text-align: center;
        height:70px;
        font-weight:bold;
        line-height:70px;
        color:#333;
        background:#f2f2f2;
        border-bottom: none;
    }
    .el-table td, .el-table th.is-leaf {
        border-bottom: none;
    }
    .el-table .cell, .el-table th div {
        text-align: center;
        border-bottom: none;
    }

    #btnSearch1
    {
        background:#009397;
        border:none
    }
    #btnExcel1
    {
        background:#009397;
        border:none
    }
    /*#date1,#date2*/
    /*{*/
    /*float:left;*/
    /*}*/
    /*el-input*/
    /*{*/
    /*display:inline-block;*/
    /*float:left;*/
    /*width:100px;*/
    /*float:right;*/
    /*margin-top:60px;*/
    /*}*/
    /*.lineK*/
    /*{*/
    /*display:inline-block;*/
    /*width:20px;*/
    /*height:1px;*/
    /*background:rgba(0,0,0,0.46);*/
    /*margin:0 auto;*/
    /*}*/
    /*#date1*/
    /*{*/
    /*margin-top:60px;*/
    /*margin-left:60px;*/
    /*border:1px solid #00d3c2;*/
    /*}*/
    /*#date2*/
    /*{*/
    /*margin-top:60px;*/
    /*margin-left:60px;*/
    /*border:1px solid #00d3c2;*/
    /*}*/
    .notification1-container{
        height: 1000px;
        background-color: #f2f2f2;
        /*padding: 30px;*/
        /*box-sizing: border-box;*/
        .notification1-main{
            width:98%;
            margin:0 auto;
            height: 100%;
            background: #fff;
            border: 1px solid #E9E9E9;
            border-radius: 15px;
            box-shadow: 0 0 10px 4px #eee;
            overflow: hidden;
            .search{
                width: 100%;
                height: 106px;
                line-height:106px;
                display: flex;
                justify-content: flex-start;
                align-items: center;
                /*input{*/
                /*width: 600px;*/
                /*margin-left: 95px;*/
                /*}*/
                /*button{*/
                /*width: 80px;*/
                /*height: 36px;*/
                /*}*/
            }
        }
    }
</style>
