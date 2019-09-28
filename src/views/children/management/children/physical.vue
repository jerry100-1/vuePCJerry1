<template>
  <div class="physical-container">
      <div class="search">
        <el-input v-model="input" placeholder="可搜索体检名称" @keyup.native.enter="search"></el-input>
        <el-button type="primary" @click="search">搜索</el-button>
        <el-button type="primary" @click="skip(-1)">新增</el-button>
      </div>
      <!-- 表格 -->
      <el-table :data="list" stripe style="width:100%">
        <el-table-column prop="id" label="序号"></el-table-column>
        <el-table-column prop="title" label="体检名称"></el-table-column>
        <el-table-column prop="ctitle" label="所属卫生所"></el-table-column>
        <el-table-column prop="createtimeText" label="操作时间"></el-table-column>
               <!--<template scope="scope">-->
                  <!--&lt;!&ndash;<el-switch              &ndash;&gt;-->
                    <!--&lt;!&ndash;active-color="#F8C700"&ndash;&gt;-->
                    <!--&lt;!&ndash;inactive-color="#B0B0B0"&ndash;&gt;-->
                    <!--&lt;!&ndash;@change="change(scope.row)"&ndash;&gt;-->
                    <!--&lt;!&ndash;v-model="scope.row.status"&ndash;&gt;-->
                    <!--&lt;!&ndash;:active-value="1"&ndash;&gt;-->
                    <!--&lt;!&ndash;:inactive-value="-1"&ndash;&gt;-->
                   <!--&lt;!&ndash;&gt;&ndash;&gt;-->
                  <!--&lt;!&ndash;</el-switch>&ndash;&gt;-->
              <!--{{scope.row.status}}-->
            <!--</template>-->
            <el-table-column label="是否开放">
                <template scope="scope">
                    <el-switch
                            active-color="#F8C700"
                            inactive-color="#B0B0B0"
                            @change="enabledchange(scope.row)"
                            :value="scope.row.status==1?true:false"
                    >
                    </el-switch>
                </template>
            </el-table-column>

        <el-table-column label="操作">
            <template slot-scope="scope">
                <el-button
                size="mini"
                type="primary"
                @click="skip(scope.row)"
                >编辑</el-button>
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
      skip(data){
        this.$router.push({name:"physicalIncreased",params:{data}});
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

        enabledchange(row){

            // alert(row.id);
            let token=localStorage.getItem('token');
            if(row.status==1){
                row.status = -1;
            }else{
                row.status= 1
            }
            this.$http.post(this.api+'/admin/inspect/status',{
                apitye:1,
                id:row.id,
                token,
                status:row.status,
            }).then(res=>{
                // console.log('切换',res)
                if(res.data.status==1){
                    this.$message.success(res.data.message);
                }else{
                    this.$message.warning(res.data.message);
                }
                this.getList();
            })
        },
      //弹窗
       open7() {
        this.$confirm('是否确定冻结?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          this.$message({
            type: 'success',
            message: '冻结成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消冻结'
          });
        });
      },
      //获取体检列表
      getList(keyword=''){
        let token=localStorage.getItem('token');
        let page=this.currentPage;
        let limit=this.pagesize;
        this.$http.get('/admin/inspect/getlist',{
          params:{
            token,
            page,
            limit,
            keyword
          }
        }).then(response=>{
          console.log(response.data.result.list)
          this.list=response.data.result.list;
          this.total=parseInt(response.data.result.total);
        })
      },
      // 搜索
      search(){
        let keyword=this.input;
        this.getList(keyword);
      },
      //保健项目开放关闭
      switchover(id,status){
        let token=localStorage.getItem('token');
        console.log(id,status)
        this.$http.get('/admin/inspect/status',{
          params:{
            token,
            id,
            status
          }
        }).then(response=>{
            if(response.data.status=="1") return this.$message({
              type:'success',
              message:response.data.message
            })
            this.$message(response.data.message);
        })
      },
      // 状态开关
      change(row){
        let id=row.id;
        let status=row.status;
        this.switchover(id,status);
      }
    },
    created(){
      this.getList();
    }
};
</script>

<style lang="less">
.physical-container {
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
