<template>
    <div class="userinfo-container">
        <div class="search">
            <el-input v-model="input" placeholder="可搜索姓名/手机号" @keyup.native.enter="searching"></el-input>
            <el-button type="primary" @click="searching">搜索</el-button>
            <el-button type="primary"  @click.native="exportData">
               导出
            </el-button>
        </div>
        <!-- 表格 -->
        <el-table :data="userList" stripe style="width:100%">
            <el-table-column label="头像">
                <template slot-scope="scope">
                    <img :src="scope.row.avatar" alt="">
                </template>
            </el-table-column>
            <el-table-column prop="id" label="账号ID"></el-table-column>
            <el-table-column prop="realname" label="姓名"></el-table-column>
            <el-table-column prop="mobile" label="手机号"></el-table-column>
            <el-table-column prop="sex_text" label="性别"></el-table-column>
            <el-table-column prop="idcard" label="身份证号" width="170"></el-table-column>
            <el-table-column prop="birthday" label="出生年月">
                <template slot-scope="scope">
                     <span>{{scope.row.birthday | dateFormat(pattern='YYYY.MM.DD')}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="ctitle" label="接种单位"></el-table-column>
            <el-table-column prop="childrennum" label="宝宝数量"></el-table-column>
            <el-table-column prop="createtime" label="操作时间" width="168">
                 <template slot-scope="scope">
                     <span>{{scope.row.createtime | dateFormat}}</span>
                </template>
            </el-table-column>
            
            <el-table-column label="操作" width="250">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            type="primary"
                            @click="skip(scope.row.id)">详情</el-button>
                    <el-button
                            size="mini"
                            :type="scope.row.status=='1'?'primary':'warning'"
                            @click="freeze(scope.row.id,scope.row.status)"
                            >{{scope.row.status=='1'?'冻结':'解冻'}}</el-button>
                </template>
            </el-table-column>
        </el-table>




        <div class="block">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[5, 10,50]" 
                :page-size="pagesize"         
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">    
                    >
            </el-pagination>
        </div>


    </div>
</template>

<script>
    export default {
        name: "userInfo",
        data() {
            return {
                value2:true,
                //输入框
                input: "",
                //表格数据用户列表
                userList:[],
                //分页
                // 总行数
                total:0,
                currentPage: 1,
                pagesize:10,
            };
        },
        methods: {
            // //表格
            // handleEdit(index, row) {
            // },
            //跳转页面
            skip(id){
                // this.$emit("list")
                this.$router.push({name:'userdetailPage',params:{id}});
            },
            //分页
            handleSizeChange(val) {
                 this.pagesize = val;
                 this.getuserList();
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.getuserList();
            },
            handleUserList() {
                
            },
            //用户列表
            getuserList(){
                let token=localStorage.getItem('token');
                let page=this.currentPage;
                let limit=this.pagesize;
                this.$http.get('/admin/Member/index',{
                    params:{
                        token,
                        page,
                        limit,
                    }
                }).then(response=>{
                    console.log(response)
                    this.userList=response.data.result.list;
                    this.total=parseInt(response.data.result.total);
                })
            },
            //搜索
            searching(){
                let token=localStorage.getItem('token');
                let keyword=this.input;
                this.$http.get('/admin/Member/index',{
                    params:{
                        token,
                        keyword
                    }
                }).then(response=>{
                    this.userList=response.data.result.list;
                    this.total=parseInt(response.data.result.total);
                })
            },
            //冻结
            freeze(id,status){
                let token=localStorage.getItem('token');
                 id=parseInt(id);
                console.log(id,status)
                if(status=='1'){
                    status=0
                }else if(status=='0'){
                    status=1
                }
                this.$http.get('/admin/Member/change',{
                    params:{
                        token,
                        id,
                        status
                    }
                }).then(response=>{
                   if(response.data.status=='0') return this.$message({
                        type:'error',
                        message:response.data.message
                        })
                        this.$message({
                        type:'success',
                        message:response.data.message
                        })
                         this.getuserList();
                })
            },
            //导出
            exportData() {
                let token=localStorage.getItem('token');
                let keyword=this.input;
                window.open(`http://ck.hongbao19.net/admin/Member/index?token=${token}&isexcel=1&keyword=${keyword}`);
            }
        },
        created(){
            this.getuserList();
        },
    };
</script>

<style lang="less">
    .userinfo-container {
        height: 1000px;
        // min-height:250px;
        // overflow-y:auto;
        // max-height:940px;
        background-color: #fff;
        &::-webkit-scrollbar {
        display: none;
            }
        .search {
            width: 100%;
            height: 106px;
            line-height: 106px;
            display: flex;
            align-items: center;
            .el-input {
                width: 700px;
                .el-input__inner {
                    border: 1px solid #00969d;
                }
            }
            input {
                width: 600px;
                margin-left: 95px;
            }
            button {
                width: 80px;
                height: 36px;
                margin-left: 26px;
                background-color: #00969D;
            }
        }
        .el-table{
            padding: 0;
            margin-top: 0;
        }
        table{
            th{
                // text-align: center;
                // font-size: 16px;
                // color: #000;
                // font-weight: 700;
                // background-color: #F5F5F5;
                // line-height: 70px;
            }
            tr{
                height: 62px;
            }
            td{
                text-align: center;
                font-size: 14px;
                color:#8E8E8E;
                border: none;
                button{
                    background-color: #00969D;
                }
            }
            img{
                width: 40px;
                height: 40px;
                vertical-align: middle;
                border-radius: 50%;
            }
        }
        .el-pagination{
            text-align: center;
            margin-top: 50px;
            .number {
                height:30px;
                border: 1px solid #D9D9D9;
                margin: 0 5px;
                border-radius: 5px;
            }
            .el-pager li.active{
              color:#fff;
              background-color: #00969D;
            }
        }
    }
</style>
