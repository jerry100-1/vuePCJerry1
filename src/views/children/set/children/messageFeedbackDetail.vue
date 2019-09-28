<template>
   <div class="particulars-container">
      <div class="particulars-header">
         当前位置:&nbsp;<el-breadcrumb separator-class="el-icon-arrow-right">
         <el-breadcrumb-item :to="{ path: '/home/projectSet/projectSetList' }">设置</el-breadcrumb-item>
         <el-breadcrumb-item :to="{ path: '/home/projectSet/messageFeedback' }">信息反馈</el-breadcrumb-item>
         <el-breadcrumb-item style="color:red">查看</el-breadcrumb-item>
         <!-- <el-breadcrumb-item>活动详情</el-breadcrumb-item> -->
      </el-breadcrumb>
      </div>

      <div class="particulars-info" style="border-bottom:none;">
         <!--<img src="./userInfoimages/矩形14拷贝.png" alt="">-->

         <img class="leftImg1" src="@/assets/images/leftImg9.png" alt="">

         <div class="centerCtn">
            <table>
               <tr><td class="leftTd">姓名</td><td class="rightTd">{{messageFeedbackdetail.realname}}</td></tr>
               <tr><td class="leftTd">意见反馈</td><td class="rightTd">{{messageFeedbackdetail.content}}</td></tr>
            </table>

            <input class="btnBackList" type="button" value="返回列表" @click="goBackList">

         </div>


      </div>
   </div>
</template>
<script>
   export default {
      name: "messageFeedbackDetail",
      data() {
         return{
            messageFeedbackdetail:{},
            realname:"",
            content:""
         }
      },
      methods:{
         getMessageFeedbackDetail(){
            let token=localStorage.getItem('token');
            this.$http.get('/admin/Feedback/detail',{
               params:{
                  token,
                  apitype:1,
                  id:this.$route.params.id
               }
            }).then(response=>{
               //this.userList=response.data.result.list;
               //this.id=response.data.result.list.id;
               console.log("请求信息反馈详情接口数据开始...");
               console.log(response);
               this.messageFeedbackdetail=response.data.result;
               console.log(this.messageFeedbackdetail.realname);

            })
         },
         goBackList(){
            this.$router.push("/home/projectSet/messageFeedback")
         }
      },
      created(){
         console.log("信息反馈详情页面接收到传递过来的id是"+this.$route.params.id);
         this.getMessageFeedbackDetail();
      }
   }
</script>

<style lang="less">
   input.btnBackList
   {
      background: #009793;
      height:36px;
      line-height:36px;
      color:#fff;
      width:120px;
      margin-top:20px;
      outline:none;
      border-radius: 5px;
      font-size:13px;
      float:right;
      letter-spacing:2px;
   }
   td.leftTd
   {
      text-align:right;
      font-size:13px;
      color:rgba(0,0,0,0.56);
      width:100px;
   }
   td.rightTd
   {
      text-align:left;
      font-size:13px;
      color:#333;
      /*height:36px;*/
      /*background: red;*/
      text-indent:0px;
      padding-left:20px;
      width:470px;
      line-height:36px;
      font-weight:bold;

   }
   .wrapLAR
   {
      margin-top:20px;
   }
   .el-breadcrumb__item:last-child .el-breadcrumb__inner, .el-breadcrumb__item:last-child .el-breadcrumb__inner a, .el-breadcrumb__item:last-child
   .el-breadcrumb__inner a:hover, .el-breadcrumb__item:last-child .el-breadcrumb__inner:hover{
      font-weight:400;
      cursor: text;
      color:#00979C!important;
   }
   .leftImg1
   {
      position:absolute;
      left:0px;
      top:30px;
   }
   .backBtn
   {
      width:120px;
      height:36px;
      background:#009397;
      color:#fff;
      text-align:center;
      line-height:36px;
      font-size:13px;
      margin-top:40px;
      float: right;
      position:absolute;
      right:0px;
      border-radius:5px;
      bottom:10px;
   }
   h3.cellElement1
   {
      color:#002165;
      font-size:20px;
      font-weight:bold;
   }
   .cellElement2
   {
      margin-top:10px;
   }
   .cellElement2-1
   {
      color:rgba(0,0,0,0.36);
   }
   .cellElement2-2
   {
      color:#009793;
      font-size:15px;
      margin-left:15px;
   }
   .cellElement3
   {
      font-size:13px;
      line-height:30px;
      margin-top:52px;
      color:rgba(0,0,0,0.66);
   }
   h5.cellElement4
   {
      font-size:14px;
      float: right;
      display:block;
      margin-top:30px;
   }
   .centerCtn
   {
      width:570px;
      height:410px;
      position:absolute;
      top:90px;
      text-align:left;
      left:10%;
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
         position:relative;
         /*border-bottom: 1px solid #eee;*/

      }
   }
</style>
