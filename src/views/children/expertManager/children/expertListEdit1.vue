<template>
    <div class="particulars-container" style="height:1400px;!important;">
        <div class="particulars-header">
            当前位置:&nbsp;<el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home/expertManager/expertList' }">专家管理</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/home/expertManager/expertList' }">专家列表</el-breadcrumb-item>
            <el-breadcrumb-item>编辑</el-breadcrumb-item>
            <!-- <el-breadcrumb-item>活动详情</el-breadcrumb-item> -->
        </el-breadcrumb>
        </div>

        <div class="particulars-info" style="border-bottom:none;">
            <!--<img src="./userInfoimages/矩形14拷贝.png" alt="">-->

            <div class="parCenter" style="height:1200px;!important;">
                <img src="@/assets/images/leftImg3.png" class="leftImg3" alt="">

                <el-form label-width="140px">
                     <el-form-item label="专家头像">
                         <!--<img src="@/assets/images/wwImg1.png" class="kkImg1" alt="">-->

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
                        <el-input v-model="name"   placeholder="默认的姓名"></el-input>
                    </el-form-item>
                    <el-form-item label="专家介绍">
                        <el-input type="textarea" v-model="introduce" placeholder="主治医师,拥有15年儿童保健健康教育工作经验,擅长儿童保健相关知识等  ...."></el-input>
                    </el-form-item>

                    <el-form-item label="所在的卫生所">

                        <!--<el-select v-model="cid" placeholder="请选择时间" id="selectOp1" class="weekSelect">-->
                        <!--<el-option label="地址1" value="地址1"></el-option>-->
                        <!--<el-option label="地址2" value="地址2"></el-option>-->
                        <!--<el-option label="地址3" value="地址3"></el-option>-->
                        <!--<el-option label="地址4" value="地址4"></el-option>-->
                        <!--<el-option label="地址5" value="地址5"></el-option>-->
                        <!--<el-option label="地址6" value="地址6"></el-option>-->
                        <!--<el-option label="地址7" value="地址7"></el-option>-->
                        <!--</el-select>-->

                        <el-select v-model="cid" @change="" placeholder="请选择" id="seleId1">
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
                        <el-radio-group style="margin-left:20px;"  v-model="type">
                            <el-radio   :label="1">儿保咨询</el-radio>
                            <el-radio   :label="2">接种咨询</el-radio>
                            <el-radio   :label="3">成人咨询</el-radio>
                        </el-radio-group>
                    </el-form-item>


                    <el-form-item label="在线时间">

                        <el-select v-model="sday" id="seleoop1" placeholder="请选择时间" class="weekSelect">
                            <el-option label="星期一" value="monday"></el-option>
                            <el-option label="星期二" value="tuesday"></el-option>
                            <el-option label="星期三" value="wendesday"></el-option>
                            <el-option label="星期四" value="thursday"></el-option>
                            <el-option label="星期五" value="friday"></el-option>
                            <el-option label="星期六" value="saturday"></el-option>
                            <el-option label="星期天" value="sunday"></el-option>
                        </el-select>
                        <span class="minddleSpab">&nbsp; &nbsp;--&nbsp;&nbsp;</span>

                        <el-time-select id="seleoop2"
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

                        <span class="spanEndText"> (*天)</span>
                        <br>


                        <div class="botPartSelect">

                                <el-select v-model="eday" id="seleoop3" placeholder="请选择时间" class="weekSelect">
                                    <el-option label="星期一" value="monday"></el-option>
                                    <el-option label="星期二" value="tuesday"></el-option>
                                    <el-option label="星期三" value="wendesday"></el-option>
                                    <el-option label="星期四" value="thursday"></el-option>
                                    <el-option label="星期五" value="friday"></el-option>
                                    <el-option label="星期六" value="saturday"></el-option>
                                    <el-option label="星期天" value="sunday"></el-option>
                                </el-select>
                                <span class="minddleSpab">&nbsp; &nbsp;--&nbsp;&nbsp;</span>

                            <el-time-select id="seleoop4"
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
                        <el-input v-model="avatar" placeholder="10"></el-input>
                    </el-form-item>



                    <el-form-item>

                        <el-button id="btnSub6"  type="primary" @click="editExpert" style="width:160px;">提交</el-button>

                    </el-form-item>


                </el-form>

            </div>



        </div>
    </div>
</template>
<script>
    import eventVue from '../../../../eventVue.js'
    export default {
        name: "expertListEdit",
        data()
        {
             let self =this;
            return{
                textDes:"查找",
                zoom:16,
                resource: '',
                center:[121.59996,31.197646],
                shour:"",
                ehour:"",
                eday:"",
                allClinicList:[],
                sday:"",
                sdayIndex:"",
                edayIndex :"",
                //专家所在的卫生所id
                cid:"",
                tzurl:'',
                type:'1',
                tzurltype:'',
                imageUrl:"",
                imageurl:"",
                goodsid:'',//商品id
                tzurl:'',
                // 上传文件夹
                img_list: [],
                // imgbmp:[],
                baseurl:'',
                dialogVisible:false,
                dialogImageUrl:"",
                baseurl:"",
                relefeImgUrl:"",

                //专家类型
                type:"",
                mid:"",
                name:"",
                introduce:"",
                avatar:" ",
                sort:"",
                thirdNum:"",
                asknum:"",
                form: {
                    region: '',
                    date1: '',
                },
                options2: [{
                    value: '选项1',
                    label: '黄金糕'
                }],
                value2: '',
            }
        },
        methods:
        {
            // radio的处理
            // clickitem (e) {
            //     e === this.radio2 ? this.radio2 = '' : this.radio2 = e
            // },
            // 处理用户图像
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
            fn2:function()
            {
                //接收传递过来的数据 shour  ehour  sdayIndex  edayIndex  cid  innocutionTypeIndex name introduce avatar sort
                eventVue.$on("editData1",(message1)=>{
                    this.shour=message1;
                    console.log("接收到的数据1是:"+this.shour);

                    console.log("当前的this.shour是:"+this.shour);

                    this.thirdNum = this.shour;

                    //this.$set(this.shour,message1)
                    //that.$refs.shour1.value=message1;
                });
                eventVue.$on("editData2",(message2)=>{
                    this.ehour = message2;
                    console.log("接收到的数据2是:"+this.ehour)
                });
                eventVue.$on("editData3",(message3)=>{
                    this.sdayIndex = message3;
                    console.log("接收到的数据3是:"+ this.sdayIndex)
                });
                eventVue.$on("editData4",(message4)=>{
                    this.edayIndex = message4;
                    console.log("接收到的数据4是:"+this.edayIndex )
                });
                eventVue.$on("editData5",(message5)=>{
                    this.cid = message5;
                    console.log("接收到的数据5是:"+ this.cid)
                });
                eventVue.$on("editData6",(message6)=>{
                    this.mid = message6;
                    console.log("接收到的数据6是:"+this.mid)
                });
                eventVue.$on("editData7",(message7)=>{
                    this.name = message7;
                    console.log("接收到的数据7是:"+this.name)
                });
                eventVue.$on("editData8",(message8)=>{
                    this.introduce = message8;

                    console.log("接收到的数据8是:"+this.introduce)
                });
                eventVue.$on("editData9",(message9)=>{
                    this.avatar = message9;
                    console.log("接收到的数据9是:"+this.avatar )
                });
                eventVue.$on("editData10",(message10)=>{
                    this.sort = message10;
                    console.log("接收到的数据10是:"+this.sort )
                });
                eventVue.$on("editData11",(message11)=>{
                    this.asknum = message11;
                    console.log("接收到的数据11是:"+this.asknum )
                });
            },
            //编辑后提交
            editExpert()
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
                if(this.cid=="")
                {
                    this.$message.error("请选择卫生所地址");
                    return;
                }
                if(this.type=="")
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
                if(this.sort=="")
                {
                    this.$message.error("请输入排序序号 1 升序 2 降序");
                    return;
                }

                let token=localStorage.getItem('token');
                this.$http.get('/admin/expert/add',{
                    params:{
                        token,
                        apitype:1,
                        avatar:this.avatar,
                        id:this.$route.params.id,
                        name:this.name,
                        introduce:this.introduce,
                        cid:this.cid,
                        type:this.type,
                        sday:this.sday,
                        eday:this.eday,
                        shour:this.shour,
                        ehour:this.ehour,
                        sort:this.sort
                    }
                }).then(response=>{
                    //this.userList=response.data.result.list;
                    //this.id=response.data.result.list.id;
                    console.log("这是编辑专家接口返回的数据..."+response);

                    if(response.data.status==1)
                    {
                        this.$message.success("编辑专家成功");
                     //   this.$router.push("/home/expertManager/expertList")
                    }else
                    {
                        this.$message.error("编辑专家失败请确保");
                    }


                    console.log(response);
                    //this.expertList=response.data.result.list;
                });
            }

        },
        created()
        {
            this.fn2();
            console.log("您好");
            console.log("接收传递过来的参数是"+this.$route.params.shour);
            console.log("您好");
            this.shour=this.$route.params.shour;
            this.ehour=this.$route.params.ehour;
            this.edayIndex=this.$route.params.eday;
            this.sdayIndex=this.$route.params.sday;
            this.name=this.$route.params.name;
            // this.mid=this.$route.params.mid;
            // console.log("接收到的mid是"+mid);
            this.introduce=this.$route.params.introduce;
            this.avatar=this.$route.params.avatar;
            this.sort=this.$route.params.sort;
            this.type=this.$route.params.type;

           // alert(this.$route.params.type);


            // let type = this.resource;
            // let url=this.url;
            // if (type == "疫苗") {
            //     type = 1;
            // } else if (type == "婴儿") {
            //     type = 2;
            // } else if (type == "活动") {
            //     type = 3;
            // } else if (type == "专题") {
            //     type = 4;
            // }
            //


            if(this.$route.params.type=="1")
            {
                this.type="儿保咨询";
                // this.$refs.rf1.checked="true";
               // alert("6666666666666666666666666");
            }else if(this.$route.params.type=="2")
            {
                //alert("7777777777777777777777777");
                this.type="接种咨询";
                // this.$refs.rf2.checked="true";
            }else if(this.$route.params.type=="2")
            {
                this.type="成人咨询";
                // this.$refs.rf3.checked="true";
               // alert("888888888888888888888888");
            }



            this.type=this.$route.params.type;
            this.asknum=this.$route.params.asknum;
            console.log("接收传递过来的参数是"+this.$route.params.ehour);
            console.log("接收传递过来的参数是"+this.$route.params.sday);
            console.log("接收传递过来的参数是"+this.$route.params.eday);
            //专家所在的卫生所id
            console.log("接收传递过来的参数卫生所地址是"+this.$route.params.cid);
            //专家类型
            console.log("接收传递过来的参数专家类型是"+this.$route.params.type);
            console.log("接收传递过来的参数111111111111111是"+this.$route.params.mid);
            console.log("接收传递过来的参数是"+this.$route.params.name);
            console.log("接收传递过来的参数是"+this.$route.params.introduce);
            console.log("接收传递过来的参数是"+this.$route.params.avatar);
           // this.dialogImageUrl=this.$route.params.avatar;

            this.img_list.push({name:"",url:this.$route.params.avatar,imgurl:this.$route.params.avatar})

            console.log("接收传递过来的参数是"+this.$route.params.sort);
            console.log("接收传递过来的参数是"+this.$route.params.asknum);
            console.log("接收传递过来的参数id是"+this.$route.params.id);
            this.getAllClinicList();

            // this.editExpert();


        }
    }
</script>

<style lang="less">
    #seleoop1,#seleoop2,#seleoop3,#seleoop4
    {
        width:180px;
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
        margin-left:0px;
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
