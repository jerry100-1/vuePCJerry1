<template>
  <div class="particulars-container">
    <div class="particulars-header">当前页面:&nbsp;
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path:'/home/user/userInfo' }">用户信息</el-breadcrumb-item>
        <el-breadcrumb-item>用户详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="particulars-info">
      <div class="particulars-info-user">
        <p>用户信息</p>
      </div>
      <div class="particulars-info-list">
        <img :src="userMessage.avatar" alt>
        <div class="particulars-info-list-right">
          <div>
            <p>姓名:
              <span>{{userMessage.realname}}</span>
            </p>
          </div>
          <div class="list-two">
            <p>性别:
              <span>{{userMessage.sex == '1' ? '男' : '女'}}</span>
            </p>
          </div>
          <div>
            <p>余额:
              <span>{{userMessage.money}}</span>
            </p>
            
          </div>
        </div>
        <div class="particulars-info-list-right two">
          <div>
            <p>账号ID:
              <span>{{userMessage.id}}</span>
            </p>
          </div>
          <div class="list-two">
            <p>手机号:
              <span>{{userMessage.mobile}}</span>
            </p>
          </div>
          <div>
            <p>出生年月:
              <span>{{userMessage.birthday}}</span>
            </p>
          </div>
        </div>
        <div class="particulars-info-list-right">
          <div>
            <p>身份证号:
              <span>{{userMessage.idcard}}</span>
            </p>
          </div>
          <div class="list-two">
            <p>所在区域:
              <span>{{userMessage.province}}</span>
            </p>
          </div>
          <div>
            <p>接种单位:
              <span>{{userMessage.title}}</span>
            </p>
          </div>
        </div>
      </div>

      <router-link tag="el-button" to="/home/user/userInfo" type="primary">返回列表</router-link>
    </div>

    <div class="particulars-baby">
      <div class="particulars-baby-user">
        <p>宝宝信息</p>
      </div>

      <div class="particulars-baby-info">
        <el-table :data="userChildren" style="width: 100%">
          <el-table-column label="头像" width="140">
            <template slot-scope="scope">
                    <img :src="scope.row.avatar" alt="">
                </template>
          </el-table-column>
          <el-table-column prop="cname" label="姓名"></el-table-column>
          <el-table-column prop="birthday" label="出生年月"></el-table-column>
          <el-table-column prop="sex" label="性别">
               <template slot-scope="scope">
                  <span>{{scope.row.sex | formatStatus}}</span>
               </template>
          </el-table-column>
          <el-table-column prop="ctitle" label="接种地点" width="150"></el-table-column>
          <el-table-column prop="nexus" label="与宝宝关系">
               <template slot-scope="scope">
                  <span>{{scope.row.nexus | formatRelation}}</span>
               </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name:'userdetailPage',
    data() {
      return {
        id:'',
        userMessage:{},
        userChildren:[]
      }
    },
    created(){
      this.id=this.$route.params.id;
      this.getUserInfo();
    },
    methods:{
      //用户详情
      getUserInfo(){
        let token=localStorage.getItem('token');
        this.$http.get('/admin/Member/detail',{
          params:{
            token,
            id:this.id
          }
        }).then(response=>{
          this.userMessage=response.data.result;
          this.userChildren=response.data.result.children;
          console.log( this.userMessage)
        })
      }
    },
    filters:{
      formatStatus(val){
        return val == 1 ? '男' : val == 2 ? '女' : '未知';
      },
      formatRelation(val){
         return val == 1 ? '爸爸' : val == 2 ? '妈妈' : val == 3 ? '爷爷': val == 4 ? '奶奶': val == 5 ? '外公': val == 6 ? '外婆': val == 7 ? '叔叔': val == 8 ? '阿姨':'未知';
      }
  }
  }
</script>


<style lang="less">
  .particulars-container{
      height: 940px !important;
    .particulars-header {
      display: flex;
      height: 80px;
      line-height: 80px;
      align-items: center;
      font-size: 14px;
      color: #656565;
      padding-left: 40px;
      border-bottom: 1px solid #eee;
    }
    .particulars-info {
      height: 307px;
      border-bottom: 1px solid #eee;
      padding-bottom: 30px;
      .particulars-info-user {
        background-image: url("./userInfoimages/矩形14拷贝.png");
        background-size: 100% 100%;
        width: 130px;
        height: 30px;
        line-height: 30px;
        margin-top: 50px;
        text-align: center;
        p {
          color: #fff;
          font-weight: 700;
        }
      }
      .particulars-info-list {
        display: flex;
        align-items: center;
        margin-top: 50px;
        img {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          margin-left: 26px;
        }
        .particulars-info-list-right {
          margin-left: 60px;
          line-height: 20px;
          width: 260px;
          .list-two {
            line-height: 70px;
          }
          div {
            font-size: 14px;
            p {
              color: #808080;
              span {
                color: #000;
              }
            }
          }
        }
      }
      button {
        height: 37px;
        margin-top: 18px;
        margin-left: 1064px;
        background-color: #00969d;
        color: #fff;
      }
    }
    .particulars-baby {
      .particulars-baby-user {
        background-image: url("./userInfoimages/矩形14.png");
        background-size: 100% 100%;
        width: 130px;
        height: 30px;
        line-height: 30px;
        margin-top: 50px;
        text-align: center;
        p {
          color: #fff;
          font-weight: 700;
        }
      }
      .particulars-baby-info {
        margin-top: 45px;
        width: 770px;
        margin-left: 80px;
        border: 1px solid #eee;
        border-radius: 5px;
        border-bottom:none;
        img{
          width: 45px;
          height: 45px;
          border-radius: 50%;
        }
        .el-table{
          padding: 0;
          margin-top: 0;
        }
        th{
          text-align: center;
          background-color: #F5F5F5;
          color: #000;
          font-weight: 700;
        }
        td{
          text-align: center;
        }
      }
    }
  }
</style>
