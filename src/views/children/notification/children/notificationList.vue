<template>
    <div class="articleList-container mynotificationcontainer" style="overflow-y:auto!important;max-height:940px;">
        <div class="articleList-main">
            <div class="block" style="padding-left:0px!important;width:1667px;">

                <div class="wraphead" id="kkoo1" style="width:1200px;height:54px;margin-bottom:50px;">
                    <!--<el-date-picker-->
                            <!--id="newelement1"-->
                            <!--v-model="starttime"-->
                            <!--type="date" style="margin-left:40px;float:left;margin-top:30px;"-->
                            <!--popper-class-->
                            <!--placeholder="开始时间"-->
                            <!--format="yyyy 年 MM 月 dd 日"-->
                            <!--value-format="yyyy-MM-dd"-->
                    <!--&gt;-->
                        <!--<i class="iconfont icon-location"></i>-->
                    <!--</el-date-picker>-->



                    <el-date-picker
                            id="newelement1"
                            v-model="starttime"
                            type="datetime"
                            style="margin-left:40px;float:left;margin-top:30px;"
                            placeholder="开始时间"
                            value-format="yyyy-MM-dd HH:mm"
                            :picker-options="pickerOptions4">
                    </el-date-picker>






                    <el-date-picker
                            id="newelement1"
                            v-model="endtime"
                            type="datetime"
                            style="margin-left:20px!important;margin-top:30px;float:left"
                            placeholder="结束时间"
                            value-format="yyyy-MM-dd HH:mm"
                            :picker-options="pickerOptions4">
                    </el-date-picker>


                    <el-input v-model="input1"  id="newelement4"placeholder="可搜索消息标题名或者消息详情" style="float:left;border-radius:3px;outline:none;margin-left:50px;border-color:#009397;width:400px;margin-top:30px;"></el-input>

                    <el-button type="primary" @click="search"  id="btnSearch9" style="margin-top:30px;margin-left:30px;width:80px;">搜索</el-button>

                    <el-button type="primary" id="btnSearch10" style="margin-left:60px;margin-left:30px;" @click="goAddPage">新增</el-button>



                </div>



                <el-table :data="notiList.slice((currentPage-1)*pagesize,currentPage*pagesize)" stripe  style="width: 100%;padding-left:0px;">

                    <el-table-column prop="title" label="通知名称" width="180">
                        <template slot-scope="scope">
                            <span>{{scope.row.title}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="state" label="状态">
                        <template slot-scope="scope">
                            <!--<span>{{scope.row.status}}</span>-->
                            <span type="text"  v-if="scope.row.status==1">显示</span>
                            <span type="text"  v-if="scope.row.status==-1">隐藏</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="createtime" label="修改时间">
                        <template slot-scope="scope">
                            <!--<span>{{new Date(scope.row.createtime*1000).toLocaleString()}}</span>-->
                            <span>{{scope.row.createtime_text}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="300">
                        <template slot-scope="scope">
                            <el-button style="background:#009397;color:#fff;border:none;border-radius:3px;"
                                       size="mini"
                                       type="danger" @click="toCheck(scope.row)"
                            >查看</el-button>


                            <el-button style="background:#009397;color:#fff;border:none;border-radius:3px;"
                                       size="mini"
                                       type="danger"  @click="deletelevel(scope.row)"
                            >删除</el-button>

                            <el-button style="background:#009397;color:#fff;border:none;border-radius:3px;"
                                       size="mini"
                                       type="danger"
                                       @click="toEdit(scope.row)">编辑</el-button>

                        </template>
                    </el-table-column>
                </el-table>

                <div class="page">
                    <el-pagination
                            @size-change="handleSizeChange"
                            background
                            @current-change="handleCurrentChange"
                            :current-page="currentPage"
                            :page-sizes="[5,10,15,20,25,30]"
                            :page-size="pagesize"
                            layout="total,sizes, prev, pager, next, jumper"
                            :total="total">
                    </el-pagination>
                </div>


            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name:'notificationList',
        data() {
            return {
                //输入框
                input:'',
                value1:"",
                value2:"",
                limit:"",
                page:"",
                id:"",
                title:"",
                detail:"",
                status:"",
                input1:"",
                keyword:"",
                total:0,
                starttime:"",
                endtime:"",
                eleme1:0,
                eleme2:0,
                eleme3:0,
                eleme4:0,
                eleme5:0,
                eleme6:0,
                eleme7:0,
                eleme8:0,
                eleme9:0,
                eleme10:0,
                eleme11:0,
                eleme12:0,
                unixTimestamp:"",
                commonTime:"",
                notiList:[],
                pagesize:5,
                pickerOptions4: {
                    shortcuts: [{
                        text: '今天',
                        onClick(picker) {
                            picker.$emit('pick', new Date());
                        }
                    }, {
                        text: '昨天',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24);
                            picker.$emit('pick', date);
                        }
                    }, {
                        text: '一周前',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', date);
                        }
                    }]
                },
                currentPage:1,
                tableData: [{
                    serial: '1',
                    articleName: '家长想知道的疫苗相关问题,都在这四个动画里!',
                    state: '显示',
                    time:'2019.12.12 12.22'
                }
                ]
            };
        },
        methods: {

            getNotificationList(keyword = '', starttime = '', endtime = '') {
                let token = localStorage.getItem('token');
                this.$http.get('/admin/Notice/index', {
                    params: {
                        token,
                        page: 1,
                        limit:100,
                        apitype: 1,
                        keyword,
                        starttime,
                        endtime
                    }
                }).then(response => {
                    //this.userList=response.data.result.list;
                    this.notiList = response.data.result.list;

                    console.log("你好,这是通知接口返回的所有数据"+response);


                    this.total = Number(response.data.result.total);
                    this.id = response.data.result.list.id;
                    this.createtime = response.data.result.createtime;
                    //this.createtime_text=response.data.result.createtime_text;
                    this.type = response.data.result.type;
                  //  this.status = response.data.result.status;

                    console.log(response);
                    console.log("状态为:" + this.status);


                    this.createtime = response.data.result.createtime;
                    // this.mytime=this.createtime.toLocaleString();
                    this.createtime = this.createtime;
                    // console.log(res)

                    var unixTimestamp = new Date(this.createtime * 1000);
                    var commonTime = unixTimestamp.toLocaleString();
                    // alert(commonTime);
                    // this.$refs.creatTime.innerHTML=commonTime;
                    this.scope.row.createtime = commonTime;

                    console.log(response);

                })
            },

            search() {
                // let keyword = this.input1;
                // let starttime = this.starttime;
                // let endtime = this.endtime;
                //开始时间的年月日时分秒
                // this.eleme1=parseInt(this.starttime.getFullYear());
                // this.eleme2=parseInt(this.starttime.getMonth()+1);
                // this.eleme3=parseInt(this.starttime.getDate());
                // this.eleme4=parseInt(this.starttime.getHours());
                // this.eleme5=parseInt(this.starttime.getMinutes());
                // this.eleme6=parseInt(this.starttime.getSeconds());
                // console.log("您传入的开始时间的年份是:"+this.eleme1);
                // console.log("您传入的开始时间的月份是:"+(this.eleme2< 10 ? ("0"+this.eleme2):this.eleme2));
                // console.log("您传入的开始时间的天数是:"+(this.eleme3< 10 ? ("0"+this.eleme3):this.eleme3));
                // console.log("您传入的开始时间的小时是:"+(this.eleme4< 10 ? ("0"+this.eleme4):this.eleme4));
                // console.log("您传入的开始时间的分钟是:"+(this.eleme5< 10 ? ("0"+this.eleme5):this.eleme5));
                // console.log("您传入的开始时间的秒数是:"+(this.eleme6< 10 ? ("0"+this.eleme6):this.eleme6));
                // //结束时间的年月日时分秒
                // this.eleme7=parseInt(this.endtime.getFullYear());
                //
                // console.log("什么鬼"+this.eleme7);
                // this.eleme8=parseInt(this.endtime.getMonth()+1);
                // this.eleme9=parseInt(this.endtime.getDate());
                // this.eleme10=parseInt(this.endtime.getHours());
                // this.eleme11=parseInt(this.endtime.getMinutes());
                // this.eleme12=parseInt(this.endtime.getSeconds());
                // console.log("您传入的结束时间的年份是:"+this.eleme7);
                // console.log("您传入的结束时间的月份是:"+(this.eleme8< 10 ? ("0"+this.eleme8):this.eleme8));
                // console.log("您传入的结束时间的天数是:"+(this.eleme9< 10 ? ("0"+this.eleme9):this.eleme9));
                // console.log("您传入的结束时间的小时是:"+(this.eleme10< 10 ? ("0"+this.eleme10):this.eleme10));
                // console.log("您传入的结束时间的分钟是:"+(this.eleme11< 10 ? ("0"+this.eleme11):this.eleme11));
                // console.log("您传入的结束时间的秒数是:"+(this.eleme12< 10 ? ("0"+this.eleme12):this.eleme12));
                // // let starttime=this.starttime;
                // let starttime=this.eleme1+"-"+(this.eleme2< 10 ? ("0"+this.eleme2):this.eleme2)+"-"+(this.eleme3< 10 ? ("0"+this.eleme3):this.eleme3)+" "+(this.eleme4< 10 ? ("0"+this.eleme4):this.eleme4)+":"+(this.eleme5< 10 ? ("0"+this.eleme5):this.eleme5)+":"+(this.eleme6< 10 ? ("0"+this.eleme6):this.eleme6);
                // console.log("传入的开始时间转化为"+starttime);
                // let endtime=this.eleme7+"-"+(this.eleme8< 10 ? ("0"+this.eleme8):this.eleme8)+"-"+(this.eleme9< 10 ? ("0"+this.eleme9):this.eleme9)+" "+(this.eleme10< 10 ? ("0"+this.eleme10):this.eleme10)+":"+(this.eleme11< 10 ? ("0"+this.eleme11):this.eleme11)+":"+(this.eleme12< 10 ? ("0"+this.eleme12):this.eleme12);
                // console.log("传入的结束时间转化为"+endtime);


                 let keyword=this.input1;
                 let starttime = this.starttime;
                 let endtime = this.endtime;
                this.getNotificationList(keyword, starttime, endtime)
            },
            goAddPage()
            {
              this.$router.push("/home/notification/notificationAdd") ;
            },
            toCheck(row){
                console.log("测试开始");
                // this.$router.push('/commentdetail/'+row.id)
                //this.$router.push('/home/notification/notificationDetail/'+row.id);

                this.$router.push({
                    name: 'notificationDetail',
                    params: {
                        id:row.id
                    }
                })

                // this.$router.push({
                //     name: 'notificationDetail',
                //     params: {
                //         id: row.id
                //     }
                // })
                console.log(row.id);
            },

            toEdit(row){
                console.log("去编辑页面");
                // this.$router.push('/commentdetail/'+row.id)
                //this.$router.push('/home/notification/notificationDetail/'+row.id);

                //alert("当前的状态是"+row.status);

                this.$router.push({
                    name: 'notificationEdit',
                    params: {
                        id:row.id,
                        title:row.title,
                        detail:row.detail,
                        status:row.status
                    }
                })

                // this.$router.push({
                //     name: 'notificationDetail',
                //     params: {
                //         id: row.id
                //     }
                // })
                console.log(row.id);
            },
            handleCurrentChange(val) {
                // console.log(`当前页: ${val}`);
                this.currentPage = val
                this.getNotificationList()
            },
            handleSizeChange(size) {
                this.pagesize = size;
                this.getNotificationList();
                console.log(this.pagesize)  //每页下拉显示数据
            },
            //调用后台删除接口
            // 删除按钮
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
                    this.$http.get('/admin/notice/webDel',{
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
                            this.getNotificationList();
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

            },

        },
        mounted()
        {
          this.getNotificationList();
        },
        created()
        {
            this.getNotificationList();
        }
    }
</script>

<style lang="less">
    .mynotificationcontainer .el-table .cell
    {
        height:40px!important;
        line-height:40px;
        text-overflow:ellipsis;
        white-space:nowrap;
        overflow:hidden;
    }
    .mynotificationcontainer
    {
        &::-webkit-scrollbar {
            display: none;
        }
    }

    #newelement1,#newelement2,#newelement3
    {
        border:1px solid #009397;
    }
    #newelement4
    {
        border-color:#009397!important;
    }


    #date1,#date2,#input1
    {
        border:1px solid #009397;
    }
    .el-button--primary {
        color: #FFF;
        background-color: #009397 !important;
        border-color: #409EFF !important;
    }
    .link1
    {
        margin-left:50px !important;
    }
    #btnSearch3
    {
        background:#009397 !important;margin-left:20px;
    }
    .el-table th.is-leaf {
        border-bottom: 1px solid #EBEEF5;
        background:#f2f2f2;
    }
    .el-table .cell {
        text-align:center;
    }
    #btnSearch4
    {
        background:#009397 !important;
        margin-left:20px;
    }
    .el-table{
        margin-top:30px;
        padding-left:20px;
    }
    table th{
        text-align:center;
        background:#f2f2f2;
        height:70px;
    }
    .articleList-main
    {
        padding-top:80px;
    }
    .articleList-container {
        height: 900px;
        .articleList-main {
            .page{
                text-align: center;
                padding-top: 50px
            }

        }
    }
    .tableRowClassName
    {
        border-bottom:none;
    }
    .el-table .warning-row {
        background:#fff;
    }
    .el-table .success-row {
        background:#f2f2f2;
    }
    table{
        text-align:center;
    }
    table th{
        text-align:center;
    }
    .el-button--primary {
        color: #FFF;
        background-color: #009397;
        border-color: #009397;
    }
    .el-button
    {
        background:#009397;
    }
    .el-button-danger {
        color: #FFF;
        background:#009397;
        border-color: #F56C6C;
    }
</style>

