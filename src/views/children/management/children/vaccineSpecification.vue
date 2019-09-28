<template>
  <div class="vaccineSpecification-container">
    <div class="articleEntry-header">当前位置&nbsp;:&nbsp;&nbsp;
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>项目管理</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/home/management/vaccine' }">疫苗</el-breadcrumb-item>
        <el-breadcrumb-item><span>{{headertitle}}</span></el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="articleEntry-nav">
        <router-link tag="div" to="/home/management/vaccineSpecification" class="specification">疫苗规格</router-link>
        <router-link tag="div" to="/home/management/vaccineExplain" class="explain">疫苗说明</router-link>
        <router-link tag="div" to="/home/management/vaccineCorrelation" class="correlation">相关疫苗</router-link>
    </div>

    <div class="articleEntry-main">
          <!-- <el-form-item label="疫苗名称">
            <el-input v-model="name" style="width:360px"></el-input>
          </el-form-item>
          <el-form-item label="疫苗状态">
              <el-radio-group v-model="vaccineStatus">
                <el-radio label="免费"></el-radio>
                <el-radio label="收费"></el-radio>
              </el-radio-group>
          </el-form-item> -->


      <div class="articleEntry-main-input">
        <div>疫苗名称</div>
        <el-input v-model="name" style="width:360px"></el-input>
      </div>

      <div class="articleEntry-main-input">
        <div>疫苗状态</div>
        <el-radio-group v-model="vaccineStatus">
          <el-radio label="-1">免费</el-radio>
          <el-radio label="1">收费</el-radio>
        </el-radio-group>
      </div>

      <el-form label-width="145px" style="margin-top:10px;"  v-for="(item, key) in form" :key="key">
          <el-form-item label="年龄" class="year">
              <el-input
                v-model="item.year"
                style="width:100px"
              >
            </el-input>
            <span class="describe">月龄</span>
            <img src="./mImages/添加.png" alt="" @click="addApplication">
          </el-form-item>
          <el-form-item label="剂次">
              <span class="input-left">第</span>
              <el-input
              v-model="item.whichnum"
               style="width:80px"
              >
              </el-input>
              <span class="describe">剂</span>   
          </el-form-item>

          <el-form-item label="总剂次">
              <span class="input-left">共</span>
                <el-input
                v-model="item.totalnum"
                style="width:80px"
                >
              </el-input>
              <span class="describe">剂</span>
              </el-form-item>

          <el-form-item label="剂次状态">
              <el-radio-group v-model="item.free">
                <el-radio label="-1">免费</el-radio>
                <el-radio label="1">收费</el-radio>
              </el-radio-group>
          </el-form-item>
      </el-form>
     
<!-- 
      <div class="articleEntry-main-input top1">
        <div>年龄</div>
         <el-input
          v-model="age"
          style="width:100px"
         >
         
        </el-input>
         <span class="describe">月龄</span>
         <img src="./mImages/添加.png" alt="">
      </div>

      <div class="articleEntry-main-input top1">
        <div>剂次</div>
        <span class="input-left describe">第</span>
        <el-input
        v-model="dose"
        >
        </el-input>
         <span class="describe">剂</span>
      </div>

      <div class="articleEntry-main-input top1">
        <div>总剂次</div>
        <span class="input-left describe">共</span>
        <el-input
        v-model="sumDose"
        >
        </el-input>
         <span class="describe">剂</span>
      </div>

       <div class="articleEntry-main-input">
        <div>剂次状态</div>
        <el-radio-group v-model="doseStatus">
          <el-radio label="免费"></el-radio>
          <el-radio label="收费"></el-radio>
        </el-radio-group>
      </div> -->


      <div class="articleEntry-main-input top">
          <el-button type="primary" @click="next">下一步</el-button>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: "vaccineSpecification",
  data() {
    return {
       cid:'',
       headertitle:'新增',
       name:'',
       vaccineStatus:'-1',
       explain:'',
       form: [{id:'',year:'',whichnum:'',totalnum:'',free:'-1'}],
       relevant:''
    };
  },
  methods:{
        //添加剂次
        addApplication() {
            this.form.push({id:'',year:'',whichnum:'',totalnum:'',free:'-1'})
        },
      //下一步
     next(){
      let name=this.name;
      let vaccineStatus=this.vaccineStatus;
      let dosage=this.form;
      let id=this.cid;
      let explain=this.explain;
      let relevant=this.relevant;

      if(name.trim()=='') return this.$message('疫苗名称不能为空');
      if(vaccineStatus.trim()=='') return this.$message('疫苗状态不能为空')
      if(dosage.length==0) return this.$message('疫苗剂次不能为空')
      
      this.$router.push({name:'vaccineExplain',params:{id,dosage,name,vaccineStatus,explain,relevant}})
    },
    // 判断编辑或新增
    judge(){
      let id=this.$route.params.id;
      this.cid=id;
      let token=localStorage.getItem('token');
      if(id!=-1){
        this.headertitle='编辑';
        this.$http.get('/admin/vaccine/detailWeb',{params:{
          token,
          id
        }}).then(response=>{
          let data=response.data.result.info;
          console.log(data)
          this.name=data.title;
          this.vaccineStatus=data.isfree;
          this.form=data.dosage;
          this.explain=data.explain;
          this.relevant=data.relevant;
        })
        
      }
    }
  },
  created(){
    this.judge();
  },    
};
</script>

<style lang="less">
.vaccineSpecification-container {
  height: 940px;
  .articleEntry-nav{
      width:100%;
      height: 100px;
      display: flex;
      align-items: center;
      .specification{
        background-image: url('./mImages/矩形14拷贝1.png');
      }
      .explain{
          background-image: url('./mImages/矩形13.png');
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
     padding-left: 100px;
    .top{
        margin-top: 25px;
    }
    .top1{
      margin-top: 10px;
    }
    .content{
      input{
        height: 358px;
      }
    }
    .articleEntry-main-input {
      display: flex;
      // padding-left: 100px;
      div{
        width: 134px;
        line-height: 50px;
        text-align: right;
        margin-right: 40px;
        font-weight: 700;
        font-size: 14px;
      }
      button{
            width: 150px;
            margin-left: 110px;
      }
    }
    .el-form-item__label{
      font-weight: 700;
      color: #000;
      margin-right:30px;
    }
    .year{
      img{
        margin-left: 50px;
        vertical-align: middle;
        cursor: pointer;
      }
    }
    .input-left{
      margin-right:10px;
    }
    .describe{
      margin-left: 10px;
    }
  }
}
</style>
