<template>
    <div class="boutiqueClass-container" style="height:100%!important;">
        <div class="left-nav">

            <div class="nav-title">
                <img src="./bouImages/精品课.png" alt="">
                <h3>精品课堂</h3>
            </div>

            <router-link @click.native="show=true" tag="div" to="/home/boutiqueClass/articleList" :class="{'nav-item':true,'bg':show}">
                <h4>文章列表</h4>
                <img v-show="show" src="./bouImages/箭头右.png" alt="">
            </router-link>

            <router-link @click.native="show=false" tag="div" to="/home/boutiqueClass/minClass" :class="{'nav-item':true,'bg':!show}">
                <h4>微课堂</h4>
                <img v-show="!show" src="./bouImages/箭头右.png" alt="">
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
    export default {
        name:"user",
        data() {
            return {
                show:true
            }
        },
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            }
        },

        components: {

        },

    }
</script>

<style lang="less">
    .boutiqueClass-container{
        display: flex;
        .left-nav{
            height:100%!important;
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
