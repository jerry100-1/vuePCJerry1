<template>
    <div class="ccia">
        <div class="ccia_top">

            <div>

                <button @click="search">
                    搜索
                </button>
                <el-input v-model="keyword" placeholder="请输入内容"></el-input>


                <!--<button style="height:40px;width:60px;">搜索</button>-->
                <!--<input type="text" placeholder="请输入搜索内容" @click="modalTo()"  id="kkmn" style="text-indent:20px;float:right;width:50%;height:40px;outline:none;">-->

                <!-- <el-input v-model="keyword" placeholder="请输入内容"></el-input> -->
                <!--<el-select v-model="status" clearable  placeholder="状态" @change="typechange">-->
                <!--<el-option-->
                <!--v-for="item in typelist"-->
                <!--:key="item.value"-->
                <!--:label="item.label"-->
                <!--:value="item.value"-->
                <!--&gt;-->
                <!--</el-option>-->
                <!--</el-select>-->
            </div>


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
                        :data="tableData"
                        tooltip-effect="dark"
                        style="width: 100%"
                       >

                    <!-- <el-table-column
                        type="selection"
                       >
                    </el-table-column> -->
                    <el-table-column
                            label="排序"
                            type="index"
                            width="100">
                    </el-table-column>
                    <el-table-column
                            label="ID"
                    >
                        <!--{{nickname}}-->
                        <template slot-scope="scope">
                            <span> {{scope.row.id}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="用户昵称"
                    >
                        <!--{{nickname}}-->
                        <template slot-scope="scope">
                            <span> {{scope.row.nickname}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="订单id"
                    >
                        <template slot-scope="scope">
                            <span> {{scope.row.orderid}}</span>
                        </template>
                    </el-table-column>

                    <el-table-column
                            label="酒店或景点id"
                    >
                        <template slot-scope="scope">
                            <span> {{scope.row.viewid}}</span>
                        </template>
                    </el-table-column>

                    <el-table-column
                            label="酒店或景点名称"
                    >
                        <template slot-scope="scope">
                            <span> {{scope.row.viewname}}</span>
                        </template>
                    </el-table-column>


                    <el-table-column
                            label="评分">
                        <template slot-scope="scope">
                            <span> {{scope.row.score}}</span>
                        </template>

                    </el-table-column>
                    <el-table-column
                            label="评论内容">
                        <template slot-scope="scope">
                            <span> {{scope.row.content}}</span>
                        </template>

                    </el-table-column>
                    <el-table-column
                            label="评论时间">
                        <template slot-scope="scope">
                            <span> {{scope.row.createtime}}</span>
                        </template>
                    </el-table-column>
                    <!-- <el-table-column
                        prop="status"
                        label="状态">
                    </el-table-column> -->
                    <el-table-column
                            fixed="right"
                            label="操作">
                        <template slot-scope="scope">
                            <!-- <span class="edit"><i class="iconfont icon-geren"></i></span> -->
                            <el-tooltip class="item" effect="dark" content="详情" placement="top">
                                <span class="edit" @click="toedit(scope.row)"><i class="el-icon-edit"></i></span>
                            </el-tooltip>
                            <el-tooltip class="item" effect="dark" content="删除" placement="top">
                                <span class="edit" @click="deletelevel('notall',scope.row)"><i class="el-icon-delete"></i></span>
                            </el-tooltip>
                            <!-- <span class="edit" @click="tosetting(scope.row)"><i class="el-icon-setting"></i></span> -->
                        </template>
                    </el-table-column>
                </el-table>
                <!--<el-pagination-->
                        <!--background-->
                        <!--@current-change="handleCurrentChange"-->
                        <!--:current-page="currentPage"-->
                        <!--:page-size="10"-->
                        <!--layout="total, prev, pager, next, jumper"-->
                        <!--:total="total">-->
                <!--</el-pagination>-->
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name:"eluploadbutton",
        data(){
            return{
                typelist: [{
                    value: '1',
                    label: '启用'
                }, {
                    value: '0',
                    label: '禁用'
                }],
                status:'',
                keyword:'',
                //表格
                tableData: [],
                multipleSelection: [],
                // 分页
                page:1,
                limit:10,
                total:0
            }
        },
        methods:{
            // 获取列表
            getList(){
                this.$http.post(this.api+'admin/Lunboimgs/index',{
                    limit:this.limit,
                    page:this.page
                }).then(res=>{
                    console.log('轮播',res);
                    console.log("正式请求数据开始!");
                    console.log(res);
                    if(res.data.status==1){
                        console.log("进入状态码为1的判断语句");
                        this.tableData = res.data.result.list
                        console.log("状态码正确!");
                        console.log(this.tableData,6666);
                        this.tableData.forEach(item => {
                            // alert("进入此条语句");

                        });
                        this.total = Number(res.data.result.total)
                    }else{
                        // this.tableData = []
                        // this.total = 0
                    }
                })
            },
            // 跳转添加页面
            // toaddlevel(){
            //   this.$router.push('/commentdetail')
            // },
            // toedit(row){
            //     this.$router.push('/commentdetail/'+row.id)
            // },
            search(){

                this.getList()
                // console.log("989898");
                // console.log(this.keyword);
                //      console.log("此方法调用开始");
                //      this.getlist();
                //     this.$http.post(this.api+'admin/Comment/index',{
                //           limit:this.limit,
                //           page:this.currentPage,
                //           keyword:this.keyword
                //
                //         }).then(res=>{
                //
                //           console.log(res);
                //
                //         })
                //         console.log("此方法调用结束");
                //         // this.getlist()
            },
            // 状态选择
            // search(){
            //   this.getlist()
            // },
            // 跳转添加页面
            // 换页
            handleCurrentChange(val) {
                // console.log(`当前页: ${val}`);
                // this.currentPage = val
                this.getList()
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
                        // console.log(deleteid)
                    }
                    this.$http.post(this.api+'admin/Comment/dels',{
                        id:deleteid
                    }).then(res=>{
                        // console.log('删除',res)
                        if(res.data.status==1){
                            this.$message.success('删除成功!');
                            this.getlist()
                        }else{
                            this.$message.error(res.data.message);
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
        created()
        {
            this.getList()
        },
        mounted(){
            this.getList()
            //this.getlist2()
        }
    }
</script>
<style lang="less" scoped>
    .ccia{
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


