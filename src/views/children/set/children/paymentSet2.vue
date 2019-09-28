<template>
    <div class="ccia">
        <div class="ccia_top">
            <button @click="toaddlevel" style="margin:30px;">
                创建支付方式
            </button>
            <!-- <div>
                <button @click="search">
                    搜索
                </button>

                <el-input v-model="keyword" placeholder="请输入内容"></el-input>
                <el-select v-model="type" clearable  placeholder="状态" @change="typechange">
                    <el-option
                    v-for="item in typelist"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    >
                    </el-option>
                </el-select>
            </div> -->


        </div>
        <div class="ccia_contentbox">
            <!-- <div class="ccia_contenttop">
                <ul>
                    <li  @click="deletelevel('isall')"><i class="el-icon-delete"></i> 删除</li>
                </ul>
            </div> -->
            <div class="ccia_content clearfix">
                <el-table
                        ref="multipleTable"
                        :data="paymentSetList"
                        tooltip-effect="dark"
                        style="width:100%;padding-left:0px;"
                        @selection-change="handleSelectionChange">

                    <!-- <el-table-column
                        type="selection"
                       >
                    </el-table-column> -->
                    <el-table-column
                            label="序号"
                            type="index"
                            width="100">
                    </el-table-column>
                    <el-table-column
                            label="支付方式">
                        <template slot-scope="scope">
                            <span v-if="scope.row.paytype==1">支付宝支付</span>
                            <span v-if="scope.row.paytype==2">微信app支付</span>
                            <span v-if="scope.row.paytype==3">微信H5公众号支付</span>
                            <span v-if="scope.row.paytype==4">微信小程序支付</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="createtime_show"
                            label="创建时间">
                    </el-table-column>

                    <el-table-column
                            fixed="right"
                            label="操作">
                        <template slot-scope="scope">
                            <!-- <span class="edit"><i class="iconfont icon-geren"></i></span> -->
                            <el-tooltip class="item" effect="dark" content="编辑" placement="top">
                                <span class="edit" @click="toedit(scope.row)"><i class="el-icon-edit"></i></span>
                            </el-tooltip>
                            <el-tooltip class="item" effect="dark" content="删除" placement="top">
                                <span class="edit" @click="deletelevel('notall',scope.row)"><i class="el-icon-delete"></i></span>
                            </el-tooltip>
                            <!-- <span class="edit" @click="tosetting(scope.row)"><i class="el-icon-setting"></i></span> -->
                        </template>
                    </el-table-column>
                </el-table>
                <div class="page">
                    <el-pagination
                            @size-change="handleSizeChange"
                            background
                            @current-change="handleCurrentChange"
                            :current-page="currentPage"
                            :page-sizes="[5, 10, 15, 20]"
                            :page-size="pagesize"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="total">
                    </el-pagination>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

    export default {
        name:"paymentSet2",
        data(){
            return{
                typelist: [{
                    value: '1',
                    label: '启用'
                }, {
                    value: '0',
                    label: '禁用'
                }],
                type: '',
                keyword:'',
                //表格
                tableData: [],
                multipleSelection: [],
                // 分页
                paymentSetList:[],
                currentPage:1,
                limit:10,
                pagesize:5,
                total:0
            }
        },
        methods:{

            // 获取列表
            getPaymentSetList(){
                let token=localStorage.getItem('token');
                this.$http.get('/admin/payset/paylist',{
                    params:{
                        token,
                        apitype:1
                    }
                }).then(response=>{
                    //this.userList=response.data.result.list;
                    //this.id=response.data.result.list.id;
                    console.log("请求支付设置接口数据开始...");
                    console.log(response);
                    this.paymentSetList=response.data.result.list;
                    console.log("此页面接收的所有总数是:"+response.data.result.total);
                    this.total=Number(response.data.result.list.length);
                })
            },
            search(){
                this.currentPage = 1
                this.getPaymentSetList()
            },
            // // 跳转添加页面
            // toaddlevel(){
            //     // this.$router.push('/home/projectSet/addpayset/1');
            // },
            toedit(row){
                this.$router.push('/home/projectSet/addpayset/'+row.paytype)
            },
            // 删除按钮
            deletelevel(all,row){
                this.$confirm('此操作将永久删除, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let deleteid=''
                    if(all=='isall'){
                        if(this.multipleSelection.length==0){
                            this.$message.warning('请先选择需要删除的内容!');
                            return
                        }
                        let tmplist=[]
                        this.multipleSelection.forEach(item => {
                            tmplist.push(item.id)
                        });
                        tmplist = tmplist.join(',')
                        // console.log(tmplist)
                        deleteid = tmplist
                    }else if(all=='notall'){
                        deleteid = row.id
                    }

                    let token=localStorage.getItem('token');
                    this.$http.post(this.api+'/admin/payset/delete',{
                        id:deleteid,
                        token,
                        apitype:1
                    }).then(res=>{
                        // console.log('删除',res)
                        if(res.data.status==1){
                            this.$message.success('删除成功!');
                            this.getPaymentSetList();
                        }else{
                            this.$message.error(res.data.result.message);
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
                // console.log(all)
                // console.log(row)

            }
        },
        mounted(){
            // this.getlist()
            // getpaylist({}).then(res=>{
            //     console.log('api里的请求',res)
            // })
            this.getPaymentSetList()
        }
    }
</script>
<style lang="less" scoped>
    .ccia{
        .page
        {
            margin:30px auto;
            text-align:center;
        }
        .ccia_top{
            button{
                // width: 100px;
                height: 32px;
                line-height: 32px;
                padding: 0 10px;
                color: #ffffff;
                border: 0;
                font-size: 12px;
                border-radius: 2px;
                background-color:#28B7A3;
                outline: none;
                cursor: pointer;
                float: left;
            }
            >div{
                float: right;
                width: 60%;
                button{
                    border-radius: 0;
                    padding: 0 16px;
                    float: right;
                }
            }
            .el-select{
                float: right;
                width: 100px;
                border-radius: 0;
            }
            .el-input{
                float: right;
                width: 70%;
                border-radius: 0;
            }
            /deep/ .el-input__inner{
                border-radius: 0;
            }
        }
    }
    .edit{
        display: inline-block;
        width: 22px;
        height: 22px;
        border-radius: 2px;
        border: 1px solid #EFF0F0;
        // border: 1px solid red;
        text-align: center;
        cursor: pointer;
        i{
            line-height: 22px;
            font-size: 13px;
        }

    }
    .edit:hover{
        border: 1px solid #28B7A3;
        i{
            color: #28B7A3;
        }
    }
</style>


