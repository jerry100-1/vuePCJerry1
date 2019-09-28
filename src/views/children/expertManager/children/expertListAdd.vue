<template>
    <div class="particulars-container" style="height:1300px!important;">
        <div class="particulars-header">
            当前位置:&nbsp;<el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home/expertManager/expertList' }">专家管理</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/home/expertManager/expertList' }">专家列表</el-breadcrumb-item>
            <el-breadcrumb-item>新增</el-breadcrumb-item>
            <!-- <el-breadcrumb-item>活动详情</el-breadcrumb-item> -->
        </el-breadcrumb>
        </div>

        <div class="particulars-info" style="border-bottom:none;">
            <!--<img src="./userInfoimages/矩形14拷贝.png" alt="">-->

            <div class="parCenter">
                <img src="@/assets/images/leftImg3.png" class="leftImg3" alt="">

                <el-form ref="form" :model="form" label-width="140px">
                    <el-form-item label="专家头像">
                        <!--<img src="@/assets/images/wwImg1.png" class="kkImg1" alt="">-->

                        <!--<el-upload style="margin-left:20px!important;"-->
                                <!--:action="baseurl+'/index/index/upload'"-->
                                <!--list-type="picture-card"-->
                                <!--:on-preview="handlePictureCardPreview"-->
                                <!--:before-remove="beforeRemove"-->
                                <!--:on-remove="handleRemove"-->
                                <!--:file-list="img_list"-->
                                <!--:on-success="uploadSuccess"-->
                                <!--:before-upload="beforeAvatarUpload"-->
                                <!--:limit=1-->
                                <!--:on-exceed="onexceed">-->
                            <!--<i class="el-icon-plus" ></i>-->
                        <!--</el-upload>-->
                        <!--<el-upload style="margin-left:20px!important;"-->
                                   <!--:action="baseurl+'/index/index/upload'"-->
                                   <!--list-type="picture-card"-->
                                   <!--:on-preview="handlePictureCardPreview"-->
                                   <!--:before-remove="beforeRemove"-->
                                   <!--:on-remove="handleRemove"-->
                                   <!--:file-list="img_list"-->
                                   <!--:on-success="uploadSuccess"-->
                                   <!--:before-upload="beforeAvatarUpload"-->
                                   <!--:limit=1-->
                                   <!--:on-exceed="onexceed">-->
                            <!--<i class="el-icon-plus" ></i>-->
                        <!--</el-upload>-->
                        <!--action="http://ck.hongbao19.net/index/index/upload"-->
                        <el-upload
                                :action="baseurl+'/index/index/uploadimg'"
                                list-type="picture-card"
                                :on-preview="handlePictureCardPreview"
                                :before-remove="beforeRemove"
                                :on-remove="handleRemove"
                                :file-list="img_list"
                                :on-success="uploadSuccess"
                                :before-upload="beforeAvatarUpload"
                                :limit=1
                                style="margin-left:20px;!important;"
                                :on-exceed="onexceed">
                            <i class="el-icon-plus" ></i>
                        </el-upload>
                        <el-dialog :visible.sync="dialogVisible">
                            <img width="100%" :src="dialogImageUrl" alt="">
                        </el-dialog>


                    </el-form-item>

                    <el-form-item label="专家姓名">
                        <el-input v-model="name" placeholder="请输入专家姓名"></el-input>
                    </el-form-item>
                    <el-form-item label="专家介绍">
                        <el-input type="textarea" v-model="introduce" placeholder="请输入专家介绍 ...."></el-input>
                    </el-form-item>

                    <el-form-item label="所在的卫生所">
                        <!--<el-select v-model="cid" placeholder="请选择时间" id="selectOp1" class="weekSelect">-->
                        <!--</el-select>-->
                        <el-select v-model="value2" @change="" placeholder="请选择" id="seleId1">
                            <el-option
                                    v-for="item in allClinicList"
                                    :key="item.id" prop="itemId"
                                    :label="item.address"
                                    :value="item.id"
                                    :disabled="item.disabled">
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="专家类型">
                        <el-radio-group v-model="innocutionType" style="margin-left:20px;">
                            <el-radio label="儿保咨询"></el-radio>
                            <el-radio label="接种咨询"></el-radio>
                            <el-radio label="成人咨询"></el-radio>
                        </el-radio-group>
                    </el-form-item>


                    <el-form-item label="在线时间">

                        <el-select v-model="sday" placeholder="请选择时间" id="selectOp1" class="weekSelect">
                            <el-option label="星期一" value="monday"></el-option>
                            <el-option label="星期二" value="tuesday"></el-option>
                            <el-option label="星期三" value="wendesday"></el-option>
                            <el-option label="星期四" value="thursday"></el-option>
                            <el-option label="星期五" value="friday"></el-option>
                            <el-option label="星期六" value="saturday"></el-option>
                            <el-option label="星期天" value="sunday"></el-option>
                        </el-select>
                        <span class="minddleSpab">&nbsp; &nbsp;--&nbsp;&nbsp;</span>



                        <el-time-select id="selectOp2"
                                v-model="shour"
                                        prefix-icon="none"
                                        arrow-control="true"
                                :picker-options="{
                                start: '08:30',
                                step: '00:01',
                                end: '18:30'
                              }"
                                placeholder="请选择时间">
                        </el-time-select>


                        <!--<el-select v-model="form.desc2" placeholder="请选择时间" id="selectOp2" class="weekSelect">-->
                            <!--<el-option label="星期一" value="monday"></el-option>-->
                            <!--<el-option label="星期二" value="tuesday"></el-option>-->
                            <!--<el-option label="星期三" value="wendesday"></el-option>-->
                            <!--<el-option label="星期四" value="thursday"></el-option>-->
                            <!--<el-option label="星期五" value="friday"></el-option>-->
                            <!--<el-option label="星期六" value="saturday"></el-option>-->
                            <!--<el-option label="星期天" value="sunday"></el-option>-->
                        <!--</el-select>-->

                        <span class="spanEndText"> (*天)</span>
                        <br>


                        <div class="botPartSelect">

                            <el-select v-model="eday" placeholder="请选择时间" id="selectOp3" class="weekSelect">
                                <el-option label="星期一" value="monday"></el-option>
                                <el-option label="星期二" value="tuesday"></el-option>
                                <el-option label="星期三" value="wendesday"></el-option>
                                <el-option label="星期四" value="thursday"></el-option>
                                <el-option label="星期五" value="friday"></el-option>
                                <el-option label="星期六" value="saturday"></el-option>
                                <el-option label="星期天" value="sunday"></el-option>
                            </el-select>
                            <span class="minddleSpab">&nbsp; &nbsp;--&nbsp;&nbsp;</span>

                            <el-time-select id="selectOp4"
                                            v-model="ehour"
                                            prefix-icon="none"
                                            arrow-control="true"
                                            :picker-options="{
                                            start: '08:30',
                                            step: '00:01',
                                            end: '18:30'
                                          }"
                                            placeholder="请选择时间">
                            </el-time-select>

                            <span class="spanEndText"> (*小时)</span>

                        </div>


                    </el-form-item>
                    <el-form-item label="排序">
                        <el-input v-model="sort" placeholder="1"></el-input>
                    </el-form-item>
                    <el-form-item label="每日可提问名额">
                        <el-input v-model="asknum" placeholder="10"></el-input>
                    </el-form-item>



                    <el-form-item>

                        <el-button id="btnSub6"  type="primary" @click="getConsole" style="width:160px;margin-left:20px!important;">提交</el-button>

                    </el-form-item>


                </el-form>

            </div>



        </div>
    </div>
</template>
<script>
    import eventVue from '../../../../eventVue.js'
    export default {
        name: "expertListAdd",
        data()
        {
            return{
                uid:'',
                itemId:"",
                sort:'',
                status:'',
                detail:'',
                tzurl:'',
                type:'',
                tzurltype:'',
                imageUrl:"",
                imageurl:"",
                asknum:"",
                goodsid:'',//商品id
                tzurl:'',
                // 上传文件夹
                img_list: [],
                // imgbmp:[],
                baseurl:'',
                dialogVisible:false,
                dialogImageUrl: '',
                shopDialogVisible:false,
                multipleSelection:'',
                keyword:'',
                dialogVisible:false,
                dialogImageUrl: '',
                shopDialogVisible:false,
                value1:"",
                value4:"",
                //表格
                tableData: [],
                value1:"",
                value2:"",
                value3:"",
                baseurl:"",
                relefeImgUrl:"",
                value4:"",
                allClinicList:[],
                avatar:"",//图像----------提交参数12
                name:"",//专家姓名---------提交参数1
                introduce:"",//专家介绍-----------提交参数2
                cid:"0",//专家所在的卫生所id-------------提交参数3
                innocutionType:"",
                // innocutionType:"",//专家类型------------提交参数4
                sday:"",//一周开始
                sdayIndex:"",//一周开始星期几的索引---------提交参数5
                eday:"",//一周结束
                edayIndex:"",//一周结束星期几的索引----------提交参数6
                shour:"",//上班时间--------提交参数7
                ehour:"",//下班时间--------提交参数8
                sort:"",//排序-----------提交参数9
                mobile:"",//医生登录手机端的账号-------提交参数10
                pwd:"",//医生登录手机端的密码-------提交参数11
                // 分页
                currentPage:1,
                limit:10,
                total:0,
                innocutionTypeIndex:"",//专家类型--------提交参数4
                alladdress:"",
                selltype:'',
                form:{
                    desc2:""
                },
                dataCollect:{ },
                innaddressTitle:"接种单位",
                textDes:"查找",
                zoom:16,
                resource: '',
                center:[121.59996,31.197646],
                form: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc1: '',
                    desc2:"",
                    desc3:"",
                    name1:"",
                    name2:"",
                    desc4:"",
                },
                options2: [{
                    value: '选项1',
                    label: '黄金糕'
                }, {
                    value: '选项2',
                    label: '双皮奶',
                    disabled: true
                }, {
                    value: '选项3',
                    label: '蚵仔煎'
                }, {
                    value: '选项4',
                    label: '龙须面'
                }, {
                    value: '选项5',
                    label: '北京烤鸭'
                }],
                value2: '',
            }
        },
        methods:{
            getAllClinicList(){
                let token=localStorage.getItem('token');
                this.$http.get('/admin/clinic/allList',{
                    params:{
                        token,
                        apitype:1
                    }
                }).then(response=>{
                    console.log("请求所有诊所数据开始...")
                    console.log(response);
                    //this.userList=response.data.result.list;
                    //获取全国省区数据;
                    this.allClinicList=response.data.result.list;
                    //this.code=response.data.result.list.
                    //this.id=response.data.list.id;
                    console.log("请求到的所有诊所地址的数据是:")
                    console.log(response);

                })
            },
            // 上传图片

            // 上传图片
            // 删除文件钩子
            handleRemove(file, fileList) {
                this.img_list = fileList
            },
            // 点击上传的文件的钩子
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
                // console.log('当前img', file.response)
            },
            beforeRemove(file, fileList) {
                return this.$confirm(`确定移除 ${ file.name }？`);
            },
            onexceed(files, fileList){
                // console.log('111',fileList)
                this.$message.warning('只能上传一张图片!');
            },
            // 上传成功
            uploadSuccess(response, file, fileList) {
                // console.log("response",response);
                // console.log("file",file);
                // console.log("fileList",fileList);
                //点击延时
                let that = this;
                // setTimeout(() => {
                //    this.uploadDisabled = 1;
                //    that.isDisabled = false;
                // }, 1000);
            },
            // 上传之前
            beforeAvatarUpload(file) {
                // console.log("file",file)
                var that = this;
                // 判断类型是不是图片
                if (!/image\/\w+/.test(file.type)) {
                    that.$message("请确保文件为图像类型");
                    return false;
                } else {
                    var article_image, image_base64;
                    var reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = function (e) {
                        //  console.log('img数组',this.result);
                        image_base64 = this.result.split(",")[1];
                        // console.log('image_base64',image_base64);
                        // 就是base64
                        article_image = image_base64;
                        // console.log("article_image =",article_image);
                        // this.serverhost=this.GLOBAL.serverhost;
                        //  var url = that.serverhost + 'upload';
                        //console.log(article_image)
                        var params = {
                            imgdata: article_image,
                        };
                        that.$http.post(that.api+'/index/index/uploadimg', params)
                            .then(res => {
                                console.log(res)
                                if (res.data.status==1){
                                    console.log(res);
                                    that.relefeImgUrl=res.data.result.imgurl;
                                    console.log("这是图片上传接口返回给我的路径"+that.relefeImgUrl);
                                    console.log("这是接口返回给我的数据！")

                                    that.avatar=that.relefeImgUrl;

                                    that.img_list.push({name:file.name,url:res.data.result.url,imgurl:res.data.result.imgurl})
                                    that.$message.success(res.data.message);

                                } else if (res.data.status == 0) {

                                    console.log(res);

                                    console.log("这也是接口返回给我的数据！")

                                    that.$message.error(res.data.result.message);
                                }

                            })
                            .catch(error => {
                                // console.log(error)
                            })
                    }
                }
            },
            getConsole()
            {
                if(this.avatar=="")
                {
                    this.$message.error("请选择上传的用户图像");
                    return;
                }
                if(this.name=="")
                {
                    this.$message.error("请输入专家姓名");
                    return;
                }
                if(this.introduce=="")
                {
                    this.$message.error("请输入专家介绍");
                    return;
                }
                if(this.value2=="")
                {
                    this.$message.error("请选择卫生所地址");
                    return;
                }
                if(this.innocutionType=="")
                {
                    this.$message.error("请选择医生类型");
                    return;
                }
                if(this.sday=="")
                {
                    this.$message.error("请选择一周开始的星期号");
                    return;
                }
                if(this.eday=="")
                {
                    this.$message.error("请选择一周结束的星期号");
                    return;
                }
                if(this.shour=="")
                {
                    this.$message.error("请选择一周开始具体时间");
                    return;
                }
                if(this.ehour=="")
                {
                    this.$message.error("请选择一周结束具体时间");
                    return;
                }
                if(this.asknum=="")
                {
                    this.$message.error("请设置可提问次数");
                    return;
                }
                if(this.sort=="")
                {


                        this.$message.error("请输入排序序号 1 升序 2 降序");
                        return;
                }
                var reg = /^\d+(?=\.{0,1}\d+$|$)/
                if(reg.test(this.sort))
                {

                }else {
                    this.$message.error("序号只能输入正数!");
                    return false ;
                }


                console.log("您提交的图像地址是:"+this.avatar);
                console.log("您提交的专家姓名是:"+this.name);
                console.log("您提交的专家介绍是:"+this.introduce);
                console.log("您提交的卫生所地址是:"+this.cid);
                console.log("您提交的医生类型是:"+this.innocutionType);
                //判断接种医生类型
                // if(this.innocutionType=="儿保咨询")
                // {
                //     this.innocutionTypeIndex=1;
                // }else if(this.innocutionType=="接种咨询")
                // {
                //     this.innocutionTypeIndex=2;
                // }else if(this.innocutionType=="成人咨询")
                // {
                //     this.innocutionTypeIndex=3;
                // }
                if(this.sday=="monday")
                {
                    this.sdayIndex="1";
                }else if(this.sday=="tuesday")
                {
                    this.sdayIndex="2";
                }else if(this.sday=="wendesday")
                {
                    this.sdayIndex="3";
                }else if(this.sday=="thursday")
                {
                    this.sdayIndex="4";
                }else if(this.sday=="friday")
                {
                    this.sdayIndex="5";
                }else if(this.sday=="saturday")
                {
                    this.sdayIndex="6";
                }else if(this.sday=="sunday")
                {
                    this.sdayIndex="7";
                }
                //判断一周结束星期几的索引
                if(this.eday=="monday")
                {
                    this.edayIndex="1";
                }else if(this.eday=="tuesday")
                {
                    this.edayIndex="2";
                }else if(this.eday=="wendesday")
                {
                    this.edayIndex="3";
                }else if(this.eday=="thursday")
                {
                    this.edayIndex="4";
                }else if(this.eday=="friday")
                {
                    this.edayIndex="5";
                }else if(this.eday=="saturday")
                {
                    this.edayIndex="6";
                }else if(this.eday=="sunday")
                {
                    this.edayIndex="7";
                }
                //专家所属的卫生所的id
                console.log("当前接种医生的类型是:"+this.innocutionTypeIndex);
                console.log("当前选中的星期开始的索引是:"+this.sdayIndex);
                console.log("当前选中的星期结束的索引是:"+this.edayIndex);
                // console.log(this.sday);
                // console.log(this.eday);
                this.cid=this.value2;
                console.log("当前的cid是"+this.cid);
                console.log("获取的诊所的id是"+this.value2);
                console.log("当前选中的诊所地址是"+this.value2);
                // console.log("当前选中的诊所地址的id是:"+this.value2.key);

                console.log("一周开始的具体时间:"+this.shour);
                console.log("一周结束的具体时间:"+this.ehour);
                console.log("排序的序号是:"+this.sort);
                console.log(this.mobile);
                console.log(this.pwd);
                console.log(this.itemId);
                console.log("一周开始的具体时间:"+this.shour);

                // this.dataCollect.innocutionTypeIndex=this.innocutionTypeIndex;
                // this.dataCollect.sdayIndex=this.sdayIndex;
                // this.dataCollect.edayIndex=this.edayIndex;
                // this.dataCollect.shour=this.shour;
                // this.dataCollect.ehour=this.ehour;
                // this.dataCollect.cid=this.cid;
                // this.dataCollect.avatar=this.avatar;
                // this.dataCollect.name=this.name;
                // this.dataCollect.introduce=this.introduce;
                // this.dataCollect.innocutionType=this.innocutionType;
               //传递一周开始的具体时间过去
                eventVue.$emit("releData1",this.shour);
                // //传递一周结束的具体时间过去
                eventVue.$emit("releData2",this.ehour);
                // /传递一周开始的星期几过去
                eventVue.$emit("releData3",this.sdayIndex);
                // /传递一周结束的星期几过去
                eventVue.$emit("releData4",this.edayIndex);
                // /传递诊所id
                eventVue.$emit("releData5",this.cid);
                //传递专家类型
                 eventVue.$emit("releData6",this.innocutionTypeIndex);
                //传递专家姓名
                eventVue.$emit("releData7",this.name);
                //传递专家简介
                eventVue.$emit("releData8",this.introduce);
                //传递图像路径
                eventVue.$emit("releData9",this.avatar);
                //传递排序序号
                eventVue.$emit("releData10",this.sort);

            /*    this.$router.push("/home/expertManager/expertListAdd2");*/


                this.$router.push({name:'expertListAdd2',
                    params:{
                        shour:this.shour,
                        ehour:this.ehour,
                        sdayIndex:this.sdayIndex,
                        edayIndex:this.edayIndex,
                        cid:this.cid,
                        name:this.name,
                        type:this.innocutionType,
                        introduce:this.introduce,
                        avatar:this.avatar,
                        sort:this.sort,
                        asknum:this.asknum
                    }})
                 //跳转后的页面滚动条在顶部
                this.$router.afterEach(function () {
                    window.scrollTo(0,0);
                })


            },

        },
        created()
        {
            this.baseurl=this.api;
            //this.getConsole();
            this.getAllClinicList();
        },
        mounted()
        {
            //this.getConsole();
            this.getAllClinicList();
        }
    }
</script>

<style lang="less">
    #selectOp3,#selectOp2,#selectOp1,#selectOp4
    {
        width:170px;
        margin-right:100px;
    }
    .botPartSelect
    {
        display:inline-block;
        margin-top:20px;
    }
    .spanEndText
    {
        display:inline-block;
        color:red!important;
        margin-left:30px;
    }
    .minddleSpab
    {
        color:rgba(0,0,0,0.36);
        margin-left:15px;
    }
    .el-breadcrumb__item:last-child .el-breadcrumb__inner, .el-breadcrumb__item:last-child .el-breadcrumb__inner a, .el-breadcrumb__item:last-child
    .el-breadcrumb__inner a:hover, .el-breadcrumb__item:last-child .el-breadcrumb__inner:hover{
        font-weight:400;
        cursor: text;
        color:#00979C!important;
    }
    .el-radio__input.is-checked .el-radio__inner {
        border-color: #00979C!important;
        background: #00979C!important;
    }
    .el-radio__input.is-checked+.el-radio__label {
        color: #00979C!important;
    }
    .weekSelect
    {
        width:180px;
    }
    .kkImg1
    {
        width:60px;
        height:60px;
        border-radius:50%;
    }
    #btnSub6
    {
        margin-left:30px;
    }
    #btnSub2
    {
        margin-left:0px;
        width:120px;
    }
    .el-form-item__label {
        font-weight:bold;
        font-size:20px;
    }
    #kknnvv
    {
        margin-left:0px;
    }
    .el-radio__input.is-checked .el-radio__inner {
        border-color: #00d3c2;
        background: #00d3c2;
    }
    .elText
    {
        height:auto
    }
    .el-textarea__inner {
        padding-top:50px;
        padding-bottom:50px;
        height:340px;
    }
    .specialColr
    {
        color:#009197;
    }
    .parCenter
    {
        width:90%;
        height:auto;
        /*background:red;*/
        margin:0 auto;
        margin-top:30px;
        position:relative;
    }
    .parCenter form
    {
        margin-top:30px;
    }
    .parCenter  form radio
    {
        margin-left:60px;
    }
    .parCenter form input,.parCenter form textarea
    {
        margin-left:20px;
    }
    .leftImg3
    {

        margin-left:0px;
        padding-left:0px;
        margin-left:-60px;
    }
    .particulars-container{
        height:1300px;
        .particulars-header{
            display: flex;
            height: 80px;
            line-height: 80px;
            align-items: center;
            font-size: 14px;
            color: #656565;
            padding-left: 40px;
            /*border-bottom: 1px solid #eee;*/
        }
        .particulars-info{
            height:auto;
            /*border-bottom: 1px solid #eee;*/

        }
    }
</style>
