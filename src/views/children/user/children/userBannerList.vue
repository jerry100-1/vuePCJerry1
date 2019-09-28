<template>
    <div class="userinfo-container mybannerpage">
        <div class="search">
            <el-input v-model="input1" placeholder="可搜索标题"></el-input>
            <el-button type="primary" @click="searching">搜索</el-button>
            <el-button type="primary" @click="goAddUserBanner">新增</el-button>
        </div>
        <!-- 表格 -->
        <el-table :data="userBannerList.slice((currentPage-1)*pagesize,currentPage*pagesize)" stripe style="width:100%">
            <el-table-column prop="title" label="标题" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="link" label="链接"></el-table-column>
            <el-table-column prop="placeText" label="所属模块"></el-table-column>
            <el-table-column prop="updatetime" label="修改时间" width="168"></el-table-column>
            <el-table-column prop="statusText" label="状态">
                <template slot-scope="scope">
                    <span>{{scope.row.statusText}}</span>
                </template>
            </el-table-column>

            <el-table-column label="操作" width="250">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            type="primary"
                            @click="goDetail(scope.row)">查看</el-button>
                    <el-button
                            size="mini"
                            type="primary"
                            @click="goEdit(scope.row)">编辑</el-button>

                    <el-button
                            size="mini"
                            type="primary"
                            @click="deletelevel(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>


        <div class="block">
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[5, 10,15,20,25,30]"
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
        name: "userBanner",
        data() {
            return {
                //输入框
                input1: "",
                //表格数据用户列表
                userBannerList:[],
                //分页
                // 总行数
                keyword:"",
                total:0,
                currentPage: 1,
                pagesize:5,
            };
        },
        methods: {
            // //表格
            // handleEdit(index, row) {
            // },
            //去增加页面
            goAddUserBanner()
            {
                this.$router.push("/home/user/userBannerAdd");
            },
            //跳转到详情页面
            goEdit(row)
            {
                this.$router.push({
                    name: 'userBannerEdit',
                    params: {
                        id:row.id,
                        title:row.title,
                        link:row.link,
                        thumb:row.thumb,
                        placeText:row.placeText,
                        statusText:row.statusText
                    }
                })
            },
            goDetail(row){
                // this.$emit("list")
                this.$router.push({
                    name: 'userBannerDetail',
                    params: {
                        id:row.id,
                        title:row.title,
                        link:row.link,
                        thumb:row.thumb,
                        placeText:row.placeText,
                        statusText:row.statusText
                    }
                })
            },
            //分页
            handleSizeChange(val) {
                this.pagesize = val;
                this.getBannerList();
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.getBannerList();
            },
            //轮播图列表
            getBannerList(keyword=''){
                let token=localStorage.getItem('token');
                // let page=this.currentPage;
                this.$http.get('/admin/lunboimgs/webList',{
                    params:{
                        token,
                        page:1,
                        limit:100,
                        apitype:1,
                        keyword
                    }
                }).then(response=>{
                    console.log("这是轮播图接口返回给我的数据:"+response);
                    this.userBannerList=response.data.result.list;
                    this.total=parseInt(response.data.result.total);
                    console.log(this.userBannerList)
                })
            },
            //删除轮播图
            deletelevel(row){
                console.log(row.id);
                this.$confirm('此操作将永久删除, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {

                    let deleteid='';
                    deleteid = row.id;
                    // console.log(deleteid)
                    let token=localStorage.getItem('token');
                    console.log(token);
                    this.$http.get('/admin/lunboimgs/del',{
                        params:{
                            token,
                            apitype:1,
                            id:deleteid,
                        }
                    }).then(res=>{
                        // console.log('删除',res)
                        console.log(res);
                        if(res.data.status==1){
                            this.$message.success('删除轮播图成功!');
                            console.log("此处语句被执行了!");
                            this.getBannerList();
                        }else{
                            console.log("此处语句被执行ooooooooooo!");
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
            },



            //搜索
            searching(){
              //  alert("点击搜索成功!");
                let input1=this.input1;
                this.getBannerList(input1);
            },
            //冻结

        },
        created(){
            this.getBannerList();
        },
    };
</script>

<style lang="less">
    .mybannerpage .el-table .cell
    {
        height:60px!important;
        line-height:60px;
        text-overflow:ellipsis;
        white-space:nowrap;
        overflow:hidden;
    }
    .mybannerpage
    {
        overflow-y:auto!important;
        max-height:940px!important;
        &::-webkit-scrollbar{
            display:none;
        }
    }

    .userinfo-container {
        height: 100%;
        background-color: #fff;
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
