<template>
  <div class="vaccineCorrelation-container">
    <div class="articleEntry-header">当前位置&nbsp;:&nbsp;&nbsp;
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">项目管理</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/' }">疫苗</el-breadcrumb-item>
        <el-breadcrumb-item><span>新增</span></el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="articleEntry-nav">
        <router-link tag="div" to="/home/management/vaccineSpecification" class="specification">疫苗规格</router-link>
        <router-link tag="div" to="/home/management/vaccineExplain" class="explain">疫苗说明</router-link>
        <router-link tag="div" to="/home/management/vaccineCorrelation" class="correlation">相关疫苗</router-link>
    </div>

    <div class="articleEntry-main">

      <div class="articleEntry-main-input" v-for="(i,key) in form" :key="key">
        <div class="input-left">疫苗列表</div>
        <div>
          <el-select v-model="i.value" placeholder="请选择"  @change="channelCard(key)">
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.title"
              :value="item.id">
            </el-option>
          </el-select>
        </div>
        <img src="./mImages/添加.png" @click="add" alt="">
      </div>
     

      <div class="articleEntry-main-input top">
          <el-button type="primary" @click="submit">提交</el-button>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: "vaccineCorrelation",
  data() {
    return {
      form:[{value:''}],
      name:'',
      explain:'',
      isfree:'',
      dosage:[],
      //疫苗列表
      options:[],
      //疫苗id
      relevant:'',
    };
  }, 
  methods:{
    add(){
      this.form.push({value:''})
    },
    channelCard(key) {
            // this.relevant='';
            let obj = {}
            obj = this.options.find((item) => {
                return item.id === this.form[key].value
            })
            this.form[key].id = obj.value;
            this.relevant+=obj.id+',';
      },

    submit(){
      let token=localStorage.getItem('token');
      let title=this.name;
      let explain=this.explain;
      let isfree=this.isfree;
      let dosage=this.dosage;
      let relevant=this.relevant;
      if(relevant.substr(-1) == ",") {
        relevant = relevant.substring(0, relevant.lastIndexOf(','));
      }
      
      console.log(relevant)
      // this.$http.post('/admin/vaccine/add',{
      //     token,
      //     title,
      //     explain,
      //     relevant,
      //     isfree,
      //     dosage,

      // }).then(response=>{
      //   if(response.data.status=="0") return this.$message(response.data.message);
      //   this.$message({
      //     type:'success',
      //     message:response.data.message
      //     })
      //   this.$router.push('/home/management/vaccine');
      // })
    },
    //所有疫苗列表
    getAllvaccine(){
      let token=localStorage.getItem('token');
      this.$http.get('/admin/vaccine/getlistApp',{
        params:{
          token
        }
      }).then(response=>{
      this.options=response.data.result.list;
      })
    }
  },
  created(){
    this.dosage=this.$route.params.dosage;
    this.name=this.$route.params.name;
    this.isfree=parseInt(this.$route.params.vaccineStatus);
    this.explain=this.$route.params.explain;
    let relevant=this.$route.params.relevant;
    this.relevant=relevant;
    if(relevant){
      this.form=[];
    }
    if(relevant){
      let m = relevant.split(",");
    let sArr=[{value:''}];
    for(let i=0; i <m.length; i++){
      let obj={
        value:m[i]
      }
      this.form.push(obj)
    }
  }
    
    //疫苗列表
    this.getAllvaccine();
  }   
};
</script>

<style lang="less">
.vaccineCorrelation-container {
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
          background-image: url('./mImages/矩形13.png');
      }
      .correlation{
          background-image: url('./mImages/选中.png');
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
        margin-top: 25px;
    }
    .content{
      input{
        height: 300px;
      }
    }
    .articleEntry-main-input {
      display: flex;
      align-items: center;
      padding-left: 100px;
      .input-left{
        width: 90px;
        line-height: 50px;
        text-align: center;
        margin-right: 20px;
        font-weight: 700;
        font-size: 14px;
      }
      input {
        width: 350px;
        height: 35px;
        outline: none;
        border: 1px solid #E0E0E0;
        border-radius: 5px;
        padding-left: 18px;
        }
       img{
         height: 18px;
         margin-left: 20px;
         cursor: pointer;
        }
       button{
            width: 150px;
            margin-left: 110px;
        }
    }
  }
}
</style>
