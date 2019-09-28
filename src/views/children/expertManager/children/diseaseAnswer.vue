<template>
    <div class="healthcenter-container mydiseaseanswerContainer" style="overflow-y:auto;max-height:940px;">
        <div class="search">
            <el-input style="width:700px;" v-model="input1" placeholder="可搜索病症名称"></el-input>
            <el-button class="btnSearch" @click="searching" type="primary" style="margin-left:120px!important;">搜索</el-button>
            <el-button type="primary" @click="addNew">新增</el-button>
        </div>
        <!-- 表格数据 -->
        <el-table :data="diseaseAnswerList.slice((currentPage-1)*pagesize,currentPage*pagesize)"
                  stripe
                  style="width:100%;padding-left:0px;">

            <el-table-column  label="病症id">
                <template slot-scope="scope">
                    <span>{{scope.row.id}}</span>
                </template>
            </el-table-column>

            <el-table-column  label="病症名称">
                <template slot-scope="scope">
                    <span>{{scope.row.title}}</span>
                </template>
            </el-table-column>
            <el-table-column  label="病症答案">
                <template slot-scope="scope">
                    <span>{{scope.row.answer}}</span>
                </template>
            </el-table-column>
            <el-table-column  label="操作时间">
                <template slot-scope="scope">
                    <span>{{scope.row.updatetime}}</span>
                </template>
            </el-table-column>

            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            type="primary"
                            @click="detailOpen(scope.row)">详情</el-button>
                    <el-button
                            size="mini"
                            type="primary"
                            @click="editOpen(scope.row)">编辑</el-button>
                    <el-button
                            size="mini"
                            type="primary"
                            @click="deletelevel(scope.row)">删除</el-button>

                </template>
            </el-table-column>
        </el-table>


        <div class="block">


            <div class="block" style="text-align:center">
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
        name: "diseaseAnswer",
        data() {
            return {
                currentPage1: 5,
                diseaseAnswerList:[],
                input: "",
                id:"",
                keyword:"",
                input1: "",
                //   表格数据
                tableData: [{
                        diseaseName: '红肿',
                        diseaseAnswer: '眼睛红肿与睡眠,饮水和睡觉的姿势都有关,建议睡前不要喝太多的水',
                        operateTime:'2019.01.12'
                        }
                ],
                //分页
                pagesize:5,
                expertList:[],
                total:0,
                currentPage:1,
            };
        },
        methods: {
            //表格
            getDiseaseAnswerList(keyword=""){
                let token=localStorage.getItem('token');
                this.$http.get('/admin/symptom/index',{
                    params:{
                        token,
                        page:1,
                        limit:100,
                        apitype:1,
                        keyword
                    }
                }).then(response=>{
                    //this.userList=response.data.result.list;
                    this.diseaseAnswerList=response.data.result.list;
                    this.total=Number(response.data.result.total);
                    console.log("这是默认的病症解答接口的数据:"+response.data.result.list)
                    this.createtime=response.data.result.createtime;
                    // this.mytime=this.createtime.toLocaleString();
                    this.createtime=this.createtime;
                    // console.log(res)

                    var   unixTimestamp = new Date(this.createtime*1000) ;
                    var  commonTime = unixTimestamp.toLocaleString();
                    // alert(commonTime);
                    // this.$refs.creatTime.innerHTML=commonTime;
                    this.scope.row.createtime=commonTime;
                    console.log(response);

                })
            },
            searching(){
                let input1=this.input1;
                this.getDiseaseAnswerList(input1);
            },

            toAddPage(){
                this.$router.push("/home/healthcenter/healthcenterAdd")
            },
            addNew()
            {
               this.$router.push("/home/expertManager/diseaseAnswerAdd");
            },
            editOpen(row)
            {
               // this.$router.push("/home/expertManager/diseaseAnswerEdit");

                this.$router.push({
                    name: 'diseaseAnswerEdit',
                    params: {
                        id:row.id,
                        title:row.title,
                        answer:row.answer,
                        name:row.name,//症状的分类中文名称
                        type:row.type //症状分类的id
                    }
                })


            },
            detailOpen(row)
            {

              // this.$router.push("/home/expertManager/diseaseAnswerDetail");
              //   this.$router.push(
              //          {
              //           name:'diseaseAnswerDetail',
              //          params:{
              //           id:row.id
              //          }})
            },

            detailOpen(row){
               // console.log("去详情页面");
                // this.$router.push('/commentdetail/'+row.id)
                //this.$router.push('/home/notification/notificationDetail/'+row.id);
                this.$router.push({
                    name: 'diseaseAnswerDetail',
                    params: {
                        id:row.id,
                        title:row.title,
                        answer:row.answer,
                        type:row.type,
                        status:row.status,
                        updatetime:row.updatetime,
                        createtime:row.createtime,
                        name:row.name,
                        aname:row.aname
                    }
                })
                console.log(row.id);
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
                    this.$http.get('/admin/symptom/del',{
                        params:{
                            token,
                            apitype:1,
                            id:deleteid
                        }
                    }).then(res=>{
                        // console.log('删除',res)
                        console.log(res);
                        if(res.data.status==1){
                            this.$message.success('删除症状成功!');
                            console.log("此处语句被执行了!");
                            this.getDiseaseAnswerList();
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
            }

        },
        created()
        {
            this.getDiseaseAnswerList();
        }
    };
</script>

<style lang="less">
    .search input {
        /* width: 600px; */
        margin-left: 95px;
        border:1px solid #009397;
    }
    .mydiseaseanswerContainer table .cell
    {
        height:50px;
        text-overflow:ellipsis;
        white-space:nowrap;
        overflow:hidden;
        line-height:50px;
        overflow:hidden;
    }
    .mydiseaseanswerContainer
    {
        &::-webkit-scrollbar
        {
            display:none;
        }
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
