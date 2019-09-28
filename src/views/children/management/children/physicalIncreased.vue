<template>
  <div class="physicalIncreased-container">
    <div class="articleEntry-header">当前位置&nbsp;:&nbsp;&nbsp;
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>项目管理</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/home/management/physical'}">体检</el-breadcrumb-item>
        <el-breadcrumb-item><span>{{headtitle}}</span></el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="articleEntry-main">

      <div class="articleEntry-main-input top">
        <div class="input-left">体检名称</div>
        <el-input v-model="title" clearable></el-input>
      </div>
      <div class="articleEntry-main-input top content">
        <div class="input-left">体检项目介绍</div>
        <el-input 
        type="textarea"
        v-model="content"
        placeholder="请输入内容..."
        ></el-input>
      </div>

       <div class="articleEntry-main-input top select-frame">
        <div class="input-left">所属卫生所</div>
        <template>
            <el-select v-model="value" placeholder="请选择">
              <el-option
               v-for="item in options"
                :key="item.id"
                :label="item.title"
                :value="item.id">
              </el-option>
            </el-select>
          </template>
      </div>

       <div class="articleEntry-main-input">
        <div class="input-left">是否开放</div>
         <el-radio-group v-model="show">
            <el-radio label="1">是</el-radio>
            <el-radio label="-1">否</el-radio>
         </el-radio-group>
      </div>

      <div class="articleEntry-main-input top">
          <el-button type="primary" @click="add">提交</el-button>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: "physicalIncreased",
  data() {
    return {
      id:'',
      title: '',
      content: '',
      value:'',
      show:'1',
      //所属卫生所
      options:[],
      //头部标题
      headtitle:'新增'
    };
  },
  methods:{
     //获取卫生所
    getAllclinic(){
      let token=localStorage.getItem('token');
      this.$http.get('/admin/clinic/allList',{
        params:{
          token,
        }
      }).then(response=>{
        this.options=response.data.result.list;
      })
    },
     //提交
    add(){
      let token=localStorage.getItem('token');
      let cid=this.value;
      let title=this.title;
      let introduce=this.content;
      let status=this.show;
      let id=this.id;
      this.$http.get('/admin/inspect/add',{
        params:{
          token,
          id,
          cid,
          title,
          introduce,
          status
        }
      }).then(response=>{
         if(response.data.status=="0") return this.$message(response.data.message);
          this.$message({
            type:'success',
            message:response.data.message
          });
         this.$router.push('/home/management/physical')
      })
    },
    //新增或编辑
    judge(){
      let data=this.$route.params.data;
      if(data.id>-1){
        this.headtitle='编辑';
        this.title=data.title;
        this.content=data.introduce;
        this.value=data.cid;
        this.id=data.id;
        this.show=data.status;
      }
    }
  },
  created(){
    //所有卫生所
    this.getAllclinic();
    // 判断新增或者编辑
    this.judge();
  }    
};
</script>

<style lang="less">
.physicalIncreased-container {
  height: 940px;
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
  .articleEntry-main {
    .top{
        margin-top: 25px;
    }
    .content{
      input{
        height: 300px;
      }
    }
    .articleEntry-main-input {
    //   margin-top: 25px;
      display: flex;
      padding-left: 100px;
      .el-upload{
          width: 350px;
          height: 140px;
        //   background-image: url('./articleImages/摄图网_400172749.png');
      }
      .input-left{
        width: 100px;
        line-height: 50px;
        text-align: right;
        margin-right: 20px;
        font-weight: 700;
        font-size: 14px;
      }
      .el-textarea__inner{
          width: 900px;
          height: 318px;
          resize: none;
      }
      input {
        width: 900px;
      }
      .el-input{
        line-height: 50px;
      }
      .el-radio-group{
            display: flex;
            align-items: center;
        }
        button{
            width: 150px;
            margin-left: 110px;
        }
    }
    .select-frame{
      .el-select{
        width: 240px;
        .el-input .el-input--suffix{
          right: -145px;
        }
        input{
          width: 240px;
        }
      }
      
    }
  }
}
</style>
