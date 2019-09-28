<template>
    <div class="ccia">
        <div class="ccia_top">
            <button >
                {{uid?'编辑幻灯片':'添加幻灯片'}}
            </button>
        </div>

        <div class="ccia_contentbox">
            <!-- <div class="ccia_contenttop"></div> -->
            <div class="ccia_content">


                <div class="content_top">
                    <span>排序</span>
                    <div>
                        <el-input v-model="sort" placeholder="请输入内容"></el-input>
                    </div>
                </div>
                <div class="content_top">
                    <span>是否启用</span>
                    <el-radio-group v-model="status" @change=""  clearable>
                        <el-radio :label=1>启用</el-radio>
                        <el-radio :label=0>禁用</el-radio>
                    </el-radio-group>
                </div>
                <div class="content_top">
                    <span>图片位置</span>
                    <div>
                        <el-select v-model="type"   clearable  @change="typechange" style="width:150px">
                            <el-option label="景点" value="1"></el-option>
                            <el-option label="酒店" value="2"></el-option>
                            <el-option label="首页" value="3"></el-option>
                        </el-select>
                    </div>
                </div>

                <div class="content_top">
                    <span>跳转类型</span>
                    <el-radio-group v-model="tzurltype">
                        <el-radio :label="1">商品路径</el-radio>
                        <el-radio :label="2">其他路径</el-radio>
                    </el-radio-group>
                </div>
                <div v-if="tzurltype==1">
                    <div class="content_top">
                        <span>商品路径</span>
                        <div>
                            <el-input v-model="goodsid" placeholder="请选择商品"></el-input>
                            <button @click="shopping" style="margin-left:0">选择商品</button>
                        </div>
                    </div>
                </div>
                <div v-if="tzurltype==2">
                    <div class="content_top">
                        <span>跳转路径</span>
                        <div>
                            <el-input v-model="tzurl" placeholder="www.baidu.com"></el-input>
                        </div>
                    </div>
                </div>
                <div class="content_top">
                    <span>轮播图描述</span>
                    <div>
                        <el-input v-model="detail" placeholder="请输入内容"></el-input>
                    </div>
                </div>
                <div class="content_top content_toplogo">
                    <span>轮播图图片</span>
                    <div>
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
                                :on-exceed="onexceed">
                            <i class="el-icon-plus" ></i>
                        </el-upload>
                        <el-dialog :visible.sync="dialogVisible">
                            <img width="100%" :src="dialogImageUrl" alt="">
                        </el-dialog>
                    </div>

                </div>
                <div class="tips">
                    <p>推荐尺寸: (270X148)</p>
                </div>



                <div class="submitbox">
                    <button @click="submit">提交</button>
                    <button @click="goback">返回列表</button>

                </div>


            </div>
        </div>
        <el-dialog
                :visible.sync="shopDialogVisible"
                width="400"
                center>
            <div style="overflow:hidden">
                <el-input placeholder="可搜索商品名" class="search_input"  style="float:left;width:500px"   v-model="keyword" clearable @keyup.enter.native="searchshop"></el-input>
                <el-button @click="searchshop" class="searchbtn" style="float:left;background-color:#28B7A3;margin-left:10px;color:#fff">搜索</el-button>
            </div>

            <el-table
                    ref="multipleTable"
                    :data="tableData"
                    tooltip-effect="dark"
                    style="width: 100%"
            >

                <el-table-column
                        prop="title"
                        label="名称"
                        width="200">
                </el-table-column>

                <el-table-column
                        label="景点主图"
                        width="150">
                    <template  slot-scope="scope">
                        <img style="width:60%;height:60%" :src="scope.row.pic" alt="">
                    </template>

                </el-table-column>

                <el-table-column
                        prop="type"
                        label="类型"
                >
                    <template slot-scope="scope">
                        <span v-if="scope.row.type==1">景点</span>
                        <span v-if="scope.row.type==2">酒店</span>
                    </template>
                </el-table-column>

                <el-table-column
                        fixed="right"
                        label="操作">
                    <template slot-scope="scope">
                        <!-- <span class="edit"><i class="iconfont icon-geren"></i></span> -->
                        <el-button type="text" @click="xuanzhe(scope.row)">选中</el-button>

                        <!-- <span class="edit" @click="tosetting(scope.row)"><i class="el-icon-setting"></i></span> -->
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                    background
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-size="limit"
                    layout="total, prev, pager, next, jumper"
                    :total="total">
            </el-pagination>

            <span slot="footer" class="dialog-footer" >
                      <el-button @click="oncancel" style="margin-left:35%;">取 消</el-button>
                    </span>

        </el-dialog>
    </div>
</template>
<script>
    export default {
        name:"expertListAdd3",
        data(){
            return{
                uid:'',

                sort:'',
                status:'',
                detail:'',
                tzurl:'',
                type:'',
                tzurltype:'',
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
                //表格
                tableData: [],

                // 分页
                currentPage:1,
                limit:10,
                total:0,
                selltype:'',

            }
        },
        methods:{

            typechange(val){

                this.type=val

            },
            xuanzhe(row){
                console.log(row.id,123);
                this.goodsid=row.id
                this.shopDialogVisible=false;
            },

            searchshop(val){

                this.shopping()
            },
            handleCurrentChange(val) {
                // console.log(`当前页: ${val}`);
                this.currentPage = val
                this.shopping()
            },

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
                         console.log(article_image)
                        var params = {
                            imgdata: article_image,
                        };
                        that.$http.post(that.api+'/index/index/uploadimg', params)
                            .then(res => {
                                  console.log(res)
                                if (res.data.status==1){

                                    console.log(res);
                                    console.log("这是接口返回给我的数据！")

                                    that.img_list.push({name:file.name,url:res.data.result.url,imgurl:res.data.result.imgurl})
                                    that.$message.success(res.data.message);



                                } else if (res.data.status == 0) {

                                    console.log(res);

                                    console.log("这也是接口返回给我的数据！")

                                    this.$message.error(res.data.result.message);
                                }

                            })
                            .catch(error => {
                                // console.log(error)
                            })
                    }
                }
            },
            goback(){
                this.$router.go(-1)
            },
            // 提交
            submit(){
                let imgbmp = []
                this.img_list.forEach(item => {
                    imgbmp.push(item.imgurl)
                });
                imgbmp = imgbmp.join(',')
                console.log(imgbmp,32132);
                let apiurl=""
                if(this.uid){
                    apiurl='admin/Lunboimgs/upd'
                }else{
                    apiurl='admin/Lunboimgs/add'
                }

                this.$http.post(this.api+apiurl,{
                    id:this.uid,
                    sort:this.sort,
                    status:this.status,
                    detail:this.detail,
                    type:this.type,
                    tzurltype:this.tzurltype,
                    goodsid:this.goodsid,
                    tzurl:this.tzurl,
                    imgurl:imgbmp
                }).then(res=>{
                    // console.log('提交',res)
                    if(res.data.status==1){
                        this.$message.success(res.data.message);
                        this.$router.push('/pptlist')
                    }else{
                        this.$message.error(res.data.message);
                    }
                })
            },
            shopping(){
                this.shopDialogVisible=true;
                this.getshopping()

            },
            oncancel(){
                this.shopDialogVisible=false;
            },
            // 获取数据
            getinfo(){
                this.$http.post(this.api+'admin/Lunboimgs/detail',{
                    id:this.uid
                }).then(res=>{
                    console.log('数据',res)
                    if(res.data.status==1){
                        this.sort = res.data.result.sort
                        this.status = Number(res.data.result.status)
                        this.type=res.data.result.type
                        this.detail = res.data.result.detail
                        this.tzurltype=Number(res.data.result.tzurltype)
                        console.log(this.tzurltype,6666);

                        this.img_list=[{
                            name:'图片',
                            url:res.data.result.imgurl,
                            imgurl:res.data.result.imgurl
                        }]
                        if(this.tzurltype==1){
                            this.goodsid= res.data.result.goodsid
                        }else if(this.tzurltype==2){
                            this.tzurl = res.data.result.tzurl
                        }else{
                            this.goodsid=='',
                                this.tzurl=''
                        }
                    }
                })
            },
            //商品列表
            getshopping(){
                if(this.type=='3'){
                    this.type=''
                }
                this.$http.post(this.api+'admin/View/sellList',{
                    page:this.currentPage,
                    limit:this.limit,
                    keywords:this.keyword,
                    selltype:this.selltype,
                    type:this.type,
                }).then(res=>{
                    console.log('商品数据',res)
                    if(res.data.status==1){
                        this.tableData=res.data.result.list
                        this.total = +res.data.result.total;
                        if(this.type==''){
                            this.type='3'
                        }
                    }
                })
            }
        },

        created() {
            this.baseurl=this.api
        },
        mounted(){

            this.uid = Number(this.$route.params.id)


            if(this.uid){
                this.getinfo()

                console.log(this.tzurltype,5555);
            }




        }
    }
</script>
<style lang="less" scoped>
    .ccia{
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
                outline:none;
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
                .tips{
                    margin-top: 5px;
                    padding-left:176px;
                    color: #999;
                    font-size: 13px;
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
                        outline: sortne;
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

