<template>
  <div class="vaccineExplain-container">
    <div class="articleEntry-header">当前位置&nbsp;:&nbsp;&nbsp;
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">项目管理</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/' }">疫苗</el-breadcrumb-item>
        <el-breadcrumb-item><span>{{headertitle}}</span></el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="articleEntry-nav">
        <router-link tag="div" to="/home/management/vaccineSpecification" class="specification">疫苗规格</router-link>
        <router-link tag="div" to="/home/management/vaccineExplain" class="explain">疫苗说明</router-link>
        <router-link tag="div" to="/home/management/vaccineCorrelation" class="correlation">相关疫苗</router-link>
    </div>

    <div class="articleEntry-main">

      <div class="articleEntry-main-input">
        <div>疫苗说明</div>
        <el-input type="textarea"
        v-model="explain"></el-input>
      </div>
     
      <div class="articleEntry-main-input top">
          <el-button type="primary" @click="next">下一步</el-button>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: "vaccineExplain",
  data() {
    return {
      id:'',
      headertitle:'新增',
      explain: "",
      name:'',
      vaccineStatus:'',
      dosage:[],
      relist:''
    };
  },
  methods:{
    next(){
      let name=this.name;
      let vaccineStatus=this.vaccineStatus;
      let explain=this.explain;
      let dosage=this.dosage;
      let id=this.id;
      let relevant=this.relevant;
      if(explain.trim()=='') return this.$message('疫苗说明不能为空')
      this.$router.push({name:'vaccineCorrelation',params:{id,name,vaccineStatus,explain,dosage,relevant}})
    }
  },
  created(){
    this.id=this.$route.params.id;
    this.dosage=this.$route.params.dosage;
    this.name=this.$route.params.name;
    this.vaccineStatus=this.$route.params.vaccineStatus;
    this.explain=this.$route.params.explain;
    this.relevant=this.$route.params.relevant;
    if(this.explain!=''){
      this.headertitle='编辑';
    }
  }    
};
</script>

<style lang="less">
.vaccineExplain-container {
  height: 940px;
  .articleEntry-nav{
      width:100%;
      height: 100px;
      display: flex;
      align-items: center;
      .specification{
        background-image: url('./mImages/矩形14拷贝.png');
      }
      .explain{
          background-image: url('./mImages/选中.png');
      }
      .correlation{
          background-image: url('./mImages/矩形13.png');
      }
      .specification,.explain,.correlation{
        cursor: pointer;
      }
      div{
        width: 130px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        font-weight: 700;
        color: #fff;
      }
  }
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
        margin-top: 40px;
    }
    .content{
      input{
        height: 300px;
      }
    }
    .articleEntry-main-input {
      display: flex;
      padding-left: 100px;
      div {
        width: 90px;
        line-height: 50px;
        text-align: center;
        margin-right: 20px;
        font-weight: 700;
        font-size: 14px;
      }
      .el-textarea__inner{
          width: 900px;
          height: 318px;
          resize: none;
      }
        button{
            width: 150px;
            margin-left: 110px;
        }
    }
  }
}
</style>
