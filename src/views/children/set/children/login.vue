<template>
    <div>
        这是接口页面
    </div>
</template>

<script>
    export default {
        name: "login",
        data()
        {
            return{
                limit:"10",
                page:"1"
            }
        },
        methods:{
            //   getList()
            //    {
            //     this.$http.post(this.api+'admin/Lunboimgs/index',{
            //         limit:this.limit,
            //         page:this.page
            //     }).then(res=>{
            //         console.log('轮播',res);
            //         console.log("正式请求数据开始!");
            //         console.log(res);
            //         if(res.data.status==1){
            //             console.log("进入状态码为1的判断语句");
            //             this.tableData = res.data.result.list
            //             console.log("状态码正确!");
            //             console.log(this.tableData,6666);
            //             this.tableData.forEach(item => {
            //                 // alert("进入此条语句");
            //
            //             });
            //             this.total = Number(res.data.result.total)
            //         }else{
            //             // this.tableData = []
            //             // this.total = 0
            //         }
            //     })
            // }
            getList()
            {
                this.$http.post(this.api+'/admin/Lunboimgs/index',{
                    limit:this.limit,
                    page:this.page
                }).then(res=>{
                    console.log(res);
                })
            }


        },
        mounted()
        {
            this.getList();
        },
        created()
        {
            this.getList();
        }
    }
</script>

<style scoped>

</style>
