<template>
    <div class="healthcenter-container diseaseSeriescontainer" style="overflow-y:auto;max-height:940px;">
        <div class="search">
            <el-input style="width:700px;" v-model="input1" placeholder="可搜索病症名称"></el-input>
            <el-button class="btnSearch"  @click="searching" type="primary" style="margin-left:120px!important;">搜索</el-button>
            <el-button type="primary" @click="addOpen()">新增</el-button>
        </div>
        <!-- 表格数据 -->
        <el-table :data="diseaseSeriesList.slice((currentPage-1)*pagesize,currentPage*pagesize)"
                  stripe
                  style="width:100%;padding-left:0px;">
            <el-table-column  label="序号">
                <template slot-scope="scope">
                    <span>{{scope.row.id}}  </span>
                </template>
            </el-table-column>
            <el-table-column label="病症名称">
                <template slot-scope="scope">
                    <span>{{scope.row.name}}  </span>
                </template>
            </el-table-column>
            <el-table-column  label="创建时间">
                <template slot-scope="scope">
                    <span>{{scope.row.createtime}}  </span>
                </template>
            </el-table-column>

            <el-table-column  label="操作">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            type="primary"
                            @click="editOpen(scope.row)">编辑</el-button>
                    <el-button
                            size="mini"
                            type="primary"
                            @click.native="deletelevel(scope.row)">删除</el-button>

                </template>
            </el-table-column>
        </el-table>





        <div class="page" style="text-align:center;margin-top:60px;">
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
</template>

<script>
    export default {
        name: "diseaseSeries",
        data() {
            return {
                currentPage1: 5,
                diseaseSeriesList:[],
                currentPage2: 5,
                currentPage3: 5,
                currentPage4: 4,
                keyword:"",
                input1: "",
                //   表格数据
                tableData: [{
                    seriesId: '1',
                    diseaseName: '眼睛红肿',
                    createTime:'1998.12.12'
                    },
                    {
                        seriesId: '1',
                        diseaseName: '眼睛红肿',
                        createTime:'1998.12.12'
                    }
                ],
                //分页
                pagesize:5,
                orderList:[],
                total:0,
                currentPage:1,
            };
        },
        methods: {
            //删除病症分类
            deletelevel(row){
                console.log(row.id);
                alert("您要删除的病症的id是"+row.id);
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
                    this.$http.get('/admin/symptom/deltype',{
                        params:{
                            token,
                            apitype:1,
                            id:deleteid
                        }
                    }).then(res=>{
                        // console.log('删除',res)
                        console.log(res);
                        if(res.data.status==1){
                            this.$message.success('删除成功!');
                            console.log("此处语句被执行了!");
                            this.getDiseaseSeries();
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
            //表格
            getDiseaseSeries(keyword=''){
                let token=localStorage.getItem('token');
                this.$http.get('/admin/symptom/typelist',{
                    params:{
                        token,
                        page:1,
                        limit:100,
                        apitype:1,
                        keyword
                    }
                }).then(response=>{
                    console.log("请求病症分类数据接口开始...")
                    console.log(response);
                    //this.userList=response.data.result.list;
                    this.diseaseSeriesList=response.data.result.list;
                    this.total=Number(response.data.result.total);
                    // this.id=response.data.list.id;
                    console.log(response);
                })
            },
            searching(){
                let input1=this.input1;
                this.getDiseaseSeries(input1);
            },
            //分页
            handleCurrentChange(val)
            {
                this.currentPage=val;
                // this.getOrderList();
            },
            handleSizeChange:function (size) {
                this.pagesize = size;
                this.getDiseaseSeries();
                console.log(this.pagesize)  //每页下拉显示数据
            },

            //新增病症名称
            addOpen()
            {
                this.$prompt('新增病症名称', '', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    // inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
                    inputErrorMessage: '邮箱格式不正确'
                }).then(({value}) => {
                    this.$message({
                        type: 'success',
                        message: '输入的病症名称是: ' + value
                    });
                    let token=localStorage.getItem('token');
                    console.log(token);
                    this.$http.get('/admin/symptom/addtype',{
                        params:{
                            token,
                            apitype:1,
                            title:value
                        }
                    }).then(res=>{
                        // console.log('删除',res)
                        console.log(res);
                        if(res.data.status==1){
                            this.$message.success('新增症状成功!');
                            // window.location.reload();
                            this.getDiseaseSeries();
                            console.log("此处语句被执行了!");
                        }else{
                            console.log("此处语句被执行o!");
                            this.$message.error(res.data.message);
                        }
                    })

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消输入'
                    });
                });
                this.getDiseaseSeries();
            },
            //编辑病症名称
            editOpen(row)
            {
                this.$prompt('请输入新的病症名称', '', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    // inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
                    inputErrorMessage: '邮箱格式不正确',
                    inputPlaceholder:row.name
                }).then(({ value }) => {
                    this.$message({
                        type: 'success',
                        message: '输入的病症名称是: ' + value
                    });

                    let token=localStorage.getItem('token');
                    console.log(token);

                    this.$http.get('/admin/symptom/addtype',{
                        params:{
                            token,
                            apitype:1,
                            title:value,
                            id:row.id
                        }
                    }).then(res=>{
                        // console.log('删除',res)
                        console.log(res);
                        if(res.data.status==1){
                            this.$message.success('编辑症状成功!');
                            // window.location.reload();
                            this.getDiseaseSeries();
                            console.log("此处语句被执行了!");
                        }else{
                            console.log("此处语句被执行o!");
                            this.$message.error(res.data.message);
                        }
                    })





                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消输入'
                    });
                });
            },
            handleEdit(index, row) {

            },
            //跳转页面
            // skip(){
            //     // this.$emit("list")
            //     this.$router.push("/home/healthcenter/healthcenterEdit");
            // },
            //弹窗
            open7() {
                this.$confirm('是否确定删除?', '', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除 '
                    });
                });
            }
        },
        created()
        {
            this.getDiseaseSeries();
        }
    };
</script>

<style lang="less">
    .diseaseSeriescontainer
    {
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
