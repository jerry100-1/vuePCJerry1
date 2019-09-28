<template>
    <div class="healthcenter-container">

        <div class="innerCtnWrap">

             <div class="boxset">
                 <img src="@/assets/images/1.png" alt="">
                 <h3>今日接种人数</h3>
                 <span>{{projectSetList.vaccine}}</span>
             </div>
             <div class="boxset" >
                 <img src="@/assets/images/2.png" alt="">
                 <h3>今日保健人数</h3>
                 <span>{{projectSetList.health}}</span>
             </div>
             <div class="boxset">
                 <img src="@/assets/images/3.png" alt="">
                 <h3>今日体检人数</h3>
                 <span>{{projectSetList.inspect}}</span>
             </div>

        </div>

    </div>
</template>

<script>
    export default {
        name: "projectSetList",
        data() {
            return {
               projectSetList:{},
                health:"",
                inspect:"",
                vaccine:""
            };
        },
        methods: {

            getProjectSetList(){
                let token=localStorage.getItem('token');
                this.$http.get('/admin/system/numshow',{
                    params:{
                        token,
                        apitype:1
                    }
                }).then(response=>{
                    //this.userList=response.data.result.list;
                    //this.id=response.data.result.list.id;
                    console.log("请求设置接口数据开始...");
                    console.log(response);
                    this.projectSetList=response.data.result.list;
                    console.log("此页面接收的所有总数是:"+response.data.result.total);
                    this.total=Number(response.data.result.total);
                })
            },

        },
        created()
        {
            this.getProjectSetList();
        }
    };
</script>

<style lang="less">

    .innerCtnWrap
    {
        /*width:92%;*/
        width:1340px;
        height:200px;

        margin:90px auto;
        display:flex;
        flex-direction:row;
        justify-content:space-between;
    }
    .boxset
    {
        width:402px;
        height:200px;
        border-radius:10px;
        overflow:hidden;
        position:relative;
        /*flex:1;*/
    }
    .boxset img
    {
        width:400px;
        height:200px;
        position:absolute;
        top:0px;
        left:0px;
    }
    .boxset h3
    {
        font-weight:bold;
        font-size:22px;
        color:#fff;
        position:absolute;
        left:40px;
        top:40px;
        white-space:nowrap;
        text-overflow:ellipsis;
        overflow:hidden;
    }
    .boxset span
    {
        font-size:36px;
        color:#fff;
        position:absolute;
        width:100%;
        white-space:nowrap;
        text-overflow:ellipsis;
        overflow:hidden;
        left:40px;
        bottom:40px;
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


</style>
