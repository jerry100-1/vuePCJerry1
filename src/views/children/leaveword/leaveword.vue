<template>
    <div class="leaveword-container">
         <div class="left-nav">
                
                <div class="nav-title">
                    <img src="./leaveImages/留言.png" alt="">
                    <h3>留言</h3>
                </div>

                <router-link tag="div" to="/home/leaveword/leavewordList" :class="{'nav-item':true,'bg':show}">
                    <h4>留言列表</h4>
                    <img v-show="show" src="./leaveImages/箭头右.png" alt="">
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
    name:"leaveword",
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
      },
      // show(data){
      //         console.log(data)
      //         this.comName='userInfo'
          
      // }
    },

    components: {
        
    },

  }
</script>

<style lang="less">
    .leaveword-container{
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
