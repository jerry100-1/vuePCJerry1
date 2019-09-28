<template>
    <div class="ccia">
        <div class="ccia_top">
            <!--<button >-->
                <!--综合设置-->
            <!--</button>-->
        </div>

        <div class="ccia_contentbox">
            <!-- <div class="ccia_contenttop"></div> -->
            <div class="ccia_content">
                <!--appkey-->
                <div class="content_top">
                    <span>短信appkey</span>
                    <div>
                        <el-input v-model="appkey" placeholder="请输入内容"></el-input>
                    </div>
                </div>
                 <!--temid-->
                <div class="content_top">
                    <span>短信模板ID</span>
                    <div>
                        <el-input v-model="temid" placeholder="请输入内容"></el-input>
                    </div>
                </div>
                  <!--code-->
                <div class="content_top">
                    <span>短信验证码变量</span>
                    <div>
                        <el-input v-model="code" placeholder="请输入内容"></el-input>
                    </div>
                </div>
                  <!--sermobile-->
                <div class="content_top">
                    <span >客服电话</span>
                    <div>
                        <el-input v-model="sermobile" placeholder="请输入电话"></el-input>
                    </div>
                </div>
                   <!--disclaimer-->
                <div class="content_top">
                    <span style="position:relative;top:-230px;" >协议以及声明内容</span>
                    <div>
                        <edi-tor v-model="disclaimer" :t_value="disclaimer" class="quill-editor editor" size="small" style="display:inline-block;max-height:200px;height:200px;">>

                        </edi-tor>
                    </div>
                </div>
                <!--newVersion-->
                <div class="content_top">
                    <span>新的版本</span>
                    <div>
                        <el-input v-model="newVersion" placeholder="请输入内容"></el-input>
                    </div>
                </div>
                <!--minVersion-->
                <div class="content_top">
                    <span>兼容最低版本</span>
                    <div>
                        <el-input v-model="minVersion" placeholder="请输入内容"></el-input>
                    </div>
                </div>
                <!--apkurl-->
                <div class="content_top">
                    <span>apk安装包下载地址</span>
                    <div>
                        <el-input v-model="apkurl" placeholder="请输入内容"></el-input>
                    </div>
                </div>

                <div class="submitbox">
                    <button @click="submit2">提交</button>
                    <button @click="goback">返回列表</button>
                    <p>(提交会覆盖原项目设置)</p>
                </div>
            </div>
        </div>
    </div>
</template>
<style>
    .editor
    {
        height:230px!important;
        /*min-width:776px!important;*/
    }
</style>
<script>
    // import ediTor from '@/components/page/product/addProduct/editor.vue'
    import ediTor from './editor.vue'
    export default {
        data(){
            return{
                appkey:"",
                temid:"",
                code:"",
                dx:[],
                sermobile:"",
                disclaimer:"",
                newVersion:"",
                minVersion:"",
                apkurl:"",
                userAgrementDetail:{}
            }
        },
        components: {
            ediTor
        },
        methods:{
            goback(){
                this.$router.push("/home/projectSet/projectSetList");
            },
            // 获取数据
            getUseragreementList(){
                let token=localStorage.getItem('token');
                this.$http.get('/admin/system/get_set',{
                    params:{
                        token,
                        apitype:1
                    }
                }).then(response=>{
                    //this.userList=response.data.result.list;
                    //this.id=response.data.result.list.id;
                    console.log("请求用户协议数据开始...");
                    console.log(response);
                    this.userAgrementDetail=response.data.result;
                    this.appkey=response.data.result.dx.appkey;
                    this.code=response.data.result.dx.code;
                    this.temid=response.data.result.dx.temid;
                    this.apkurl=response.data.result.apkurl;
                    this.sermobile=response.data.result.sermobile;
                    this.disclaimer=response.data.result.disclaimer;
                    this.newVersion=response.data.result.newVersion;
                    this.minVersion=response.data.result.minVersion;
                    console.log("请求用户协议数据结束...");
                    console.log(this.appkey);
                })
            },

            submit2(){
                let token=localStorage.getItem('token');
                this.$http.post(this.api+'/admin/system/save_set',{
                    // radioorder:this.radioorder,
                    token:token,
                    apitype:1,
                    dx:{
                        appkey:this.appkey,
                        temid:this.temid,
                        code:this.code
                    },
                    sermobile:this.sermobile,
                    disclaimer:this.disclaimer,
                    newVersion:this.newVersion,
                    minVersion:this.minVersion,
                    apkurl:this.apkurl,//

                }).then(res=>{
                    // console.log('提交',res)
                    console.log(res);
                    if(res.data.status==1){
                        this.$message.success(res.data.message);
                        this.$router.push("/home/projectSet/projectSetList")
                        // console.log(res);
                    }else{
                        this.$message.error(res.data.message);
                    }
                    // this.getinfo()
                })
            },

            //提交数据
            submit()
            {
                let token=localStorage.getItem('token');
                this.$http.get('/admin/system/save_set',{
                    // params:{
                    //     token,
                    //     apitype:1,
                    //     dx:{
                    //         appkey:this.appkey,
                    //         temid:this.temid,
                    //         code:this.code
                    //     },
                    //     sermobile:this.sermobile,
                    //     disclaimer:this.disclaimer,
                    //     newVersion:this.newVersion,
                    //     minVersion:this.minVersion,
                    //     apkurl:this.apkurl,
                    // }
                        token:token,
                        apitype:1,
                        dx:{
                            appkey:this.appkey,
                            temid:this.temid,
                            code:this.code
                        },
                        sermobile:this.sermobile,
                        disclaimer:this.disclaimer,
                        newVersion:this.newVersion,
                        minVersion:this.minVersion,
                        apkurl:this.apkurl,//

                }).then(response=>{
                    //this.userList=response.data.result.list;
                    //this.id=response.data.result.list.id;
                    console.log("这是提交数据之后返回给我的信息...");
                    console.log(response);
                    if(response.data.status==1)
                    {
                        this.$message.success("提交设置成功!");
                    }else
                    {
                        this.$message.error("提交设置失败!");
                    }

                })
            },

        },
        created(){
            this.getUseragreementList();
        }
    }
</script>
<style lang="less" scoped>
    .ccia{
        height:1100px;
        .ccia_top{
            button{
                // width: 100px;
                height: 32px;
                line-height: 32px;
                padding: 0 10px;
                color: #ffffff;
                border: 0;
                font-size: 12px;
                border-radius: 2px;
                background-color:#28B7A3;
                outline: none;
                // cursor: pointer;
                float: left;
            }
        }
        .ccia_contentbox{
            border-top: 1px solid #EDECEC;
            .ccia_content{
                overflow: hidden;
                .el-input{
                    width: 50%;
                }
                .content_top{
                    margin-top:30px;
                    position: relative;
                    >span:nth-of-type(1){
                        width: 150px;
                        display: inline-block;
                        text-align: right;
                        margin-right:20px;
                        height: 32px;
                        line-height: 32px;
                        font-size: 13px;
                    }
                    >span:nth-of-type(2){
                        position:absolute;
                        left: 175px;
                        top:40px;
                        font-size: 12px;
                        color :#999999;
                        font-family:PingFang-SC-Medium;
                        font-weight:500;
                    }
                    .el-select{
                        width: 100px;
                        height: 32px;;
                    }
                    >div{
                        display: inline;
                        font-size: 12px;
                    }
                }


                div:last-child{
                    button{
                        // width: 100px;
                        min-width: 58px;
                        height: 32px;
                        line-height: 32px;
                        padding: 0 15px;
                        color: #ffffff;
                        border: 0;
                        font-size: 12px;
                        border-radius: 2px;
                        background-color:#28B7A3;
                        outline: none;
                        cursor: pointer;
                        // float: left;
                    }
                    button:nth-of-type(1){
                        margin-left: 170px;
                        margin-right:10px;
                    }
                    button:nth-of-type(2){
                        color: #000;
                        padding: 0 18px;
                        background-color: #fff;
                        font-size: 13px;
                        border: 1px solid #EFEFEF;

                    }
                }
                .content_toplogo{
                    margin-top: 48px;
                    box-sizing: border-box;
                    display: flex;

                    align-item:center;
                    >span{
                        margin-top: 60px;
                        margin-right: 25px !important;
                    }
                    >div{
                        display: inline-block;
                    }
                }
            }
        }
        .submitbox{
            margin-top: 25px;
            margin-left: 5px;
            >p{
                font-size: 14px;
                color: #999;
                padding-left: 169px;
                margin-top: 10px;
            }
        }
    }
</style>

