<template>
  <div class="healthcenter-container">

    <div class="innerCtnWrap">

      <!--<el-row>-->
        <!--<el-button type="primary">主要按钮</el-button>-->
        <!--<el-button type="primary">主要按钮</el-button>-->
      <!--</el-row>-->
      <input type="button" value="编辑" class="editBtn">
      <!--<input type="button" value="上传" class="uploadBtn" :on-change="handleChange"-->
             <!--:file-list="fileList">-->
      <!--<el-upload style="position:absolute;right:0px;top:-60px;"-->
              <!--class="upload-demo"-->
              <!--action="https://jsonplaceholder.typicode.com/posts/"-->
              <!--:on-change="handleChange"-->
              <!--:file-list="fileList">-->
        <!--<el-button size="small" type="primary">点击上传</el-button>-->
        <!--&lt;!&ndash;<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>&ndash;&gt;-->
      <!--</el-upload>-->
      <el-upload style="position:absolute;right:0px;top:-60px;"
                 class="upload-demo"
                 action="https://jsonplaceholder.typicode.com/posts/"
                 :on-change="handleChange"
                >
        <el-button size="small" type="primary">上传</el-button>
        <!--<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
      </el-upload>

      <div class="centerRentangle">
          <h3>用户协议</h3>
          <textarea placeholder="请输入内容...">

          </textarea>

        <input type="button" value="提交" class="submitBtn">
      </div>

    </div>

  </div>
</template>

<script>
  export default {
    name: "userAgreement",
    data() {
      return {
        // fileList: [{
        //   name: 'food.jpeg',
        //   url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        // }, {
        //   name: 'food2.jpeg',
        //   url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        // }]
      };
    },
    methods: {
      handleChange(file, fileList) {
        this.fileList = fileList.slice(-3);
      }
    }
  };
</script>

<style lang="less">
  el-button [type="primary"]:hover
  {
    background:#009397!important;
  }

  .innerCtnWrap
  {
    /*width:92%;*/
    width:1340px;
    height:832px;
    margin:90px auto;
    display:flex;
    flex-direction:row;
    justify-content:space-between;
    position:relative;
  }
  .upload-demo button
  {
    height:38px!important;
    width: 80px!important;
    background:#fff!important;
    border:1px solid #009397!important;
    color:#009397;
  }
  .upload-demo button:hover
  {
    color:#009397;
    background:#009397;
  }
  .editBtn
  {
    width:80px;
    height:38px;
    position:absolute;
    top:-60px;
    right:150px;
    background:#009793;
    font-size:14px;
    color:#fff;
    line-height:38px;
    text-align:center;
    border-radius:5px;
  }
  .submitBtn
  {
    width:152px;
    height:38px;
    border-radius:5px;
    background: #009397;
    color:#fff;
    margin:0 auto;
    margin-top:30px;
  }
  .uploadBtn
  {
    width:80px;
    height:38px;
    position:absolute;
    font-size:14px;
    top:-60px;
    right:0px;
    background:#fff;
    color:#009793;
    line-height:38px;
    text-align:center;
    border-radius:5px;
    border:1px solid #009793;
  }
  el-upload.upload-demo
  {
    background:#fff;
    border:1px solid #009397;
    color:#009397;
    position:absolute;
    font-size:14px;
    top:-60px;
    width:80px;
    right:0px;
    &:hover
    {
      color:red;
    }
  }
  .centerRentangle h3
  {
    margin:0 auto;
    font-weight:bold;
    margin-bottom:15px;
  }
  .centerRentangle textarea
  {
    width:100%;
    height:726px;
    outline:none;
    padding-top:20px;
    text-indent:20px;
    margin-top:5px;
    border:none;
    border:1px solid rgba(0,0,0,0.16);
  }
  .centerRentangle
  {
    width:552px;
    height:832px;
    margin:0 auto;
    text-align:center;
    margin-top:-60px;
  }

  .editBtn
  {
    /*position:absolute;*/
    /*width:*/
  }
  .boxset
  {
    width:402px;
    height:200px;
    border-radius:10px;
    overflow:hidden;
    position:relative;
    /*flex:1;*/
  }
  .boxset img
  {
    width:400px;
    height:200px;
    position:absolute;
    top:0px;
    left:0px;
  }
  .boxset h3
  {
    font-weight:bold;
    font-size:22px;
    color:#fff;
    position:absolute;
    left:40px;
    top:40px;
    white-space:nowrap;
    text-overflow:ellipsis;
    overflow:hidden;
  }
  .boxset span
  {
    font-size:36px;
    color:#fff;
    position:absolute;
    width:100%;
    white-space:nowrap;
    text-overflow:ellipsis;
    overflow:hidden;
    left:40px;
    bottom:40px;
  }


  .healthcenter-container
  {
    height: 940px;
    background-color: #fff;
  }
  .healthcenter-container  .search
  {
    width: 100%;
    height: 106px;
    line-height: 106px;
    display: flex;
    align-items: center;
  }
  /*.el-input {*/
  /*width: 700px;*/
  /*}*/
  .el-input__inner {
    border: 1px solid #00979c;
  }


</style>














































