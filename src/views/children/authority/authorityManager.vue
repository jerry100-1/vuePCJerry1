<template>
    <div class="user-container">
         <div class="left-nav">

                 <div class="nav-title">
                    <img src="./autImages/权限(1).png" alt="">
                    <h3>权限管理</h3>
                </div>

                <router-link  @click.native="show(1)" tag="div" to="/home/authorityManager/authorityConfiguration" :class="{'nav-item':true,'bg':show1}">
                    <h4>权限配置</h4>
                    <img v-show="show1" src="./autImages/箭头右.png" alt="">
                </router-link>
                
                <router-link @click.native="show(2)" tag="div" to="/home/authorityManager/roleConfiguration" :class="{'nav-item':true,'bg':show2}">
                    <h4>角色配置</h4>
                    <img v-show="show2" src="./autImages/箭头右.png" alt="">
                </router-link>

                <router-link @click.native="show(3)" tag="div" to="/home/authorityManager/accountConfiguration" :class="{'nav-item':true,'bg':show3}">
                    <h4>账号配置</h4>
                    <img v-show="show3" src="./autImages/箭头右.png" alt="">
                </router-link>     

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
        name:"authorityManager",
        data() {
            return {
                // comName:'userInfo',
                show1:true,
                show2:false,
                show3:false,
            }
        },
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },
             show(id){
                if(id == 1){
                    this.show1=true;
                    this.show2=this.show3=false;
                }else if(id == 2){
                    this.show2=true;
                    this.show1=this.show3=false;
                }else if(id == 3){
                    this.show3=true;
                    this.show1=this.show2=false;
                }
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
