<template>
    <div class="articleList-container">
      <div class="articleList-main">
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
                  <el-input v-model="input" placeholder="可搜索文章名称" class="interval" @keyup.native.enter="search"></el-input>
                  <el-button type="primary" @click="search">搜索</el-button>
                  <el-button type="primary" @click="articleEntry(-1)" class="btn-interval">文章录入</el-button>
            </div>
        <el-table :data="list" stripe style="width: 100%">
          <el-table-column prop="sort" label="序号" width="180"></el-table-column>
          <el-table-column prop="title" label="文章名称" width="310" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="status" label="状态">
               <template slot-scope="scope">
                  <span>{{scope.row.status | formatStatus}}</span>
               </template>
          </el-table-column>
          <el-table-column prop="createtime_text" label="发布时间"></el-table-column>
          <el-table-column label="操作" width="300">
                    <template slot-scope="scope">
                        <el-button style="background:#009397;color:#fff;border:none;border-radius:3px;"
                         size="mini"
                         type="danger"
                         @click="skip(scope.row)"
                        >详情</el-button>
                        

                        <el-button style="background:#009397;color:#fff;border:none;border-radius:3px;"
                         size="mini"
                         type="danger"
                         @click="articleEntry(scope.row)"
                        >修改</el-button>
                              
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
    name:'articleList',
    data() {
    return {
        //输入框
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
      //跳转详情页
      skip(data){
          this.$router.push({name:'articleDetails',params:{
            data
          }});
      },
      //跳转文章录入  
      articleEntry(data){
         this.$router.push({name:'articleEntry',params:{
           data,
          }});
      },
    handleDelete(index, row) {
      console.log(index, row);
    },
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
                 this.getarticleList();
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.getarticleList();
            },
    //删除
    open7(id) {
        this.$confirm('此操作将永久删除该文章, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        //   type: 'warning',
          center: true
        }).then(() => {
          this.articleDel(id);
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
      //文章列表
      getarticleList(keyword="",starttime="",endtime=""){
        let token=localStorage.getItem('token');
        let page=this.currentPage;
        let limit=this.pagesize;
        this.$http.get('/admin/Classroom/index',{
          params:{
            token,
            keyword,
            starttime,
            endtime,
            page,
            limit
          }
        }).then(response=>{
          this.list=response.data.result.list;
          this.total=parseInt(response.data.result.total);
        //  if(response.data.)
        })
      },
      //搜索
      search(){
        let keyword=this.input;
        let starttime=this.starttime;
        let endtime=this.endtime;
        this.getarticleList(keyword,starttime,endtime);
      },
      //文章删除
      articleDel(id){
        let token=localStorage.getItem('token');
        this.$http.get('/admin/Classroom/del',{
          params:{
            token,
            id
          }
        }).then(response=>{
          if(response.data.result.status=="1"){
              this.getarticleList();
          }
        })
      }
  },
  created(){
    this.getarticleList();
  },
  filters:{
    formatStatus(val){
      return val == -1 ? '隐藏' : val == 1 ? '显示' : '未知';
    }
  },
}
</script>

<style lang="less">
.articleList-container {
  height: 940px;
  .articleList-main {
      padding-top: 0;
      .block{
          display: table-cell;
          vertical-align: middle;
          white-space: nowrap;
          height: 106px;
          padding-left: 90px;
          box-sizing: border-box;
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
          .btn-interval{
            margin-left:20px;
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

