<template>
    <div class="particulars-container">
        <div class="particulars-header">
            当前位置:&nbsp;<el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home/user/userInfo' }">用户管理</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/home/user/userBannerList' }">用户轮播图</el-breadcrumb-item>
            <el-breadcrumb-item style="color:red">编辑</el-breadcrumb-item>
            <!-- <el-breadcrumb-item>活动详情</el-breadcrumb-item> -->
        </el-breadcrumb>
        </div>

        <div class="particulars-info" style="border-bottom:none;">
            <!--<img src="./userInfoimages/矩形14拷贝.png" alt="">-->

            <div class="parCenter">
                <el-form label-width="120px">
                    <el-form-item label="标题">
                        <el-input v-model="title" placeholder="关山街七一七区卫生服务中心"></el-input>
                    </el-form-item>
                    <el-form-item label="链接">
                        <el-input v-model="link" placeholder="关山街七一七区卫生服务中心"></el-input>
                    </el-form-item>

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

                    <el-form-item label="所属模块区域">
                        <el-input v-model="place" placeholder="关山街七一七区卫生服务中心"></el-input>
                    </el-form-item>

                    <el-form-item label="状态">
                        <el-radio-group v-model="status" style="margin-left:20px;">
                            <el-radio label="展示"></el-radio>
                            <el-radio label="不展示"></el-radio>
                        </el-radio-group>
                    </el-form-item>

                    <el-form-item>

                        <el-button id="btnSub36"  type="primary" @click="commitEditUserBanner" style="width:160px;margin-left:20px;">提交</el-button>

                    </el-form-item>


                </el-form>

            </div>



        </div>
    </div>
</template>
<script>
    export default {
        name: "userBannerEdit",
        data()
        {

            return{
                id:"",
                title:"",
                link:"",
                place:"",
                status:"",
                placeText:"",
                statusText:"",
                thumb:"",
                tzurl:'',
                tzurltype:'',
                imageUrl:"",
                // 上传文件夹
                img_list: [],
                // imgbmp:[],
                baseurl:'',
                dialogVisible:false,
                dialogImageUrl:"",
                relefeImgUrl:""
            }
        },
        methods:
            {
                goBackList()
                {
                    this.$router.push("/home/user/userBannerList");
                },
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
                            that.$http.post('/index/index/uploadimg', params)
                                .then(res => {
                                    console.log(res)
                                    if (res.data.status==1){
                                        console.log(res);
                                        that.relefeImgUrl=res.data.result.imgurl;
                                        console.log("这是图片上传接口返回给我的路径"+that.relefeImgUrl);
                                        console.log("这是接口返回给我的数据！")

                                        that.thumb=that.relefeImgUrl;

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
                // 编辑后提交
                commitEditUserBanner()
                {
                    if(this.title=="")
                    {
                        this.$message.error("亲,请填写轮播图名称!");
                        return
                    }
                    if(this.link=="")
                    {
                        this.$message.error("亲,请填写轮播图相关链接!");
                        return
                    }
                    if(this.img_list=="")
                    {
                        this.$message.error("亲,请添加轮播图图片!");
                        return
                    }
                    if(this.place=="")
                    {
                        this.$message.error("亲,请填写轮播图所属板块!");
                        return
                    }
                    if(this.status=="")
                    {
                        this.$message.error("亲,请设置轮播图是否展示!");
                        return
                    }

                    if(this.status=="不展示")
                    {
                        this.status="0";
                    }else if(this.status=="展示")
                    {
                        this.status="1";
                    }
                    if(this.place=="首页")
                    {
                        this.place=1;
                    }else if(this.place=="微课堂")
                    {
                        this.place=2;
                    }else if(this.place=="个人中心")
                    {
                        this.place=3;
                    }else if(this.place=="医生问答")
                    {
                        this.place=4;
                    }


                    let token=localStorage.getItem('token');
                    this.$http.get('/admin/lunboimgs/add',{
                        params:{
                            token,
                            apitype:1,
                            id:this.$route.params.id,
                            title:this.title,
                            link:this.link,
                            place:this.place,
                            status:this.status,
                            thumb:this.thumb
                        }
                    }).then(response=>{
                        //this.userList=response.data.result.list;
                        //this.id=response.data.result.list.id;
                        console.log("这是编辑轮播图接口返回的数据..."+response);

                        if(response.data.status==1)
                        {
                            this.$message.success("编辑轮播图成功");
                            this.$router.push("/home/user/userBannerList")
                        }else
                        {
                            this.$message.error("编辑轮播图失败请确保参数");
                        }
                        console.log(response);
                        //this.expertList=response.data.result.list;
                    });
                }


            }
        ,
        created()
        {
            // this.addNoti();
            console.log("编辑页面接收到的id是:"+this.$route.params.id);
            this.id=this.$route.params.id;
            console.log("编辑页面接收到的title是:"+this.$route.params.title);
            this.title=this.$route.params.title;
            console.log("编辑页面接收到的link是:"+this.$route.params.link);
            this.link=this.$route.params.link;
            console.log("编辑页面接收到的placeText是:"+this.$route.params.placeText);
            this.placeText=this.$route.params.placeText;
            console.log("编辑页面接收到的statusText是:"+this.$route.params.statusText);
            this.status=this.$route.params.statusText;
            this.place=this.$route.params.placeText;
            this.statusText=this.$route.params.statusText;
            console.log("编辑页面接收到的thumb是:"+this.$route.params.thumb);
            this.thumb=this.$route.params.thumb;

            this.img_list.push({name:"",url:this.$route.params.thumb,imgurl:this.$route.params.thumb})
        }
    }
</script>

<style lang="less">
    .el-breadcrumb__item:last-child .el-breadcrumb__inner, .el-breadcrumb__item:last-child .el-breadcrumb__inner a, .el-breadcrumb__item:last-child
    .el-breadcrumb__inner a:hover, .el-breadcrumb__item:last-child .el-breadcrumb__inner:hover{
        font-weight:400;
        cursor: text;
        color:#00979C!important;
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
    }
    .particulars-container{
        height: 980px;
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
