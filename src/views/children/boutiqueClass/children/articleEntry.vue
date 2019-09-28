<template>
  <div class="articleEntry-container elmm" style="overflow-y:auto!important;">
    <div class="articleEntry-header">
      当前位置&nbsp;:&nbsp;&nbsp;
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>精品课堂</el-breadcrumb-item>
        <el-breadcrumb-item>
          <span>{{headline}}</span>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="articleEntry-main">
      <div class="articleEntry-main-img">
        <p>文章录入</p>
      </div>

      <div class="articleEntry-main-input top">
        <div class="left-title">标题</div>
        <el-input v-model="title" style="width:900px"></el-input>
      </div>

       <!-- style="position:relative;top:-230px;left:-15px;" -->
      <div class="content_top top">
          <div class="left-title">内容</div>
          <div>
              <ediTor  v-model="content" :t_value="content"  class="quill-editor editor" size="small" style="display:inline-block;max-height:200px;height:200px;">>

              </ediTor>
          </div>
      </div>
      <div class="articleEntry-main-input top">
        <div class="left-title">图片</div>


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
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
      </div>

      <div class="articleEntry-main-input top">
        <div  class="left-title">类别</div>
        <el-radio-group v-model="resource">
          <el-radio label="1">疫苗</el-radio>
          <el-radio label="2">育儿</el-radio>
          <el-radio label="3">活动</el-radio>
          <el-radio label="4">专题</el-radio>
        </el-radio-group>
      </div>

      <div class="articleEntry-main-input">
        <div  class="left-title">排序</div>
        <el-input v-model="sort" style="width:900px"></el-input>
      </div>

      <div class="articleEntry-main-input">
        <div  class="left-title">展示</div>
        <el-radio-group v-model="show">
          <el-radio label="1">显示</el-radio>
          <el-radio label="-1">隐藏</el-radio>
        </el-radio-group>
      </div>
      <div class="articleEntry-main-input top">
        <el-button type="primary" @click="add">提交</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import ediTor from './editor.vue'
export default {
  name: "articleEntry",
  data() {
    return {
      id:"",
      title: "",
      content: "",
      imageUrl: "",
      resource: "1",
      show: "1",
      //排序
      sort: "",
      //头部大标题
      headline:'文章录入',
      //路径
      url:"/admin/Classroom/add",

      //上传图片
      img_list: [],
      dialogImageUrl: "",
      dialogVisible: false
    };
  },
  created(){
   //判断编辑或新增
   this.judge();
  },
   components: {
      ediTor
  },
  methods: {
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

    //添加文章或修改
    add(id='') {
      let uid = JSON.parse(localStorage.getItem("userinfo")).id;
      let token = localStorage.getItem("token");
      let title = this.title;
      let content = this.content;
      let pic = this.imageUrl;
      let type = this.resource;
      let url=this.url;
      let status = this.show;
      let sort = this.sort;
      this.$http
        .post(url, {
          token,
          id:this.id,
          uid,
          title,
          content,
          pic,
          type,
          status,
          sort
        })
        .then(response => {
          if (response.data.status !== "1") return this.$message(response.data.message);
          this.$message({
            type: "success",
            message:response.data.message
          });
          this.title = this.content = this.imageUrl = this.resource = this.show = this.sort ="";
          this.img_list=[];
          this.$router.push('/home/boutiqueClass/articleList');
        });
    },
    //判断新增或者编辑
    judge(){
      let data=this.$route.params.data;
      if(data.id>-1){
        this.headline='修改';
        this.url="/admin/Classroom/upd";
        this.img_list.push({name:"",url:data.pic,imgurl:data.pic})
        this.imageUrl=data.pic;
        this.id=data.id;
        this.title=data.title;
        this.content=data.content;
        this.sort=data.sort;
        this.resource=data.type;
        this.show=data.status;
      }
    },
  }

};
</script>

<style lang="less" scoped>
.editor
    {
        height:230px!important;
        // width:900px;
        /*min-width:776px!important;*/
    }
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
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
.articleEntry-container {
  height: 100%!important;
  &::-webkit-scrollbar
  {
    display:none;
  }
  .articleEntry-header {
    height: 80px;
    border-bottom: 1px solid #eee;
    display: flex;
    align-items: center;
    padding-left: 40px;
    font-size: 14px;
    color: #a9a9a9;
    .el-breadcrumb__inner {
      color: #a9a9a9;
      span {
        color: #00979c;
      }
    }
  }
  .articleEntry-main {
    .articleEntry-main-img {
      width: 130px;
      height: 30px;
      background-image: url("./articleImages/矩形14拷贝.png");
      margin-top: 30px;
      line-height: 30px;
      text-align: center;
      color: #fff;
      p {
        font-weight: 700;
      }
    }
    .top {
      margin-top: 25px;
    }
    .top1{
      margin-top:10px;
    }
    .content {
      input {
        height: 300px;
      }
    }
    .articleEntry-main-input {
      //   margin-top: 25px;
      display: flex;
      padding-left: 100px;
      img {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
      .el-upload {
        width: 350px;
        height: 140px;
        background-image: url("./articleImages/摄图网_400172749.png");
      }
      .left-title{
        width: 50px;
        line-height: 50px;
        text-align: center;
        margin-right: 20px;
        font-weight: 700;
        font-size: 14px;
      }
      .el-upload-list--picture-card .el-upload-list__item{
        width: 350px;
        height: 140px;
      }
      .el-textarea__inner {
        width: 900px;
        height: 318px;
        resize: none;
      }
      input {
        width: 900px;
        line-height: 50px;
      }
      .el-radio-group {
        display: flex;
        align-items: center;
      }
      button {
        width: 150px;
        margin-left: 70px;
      }
      // .input-uploadimg{
      //   div{
      //     display: flex;
      //     width: 350px;
      //     position: relative;
      //     i{
      //       position: absolute;
      //       top: 50%;
      //       left: 50%;
      //       transform: translate(-50%,-50%)
      //     }
      //   }
      // }
    }
  }
   .content_top{
      display: flex;
      padding-left: 100px;
               .left-title{
                width: 50px;
                line-height: 50px;
                text-align: center;
                margin-right: 20px;
                font-weight: 700;
                font-size: 14px;
                }
                .el-select{
                    width: 100px;
                    height: 32px;;
                  }
                }
}
</style>
