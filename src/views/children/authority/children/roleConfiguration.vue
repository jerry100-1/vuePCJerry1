<template>
    <div class="healthcenter-container">
        <div class="search">
            <el-input style="width:700px;" v-model="input" placeholder="可搜索职称" @keyup.native.enter="search"></el-input>
            <el-button class="btnSearch" type="primary" style="margin-left:120px!important;" @click="search">搜索</el-button>
            <el-button type="primary" @click="toAddPage(-1)">新增</el-button>
        </div>
        <!-- 表格数据 -->
        <el-table :data="list"
                  stripe
                  style="width:100%;padding-left:0px;" :cell-style="cellStyle">
            <el-table-column prop="id" label="ID"></el-table-column>
            <el-table-column  prop="title" label="角色" ></el-table-column>
            <el-table-column prop="createtime_text" label="修改时间"></el-table-column>

            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            type="primary"
                            @click="toAddPage(scope.row)">编辑</el-button>
                    <el-button
                            size="mini"
                            type="primary"
                            @click="open7(scope.row.id)">删除</el-button>

                </template>
            </el-table-column>
        </el-table>




        <div class="block">


            <div class="block" style="text-align:center">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[5, 10]" 
                :page-size="pagesize"         
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">    
                    >
            </el-pagination>
            </div>
        </div>


    </div>
</template>

<script>
    export default {
        name: "roleConfiguration",
        data() {
            return {
                flag:true,
                class1:"class1",
                class2:"class2",
                input: "",
                //   表格数据
                list:[],
                //分页
                  // 总行数
                total:0,
                currentPage: 1,
                pagesize:10,
            };
        },
        methods: {

            cellStyle(row,column,rowIndex,columnIndex)
            {
              if(row.column.label=="角色")
              {
                  return "color:#FCB623";
              }
            },
            //表格
            toAddPage(data){
               this.$router.push({name:"roleConfigurationAdd",params:{data}});
            },  
            handleEdit(index, row) {

            },
            //跳转页面
            // skip(){
            //     // this.$emit("list")
            //     this.$router.push("/home/healthcenter/healthcenterEdit");
            // },

            //分页
            handleSizeChange(val) {
                 this.pagesize = val;
                 this.getList();
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.getList();
            },
            //弹窗
            open7(id) {
                this.$confirm('是否确定删除?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                }).then(() => {
                    // this.del(id);
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    this.del(id);
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            // 角色列表
            getList(keyword=''){
                let token=localStorage.getItem('token');
                let page=this.currentPage;
                let limit=this.pagesize;
                this.$http.get('/admin/AuthGroup/index',{
                    params:{
                        token,
                        page,
                        limit,
                        keyword
                    }
                }).then(response=>{
                    this.list=response.data.result.list;
                    console.log(this.list)
                    this.total=parseInt(response.data.result.total);
                })
            },
            // 搜索
            search(){
                let keyword=this.input;
                this.getList(keyword);
            },
            // 删除
         del(id){
            let token=localStorage.getItem('token');
            this.$http.get('/admin/AuthGroup/del',{
                    params:{
                    token,
                    id
                }
            }).then(response=>{
                this.getList();
            })
        }
        },
        created(){
            this.getList();
        }
    };
</script>

<style lang="less">
    /*:class="flag===true:class1?class2"*/
    .class1
    {
        color:#fdb625;
    }
    .class2
    {
        color:rgba(0,0,0,0.36);
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
    .el-table{
        margin-top: 0;
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

</style>
