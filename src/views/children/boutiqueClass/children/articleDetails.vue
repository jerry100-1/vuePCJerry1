<template>
  <div class="articleDetails-container">

    <div class="articleDetails-header">当前位置&nbsp;:&nbsp;&nbsp;
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>精品课堂</el-breadcrumb-item>
        <el-breadcrumb-item>
          <span>详情</span>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="articleDetails-main">
        <h2>{{list.title}}</h2>
        <div class="articleDetails-main-time"><span>{{list.createtime_text}}</span><p>{{list.typeText}}</p></div>
        
        <div class="articleDetails-main-item">
             <img :src="list.pic" alt="">
            <h3></h3>

            <p v-html="list.content"></p>
        </div>

        <!-- <div class="articleDetails-main-item">
             <img src="./articleImages/652ac450ccdfad921fa13d0d755976dc.png" alt="">
            <h3>2，为什么要给孩子进行预防接种?</h3>
            <p>阿萨德阿萨德阿萨德阿萨德阿萨德阿萨德阿萨德阿萨德阿萨德阿萨德阿萨德阿萨德阿萨德阿萨德阿萨德阿萨德阿萨德阿萨德阿萨德阿萨德阿萨德阿萨德阿萨德阿萨德阿萨德阿萨德阿萨德阿德阿萨德阿萨德</p>
        </div> -->

    </div>

  </div>
</template>

<script>
export default {
  name: "articleDetails",
  data () {
    return {
        list:{}
    }
  },
  methods:{
   
  },
  created(){
    this.list=this.$route.params.data;
    console.log(this.$route.params.data)
  }
};
</script>

<style lang="less">
.articleDetails-container {
  height: 940px;
   .articleDetails-header {
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
  .articleDetails-main{
      width: 550px;
      height: 100%;
      margin: 0 auto;
      padding-top: 40px;
      h2{
          font-size: 20px;
          color:#022366;
      }
      .articleDetails-main-time{
          display: flex;
          line-height: 40px;
          font-size: 14px;
          span{
              color:#999999;
              margin-right:10px;
          }
          p{
              color:#00979D;
          }
      }
       .articleDetails-main-item{
              margin-top: 40px;
              h3{
                  line-height: 45px;
                  font-weight: 700;
              }
              p{
                  font-size: 14px;
                  color:#808080;
                  margin-top: 5px;
                  word-wrap:break-word;
                  word-break:break-all;
                  overflow: hidden;
              }
              img{
                width: 100%;
                max-height: 400px;
              }
     }
  }
}
</style>