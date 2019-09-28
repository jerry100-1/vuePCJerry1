<template>
    <div class="user-container">
        <div class="left-nav" style="">

            <div class="nav-title">
                <img src="./userImages/管理(1).png" alt="">
                <h3>用户管理</h3>
            </div>

            <router-link @click.native="show1=true" tag="div" to="/home/user/userInfo" :class="{'nav-item':true,'bg':show}">
                <h4>用户列表</h4>
                <img v-show="show1" src="./userImages/箭头右.png" alt="">
            </router-link>

            <router-link @click.native="show1=false" tag="div" to="/home/user/userBannerList" :class="{'nav-item':true,'bg':!show}">
                <h4>轮播图设置</h4>
                <img v-show="!show1" src="./userImages/箭头右.png" alt="">
            </router-link>



        </div>
        <div class="right-main" style="height:100%!important;">
            <div class="userinfo-main">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>


<script>
    // import  userInfo from './children/userInfo'
    export default {
        name:"user",
        data() {
            return {
                show1:true,
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
                this.comName='userInfo'

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
        height:100%!important;
        .left-nav{
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
