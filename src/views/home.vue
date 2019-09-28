<template>
    <div class="home">
        <div class="header">
            <div class="header-left">
                <div class="header-left-img">
                    <img src="./homeImage/logo.png" alt="">
                </div>
                <div class="header-left-nav">
                    <el-tabs v-model="activeName" @tab-click="handleClick">
                        <el-tab-pane label="用户" name="1"></el-tab-pane>
                        <el-tab-pane label="精品课堂" name="2"></el-tab-pane>
                        <el-tab-pane label="留言" name="3"></el-tab-pane>
                        <el-tab-pane label="专家管理" name="4"></el-tab-pane>
                        <el-tab-pane label="卫生所管理" name="5"></el-tab-pane>
                        <el-tab-pane label="项目管理" name="6"></el-tab-pane>
                        <el-tab-pane label="通知" name="7"></el-tab-pane>
                        <el-tab-pane label="预约管理" name="8"></el-tab-pane>
                        <el-tab-pane label="订单管理" name="9"></el-tab-pane>
                    </el-tabs>
                </div>
            </div>

            <div class="header-right">

                <div class="header-user">
                    <el-dropdown trigger="click" @command="handleCommand">
                    <span class="el-dropdown-link">
                      <img :src="userInfo.avatar" class="headuserImg" alt="">
                      <span class="headuserSpan">{{userInfo.name}}</span>
                    </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="退出登录">退出登录</el-dropdown-item>

                        </el-dropdown-menu>

                    </el-dropdown>
                </div>
                <router-link tag="div" to="/home/authorityManager" class="curStyle"><img src="./homeImage/权限(1).png" alt=""><span>权限</span></router-link>
                <router-link tag="div" to="/home/projectSet" class="curStyle"><img src="./homeImage/设置.png" alt=""><span>设置</span></router-link>

            </div>
        </div>


        <div class="main">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>

    export default {
        name: "home",
        data () {
            return {
                activeName: '1',
                userInfo:{}
            }
        },
        methods: {
            handleClick(tab, event) {
                // console.log(tab._uid);
            },

            UpdatePage(id){
                switch(id){
                    case '1':
                        this.$router.push('/home/user')
                        break;
                    case '2':
                        this.$router.push('/home/boutiqueClass')
                        break;
                    case '3':
                        this.$router.push('/home/leaveword')
                        break;

                    case '4':
                        this.$router.push('/home/expertManager')
                        break;
                    case '5':
                        this.$router.push('/home/healthcenter')
                        break;
                    case '6':
                        this.$router.push('/home/management')
                        break;
                    case '7':
                        this.$router.push('/home/notification')
                        break;
                    case '8':
                        this.$router.push('/home/appointmanager')
                        break;
                    case '9':
                        this.$router.push('/home/orderManager');
                        break;
                    //权限配置
                    case '10':
                        this.$router.push('/home/authority');
                        break;
                    case '11':
                        this.$router.push('/home/projectSet');
                        break;
                    default:
                        this.comName="user";
                }
            },
            handleCommand(command) {
                if(command=='退出登录'){
                    localStorage.removeItem('token');
                    localStorage.removeItem('userinfo');
                    this.$router.push('/')
                }
            },
            path(){
                let path=this.$route.path;
                path=path.substring(path.indexOf("/")+6,path.length);
                path=path.split("/")[0];
                if(path=='user'){
                    this.activeName='1';
                }else if(path=='boutiqueClass'){
                    this.activeName='2';
                }else if(path=='leaveword'){
                    this.activeName='3';
                }else if(path=='expertManager'){
                    this.activeName='4';
                }else if(path=='healthcenter'){
                    this.activeName='5';
                }else if(path=='management'){
                    this.activeName='6';
                }else if(path=='notification'){
                    this.activeName='7';
                }else if(path=='appointmanager'){
                    this.activeName='8';
                }else if(path=='orderManager'){
                    this.activeName='9';
                }else{
                    this.activeName='';
                }
            },
        },
        watch:{
            activeName(newQuestion,oldQuestion){
                if(newQuestion){
                    this.UpdatePage(newQuestion)
                }
                // this.$router.beforeEach(function (from,to,next) {
                //     console.log("获取地址栏路径:");
                //     console.log(to.meta.fullPath);
                // })
            },
            $route(to,from){
                let path=to.path;
                path=path.substring(path.indexOf("/")+6,path.length);
                path=path.split("/")[0];
                if(path=='authorityManager') return this.activeName='';
                if(path=='projectSet') return this.activeName='';
                this.path();
            }
        },
        created () {
            this.userInfo=JSON.parse(localStorage.getItem('userinfo'));
            this.path()
        }
    };
</script>

<style lang="less">
    .headuserImg
    {
        width:50%;
        display:block;
        float:left;
        vertical-align:middle;
        overflow:hidden;
        margin-top:15px;
    }
    .headuserSpan
    {
        width:50%;
        display:block;
        float:right;
        margin-top:0px;
        /*text-overflow:ellipsis;*/
        white-space:nowrap;
        overflow:hidden;
    }
    .home{
        width: 100%;
        .header{
            padding-right: 140px;
            position: relative;
            box-sizing: border-box;
            width: 100%;
            height: 80px;
            line-height: 80px;
            border-bottom: 1px solid #eee;
            display: flex;
            justify-content: space-between;
            padding-left: 40px;
            min-width: 1366px;
            .header-left{
                // width: 100%;
                height: 100%;
                display: flex;
                margin-right:30px;
                .header-left-img{
                    img{
                        vertical-align: middle;
                    }
                }
                .header-left-nav{
                    margin-left: 130px;
                    .el-tabs__nav-wrap::after{
                        height: 0;
                    }
                    .el-tabs__active-bar{
                        background-color: #00969D;
                    }
                    .is-active{
                        font-weight: 700;
                        color: #032467
                    }
                }
            }
            .header-right{
                // margin-right:140px;
                display: flex;
                // width: 350px;
                height: 100%;
                width: 350px;
                justify-content: space-between;
                div{
                    width: 62px;
                    height: 100%;
                    &:first-of-type{
                        width: 120px;
                    }
                    &:last-of-type{
                        margin-left: 20px;
                    }
                    img{
                        vertical-align: middle;
                        margin-right:10px;
                    }
                    span{
                        font-size: 16px;
                        color:#01266A;
                    }
                }
                .header-user{
                    margin-right:10px;
                    width:120px;
                    cursor: pointer;
                    /*span{*/
                        /*color: #002564;*/
                        /*display:inline-block;*/
                        /*vertical-align:middle;*/
                    /*}*/
                    img{
                        width: 50px;
                        height: 50px;
                        display:inline-block;
                        vertical-align:middle;
                        border-radius: 50%;
                    }
                }
                .curStyle{
                    cursor: pointer;
                }
            }
        }
        .main{
            width: 100%;
            height: 1000px;
        }
    }
</style>
