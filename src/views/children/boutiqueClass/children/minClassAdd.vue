<template>
  <div class="minClassAdd-container" style="overflow-y:auto!important;">
    <div class="articleEntry-header">当前位置&nbsp;:&nbsp;&nbsp;
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>精品课堂</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/home/boutiqueClass/minClass' }">微课堂</el-breadcrumb-item>
        <el-breadcrumb-item><span>{{headertitle}}</span></el-breadcrumb-item>
      </el-breadcrumb>
    </div>


     <div class="particulars-info" style="border-bottom:none;">

            <div class="parCenter">
                <el-form ref="form" label-width="120px">
                    <el-form-item label="课堂名称">
                       <el-input v-model="title" style="width:900px"></el-input>
                    </el-form-item>

                    <el-form-item label="主讲人">
                       <el-input v-model="speaker" style="width:900px"></el-input>
                    </el-form-item>


                    <el-form-item label="课堂简介" class="brief">
                        <ediTor  v-model="content" :t_value="content"  class="quill-editor editor" size="small" style="display:inline-block;max-height:200px;height:200px;">>

                        </ediTor>
                    </el-form-item>

                    <el-form-item label="视频标题" class="vidTitle">
                        <el-input v-model="videoTitle" style="width:500px"></el-input>
                        <img src="./articleImages/关闭2.png" class="shut">
                        <el-button id="btnSub66"  type="primary" style="width:100px;margin-left:100px;background-color: yellow;">添加</el-button>
                    </el-form-item>

                    <el-form-item label="视频上传" class="upvideo">
                         <el-upload
                            class="avatar-uploader"
                            :action="''"
                            accept='.mp4,.qlv,.qsv,.ogg,.flv,.avi,.wmv,.rmvb'
                            :show-file-list="false"
                            :before-upload="beforeUploadVideo"
                            >
                            <video
                              v-if="Video !='' && videoFlag == true"
                              :src="Video"
                              width="100%"
                              height="100%"
                              controls="controls"
                            >您的浏览器不支持视频播放</video>

                            <img v-else-if="Video =='' && videoFlag == false" src="./articleImages/上传.png" alt="">
                            <p v-if="Video =='' && videoFlag == false">上传视频</p>

                            </el-upload>
                    </el-form-item>

                    <el-form-item label="主图" class="map">
                         <el-upload
                            action="http://ck.hongbao19.net/index/index/uploadimg"
                            list-type="picture-card"
                            :on-preview="handlePictureCardPreview"
                            :before-remove="beforeRemove"
                            :on-remove="handleRemove"
                            :file-list="img_list"
                            :on-success="uploadSuccess"
                            :before-upload="beforeAvatarUpload"
                            :limit="1"
                            :on-exceed="onexceed"
                            >
                            <i class="el-icon-plus"></i>
                            <img v-if="imageUrl" :src="imageUrl" class="avatar">
                        </el-upload>
                    </el-form-item>

                    <el-form-item label="课程节数" class="quantity">
                        <el-input v-model="classroom" style="width:200px">
                            <template slot="suffix">/节</template>
                        </el-input>
                    </el-form-item>

                    <el-form-item label="课程价格" class="quantity">
                        <el-input v-model="price" style="width:200px">
                            <template slot="suffix">/元</template>
                        </el-input>
                    </el-form-item>

                    <el-form-item label="市场划线价格" class="quantity">
                        <el-input v-model="storemoney" style="width:200px">
                            <template slot="suffix">/元</template>
                        </el-input>
                    </el-form-item>

                    <el-form-item label="是否完结" class="choice">
                        <el-radio-group v-model="resource">
                            <el-radio label="1">是</el-radio>
                            <el-radio label="-1">否</el-radio>
                        </el-radio-group>
                    </el-form-item>

                     <el-form-item label="排序">
                          <el-input v-model="sort" style="width:900px"></el-input>
                    </el-form-item>

                     <el-form-item label="展示" class="choice">
                         <el-radio-group v-model="show">
                            <el-radio label="1">显示</el-radio>
                            <el-radio label="-1">隐藏</el-radio>
                        </el-radio-group>
                    </el-form-item>


                    <el-form-item>

                        <el-button id="btnSub66"  type="primary" @click="submit" style="width:160px;margin-left:20px;">提交</el-button>
                    </el-form-item>


                </el-form>

            </div>

        </div>



 </div>
</template>

<script>
import ediTor from './editor.vue'
export default {
  name: "minClassAdd",
  data() {
    return {
      title:'',
      content:'',
      speaker:'',
      videoTitle:'',
      Video:'',
      VideoUrl:'',
      imageUrl:'',
      classroom:'',
      price:'',
      storemoney:'',
      resource:'1',
      sort:'',
      show:'-1',
       //上传图片
      img_list: [],
      dialogImageUrl: "",
      dialogVisible: false,
      //视频
      videoFlag:false,
      //头部导航
      headertitle:"新增",
      //修改时的数据
      url:'/admin/Lesson/add',
      id:'',
    };
  },
 methods:{
      //视频上传
      beforeUploadVideo(file) {
            let fd = new FormData();
            fd.append('upload',file);//传文件
            this.$http.post('http://ck.hongbao19.net/index/index/videoupload',fd).then(res=>{
                  if(res.data.status=="0") return this.$message(res.data.message);
                  this.$message({
                    type:'success',
                    message:'视频上传成功'
                  })
                  this.Video=res.data.result.url;
                  this.VideoUrl=res.data.result.videourl;
                  this.videoFlag=true;
            })
      },

    handleRemove(file, fileList) {
      this.img_list = fileList;
    },
    // 点击上传的文件的钩子
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    onexceed(files, fileList) {
      this.$message.warning("只能上传一张图片!");
    },
    // 上传成功
    uploadSuccess(response, file, fileList) {
      //点击延时
      // setTimeout(() => {
      //    this.uploadDisabled = 1;
      //    that.isDisabled = false;
      // }, 1000);
    },
    // 上传之前
    beforeAvatarUpload(file) {
      var that = this;
      // 判断类型是不是图片
      if (!/image\/\w+/.test(file.type)) {
        that.$message("请确保文件为图像类型");
        return false;
      } else {
        var article_image, image_base64;
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function(e) {
          image_base64 = this.result.split(",")[1];
          article_image = image_base64;
          var params = {
            imgdata: article_image
          };
          that.$http
            .post("http://ck.hongbao19.net/index/index/uploadimg", params)
            .then(res => {
              if (res.data.status == 1) {
                that.imageUrl = res.data.result.imgurl;
              }
            });
        };
      }
    },
    //提交
    submit(){
      let id=parseInt(this.id);
      let url=this.url;
      let token=localStorage.getItem('token');
      let uid=JSON.parse(localStorage.getItem('userinfo')).id;
      let title=this.title;
      let speaker=this.speaker;
      let content=this.content;
      let number=this.classroom;
      let pic=this.imageUrl;
      let video=[];
      let pc={
        'title':this.videoTitle,
        'pic':this.imageUrl,
        'video':this.VideoUrl,
      }
      video.push(pc)
      let price=this.price;
      let storemoney=this.storemoney;
      let isend=this.resource;
      let status=this.show;
      let sort=this.sort;
      if(this.title.trim()=='') return this.$message('课堂名称不能为空');
      if(this.speaker.trim()=='') return this.$message('主讲人不能为空');
      if(this.content.trim()=='') return this.$message('课堂简介不能为空');
      if(this.videoTitle.trim()=='') return this.$message('视频标题不能为空');
      if(this.imageUrl.trim()=='') return this.$message('主图不能为空');
      if(this.VideoUrl.trim()=='') return this.$message('视频不能为空');
      this.$http.post(url,{
        token,
        id,
        uid,
        title,
        speaker,
        content,
        number,
        pic,
        video,
        price,
        storemoney,
        isend,
        status,
        sort
      }).then(response=>{
        if(response.data.status=='0') return this.$message({
          type:'error',
          message:response.data.message
        })
        this.$message({
          type:'success',
          message:response.data.message
        })
        this.$router.push('/home/boutiqueClass/minClass');
      })
    },
    //新增或修改
    judge(data){
      console.log(data)
      if(data!="-1"){
        this.url="/admin/Lesson/upd";
        this.id=data.id;
        this.headertitle='修改';
        this.title=data.title;
        this.speaker=data.speaker;
        this.content=data.content;
        this.classroom=data.number;
        this.imageUrl=data.pic;
        this.img_list.push({name:"",url:data.pic,imgurl:data.pic})

        this.videoTitle=data.video[0].title;
        // this.imageUrl=data.video[0].pic;
        this.Video=data.video[0].video;
        this.VideoUrl=data.video[0].video;
        this.videoFlag=true;

        this.price=data.price;
        this.storemoney=data.storemoney;

        this.resource=data.isend;

        this.show=data.status;

        this.sort=data.sort;
        }

    }
  },
  created(){
    let data=this.$route.params.data;
    this.judge(data);
  },
  components: {
      ediTor
  },
}
</script>

<style lang="less">
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
.minClassAdd-container {
  height: 100%;
  .articleEntry-header {
    height: 80px;
    border-bottom: 1px solid #eee;
    display: flex;
    align-items: center;
    padding-left: 40px;
    font-size: 14px;
    color:#A9A9A9;
    .el-breadcrumb__inner{
        color:#A9A9A9;
        span{
          color:#00979C;
        }
    }
  }
  .particulars-info{
      .brief{
         .editor{
            margin-left: 10px !important;
        }
      }
      .upvideo{
        margin-top: 20px;
          .avatar-uploader{
              margin-left: 20px;
             .el-upload--text{
                 position: relative;
                  width: 200px;
                  height: 120px;
                  background-color: #E0E0E0;
                   img{
                        position: absolute;
                        top:50%;
                        left: 50%;
                        transform: translate(-50%,-50%);
                    }
                    p{
                        position: absolute;
                        top:55%;
                        left: 50%;
                        transform: translate(-50%,0%);
                        color:#999999;
                        font-size: 12px;
                    }
              }
          }
      }
      .vidTitle{
          display: table-cell;
          vertical-align: middle;
          white-space: nowrap;
          img{
            vertical-align: middle;
            cursor: pointer;
          }
          button{
            background-color: #FFCC33 !important;
            border:none;
          }
      }
      .map{
          .avatar{
              display: none;
          }
          .el-form-item__content{
              div{
                  margin-left: 10px;
              }
          }
      }
      .quantity{
          .el-input__inner{
              width: 200px;
          }
      }
      .choice{
          .el-radio-group{
              margin-left: 20px;
          }
      }
  }
}
</style>
