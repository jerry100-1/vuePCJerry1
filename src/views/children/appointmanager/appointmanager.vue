<template>
    <div class="user-container">
        <div class="left-nav">

            <div class="nav-title">
                <img src="./userImages/管理(1).png" alt="">
                <h3>预约管理</h3>
            </div>

            <router-link tag="div" to="/home/appointmanager/appointmanagerList" :class="{'nav-item':true,'bg':show}">
                <h4>预约</h4>
                <img v-show="show" src="./userImages/箭头右.png" alt="">
            </router-link>

            <!-- <template slot="title">分组一</template> -->
            <!-- <router-link tag="el-menu-item" to="/home/user/userInfo" index="1-1">用户信息</router-link> -->

        </div>
        <div class="right-main">
            <div class="userinfo-main">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>


<script>
    // import  userInfo from './children/userInfo'
    export default {
        name:"appointmanager",
        data() {
            return {
                // comName:'userInfo',
                show:true
            }
        },
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },
            show(data){
                console.log(data)
                this.comName='notification'

            }
        },

        components: {
            // userInfo,
        },

    }
</script>

<style lang="less">
    .user-container{
        display: flex;
        .left-nav{
            height: 100%!important;
            background-color: #0F274D;
            .el-row{
                width: 220px;
                height: 100%;
                .el-menu-item{
                    padding-left:50px !important;
                }
            }

        }

        .left-nav{
            height: 1000px;
            background-color: #0F274D;
            .bg{
                background-color: #00878D;
                border: 1px solid #34ABB1;
                border-left:none;
            }
            .nav-title{
                width: 220px;
                display: flex;
                align-items: center;
                line-height: 58px;
                color: #69738E;
                font-size: 16px;
                img{
                    height: 18px;
                    margin-left:30px;
                    margin-right: 10px;
                }
                h3{
                    font-weight: 700;
                }
            }
            .nav-item{
                width: 100%;
                height: 40px;
                background-color: #00969D;
                color: #fff;
                text-align: center;
                line-height: 40px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding-left:58px;
                box-sizing: border-box;
                padding-right: 10px;
                box-sizing: border-box;
                cursor: pointer;
                img{
                    height: 13px;
                    vertical-align: middle;
                }
            }

        }

        .right-main{
            width: 100%;
            height: 100%;
            box-sizing: border-box;
            padding: 30px;
            overflow-x: hidden;
            .userinfo-main {
                width: 100%;
                height: 100%;
                border: 1px solid #e9e9e9;
                border-radius: 15px;
                box-shadow: 0 0 10px 4px #eee;
                overflow: hidden;
            }
        }
    }
</style>
