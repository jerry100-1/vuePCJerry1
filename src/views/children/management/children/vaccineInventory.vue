<template>
  <div class="vaccineInventory-container">
      <div class="search">
          <div class="search-drop">
              <template>
                <el-select v-model="value" clearable placeholder="选择卫生所">
                  <el-option
                    v-for="item in options"
                    :key="item.id"
                    :label="item.title"
                    :value="item.id">
                  </el-option>
                </el-select>
              </template>
          </div>
          <div class="search-input">
            <el-input v-model="input" placeholder="可搜索课程名称" @keyup.native.enter="search"></el-input>
          </div>

          <el-button type="primary" @click="search">搜索</el-button>
      </div>
      <!-- 表格 -->
      <el-table :data="list" stripe style="width:100%">
        <el-table-column prop="title" label="疫苗名称"></el-table-column>
        <el-table-column prop="clstock" label="库存"></el-table-column>
        <el-table-column prop="clinictitle" label="卫生所名称"></el-table-column>
        <el-table-column prop="createtimeText" label="操作时间"></el-table-column>

        <el-table-column label="操作">
            <template slot-scope="scope">
                <el-button
                size="mini"
                type="primary"
                @click="open3(scope.row.id)"
                >修改库存</el-button>        
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
  name: "physical",
  data() {
    return {
      select:"",
        //输入框
      input: "",
      //是否开放
       value:'',
        //表格数据
       list:[],
        //分页
        // 总行数
        total:0,
        currentPage: 1,
        pagesize:10,
        //所有卫生所
        options: [],
    };
  },
    methods: {
        //表格
      handleEdit(index, row) {
        
       
      },
      //跳转页面
      skip(){
        
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
      open3(id) {
        this.$prompt('修改库存', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          center:true
        //   inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
        //   inputErrorMessage: '邮箱格式不正确'
        }).then(({ value }) => {
         if(value.trim()=='') return 
          this.amend(id,parseInt(value));
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });       
        });
      },
      //库存列表数据
      getList(keyword="",cid=""){
        let token=localStorage.getItem('token');
        let page=this.currentPage;
        let limit=this.pagesize;
        this.$http.get('/admin/vaccine/getlistStock',{
          params:{
            token,
            keyword,
            cid,
            page,
            limit
          }
        }).then(response=>{
          this.list=response.data.result.list;
          this.total=parseInt(response.data.result.total);  
        })
      },
      //修改库存
      amend(vid,clstock){
        let token=localStorage.getItem('token');
        this.$http.get('/admin/vaccine/addstock',{
          params:{
            token,
            vid,
            clstock
          }
        }).then(response=>{
         if(response.data.status=='0') return this.$message({ message:response.data.message });        
          this.$message({
             type:'success',
             message:response.data.message
           });
         this.getList(); 
        })
      },
      //所有卫生所
      getAllclinic(){
        let token=localStorage.getItem('token');
        this.$http.get('/admin/clinic/allList',{
          params:{
            token
          }
        }).then(response=>{
            this.options=response.data.result.list;
        })
      },
      //搜索
      search(){
        let keyword=this.input;
        let cid=this.value;
        this.getList(keyword,cid);
      }
    },
    created(){
      this.getList();
      //所有医生列表
      this.getAllclinic();
    }
};
</script>

<style lang="less">
.vaccineInventory-container {
    height: 940px;
    background-color: #fff;
    .search {
      width: 100%;
      height: 106px;
      line-height: 106px;
      position: relative;
      display: flex;
      align-items: center;
      .search-drop{
        .el-input__inner{
          width: 200px;
          margin-left: 100px;
          border: 1px solid #00999D;
        }
      }
      .search-input{
        .el-input__inner{
            width: 400px;
            margin-left: 40px;
            border: 1px solid #00999D;
        }
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
                height:30px;
                border: 1px solid #D9D9D9;
                margin: 0 5px;
                border-radius: 5px;
            }
            .el-pager li.active{
              color:#fff;
              background-color: #00969D;
            }
        }
  }
</style>
