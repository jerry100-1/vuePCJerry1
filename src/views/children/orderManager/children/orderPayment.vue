<template>
    <div class="articleList-container myordercontainer" style="overflow-y:auto!important;max-height:940px;">
        <div class="articleList-main">
            <div class="block" style="padding-left:0px!important;">


                <div class="wraphead" id="kkoo1" style="width:1500px;height:54px;margin-bottom:40px;">
                    <el-date-picker
                            id="newelement1"
                            v-model="starttime"
                            type="datetime"
                            style="margin-left:40px;float:left;margin-top:30px;"
                            placeholder="开始时间"
                            value-format="yyyy-MM-dd HH:mm"
                            :picker-options="pickerOptions1">
                    </el-date-picker>


                    <el-date-picker
                            id="newelement2"
                            v-model="endtime"
                            style="margin-left:20px!important;margin-top:30px;float:left"
                            type="datetime"
                            value-format="yyyy-MM-dd HH:mm"
                            placeholder="结束时间"
                            :picker-options="pickerOptions2">
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

                    <el-input v-model="input1"  id="newelement4" style="float:left;border-radius:3px;outline:none;margin-left:50px;border-color:#009397;width:400px;margin-top:30px;" placeholder="可搜索商品名称或商家名称"></el-input>

                    <el-button type="primary" @click="search" id="btnSearch9" style="margin-top:30px;margin-left:20px;width:80px;">搜索</el-button>

                </div>


                <el-table  :data="orderList.slice((currentPage-1)*pagesize,currentPage*pagesize)"  stripe  style="width:100%;padding-left:0px;" :cell-style="cellStyle">
                    <el-table-column prop="goodsname" label="商品名称">
                        <template slot-scope="scope">
                            <span>{{scope.row.title}}</span>
                        </template>

                    </el-table-column>
                    <el-table-column prop="goodsnum" label="数量">
                        <template slot-scope="scope">
                            <span>{{scope.row.number}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="买家">
                        <template slot-scope="scope">
                            <span>{{scope.row.realname}}</span>
                        </template>

                    </el-table-column>
                    <el-table-column prop="payway" label="支付方式">
                        <template slot-scope="scope">
                            <span>{{scope.row.paytypeText}}</span>
                        </template>

                    </el-table-column>
                    <el-table-column prop="price" label="价格">
                        <template slot-scope="scope">
                            <span>{{scope.row.money}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="state"   class="waitopay"  label="状态">
                        <template slot-scope="scope">
                            <span :class="{yellow:scope.row.statusText==='未付款',grey:scope.row.statusText === '已取消',green:scope.row.statusText === '已付款',red:scope.row.statusText === '退款申请中'}">
                                {{scope.row.statusText}}
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column  label="订单编号">
                        <template slot-scope="scope">
                            <span>{{scope.row.ordersn}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="ordertime" label="下单时间">
                        <template slot-scope="scope">
                            <span>{{scope.row.createtimeText}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="ordertotal" label="订单总额">
                        <template slot-scope="scope">
                            <span>{{scope.row.money}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="actualpayment" label="订单实际支付金额">
                        <template slot-scope="scope">
                            <span>{{scope.row.paymoney}}</span>
                        </template>
                    </el-table-column>
                </el-table>

                <div class="page">
                    <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="currentPage"
                            :page-size="pagesize"
                            layout="total, sizes, prev, pager, next, jumper"
                            :page-sizes="[5, 10, 15, 20,25,30]"
                            :total="length">
                    </el-pagination>
                </div>


            </div>
        </div>
    </div>
</template>

<script>
    import BScroll from 'better-scroll'
    export default {
        name:'orderPayment',
        data() {
            return {
                //输入框
                input:'',
                value1:"",
                blue:"blue",
                red:"red",
                grey:"grey",
                value2:"",
                input1:"",
                keyword:"",
                value5:'100',
                allClinicList:[],
                starttime:"",
                endtime:"",
                region: '',
                length:0,
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
                pagesize:5,
                orderList:[],
                total:0,
                currentPage:1,
                myList:[],

                pickerOptions1: {
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



                pickerOptions2: {
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


                tableData: [{
                    goodsname: '乙肝疫苗',
                    goodsnum: '20',
                    buyer: '张三',
                    payway:'微信',
                    price:"100.00",
                    state:"待付款",
                    orderid:"0100212121132432",
                    ordertime:"2019-3-10",
                    ordertotal:"2000",
                    actualpayment:"2000"
                }
                ]
            };
        },
        // filterHandler(value, row, column) {
        //     const property = row.statusText;
        //     return row[property] === "已取消";
        // },

        methods: {
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
            getOrderList(keyword='',starttime='',endtime='',region=""){
                let token=localStorage.getItem('token');
                this.$http.get('/admin/orders/getlist',{
                    params:{
                        token,
                        page:1,
                        limit:100,
                        apitype:1,
                        keyword,
                        starttime,
                        endtime,
                        region

                    }
                }).then(response=>{
                    //this.userList=response.data.result.list;
                    //this.id=response.data.result.list.id;
                    console.log("请求订单列表数据开始...");
                    console.log(response);
                    // this.total=response.data.result.list.total;
                    // this.total = Number(response.data.result.total)
                    console.log("总数为:"+ this.total );

                    // this.total=Number(this.orderList.length);
                    // response.data.result.list.filter(item => item.statusText=="已付款")
                    this.orderList=response.data.result.list;

                    // var newarr = [
                    //     { num: 1, val: 'ceshi', flag: 'aa' },
                    //     { num: 2, val: 'ceshi2', flag: 'aa2'  }
                    // ]
                    this.total=Number(response.data.result.total);
                    this.orderList= response.data.result.list;
                    // console.log(this.orderList.filter(item => item.num!=2 ))
                    // // this.orderList=this.orderList.filter(item => item.statusText="未付款" );
                    // // this.total=Number(this.orderList.length);
                    // this.orderList.filter(item => item.statusText!="未付款" )
                    this.orderList.filter(item => item.statusText=="已付款" );
                    this.orderList=this.orderList.filter(item => item.statusText=="已付款" );
                    // Vue.$set(this.orderList);
                    //  alert("当前的数组的长度是"+this.orderList.length);
                    this.length=this.orderList.length;
                    console.log("这是过滤后的数据:"+this.orderList.filter(item => item.statusText=="已付款" ))
                    //  this.orderList.map(item => item.statusText!="未付款" )


                    // this.orderList.map(function(v){
                    //     if(v.statusText!="未付款")
                    //     {
                    //         this.orderList.push(v);
                    //     }
                    // });
                });
            },
            search()
            {
                // let keyword=this.input1;
                // let starttime=this.starttime;
                // let endtime=this.endtime;

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
                // let keyword=this.input1;
                // // let starttime=this.starttime;
                // let starttime=this.eleme1+"-"+(this.eleme2< 10 ? ("0"+this.eleme2):this.eleme2)+"-"+(this.eleme3< 10 ? ("0"+this.eleme3):this.eleme3)+" "+(this.eleme4< 10 ? ("0"+this.eleme4):this.eleme4)+":"+(this.eleme5< 10 ? ("0"+this.eleme5):this.eleme5)+":"+(this.eleme6< 10 ? ("0"+this.eleme6):this.eleme6);
                // console.log("传入的开始时间转化为"+starttime);
                // let endtime=this.eleme7+"-"+(this.eleme8< 10 ? ("0"+this.eleme8):this.eleme8)+"-"+(this.eleme9< 10 ? ("0"+this.eleme9):this.eleme9)+" "+(this.eleme10< 10 ? ("0"+this.eleme10):this.eleme10)+":"+(this.eleme11< 10 ? ("0"+this.eleme11):this.eleme11)+":"+(this.eleme12< 10 ? ("0"+this.eleme12):this.eleme12);
                // console.log("传入的结束时间转化为"+endtime);

                let keyword=this.input1;
                let starttime=this.starttime;
                let endtime=this.endtime;
                let region=this.region;

                this.getOrderList(keyword,starttime,endtime,region);
            },
            //跳转详情页
            cellStyle(row,column,rowIndex,columnIndex)
            {
                // if(row.column.label=="状态")
                // {
                //     return  'color:#fDB221'
                // }
            },
            handleCurrentChange(val)
            {
                this.currentPage=val;
                 this.getOrderList();
            },
            handleSizeChange:function (size) {
                this.pagesize = size;
                this.getOrderList();
                console.log(this.pagesize)  //每页下拉显示数据
            },
            goWait()
            {
                this.$router.push("/home/appointmanager/appointmanagerWait");
            },
            goList()
            {
                this.$router.push("/home/appointmanager/appointmanagerList");
            }

        },
        // filters:{
        //     formatStatus(val){
        //         return val == "未付款" ? '隐藏' : val == "已付款" ? '显示' : '未知';
        //     }
        // },
        created()
        {
            this.getOrderList();
            this.getAllClinicList();
        }
    }
</script>

<style lang="less">
    .myordercontainer
    {
        &::-webkit-scrollbar
        {
            display:none;
        }
        .el-table .cell
        {
            height:40px!important;
            line-height:40px;
            text-overflow:ellipsis;
            white-space:nowrap;
            overflow:hidden;
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

    [v-cloak]
    {
        display:none;
    }
    .yellow{
        color:#ffD78C;
    }
    .red{
        color:#FDA7A8;
    }
    .grey{
        color:rgba(0,0,0,0.86);
    }
    .green
    {
        color:#009397;
    }
    *
    {
        margin:0px;
        padding:0px;
    }
    .el-table .cell, .el-table th div  .waitopay{
        padding-right: 10px;
        overflow: hidden;
        text-overflow: ellipsis;
        padding-left: 10px;
    }
    el-table-column .waitopay
    {
        color:red!important;
    }
    .el-table .waitopay
    {
        color:red!important;
    }
    .waitopay
    {
        color:#fCC668;
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
    #btnSmall2,#btnSmall3
    {
        background:none!important;
        height:24px;
        line-height:0px;
        color:rgba(0,0,0,0.36);
        border:1px solid rgba(0,0,0,0.36);;
    }
    .wrpaAllBtn
    {
        margin-left:30px!important;
    }
    #btnSearch9
    {
        margin-left:90px;
    }

    #el-sel1,#input1
    {
        margin-left:20px;
        margin-right:20px;
    }
    #input1
    {
        margin-left: 60px;
    }

    #date1,#date2,#input1, #el-sel1
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

