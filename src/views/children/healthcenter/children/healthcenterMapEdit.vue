<template>
    <div class="box drivermanage">
        <!-- <div class="top_title">当前位置:驾校管理 <span class="el-icon-arrow-right"></span> 新增驾校</div> -->
        <div class="con">
            <div class="con_content">
                <el-form ref="form" :model="form" label-width="80px">

                    <el-form-item label="地址坐标">
                        <el-input disabled v-model="form.addresslnglat" style="width:300px;color:#333;"></el-input>
                        <el-button type="primary" id="fetchPoint" style="margin-left:30px!important;" round @click="getmap">获取坐标</el-button>
                        <span style="color:#999999">&nbsp;&nbsp;(点击获取卫生所经纬度)</span>
                    </el-form-item>
                    <el-form-item label="地址">
                        <el-input v-model="form.alladdress"></el-input>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" class="submit_btn" @click="commitAddress">确定</el-button>
                        <el-button type="primary" class="submit_btn" @click="goBackModify">返回修改</el-button>
                        <!--<el-button v-show="cid" type="primary" class="submit_btn change_btn"  @click="edit_sub">修改</el-button>-->
                        <!-- <el-button @click="resetForm">取消</el-button> -->

                    </el-form-item>
                </el-form>
            </div>
            <el-dialog
                    title="地图"
                    :visible.sync="dialogVisiblemap"
                    width="80%"
            >
                <el-amap-search-box class="search-box" :search-option="searchOption" :on-search-result="onSearchResult"></el-amap-search-box>
                <div id="containermap" style="width:100%; height:400px">
                    <el-amap
                            vid="amapDemo"
                            :amap-manager="amapManager"
                            class="amap-demo"
                            :zoom="zoom"
                            :events="events"
                            :center="center"
                    >
                        <el-amap-marker v-for="(marker, index) in markers" :position="marker.position" :key="index" :icon="marker.icon" :events="marker.events" :title="marker.title" :vid="index" >
                        </el-amap-marker>
                        <!-- <el-amap-info-window>
                        </el-amap-info-window> -->
                    </el-amap>
                    <span>经度:{{ lng }}, 纬度:{{ lat }} 地址:{{ form.alladdress }}</span>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="addlnglat">确 定</el-button>
                    <el-button @click="dialogVisiblemap = false">取 消</el-button>
                </span>
            </el-dialog>
        </div>

    </div>
</template>
<script>
    import drivermanageJs from "./drivermanage.js";
    export default drivermanageJs;
</script>

<style lang="less">
   // @import "../../common/less/app.less";
    .drivermanage{
        ::-webkit-scrollbar {  /* 滚动条整体部分 */
            width:10px;
            //   margin-right:2px
        }
        ::-webkit-scrollbar-button { /* 滚动条两端的按钮 */
            //   width:10px;
            //   background-color: yellow;
        }
        ::-webkit-scrollbar:horizontal {
            height:10px;
            margin-bottom:2px
        }
        ::-webkit-scrollbar-track {  /* 外层轨道 */
            border-radius: 10px;
        }
        ::-webkit-scrollbar-track-piece {  /*内层轨道，滚动条中间部分 */
            background-color: #f2f5f7;
            border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb {  /* 滑块 */
            width:10px;
            border-radius: 5px;
            background: #d8dee6;
        }
        //   ::-webkit-scrollbar-corner { /* 边角 */
        //       width: 10px;
        //       background-color: red;
        //   }
        .el-upload--text{
            width: 150px;
            height: 150px;
            line-height: 150px;
            .avatar-uploader-icon{
                font-size: 28px;
            }
            img{
                height: 100%;
                width: 100%;
            }
        }
        .submit_btn{
            height: 40px;
            padding: 0 30px;
            font-size: 18px;
            background-color: #3085ef;
        }
        .change_btn{
            margin-left: 0px;
        }
        /deep/ .el-vue-search-box-container{
            top: -20px;
            box-shadow: none;
            .search-box-wrapper{
                input{
                    border: 1px solid #ccc;
                    height: 43px;
                    line-height: 43px;
                }
                span{
                    width: 60px;
                    height: 43px;
                    line-height: 43px;
                    background-color: #3085ef;
                    color: #fff;
                }
            }
        }
    }
    .con_content
    {
        margin-top:60px!important;
        margin-left:40px;
    }
</style>
