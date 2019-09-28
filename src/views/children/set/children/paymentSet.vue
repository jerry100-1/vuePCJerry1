<template>
    <div class="ccia">
        <div class="ccia_top">
            <button id="mybutton" style="width:140px!important;
     height:30px!important;border-radius:3px;
     background:#009397!important;
     color:#fff!important;margin:40px;border:none;" @click="toaddlevel" >
                创建支付方式
            </button>
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
                        style="width:100%;padding-left:0px;"
                     >

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
                            <!--<el-tooltip class="item" effect="dark" content="编辑" placement="top">-->
                                <!--<span class="edit" @click="toedit(scope.row)"><i class="el-icon-edit"></i></span>-->
                            <!--</el-tooltip>-->
                            <!--<el-tooltip class="item" effect="dark" content="删除" placement="top">-->
                                <!--<span class="edit" @click="deletelevel('notall',scope.row)"><i class="el-icon-delete"></i></span>-->
                            <!--</el-tooltip>-->

                            <el-button style="background:#009397;color:#fff;border:none;border-radius:3px;"
                                       size="mini"
                                       type="danger"  @click="toedit(scope.row)"
                            >编辑</el-button>

                            <el-button style="background:#009397;color:#fff;border:none;border-radius:3px;"
                                       size="mini"
                                       type="danger"
                                       @click="deletelevel('notall',scope.row)">删除</el-button>



                            <!-- <span class="edit" @click="tosetting(scope.row)"><i class="el-icon-setting"></i></span> -->
                        </template>
                    </el-table-column>
                </el-table>
                <!--<div class="page">-->
                    <!--<el-pagination-->
                            <!--@size-change="handleSizeChange"-->
                            <!--background-->
                            <!--@current-change="handleCurrentChange"-->
                            <!--:current-page="currentPage"-->
                            <!--:page-sizes="[5, 10, 15, 20]"-->
                            <!--:page-size="pagesize"-->
                            <!--layout="total, sizes, prev, pager, next, jumper"-->
                            <!--:total="total">-->
                    <!--</el-pagination>-->
                <!--</div>-->
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        name:"paymentSet",
        data(){
            return{
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
                    // this.paymentSetList=response.data.result.list;
                    console.log("此页面接收的所有总数是:"+response.data.result.total);
                    this.tableData=response.data.result.list;
                    this.total=Number(response.data.result.list.length);
                })
            },
            // // 跳转添加页面
             toaddlevel(){
                  this.$router.push('/home/projectSet/addpayset');
             },
            // toedit(row){
            //     this.$router.push('/home/projectSet/addpayset/'+row.paytype)
            // },
            toedit(row){

                console.log("您好，paytype是"+row.paytype);
                // this.$router.push('/home/projectSet/addpayset/'+row.paytype)
                this.$router.push({name:'addpayset',
                    params:{
                        paytype:row.paytype,
                    }})

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
        created(){
            // this.getlist()
            // getpaylist({}).then(res=>{
            //     console.log('api里的请求',res)
            // })
            this.getPaymentSetList()
        }
    }
</script>

<style scoped>
 #mybutton
 {

 }
</style>
