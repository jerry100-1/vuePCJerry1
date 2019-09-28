<template>
  <div class="leavewordList-container">
    <div class="leavewordList-main">
        <div class="block">
                  <el-date-picker
                  v-model="starttime"
                  type="datetime"
                  placeholder="开始时间"
                  value-format="yyyy-MM-dd HH:mm"
                >
                  <i class="iconfont icon-location"></i>
                </el-date-picker>
                  <span class="partition">一</span>
                  <el-date-picker
                  v-model="endtime"
                  type="datetime"
                  placeholder="结束时间"
                  value-format="yyyy-MM-dd HH:mm"
                >
                  <i class="iconfont icon-location"></i>
                </el-date-picker>
                  <el-input v-model="input" placeholder="可搜索关键字" class="interval"  @keyup.native.enter="search"></el-input>
                  <el-button type="primary"  @click="search">搜索</el-button>
            </div>

        <el-table :data="list" stripe style="width: 100%">
        <el-table-column prop="plate" label="留言板块" width="300"></el-table-column>
          <el-table-column prop="content" label="留言内容" width="300"></el-table-column>
          <el-table-column prop="realname" label="留言人"></el-table-column>
          <el-table-column prop="createtimeText" label="留言时间"></el-table-column>
          <el-table-column label="操作">
                    <template slot-scope="scope">
                              
                       <el-button style="background:#009397;color:#fff;border:none;border-radius:3px;"
                         size="mini"
                         type="danger"
                         @click="open7(scope.row.id)"
                        >删除</el-button>

                    </template>
          </el-table-column>
        </el-table>

        <div class="page">
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
  </div>
</template>

<script>
export default {
  name: "leavewordList",
  data() {
    return {
        input:'',
        starttime:"",
        endtime:"",
        list:[],
       // 总行数
        total:0,
        currentPage: 1,
        pagesize:10,
    };
  },
  methods: {
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1) {
        return "warning-row";
      } else if (rowIndex === 2) {
        return "success-row";
      }
      return "";
    },

    //表格
    handleEdit(index, row) {},

    //分页
    handleSizeChange(val) {
      this.pagesize = val;
      this.leavewordList();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.leavewordList();
    },
    //删除
   open7(id) {
        this.$confirm('此操作将永久删除该留言, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        //   type: 'warning',
          center: true
        }).then(() => {
          this.deletewords(id);
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
      //留言列表
      leavewordList(keyword='',starttime='',endtime=''){
        let token=localStorage.getItem('token');
        let page=this.currentPage;
        let limit=this.pagesize;
        this.$http.get('/admin/Comment/webGetlist',{
          params:{
            token,
            page,
            limit,
            keyword,
            starttime,
            endtime
          }
        }).then(response=>{
          this.list=response.data.result.list;
          this.total=parseInt(response.data.result.total);  
        })
      },
      //搜索
      search(){
        let keyword=this.input;
        let starttime=this.starttime;
        let endtime=this.endtime;
        console.log(starttime,endtime)
        this.leavewordList(keyword,starttime,endtime)
      },
      //删除留言
      deletewords(id){
        let token=localStorage.getItem('token');
        this.$http.get('/admin/Comment/webDel',{
          params:{
            token,
            id
          }
        }).then(response=>{
            if(response.data.status=="1"){
              this.leavewordList();
            }
        })
      }
  },
  created(){
    this.leavewordList();
  },
};
</script>

<style lang="less">
.leavewordList-container {
  height: 900px;
  .leavewordList-main {
      padding-top: 0;
       .block{
          height: 106px;
          display: table-cell;
          vertical-align: middle;
          white-space: nowrap;
          padding-left: 90px;
          box-sizing: border-box;
          position: relative;
          .el-date-editor .el-input, .el-date-editor.el-input__inner{
            margin: 0 10px;
          }
          .partition{
            color: #CACACA;
            padding: 0 10px;
          }
          .interval{
            margin:0 30px;
            width: 400px; 
          }
          input{
            border: 1px solid #009397;
          }
      }
      .page{
          text-align: center;
          padding-top: 50px
      }
      .el-table{
        padding: 0;
        margin-top: 0;
      }
      .el-row{
        margin-bottom: 0;
        height: 106px;
        line-height: 106px;
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
