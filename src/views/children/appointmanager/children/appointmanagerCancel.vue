<template>
    <div class="articleList-container myappointcontainer" style="overflow-y:auto!important;max-height:940px;">
        <div class="articleList-main">
            <div class="block" style="padding-left:0px!important;">

                <div class="wraphead" id="kkoo1" style="width:1500px;height:54px;">

                    <el-date-picker
                            id="newelement1"
                            v-model="starttime"
                            type="datetime"
                            style="margin-left:40px;float:left;margin-top:30px;"
                            placeholder="开始时间"
                            value-format="yyyy-MM-dd HH:mm"
                            :picker-options="pickerOptions3">
                    </el-date-picker>

                    <el-date-picker
                            id="newelement2"
                            v-model="endtime"
                            type="datetime"
                            style="margin-left:20px!important;margin-top:30px;float:left"
                            value-format="yyyy-MM-dd HH:mm"
                            placeholder="结束时间"
                            :picker-options="pickerOptions3">
                    </el-date-picker>



                    <el-select id="newelement3" v-model="region" style="margin-top:30px;float:left;margin-left:20px;" placeholder="请选择卫生所">
                        <el-option
                                v-for="item in allClinicList"
                                :key="item.id" prop="itemId"
                                :label="item.address"
                                :value="item.id"
                                :disabled="item.disabled">
                        </el-option>
                    </el-select>

                    <el-input v-model="input1"  id="newelement4" style="float:left;border-radius:3px;outline:none;margin-left:50px;border-color:#009397;width:400px;margin-top:30px;" placeholder="可搜索课程名称"></el-input>

                    <el-button type="primary" @click="search" placeholder="可搜索预约人姓名" id="btnSearch9" style="margin-top:30px;margin-left:20px;width:80px;">搜索</el-button>

                </div>

                <keep-alive>
                        <el-row class="wrpaAllBtn"  style="float:left">


                            <el-button type="primary" @click="goWait" style="border-color:rgba(0,0,0,0.36)!important;margin-left:20px;" id="btnSmall2">已作废</el-button>

                            <el-button type="primary"  style="" @click="goList" id="btnSmall1">排队中</el-button>

                            <el-button type="primary" style="border-color:rgba(0,0,0,0.36)!important;" @click="goNumber" id="btnSmall3">已叫号 </el-button>

                            <el-button  @click="goNumber" id="btnSmall8" style="line-height:0px;background:none!important;border:1px solid #00d3c2!important;color:#00d3c2;">已取消</el-button>

                            <el-button  @click="goFinishPage" id="btnSmall9" style="line-height:0px;background:none!important">已完成</el-button>

                        </el-row>
                    </keep-alive>

                <el-table :data="appointmentList.slice((currentPage-1)*pagesize,currentPage*pagesize)" stripe  style="width:100%;padding-left:0px;">
                    <el-table-column prop="serial" label="序号">
                        <template slot-scope="scope">
                            <span>{{scope.row.id}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="预约人姓名">
                        <template slot-scope="scope">
                            <span>{{scope.row.realname}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column  label="预约项目">
                        <template slot-scope="scope">
                            <span>{{scope.row.typeText}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="预约时间">
                        <template slot-scope="scope">
                            <span>{{scope.row.bespeaktimeText}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="排号">
                        <template slot-scope="scope">
                            <span>{{scope.row.number}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="状态">
                        <template slot-scope="scope">
                            <span>{{scope.row.statusText}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="预约卫生所">
                        <template slot-scope="scope">
                            <span>{{scope.row.title}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="300">
                        <template slot-scope="scope">
                            <el-button style="background:#009397;color:#fff;border:none;border-radius:3px;"
                                       size="mini"
                                       type="danger"  @click="goDetail(scope.row)"

                            >详情</el-button>


                        </template>
                    </el-table-column>
                </el-table>

                <div class="page mypage1">
                    <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="currentPage"
                            :page-size="pagesize"
                            layout="total, sizes, prev, pager, next, jumper"
                            :page-sizes="[5, 10,15,20,25,30]"
                            :total="total">
                    </el-pagination>
                </div>


            </div>
        </div>
    </div>
</template>

<script>
    import BScroll from 'better-scroll'
    export default {
        name:'appointmanagerCancel',
        data() {
            return {
                //输入框
                input:'',
                value2:"",
                starttime:"",
                endtime:"",
                region:"",
                input1:"",
                length:0,
                keyword:"",
                bestate:4,
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

                value5: '100',
                appointmentList:[],
                region: '',
                allClinicList:[],
                pagesize:5,
                orderList:[],
                total:0,
                pickerOptions3: {
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
            goList()
            {
              this.$router.push("/home/appointmanager/appointmanagerList");
            },
            goCancelPage()
            {
                this.$router.push("/home/appointmanager/appointmanagerCancel");
            },
            goFinishPage()
            {
                this.$router.push("/home/appointmanager/appointmanagerFinish");
            },
            //获取所有卫生所
            getAllClinicList(){
                let token=localStorage.getItem('token');
                this.$http.get('/admin/clinic/allList',{
                    params:{
                        token,
                        apitype:1
                    }
                }).then(response=>{
                    console.log("请求所有诊所数据开始...")
                    console.log(response);
                    //this.userList=response.data.result.list;
                    //获取全国省区数据;
                    this.allClinicList=response.data.result.list;
                    //this.code=response.data.result.list.
                    //this.id=response.data.list.id;
                    console.log("请求到的所有诊所地址的数据是:")
                    console.log(response);

                })
            },

            //跳转详情页
            getAppointmentList(keyword='',starttime='',endtime=''){
                let token=localStorage.getItem('token');
                this.$http.get('/admin/bespeak/getlist',{
                    params:{
                        token,
                        page:1,
                        limit:100,
                        bestate:4,
                        apitype:1,
                        keyword,
                        bestate:4,
                        starttime,
                        endtime,
                    }
                }).then(response=>{
                    //this.userList=response.data.result.list;
                    //this.id=response.data.result.list.id;
                    console.log("请求预约数据开始...");
                    console.log(response);
                    this.appointmentList=response.data.result.list;
                    console.log("此页面接收的所有总数是:"+response.data.result.total);
                    this.total=Number(response.data.result.total);

                    // this.appointmentList.filter(item => item.statusText=="已取消" );
                    // this.appointmentList=this.appointmentList.filter(item => item.statusText=="已取消" );
                    // // Vue.$set(this.orderList);
                    // //  alert("当前的数组的长度是"+this.orderList.length);
                    // this.length=this.appointmentList.length;
                    // console.log("这是过滤后的数据:"+this.appointmentList.filter(item => item.statusText=="排队中" ))

                })
            },
            search()
            {

                // //开始时间的年月日时分秒
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
                let starttime=this.starttime;
                let endtime=this.endtime;
                let bestate=this.bestate;
                // let region=this.region;

                this.getAppointmentList(keyword,starttime,endtime,bestate);
            },
            goWait()
            {
                this.$router.push("/home/appointmanager/appointmanagerWait");
            },
            goNumber()
            {
                this.$router.push("/home/appointmanager/appointmanagerNumber");
            },
            handleDelete(index, row) {
                console.log(index, row);
            },
            goDetail(row)
            {
                // this.$router.push("/home/appointmanager/appointmanagerDetail")


                this.$router.push({
                    name: 'appointmanagerDetail',
                    params: {
                        id:row.id,
                        path:this.$route.fullPath
                    }
                })

            },
            //分页
            handleCurrentChange(val)
            {
                this.currentPage=val;
                // this.getOrderList();
            },
            handleSizeChange:function (size) {
                this.pagesize = size;
                this.getExpertList();
                console.log(this.pagesize)  //每页下拉显示数据
            },

        },
        mounted()
        {

        },
        created()
        {
            this.getAppointmentList();
            this.getAllClinicList();
        }
    }
</script>

<style lang="less">
    *
    {
        margin:0px;
        padding:0px;
    }
    .myappointcontainer .el-table .cell
    {
        height:35px!important;
        line-height:35px;
        text-overflow:ellipsis;
        white-space:nowrap;
        overflow:hidden;
        overflow-y:auto;
    }
    .myappointcontainer
    {
        height:auto!important;
        overflow:hidden;
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

    .el-table th>.cell {
        color:#000;
        font-weight:bold;
    }
    .el-button--primary {
        color: #FFF;
        background-color: #009397 !important;
    }
    #btnSmall1
    {
        margin-left:10px;
        margin-top:40px;
        background:none!important;
        color:#00d3c2;
        border:1px solid #00d3c2;
        height:24px;
        line-height:0px;
    }
    .wrpaAllBtn el-button
    {
        height:24px!important;
        line-height:24px!important;
    }
    .wrpaAllBtn #btnSmall8,.wrpaAllBtn #btnSmall9,
    .wrpaAllBtn .el-button--primary
    {
        background:none!important;
        border:none!important;
        color:rgba(0,0,0,0.36);
        border:1px solid rgba(0,0,0,0.36)!important;
    }
    .wrpaAllBtn #btnSmall8
    {
        outline:none;
    }
    #btnSmall2,#btnSmall3，#btnSmall8，btnSmall9
    {
        background:none!important;
        height:24px!important;
        line-height:0px!important;
        background:none!important;
        color:rgba(0,0,0,0.36);
        border:1px solid rgba(0,0,0,0.36);
    }
    #btnSearch9
    {
        margin-left:90px;
    }

    .wrpaAllBtn
    {
        margin-left:30px!important;
    }
    #el-sel1,#input1
    {
        margin-left:20px;
        margin-right:20px;
    }

    .el-button--primary {
        color: #FFF;
        background-color: #009397 !important;
        border-color: #409EFF !important;
    }
    .link1
    {
        margin-left:50px !important;
        margin-top:30px;
        width:100%;
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
    .el-table th
    {
        font-weight:bold;
        color:#000;
    }
    #btnSearch4
    {
        background:#009397 !important;
        margin-left:20px;
    }
    .el-table{
        margin-top:30px;
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
            .mypage1
            {
                padding-top:0px!important;
                margin-top:-40px!important;
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

