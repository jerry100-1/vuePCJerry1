<template>
  <div class="healthcenter-container">
    <div class="search">
      <el-input style="width:700px;" v-model="input" placeholder="可搜索姓名" @keyup.native.enter="search"></el-input>
      <el-button class="btnSearch" type="primary" style="margin-left:120px!important;" @click="search">搜索</el-button>
      <el-button type="primary" @click.native="compile(-1)">新增</el-button>
    </div>
    <!-- 表格数据 -->
    <el-table :data="list" stripe style="width:100%;padding-left:0px;" :cell-style="cellStyle">
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="title" label="角色"></el-table-column>
      <el-table-column prop="createtime" label="修改时间"></el-table-column>

      <el-table-column prop label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="compile(scope.row)">编辑</el-button>
          <el-button size="mini" type="primary" @click="open7(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="block">
      <div class="block" style="text-align:center">
        <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[5, 10]" 
                :page-size="pagesize"         
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">    
                    >
            </el-pagination>
      </div>
    </div>

    
    <!--新增和编辑的弹出框-->

    <div class="wrapModalDialog2" v-if="flag3==true">
      <div class="centerModalDialog2">
        <span class="modalEl12" @click="cancel">&times;</span>
        <div class="wrapCtnIn2">
          <el-form ref="form3" label-width="80px" label-position="left">
            <el-form-item label="角色">
              <el-select v-model="value" placeholder="请选择角色名称" style="width:100%">
                <el-option
                  v-for="item in options"
                  :key="item.id"
                  :label="item.title"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="用户头像" class="wrapCtnIn2-img">
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
            </el-form-item>

            <el-form-item label="用户名" style="margin-top:10px;">
              <el-input v-model="user"></el-input>
            </el-form-item>

            <el-form-item label="密码">
              <el-input v-model="pwd"></el-input>
            </el-form-item>

            <el-form-item>
              <el-button type="default" id="defaultBtn2" @click.native="flag3=false">取消</el-button>
              <el-button type="primary" id="confirmBtn2" @click.native="admAdd">确认</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "accountConfiguration",
  data() {
    return {
      centerDialogVisible: false,
      centerDialogVisible2: false,
      flag: true,
      flag2: false,
      flag3: false,
      class1: "class1",
      class2: "class2",
      input: "",
      
      //角色列表
      options: [],
      //   表格数据
      list: [],
      //分页
      // 总行数
      total: 0,
      currentPage: 1,
      pagesize: 10,
      //上传图片
      imageUrl: "",
      img_list: [],

      dialogImageUrl: "",
      dialogVisible: false,

      user:"",
      pwd:"",
      value: "",
      //编辑新增请求地址
      url:'add',
      //编辑时的id
      id:'',
      

      
    };
  },
  methods: {
    cellStyle(row, column, rowIndex, columnIndex) {
      if (row.column.label == "角色") {
        return "color:#FCB623";
      }
    },
    //表格
    toAddPage() {
      this.$router.push("/home/authorityManager/roleConfigurationAdd");
    },
    editOpen() {
      this.$router.push("/home/authorityManager/roleConfigurationEdit");
    },
    handleEdit(index, row) {},
    //跳转页面
    // skip(){
    //     // this.$emit("list")
    //     this.$router.push("/home/healthcenter/healthcenterEdit");
    // },

     handleSizeChange(val) {
          this.pagesize = val;
          this.getList();
            },
    handleCurrentChange(val) {
          this.currentPage = val;
          this.getList();
      },
    //弹窗
    open7(id) {
      this.$confirm("是否确定删除?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        center: true
      })
        .then(() => {
          this.del(id);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //管理员列表
    getList(keyword = "") {
      let token = localStorage.getItem("token");
      let page = this.currentPage;
      let limit = this.pagesize;
      this.$http
        .get("/admin/User/index", {
          params: {
            token,
            page,
            limit,
            keyword
          }
        })
        .then(response => {
          this.list = response.data.result.list;
          this.total = parseInt(response.data.result.total);
        });
    },
    //角色列表
    getroleList() {
      let token = localStorage.getItem("token");
      this.$http
        .get("/admin/User/grouplist", {
          params: {
            token
          }
        })
        .then(response => {
          if (response.data.status == "1") {
            this.options = response.data.result;
          }
        });
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
    //管理员新增编辑
    admAdd() {
        this.flag3=false;
        let token=localStorage.getItem('token');
        let name=this.user;
        let password=this.pwd;
        let avatar=this.imageUrl;
        let url=this.url;
        let id=this.id;
        if(avatar=='') return this.$message('头像不能为空');
        let groupid=this.value;
        this.$http.post('/admin/User/'+url,{
            token,
            id,
            name,
            avatar,
            password,
            groupid
        }).then(response=>{
           if(response.data.status=="1"){
               this.getList();
               this.$message({
                 type:'success',
                 message:response.data.message
               })
           }
            this.$message(response.data.message)
        })
    },
    //编辑
    compile(data){
        this.flag3=true;
        if(data!=-1){
          this.url='edit',
          this.id=data.id;
          this.user=data.name;
          this.pwd='';
          this.value=data.groupid;
          this.imageUrl=data.avatar;
        }else{
          this.user='';
          this.pwd='';
          this.value='';
          this.imageUrl='';
          this.img_list=[]
        }
        if(data!=-1 && this.img_list.length != 1){
           this.img_list.push({name:"",url:data.avatar,imgurl:data.avatar})
        }
    },
    // 删除
    del(id){
      let token=localStorage.getItem('token');
      this.$http.get('/admin/User/del',{
        params:{
          token,
          id
        }
      }).then(response=>{
          if(response.data.status!="1") return this.$message(response.data.message)
           this.$message({
            type: "success",
            message: response.data.message
          });
          this.getList();
      })
    },
    cancel(){
        this.flag3=false;
        this.user='';
        this.pwd='';
        this.value='';
        this.imageUrl='';
        this.img_list=[]
    },
    //搜索
    search(){
      let keyword=this.input;
      this.getList(keyword);
    }
  },
  created() {
    this.getList();
    //角色列表
    this.getroleList();
  }
};
</script>

<style lang="less">
.myclass {
  font-size: 12px;
}
/*:class="flag===true:class1?class2"*/
input::-webkit-input-placeholder {
  /* placeholder颜色  */
  color: #009793;
  /* placeholder字体大小  */
  font-size: 14px;
  /* placeholder位置  */
}
input:focus {
  border: 1px solid #009397;
}
input {
  border: 1px solid #009397;
}
#defaultBtn {
  background: rgba(0, 0, 0, 0.08);
  height: 36px;
  margin-left: 15px;
}
#confirmBtn {
  height: 36px;
  margin-left: 40px;
}
input {
  outline: none;
}
.wrapCtnIn select {
  width: 319px !important;
}
.wrapCtnIn {
  width: 82%;
  height: 216px;
  /*background: blueviolet;*/
  margin: 0px auto;
  margin-top: 60px;
}
.modalEl1 {
  display: inline-block;
  width: 26px;
  height: 26px;
  text-align: center;
  line-height: 22px;
  border-radius: 50%;
  color: #fff;
  background: rgba(0, 0, 0, 0.16);
  position: absolute;
  right: 15px;
  top: 15px;
  font-size: 20px;
}
.wrapModalDialog {
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.26);
  z-index: 200;
}
.centerModalDialog {
  width: 484px;
  height: 304px;
  background: #fff;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -242px;
  margin-top: -152px;
  border-radius: 10px;
}

input::-webkit-input-placeholder {
  /* placeholder颜色  */
  color: #009793;
  /* placeholder字体大小  */
  font-size: 14px;
  /* placeholder位置  */
}
input:focus {
  border: 1px solid #009397;
}
input {
  border: 1px solid #009397;
}
#defaultBtn2 {
  background: rgba(0, 0, 0, 0.08);
  height: 36px;
  margin-left: 15px;
}
#confirmBtn2 {
  height: 36px;
  margin-left: 40px;
}
input {
  outline: none;
}
.wrapCtnIn2 select {
  width: 319px !important;
}
.wrapCtnIn2 {
  width: 82%;
  height: 216px;
  /*background: blueviolet;*/
  margin: 0px auto;
  margin-top: 60px;
  .wrapCtnIn2-img{
      margin-bottom: 0;
  }
}
.modalEl12 {
  display: inline-block;
  width: 26px;
  height: 26px;
  text-align: center;
  line-height: 22px;
  border-radius: 50%;
  color: #fff;
  background: rgba(0, 0, 0, 0.16);
  position: absolute;
  right: 15px;
  top: 15px;
  font-size: 20px;
  cursor: pointer;
}
.wrapModalDialog2 {
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.26);
  z-index: 200;
}
.centerModalDialog2 {
  width: 484px;
  height: 500px;
  background: #fff;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 10px;
}

.class1 {
  color: #fdb625;
}
.class2 {
  color: rgba(0, 0, 0, 0.36);
}
.search input {
  /* width: 600px; */
  margin-left: 95px;
  border: 1px solid #009397;
}
.cell button {
  background: #00979c;
}
.block .el-pagination {
  margin: 80px auto;
}
el-button.btnSearch {
  margin-left: 125px;
}
.el-button--primary {
  color: #fff;
  background-color: #00979c;
  border-color: #00979c;
}
.healthcenter-container {
  height: 940px;
  background-color: #fff;
}
.healthcenter-container .search {
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

.search input {
  /*width: 600px;*/
  margin-left: 95px;
}
.search button {
  width: 80px;
  height: 40px;
  background: #00979c;
  margin-left: 100px;
}
.search button:nth-child(1) {
  margin-left: 125px;
}

el-table th {
  text-align: center;
  font-size: 16px;
  color: #000;
  font-weight: bold;
  background-color: #f5f5f5;
  line-height: 50px;
}
el-table td {
  text-align: center;
  font-size: 14px;
  color: #8e8e8e;
  height: 60px;
}

.el-pagination {
  text-align: center;
  margin-top: 50px;
  .number {
    height: 30px;
    border: 1px solid #d9d9d9;
    margin: 0 5px;
    border-radius: 5px;
  }
  .el-pager li.active {
    color: #fff;
    background-color: #00969d;
  }
}
</style>
