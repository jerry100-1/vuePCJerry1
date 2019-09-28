<template>
    <div class="healthcenter-container myexpertListcontainer">
        <div class="search">
            <el-input style="width:700px;" v-model="input" placeholder="可搜索姓名"></el-input>
            <el-button class="btnSearch" @click="searching" type="primary" style="margin-left:120px!important;">搜索</el-button>
            <el-button type="primary" @click="toAddPage">新增</el-button>
        </div>
        <!-- 表格数据 -->
        <!--<el-table :data="expertList.slice((currentPage-1)*pagesize,currentPage*pagesize)"-->
            <el-table :data="expertList.slice((currentPage-1)*pagesize,currentPage*pagesize)"
                  stripe
                  style="width:100%;padding-left:0px;" id="elTable">
            <el-table-column  label="头像">

                <template slot-scope="scope">
                    <!--<span>{{scope.row.title}}</span>-->
                    <img class="slotImg" :src="scope.row.avatar" alt="">
                </template>
            </el-table-column>
            <el-table-column  label="专家姓名">
                <template slot-scope="scope">
                    <span>{{scope.row.name}}</span>
                </template>
            </el-table-column>
            <el-table-column label="所在卫生所">
                <template slot-scope="scope">
                    <span>{{scope.row.title}}</span>
                </template>
            </el-table-column>
            <el-table-column label="在线时间">
                <template slot-scope="scope">
                    <span>{{scope.row.worktime}}</span>
                </template>
            </el-table-column>
            <el-table-column label="专家介绍" width="168">
                <template slot-scope="scope" class="kkSpanText">
                    <span>{{scope.row.introduce}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="operatetime" label="操作时间">
                <template slot-scope="scope">
                    <span>{{scope.row.updatetime}}</span>
                </template>
            </el-table-column>

            <el-table-column prop="" label="操作" width="145">
                <template slot-scope="scope">
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

            <div class="page">
                <el-pagination
                        @size-change="handleSizeChange"
                        background
                        @current-change="handleCurrentChange"
                        :current-page="currentPage"
                        :page-sizes="[100, 200, 300, 400]"
                        :page-size="pagesize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total">
                </el-pagination>
            </div>


    </div>
</template>

<script>
    import eventVue from '../../../../eventVue.js'
    export default {
        name: "expertList",
        data() {
            return {
                name:"", //    每页的数据
                introduce:"",
                total:"",
                sday:"",
                eday :"",
                shour:"",
                input:"",
                ehour:"",
                type:"",
                cid:"",
                avatar:"",
                sort:"",
                keyword:"",
                title:"",
                mid:"",
                asknum:"",
                input: "",
                //   表格数据
                tableData: [{
                    portrait: '',
                    expertname: '马春梅',
                    healthcentername: '四川省攀枝花市东区红星社区卫生服务中心',
                    onlinetime:'17:00-22:00(周一至周日)',
                    expertdescription:'主治医师,拥有15年儿童保健健康...',
                    operatetime:'1998.12.12'
                }
                ],
                pagesize:4,
                expertList:[],
                total:0,
                currentPage:1,
            };
        },
        methods: {
            //表格
            // handleSizeChange(val) {
            //     console.log(`每页 ${val} 条`);
            // },
            getExpertList(keyword=''){
                let token=localStorage.getItem('token');

                this.$http.get('/admin/expert/getlistWeb',{
                    params:{
                        token,
                        apitype:1,
                        page:1,
                        limit:100,
                        keyword
                    }
                }).then(response=>{
                    this.expertList=response.data.result.list;
                    this.total=parseInt(response.data.result.total);
                })
            },
            //搜索
            searching(){
                let input=this.input;
                this.getuserList(input);
            },

            toAddPage(){
                this.$router.push("/home/expertManager/expertListAdd")
            },

            editOpen(row)
            {
                console.log("即将进入编辑界面....")
                console.log(row.name);
                console.log(row.introduce);
                console.log(row.sday);
                console.log(row.eday);
                console.log(row.shour);
                console.log(row.ehour);
                console.log(row.cid);
                console.log(row.avatar);
                console.log(row.sort);
                console.log(row.title);
                console.log(row.asknum);
                console.log(row.mid);
                console.log("即将进入编辑界面....")
                //向编辑页面传值

                //传递一周开始的具体时间过去
                eventVue.$emit("editData1",row.shour);
                // //传递一周结束的具体时间过去
                eventVue.$emit("editData2",row.ehour);
                // /传递一周开始的星期几过去
                eventVue.$emit("editData3",row.sday);
                // /传递一周结束的星期几过去
                eventVue.$emit("editData4",row.eday);
                // /传递诊所地址id
                eventVue.$emit("editData5",row.cid);
                //传递专家类型
                // eventVue.$emit("editData6",this.innocutionTypeIndex);
                eventVue.$emit("editData6",row.mid);
                //传递专家姓名
                eventVue.$emit("editData7",row.name);
                //传递专家简介
                eventVue.$emit("editData8",row.introduce);
                //传递图像路径
                eventVue.$emit("editData9",row.avatar);
                //传递排序序号
                eventVue.$emit("editData10",row.sort);
                //传递每天问询人数
                eventVue.$emit("editData11",row.asknum);
                eventVue.$emit("editData12",row.type);

               // this.$router.push("/home/expertManager/expertListEdit");

                this.$router.push({name:'expertListEdit',
                    params:{
                        id:row.id,
                        shour:row.shour,
                        ehour:row.ehour,
                        sday:row.sday,
                        eday:row.eday,
                        cid:row.cid,
                        name:row.name,
                        mid:row.mid,
                        introduce:row.introduce,
                        avatar:row.avatar,
                        sort:row.sort,
                        type:row.type,
                        asknum:row.asknum
                     }})

            },
            handleEdit(index, row) {

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
                    this.$http.get('/admin/expert/del',{
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
                            this.getExpertList();
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
            handleCurrentChange(val) {
                // console.log(`当前页: ${val}`);
                this.currentPage = val
                this.getExpertList()
            },
            // 换页
           /* handleCurrentChange(currentPage) {
                // console.log(`当前页: ${val}`);
                this.currentPage = currentPage;
                this.getExpertList()
            },*/
            handleSizeChange:function (size) {
                this.pagesize = size;
               // this.getExpertList();
                console.log(this.pagesize)  //每页下拉显示数据
            },
            // handleCurrentChange:function(currentPage){
            //     this.currentPage = currentPage;
            //     console.log(this.currentPage)  //点击第几页
            // },

        },
        mounted()
        {
           // this.getExpertList();
        },
        created()
        {
            this.getExpertList();
            //this.handleCurrentChange(val);
        }
    };
</script>

<style lang="less">
    #elTable td
    {
       padding:5px 0!important;
    }

    img.slotImg
    {
        width:60px;
        height:60px;
        border-radius:50%;
    }
    .kkSpanText
    {
        text-overflow:ellipsis;
        white-space:nowrap;
        overflow:hidden;
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
        min-height:1200px!important;
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
  /*table td{*/
      /*height:20px;*/
      /*overflow:hidden;*/
  /*}*/
    el-table th{
        text-align: center;
        font-size: 16px;
        color: #000;
        font-weight: bold;
        background-color: #F5F5F5;
    }
    .myexpertListcontainer table td
    {
        height:50px!important;
        overflow:hidden;
    }


</style>
