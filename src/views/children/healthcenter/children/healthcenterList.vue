<template>
    <div class="healthcenter-container myhealthcentercontainer" style="overflow-y:auto!important;max-height:940px;">
        <div class="search">
            <el-input style="width:700px;" v-model="input1" placeholder="可搜索卫生所名称"></el-input>
            <el-button class="btnSearch" @click="search" type="primary" style="margin-left:120px!important;">搜索</el-button>
            <el-button type="primary" @click="toAddPage">新增</el-button>
        </div>
        <!-- 表格数据 -->
        <el-table :data="healthList.slice((currentPage-1)*pagesize,currentPage*pagesize)"
                  stripe
                  style="width:100%;padding-left:0px;">
            <el-table-column  label="序号">
                <template slot-scope="scope">
                    <span>{{scope.row.id}}  </span>
                </template>
            </el-table-column>
            <el-table-column label="卫生所名称">
                <template slot-scope="scope">
                    <span>{{scope.row.title}}  </span>
                </template>
            </el-table-column>
            <el-table-column  label="地址">
                <template slot-scope="scope">
                    <span>{{scope.row.address}}  </span>
                </template>
            </el-table-column>
            <el-table-column  label="电话">
                <template slot-scope="scope">
                    <span>{{scope.row.phone}}  </span>
                </template>
            </el-table-column>
            <el-table-column  label="操作时间" width="168">
                <template slot-scope="scope">
                    <span>{{new Date(scope.row.createtime*1000).toLocaleString()}}</span>
                </template>
            </el-table-column>
            <el-table-column  label="卫生所状态">
                <template slot-scope="scope">
                    <!--<span>{{scope.row.status}}  </span>-->
                    <span type="text"  v-if="scope.row.status=1">显示</span>
                    <span type="text"  v-if="scope.row.status=0">隐藏</span>
                </template>
            </el-table-column>

            <el-table-column prop="" label="操作" width="145">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            type="primary"
                            @click="goHealthEdit(scope.row)">编辑</el-button>
                    <!--<el-button-->
                            <!--size="mini"-->
                            <!--type="primary"-->
                            <!--@click="deletelevel(scope.row)">删除</el-button>-->

                </template>
            </el-table-column>
        </el-table>
        <div class="block">
                <div class="block" style="text-align:center">
                    <el-pagination
                            @size-change="handleSizeChange"
                            background
                            @current-change="handleCurrentChange"
                            :current-page="currentPage"
                            :page-sizes="[5, 10, 15, 20,25,30]"
                            :page-size="pagesize"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="total">
                    </el-pagination>
                </div>
        </div>


    </div>
</template>

<script>
    export default {
        name: "healthcenterList",
        data() {
            return {
                input1: "",
                keyword:"",
                total:0,
                healthList:[],
                pagesize:5,
                //   表格数据
                tableData: [{
                    portrait: '',
                    number: '1',
                    name: '关山街七一七区卫生服务中心',
                    mobile:'关山路１号',
                    gender:'85697522',
                    IDnumber:'2019.01.12 12:12',
                    birth:'1998.12.12'
                },
                ],
                //分页
                currentPage: 1,
            };
        },
        methods: {
            getHealthCenterList(keyword=''){
                let token=localStorage.getItem('token');
                this.$http.get('/admin/clinic/getlist',{
                    params:{
                        token,
                        page:1,
                        limit:100,
                        apitype:1,
                        keyword
                    }
                }).then(response=>{
                    console.log("请求数据开始...")
                    console.log(response);
                    //this.userList=response.data.result.list;
                    this.healthList=response.data.result.list;
                    this.total=Number(response.data.result.total);
                    this.id=response.data.list.id;
                    console.log(response);
                })
            },
            search(){
                let input1=this.input1;
                this.getHealthCenterList(input1);
            },
            //删除卫生所--接口待定
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
                    this.$http.get('/admin/clinic/status',{
                        params:{
                            token,
                            apitype:1,
                            cid:deleteid,
                            status:0
                        }
                    }).then(res=>{
                        // console.log('删除',res)
                        console.log(res);
                        if(res.data.status==1){
                            this.$message.success('删除卫生所成功!');
                            console.log("此处语句被执行了!");
                            this.getHealthCenterList();
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
            toAddPage(){
              this.$router.push("/home/healthcenter/healthcenterAdd")
            },
            //跳转页面
           goHealthEdit(row){

                console.log("你好，当前的row的id是"+row.id);

                // this.$emit("list")
                //  this.$router.push("/home/healthcenter/healthcenterEdit");
               this.$router.push({name:'healthcenterEdit',
                   params:{
                       id:row.id,
                       title:row.title,
                       phone:row.phone,
                       province:row.province,
                       city:row.city,
                       area:row.area,
                       address:row.address,
                       lng:row.lng,
                       lat:row.lat,
                       alladdress:row.alladdress,
                       createtime:row.createtime,
                       province_code:row.province_code,
                       city_code:row.city_code,
                       area_code:row.area_code

                   }})
            },

            //分页
            handleCurrentChange(val) {
                // console.log(`当前页: ${val}`);
                this.currentPage = val
                this.getHealthCenterList()
            },
            handleSizeChange:function (size) {
                this.pagesize = size;
                this.getHealthCenterList();
                console.log(this.pagesize)  //每页下拉显示数据
            },

        },
        mounted()
        {
           this.getHealthCenterList();
        },
        created()
        {
            this.getHealthCenterList();
        }
    };
</script>

<style lang="less">

    .myhealthcentercontainer
    {
        &::-webkit-scrollbar
        {
            display:none;
        }
        .el-table .cell
        {
            height:60px!important;
            line-height:60px;
            text-overflow:ellipsis;
            white-space:nowrap;
            overflow:hidden;
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
