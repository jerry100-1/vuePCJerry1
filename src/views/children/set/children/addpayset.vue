<template>
    <div class="ccia">
        <div class="ccia_top">
            <button  style="margin:40px;">
                {{ edit ? '编辑支付设置':'添加支付设置'}}
            </button>
        </div>

        <div class="ccia_contentbox">
            <!-- <div class="ccia_contenttop"></div> -->
            <div class="ccia_content">

                <!-- <div class="content_top">
                    <span>标题</span>
                    <el-input v-model="title" placeholder="请输入内容"></el-input>
                </div> -->
                <div class="content_top" style="margin-top:120px;">
                    <span>支付方式类型</span>
                    <el-radio-group v-model="paytype">
                        <el-radio :label=1>支付宝</el-radio>
                        <el-radio :label=2>微信app支付</el-radio>
                        <el-radio :label=3>微信H5公众号支付</el-radio>
                        <el-radio :label=4>微信小程序支付</el-radio>
                    </el-radio-group>
                </div>
                <div v-if="paytype==2 || paytype==3 || paytype==4">
                    <div class="content_top">
                        <span>微信支付appid</span>
                        <div>
                            <el-input v-model="wxpay_APPID" placeholder="请输入内容"></el-input>
                        </div>
                    </div>
                    <div class="content_top">
                        <span>微信支付商户号</span>
                        <div>
                            <el-input v-model="wxpay_MCHID" placeholder="请输入内容"></el-input>
                        </div>
                    </div>
                    <div class="content_top">
                        <span>微信支付key</span>
                        <div>
                            <el-input v-model="wxpay_KEY" placeholder="请输入内容"></el-input>
                        </div>
                    </div>
                    <div class="content_top">
                        <span>微信支付应用密钥</span>
                        <div>
                            <el-input v-model="wxpay_APPSECRET" placeholder="请输入内容"></el-input>
                        </div>
                    </div>
                    <div class="content_top">
                        <span>微信cert</span>
                        <div>
                            <el-input v-model="wxpay_apiclient_cert" placeholder="请输入内容"></el-input>
                        </div>
                    </div>
                    <div class="content_top">
                        <span>微信key证书</span>
                        <div>
                            <el-input v-model="wxpay_apiclient_key" placeholder="请输入内容"></el-input>
                        </div>
                    </div>
                </div>
                <div v-if="paytype==1">
                    <div class="content_top">
                        <span>阿里支付appid</span>
                        <div>
                            <el-input v-model="alipay_appId" placeholder="请输入内容"></el-input>
                        </div>
                    </div>
                    <div class="content_top">
                        <span>阿里支付网关</span>
                        <div>
                            <el-input v-model="alipay_gatewayUrl" placeholder="请输入内容"></el-input>
                        </div>
                    </div>
                    <div class="content_top">
                        <span>阿里支付私钥</span>
                        <div>
                            <el-input v-model="alipay_rsaPrivateKey" placeholder="请输入内容"></el-input>
                        </div>
                    </div>
                    <div class="content_top">
                        <span>阿里支付公钥</span>
                        <div>
                            <el-input v-model="alipay_alipayrsaPublicKey" placeholder="请输入内容"></el-input>
                        </div>
                    </div>
                </div>
                <div class="submitbox">
                    <button @click="submit">提交</button>
                    <button @click="goback">返回列表</button>
                    <p>(如已有该支付方式,提交会覆盖原支付设置)</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name:"addpayset",
        data(){
            return{
                edit:'',
                uid:'',
                paytype:1,
                wxpay_APPID:"",
                wxpay_MCHID:"",
                wxpay_KEY:"",
                wxpay_APPSECRET:"",
                wxpay_apiclient_cert:"",
                wxpay_apiclient_key:"",
                alipay_appId:"",
                alipay_gatewayUrl:"",
                alipay_rsaPrivateKey:"",
                alipay_alipayrsaPublicKey:"",
            }
        },
        methods:{

            goback(){
                this.$router.go(-1)
            },
            // 提交
            submit(){
                var params={}
                // if(this.uid){
                //     posturl = 'admin/memberlevel/save',
                //     params = {
                //         id:this.uid,
                //         levelname:this.levelname,
                //         level:this.level,
                //         level1_Profit:this.level1_Profit,
                //         level2_Profit:this.level2_Profit,
                //         silbling_Profit:this.silbling_Profit,
                //         sales_Profit:this.sales_Profit,
                //         islogin_crm:this.islogin_crm,
                //         global_Profit:this.global_Profit,
                //         global_number:this.global_number,
                //         logo:imgbmp,
                //         zhudong_msg:this.zhudong_msg,
                //         beidong_msg:this.beidong_msg
                //     }
                // }else{
                //     posturl = 'admin/memberlevel/add',
                //     params = {
                //         levelname:this.levelname,
                //         level:this.level,
                //         level1_Profit:this.level1_Profit,
                //         level2_Profit:this.level2_Profit,
                //         silbling_Profit:this.silbling_Profit,
                //         sales_Profit:this.sales_Profit,
                //         islogin_crm:this.islogin_crm,
                //         global_Profit:this.global_Profit,
                //         global_number:this.global_number,
                //         logo:imgbmp,
                //         zhudong_msg:this.zhudong_msg,
                //         beidong_msg:this.beidong_msg
                //     }
                // }
                let token=localStorage.getItem('token');
                if(this.paytype==1){
                    params={
                        paytype:this.paytype,
                        alipay_appId:this.alipay_appId,
                        alipay_gatewayUrl:this.alipay_gatewayUrl,
                        alipay_rsaPrivateKey:this.alipay_rsaPrivateKey,
                        alipay_alipayrsaPublicKey:this.alipay_alipayrsaPublicKey,
                        token,
                        apitype:1
                    }
                }else{
                    params={
                        paytype:this.paytype,
                        wxpay_APPID:this.wxpay_APPID,
                        wxpay_MCHID:this.wxpay_MCHID,
                        wxpay_KEY:this.wxpay_KEY,
                        wxpay_APPSECRET:this.wxpay_APPSECRET,
                        wxpay_apiclient_cert:this.wxpay_apiclient_cert,
                        wxpay_apiclient_key:this.wxpay_apiclient_key,
                        token,
                        apitype:1
                    }
                }
                console.log("您要传入的参数是"+params);

                this.$http.post(this.api+'/admin/payset/add',params).then(res=>{
                    // console.log('提交',res)
                    if(res.data.status==1){
                        this.$message.success(res.data.message);
                        this.$router.push('/home/projectSet/paymentset')
                    }else{
                        this.$message.error(res.data.message+"请设置支付方式!");
                    }
                })
            },
            // 获取数据
            getinfo(){

                let token=localStorage.getItem('token');

                this.$http.post(this.api+'/admin/payset/getPaySet',{
                    token,
                    apitype:1,
                    paytype:this.paytype
                }).then(res=>{
                    console.log('支付配置页面获取到的数据是',res)
                    if(res.data.status==1){
                        if(this.paytype==1){
                                this.alipay_appId=res.data.result.alipay_appId,
                                this.alipay_gatewayUrl=res.data.result.alipay_gatewayUrl,
                                this.alipay_rsaPrivateKey=res.data.result.alipay_rsaPrivateKey,
                                this.alipay_alipayrsaPublicKey=res.data.result.alipay_alipayrsaPublicKey
                        }else if(this.paytype==2){
                                this.wxpay_APPID=res.data.result.wxpay_APPID,
                                this.wxpay_MCHID=res.data.result.wxpay_MCHID,
                                this.wxpay_KEY=res.data.result.wxpay_KEY,
                                this.wxpay_APPSECRET=res.data.result.wxpay_APPSECRET,
                                this.wxpay_apiclient_cert=res.data.result.wxpay_apiclient_cert,
                                this.wxpay_apiclient_key=res.data.result.wxpay_apiclient_key
                        }else if(this.paytype==3){
                                this.wxpay_APPID=res.data.result.wxpay_APPID,
                                this.wxpay_MCHID=res.data.result.wxpay_MCHID,
                                this.wxpay_KEY=res.data.result.wxpay_KEY,
                                this.wxpay_APPSECRET=res.data.result.wxpay_APPSECRET,
                                this.wxpay_apiclient_cert=res.data.result.wxpay_apiclient_cert,
                                this.wxpay_apiclient_key=res.data.result.wxpay_apiclient_key
                        }else if(this.paytype==4){
                                this.wxpay_APPID=res.data.result.wxpay_APPID,
                                this.wxpay_MCHID=res.data.result.wxpay_MCHID,
                                this.wxpay_KEY=res.data.result.wxpay_KEY,
                                this.wxpay_APPSECRET=res.data.result.wxpay_APPSECRET,
                                this.wxpay_apiclient_cert=res.data.result.wxpay_apiclient_cert,
                                this.wxpay_apiclient_key=res.data.result.wxpay_apiclient_key
                        }
                    }else{
                            this.wxpay_APPID='',
                            this.wxpay_MCHID="",
                            this.wxpay_KEY="",
                            this.wxpay_APPSECRET="",
                            this.wxpay_apiclient_cert="",
                            this.wxpay_apiclient_key="",
                            this.alipay_appId="",
                            this.alipay_gatewayUrl="",
                            this.alipay_rsaPrivateKey="",
                            this.alipay_alipayrsaPublicKey=""
                    }
                })
            }
        },
        created(){
            this.paytype = Number(this.$route.params.paytype)
            console.log(this.paytype,123);

            console.log("此页面接收传递过来的paytype是"+this.$route.params.paytype);

            this.paytype=Number(this.$route.params.paytype);
            this.getinfo()
            console.log(this.paytype,456);
        }
    }
</script>
<style lang="less" scoped>
    .ccia{
        height:800px;
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
            }
        }
        // .zhudongbox{
        //     position: relative;
        //     .zhudongdiv{
        //             margin-top:48px;
        //             position: relative;
        //             >span:nth-of-type(1){
        //                 width: 150px;
        //                 display: inline-block;
        //                 text-align: right;
        //                 margin-right:20px;
        //                 height: 32px;
        //                 line-height: 32px;
        //                 font-size: 13px;
        //             }
        //             >span:nth-of-type(2){
        //                 position:absolute;
        //                 left: 175px;
        //                 top:40px;
        //                 font-size: 12px;
        //                 color :#999999;
        //                 font-family:PingFang-SC-Medium;
        //                 font-weight:500;
        //             }
        //             .el-select{
        //                 width: 100px;
        //                 height: 32px;;
        //             }
        //             >div{
        //                 // display: inline;
        //                 padding-left: 175px;
        //             }
        //             .inputbox{
        //                 margin-top:20px;
        //                 .el-textarea{
        //                     width: 50%;
        //                     margin-top: 10px;
        //                 }
        //             }
        //             .inputbox:nth-of-type(1){
        //                  margin-top:-30px;
        //             }
        //     }
        //     .zhudongbtn{
        //         position: absolute;
        //         left: 68%;
        //         top:3px;
        //         z-index: 100;
        //         i{
        //             font-size: 20px;
        //             padding: 2px;
        //             border: 1px solid #28b7a3;
        //             color: #28b7a3;
        //             margin-right: 10px;
        //         }
        //     }
        // }
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

