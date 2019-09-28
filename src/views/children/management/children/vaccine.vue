<template>
  <div class="vaccine-container">
      <div class="search">
        <el-input v-model="input" placeholder="可搜索疫苗名称" @keyup.native.enter="search"></el-input>
        <el-button type="primary" @click="search">搜索</el-button>
        <el-button type="primary" @click="compile(-1)">新增</el-button>
        <el-button type="primary" @click="skip">库存</el-button>
      </div>
      <!-- 表格 -->
      <el-table :data="list" stripe style="width:100%">
        <el-table-column prop="id" label="序号"></el-table-column>
        <el-table-column prop="title" label="疫苗名称"></el-table-column>
        <el-table-column prop="createtimeText" label="操作时间"></el-table-column>

        <el-table-column label="操作">
            <template slot-scope="scope">
                <el-button
                size="mini"
                type="primary"
                @click="compile(scope.row.id)">编辑</el-button>
                <el-button
                size="mini"
                type="primary"
                @click="open7(scope.row.id)">删除</el-button>        
            </template>
      </el-table-column>
    </el-table>


  
  
            <div class="block">
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
</template>

<script>
export default {
  name: "vaccine",
  data() {
    return {
        //输入框
      input: "",
      //是否开放
      value:true,
        //表格数据
       list:[],
        //分页
       // 总行数
        total:0,
        currentPage: 1,
        pagesize:10,
    };
  },
    methods: {
        //表格
      handleEdit(index, row) {
        
       
      },
      //跳转页面
      skip(){
            this.$router.push("/home/management/vaccineInventory");  
      },
      //编辑
      compile(id){
         this.$router.push({name:'vaccineSpecification',params:{id}});
      },

      //分页
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
        this.$confirm('是否确定删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        //   type: 'warning',
          center: true
        }).then(() => {
          this.delvaccine(id)
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
       //获取疫苗列表
      getList(keyword=''){
        let token=localStorage.getItem('token');
        let page=this.currentPage;
        let limit=this.pagesize;
        this.$http.get('/admin/vaccine/getlist',{
          params:{
            token,
            page,
            limit,
            keyword,
          }
        }).then(response=>{
          this.list=response.data.result.list;
          this.total=parseInt(response.data.result.total);
        })
      },
      //搜索
       search(){
         let input=this.input;
         this.getList(input);
       },
      
      //删除疫苗
      delvaccine(id){
        let token=localStorage.getItem('token');
        this.$http.get('/admin/vaccine/del',{
          params:{
            token,
            id
          }
        }).then(response=>{
          if(response.data,status=='0') return this.$message({
              type:'error',
              message:response.data.message
          })
            this.$message({
              type:'success',
              message:response.data.message
              });
            this.getList();
        })
      }
    },
    created(){
      //获取疫苗列表
      this.getList();
    },
};
</script>

<style lang="less">
.vaccine-container {
    height: 940px;
    background-color: #fff;
    .search {
      width: 100%;
      height: 106px;
      line-height: 106px;
      display: flex;
      align-items: center;
      .el-input {
        width: 700px;
        .el-input__inner {
          border: 1px solid #00969d;
        }
      }
      input {
        width: 600px;
        margin-left: 95px;
      }
      button {
        width: 80px;
        height: 36px;
        margin-left: 26px;
        background-color: #00969D;
      }
    }
    .el-table{
      padding: 0;
      margin-top: 0;
    }
    table{
        th{
            // text-align: center;
            // font-size: 16px;
            // color: #000;
            // font-weight: 700;
            // background-color: #F5F5F5;
            // line-height: 70px;
        }
        td{
            text-align: center;
            font-size: 14px;
            color:#8E8E8E;
            border: none;
            button{
              background-color: #00969D;
            }
        }
        img{
            height: 42px;
            vertical-align: middle;
        }
    }
    .el-pagination{
        text-align: center;
        margin-top: 50px;
        .number {
          border: 1px solid #D9D9D9;
          margin: 0 5px;
          border-radius: 5px;
        }
    }
  }
</style>
