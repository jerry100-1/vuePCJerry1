<template>
    <div class="pyu">

        <div class="articleEntry-main-input top">
            <div>视频标题</div>
            <el-input v-model="videoTitle" style="width:500px"></el-input>
        </div>

        <div class="articleEntry-main-input top colors">
            <div>视频上传</div>
                <!-- action必选参数, 上传的地址 -->
                <el-upload class="avatar-uploader el-upload--text" :action="baseurl+'/index/index/videoupload'" :show-file-list="false" :on-success="handleVideoSuccess" :before-upload="beforeUploadVideo" :on-progress="uploadVideoProcess">
                    <video v-if="videoForm.Video !='' && videoFlag == false" :src="videoForm.Video" class="avatar" controls="controls">您的浏览器不支持视频播放</video>
                    <i v-else-if="videoForm.Video =='' && videoFlag == false" class="el-icon-plus avatar-uploader-icon"></i>
                    <el-progress v-if="videoFlag == true" type="circle" :percentage="videoUploadPercent" style="margin-top:30px;"></el-progress>
                </el-upload>

        </div>



    </div>
</template>

<script>
    export default {
        name: "videoUpload",
        data(){
          return{
              title:'',
              content:'',
              videoTitle:'',
              Video:'',
              imageUrl:'',
              classroom:'',
              isShowUploadVideo:false,
              price:'',
              resource:'疫苗',
              sort:'',
              show:'显示',
              baseurl:"",
              videoUploadPercent:0,
              videoFlag:false,
              paramsdata:{},
              videoForm:{
                  Video:""
              }
          }
        },
        methods:
        {

            // //视频上传进度显示
            // uploadVideoProcess(event, file, fileList){
            //     this.videoFlag = true;
            //     this.videoUploadPercent = file.percentage.toFixed(0);
            // },
            // //上传成功
            // handleVideoSuccess(res, file) {
            //     console.log(res,file)
            //     // this.videoFlag = false;
            //     // this.videoUploadPercent = 0;
            //     if(res.status == 200){
            //         // this.videoForm.videoUploadId = res.data.uploadId;
            //         // this.videoForm.Video = res.data.uploadUrl;
            //     }else{
            //         this.$message.error('视频上传失败，请重新上传！');
            //     }
            // },
            //
            // beforeUploadVideo (file) {
            //     const isLt20M = file.size / 1024 / 1024 < 20;
            //     if (['video/mp4'].indexOf(file.type) == -1) { //'video/ogg', 'video/flv', 'video/avi', 'video/wmv', 'video/rmvb'
            //         this.$message.error('请上传正确的视频格式');
            //         return false;
            //     }
            //     if (!isLt20M) {
            //         this.$message.error('上传视频大小不能超过20MB哦!');
            //         return false;
            //     }
            //     this.isShowUploadVideo = false;
            // },
            // //进度条
            // uploadVideoProcess (event, file, fileList) {
            //     this.videoFlag = true;
            //     this.videoUploadPercent = file.percentage.toFixed(0) * 1;
            // },
            //
            // //上传成功回调
            // handleVideoSuccess (res, file) {
            //     this.isShowUploadVideo = true;
            //     this.videoFlag = false;
            //     this.videoUploadPercent = 0;
            //     if (res.errorCode == "00") {
            //         this.showVideoPath = res.sprbody.urlAddress;
            //         // this.videoForm.showVideoPath = res.data.uploadUrl;
            //     } else {
            //         this.$message.error('视频上传失败，请重新上传！');
            //     }
            // },

            beforeUploadVideo(file) {
                const isLt10M = file.size / 1024 / 1024  < 10;
                if (['video/mp4', 'video/ogg', 'video/flv','video/avi','video/wmv','video/rmvb'].indexOf(file.type) == -1) {
                    this.$message.error('请上传正确的视频格式');
                    return false;
                }
                if (!isLt10M) {
                    this.$message.error('上传视频大小不能超过10MB哦!');
                    return false;
                }
            },

            uploadVideoProcess(event, file, fileList){
                this.videoFlag = true;
                this.videoUploadPercent = file.percentage.toFixed(0);
            },
            handleVideoSuccess(res, file) {                               //获取上传图片地址
                this.videoFlag = false;
                this.videoUploadPercent = 0;
                if(res.status == 200){
                    this.videoForm.videoUploadId = res.data.uploadId;
                    this.videoForm.Video = res.data.uploadUrl;
                }else{
                    this.$message.error('视频上传失败，请重新上传！');
                }
            }

        },
        created()
        {
            this.baseurl=this.api;
        }
    }
</script>

<style scoped>
        .pyu el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
        .pyu  el-upload:hover {
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
    .video-avatar {
        width: 400px;
        height: 200px;
    }
</style>
