<template>
    <div class="particulars-container myhealthcenterEdit">
        <div class="particulars-header">
            当前位置:&nbsp;<el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home/healthcenter/healthcenterList' }">卫生所管理</el-breadcrumb-item>
            <el-breadcrumb-item>卫生所列表</el-breadcrumb-item>
            <el-breadcrumb-item style="color:red">编辑</el-breadcrumb-item>
            <!-- <el-breadcrumb-item>活动详情</el-breadcrumb-item> -->
        </el-breadcrumb>
        </div>

        <div class="particulars-info" style="border-bottom:none;">
            <!--<img src="./userInfoimages/矩形14拷贝.png" alt="">-->
            <div class="parCenter">
                <el-form label-width="100px">
                    <el-form-item label="卫生所名称">
                        <el-input v-model="title" placeholder="请输入卫生所名称"></el-input>
                    </el-form-item>
                    <el-form-item label="卫生所电话">
                        <el-input v-model="phone" placeholder="请输入卫生所电话"></el-input>
                    </el-form-item>

                    <!--<el-form-item label="地址坐标">-->
                        <!--<el-input v-model="address2" placeholder="(15451521321,2321321321312)"></el-input>-->
                    <!--</el-form-item>-->
                    <el-form-item label="地址坐标经度">
                        <el-input disabled="disabled"  v-model="lng" placeholder="请前往地图搜索区域定位修改"></el-input>
                    </el-form-item>
                    <el-form-item label="地址坐标维度">
                        <el-input disabled="disabled" v-model="lat" placeholder="请前往地图搜索区域定位修改"></el-input>
                    </el-form-item>


                    <el-form-item label="选择地址">
                        <el-select v-model="searchValue"  @change="chickvalue" placeholder="请选择" id="seleId1">
                            <el-option
                                    ref="ffg"
                                    v-for="item in healthListProvince"
                                    :key="item.name"
                                    :label="item.name"
                                    :value="item.name"
                                    :disabled="item.disabled">
                            </el-option>
                        </el-select>

                        <el-select v-model="searchValue2" @change="chickvalue2"  style="margin-left:20px;" placeholder="请选择" id="seleId2">
                            <el-option
                                    v-for="item in healthListCity"
                                    :key="item.name"
                                    :label="item.name"
                                    :value="item.name"
                                    :disabled="item.disabled">
                            </el-option>
                        </el-select>

                        <el-select v-model="searchValue3" @change="chickvalue3" style="margin-left:20px;" placeholder="请选择" id="seleId3">
                            <el-option
                                    v-for="item in healthListTown"
                                    :key="item.name"
                                    :label="item.name"
                                    :value="item.name"
                                    :disabled="item.disabled">
                            </el-option>
                        </el-select>

                        <el-input v-model="address" placeholder="" style="width:400px;margin-left:30px;" id="seleId4"></el-input>

                        <!--<el-button style="margin-left:30px;" type="primary" @click="submitForm('dynamicValidateForm')">搜索</el-button>-->


                    </el-form-item>


                    <el-form-item>

                        <!--<el-amap vid="amapDemo" :center="center"  :zoom="zoom" :plugin="plugin" class="amap-demo" style="height:380px;">-->

                        <!--</el-amap>-->


                    </el-form-item>
                    <el-form-item>
                        <el-button id="kkBtn" @click.capture="goMapPage" style="margin-left:20px;" type="primary">下一步</el-button>
                    </el-form-item>

                </el-form>

            </div>



        </div>
    </div>
</template>
<script>
    export default {
        name: "healthcenterEdit",
        data()
        {

            let self =this;
            return{
                selected:"",
                innaddressTitle:"接种单位",
                textDes:"查找",
                zoom:16,
                code:"",
                value3:"",
                address2:"",
                name:"",
                searchValue:"",
                searchValue2:"",
                searchValue3:"",
                value4:"",
                title:"",
                phone:"",
                province:"",
                city:"",
                area:"",
                lng:"",
                lat:"",
                address:"",
                alladdress:"",
                createtime:"",
                province_code:"",//省份code
                city_code:"",//城市code
                area_code:"",//县级code
                healthListProvince:[],
                healthListCity:[],
                healthListTown:[],
                center:[121.59996,31.197646],
                plugin:[{
                    pName:'Geolocation',
                    events:{
                        init(o)
                        {
                            o.getCurrentPosition((status,result)=>{
                                if(result&&result.position)
                                {
                                    self.lng=result.position.lng;
                                    self.lat=result.position.lat;
                                    self.center=[self.lng,self.lat];
                                    self.loaded=true;
                                    self.$nextTick();
                                }
                            })
                        }
                    }
                }],
                options2: [{
                    value: '选项1',
                    label: '黄金糕'
                }],
                value2: '',
            }
        },
        methods:
            {
                //点击省份下拉框的时候
                chickvalue() {
                    //当前拿到的就是code,因为我把value绑定到了code上
                  // alert("你好,你点击的省份为:"+this.searchValue);
                     this.searchValue2="";
                     this.searchValue3="";

                     //根据名字换取code
                    let token=localStorage.getItem('token');
                    this.$http.get('/admin/address/getcode',{
                        params:{
                            token,
                            apitype:1,
                            addresname:this.searchValue,
                            level:1
                        }
                    }).then(response=>{
                        //this.userList=response.data.result.list;
                        //获取全国省区数据;
                        //this.id=response.data.list.id;
                        //注意，下面的province_code,city_code,area_code是传给后台的数据
                        console.log("这是根据名字换取code接口返回给我的数据:"+response);
                        console.log("请求到的省份的code是:"+response.data.result.codeid);
                         this.province_code=response.data.result.codeid;
                         //alert("你好,你点击的省份code为:"+this.province_code);
                        //获取市区数据
                        this.$http.get('/admin/address/index',{
                            params:{
                                token,
                                apitype:1,
                                pid:this.province_code,
                            }
                        }).then(response=>{
                            console.log("请求城市数据开始...")
                            console.log(response);
                            //this.userList=response.data.result.list;
                            //获取全国省区数据;
                            this.healthListCity=response.data.result.list;
                            //this.id=response.data.list.id;
                            console.log("请求到的城市数据是:")
                            console.log(response);
                        })

                    })


                },

                //点击城市下拉框的时候
                chickvalue2() {

                    if(this.province_code=="")
                    {
                        this.$message.error("请先选择省份,才能选择城市");
                    }
                    this.searchValue3="";
                    //当前拿到的就是code,因为我把value绑定到了code上
                   // alert("你好,你点击的城市为:"+this.searchValue2);
                    // alert("你好,你点击的城市code为:"+this.city_code);
                    //根据名字换取code
                    let token=localStorage.getItem('token');
                    this.$http.get('/admin/address/getcode',{
                        params:{
                            token,
                            apitype:1,
                            addresname:this.searchValue2,
                            level:2
                        }
                    }).then(response=>{
                        //this.userList=response.data.result.list;
                        //获取全国省区数据;
                        //this.id=response.data.list.id;
                     //注意，下面的province_code,city_code,area_code是传给后台的数据
                        this.city_code=response.data.result.codeid;
                        // alert("这是根据名字换取code接口返回给我的数据:"+response);
                        // alert("请求到的城市的code是:"+response.data.result.codeid);
                        //获取县级数据
                        this.$http.get('/admin/address/index',{
                            params:{
                                token,
                                pid:this.city_code,
                                apitype:1
                            }
                        }).then(response=>{
                            console.log("请求县级数据开始...")
                            console.log(response);
                            //this.userList=response.data.result.list;
                            //获取全国省区数据;
                            this.healthListTown=response.data.result.list;
                            //this.id=response.data.list.id;
                            console.log("请求到的县城数据是:")
                            console.log(response);
                        })

                    })


                },
                //
                //点击小镇下拉框的时候
                chickvalue3() {

                    //当前拿到的就是code,因为我把value绑定到了code上
                   // alert("你好,你点击的县城为:"+this.searchValue3);
                   // alert("你好,你点击的县级code为:"+this.town_code);
                    if(this.searchValue2=="")
                    {
                        alert("请先选择城市!");
                    }


                    //根据名字换取code
                    let token=localStorage.getItem('token');
                    this.$http.get('/admin/address/getcode',{
                        params:{
                            token,
                            apitype:1,
                            addresname:this.searchValue3,
                            level:3
                        }
                    }).then(response=>{
                        //this.userList=response.data.result.list;
                        //获取全国省区数据;
                        //this.id=response.data.list.id;
                      //注意，下面的province_code,city_code,area_code是传给后台的数据
                        this.area_code=response.data.result.codeid;
                        // alert("这是根据名字换取code接口返回给我的数据:"+response);
                        // alert("请求到的县级的code是:"+response.data.result.codeid);

                    })

                    //获取县级数据
                    //let token=localStorage.getItem('token');
                    // this.$http.get('/admin/address/index',{
                    //     params:{
                    //         token,
                    //         pid:this.searchValue3,
                    //         apitype:1
                    //     }
                    // }).then(response=>{
                    //     console.log("请求乡级别开始...")
                    //     console.log(response);
                    //     //this.userList=response.data.result.list;
                    //     //获取全国省区数据;
                    //     //this.id=response.data.list.id;
                    //     console.log("请求到的乡级别数据是:")
                    //     console.log(response);
                    // })

                },
                //获取省市区三级联动数据
                //获取省份数据
                // selectGet(vId) {
                //     let obj = {};
                //         obj = this.healthListProvince.find((item) => {//这里的selectList就是上面遍历的数据源
                //             return item.id === vId;//筛选出匹配数据
                //         });
                //
                //     console.log("获取被选中的数据")
                //     console.log(obj.name);//我这边的name就是对应label的
                //     console.log(obj.id);
                // },
                getProvinceList(){
                    let token=localStorage.getItem('token');
                    this.$http.get('/admin/address/index',{
                        params:{
                            token,
                            pid:0,
                            apitype:1
                        }
                    }).then(response=>{
                        console.log("请求省份数据开始...")
                        console.log(response);
                        //this.userList=response.data.result.list;
                        //获取全国省区数据;
                        this.healthListProvince=response.data.result.list;
                        //this.id=response.data.list.id;
                        console.log("请求到的省份数据是:")
                        console.log(response);
                    })
                },
               // 编辑之后提交到后台
               //
               //  submitTo()
               //  {
               //
               //     // alert("你好，你选择的省份是:"+this.searchValue);
               //      //   if(this.title=="")
               //      //   {
               //      //       this.$message.error("请填写卫生所名称!");
               //      //       return
               //      //   }
               //      // if(this.phone=="")
               //      // {
               //      //     this.$message.error("请填写卫生所电话!");
               //      //     return
               //      // }
               //      //
               //      // if(this.address2=="")
               //      // {
               //      //     this.$message.error("请填写卫生所地址(经度和纬度)!");
               //      //     return
               //      // }

               //      //
               //      // if(this.address=="")
               //      // {
               //      //     this.$message.error("请填写街道详细地址");
               //      // }
               //
               //      this.center[0]=this.lng;
               //      this.center[1]=this.lat;
               //      //提交内容
               //      console.log("你好,你提交的id是"+this.$route.params.id);
               //      console.log("你好,你提交的title是"+this.$route.params.title);
               //      console.log("你好,你提交的phone是"+this.$route.params.phone);
               //      console.log("你好,你提交的是province"+this.searchValue);
               //      console.log("你好,你提交的city是"+this.searchValue2);
               //      console.log("你好,你提交的area是"+this.searchValue3);
               //      console.log("你好,你提交的lng是"+this.lng);
               //      console.log("你好,你提交的lat是"+this.lat);
               //      console.log("你好,你提交的address是"+this.address);
               //      console.log("你好,你提交的province_code是"+this.province_code);
               //      console.log("你好,你提交的city_code是"+this.city_code);
               //      console.log("你好,你提交的area_code是"+this.area_code);
               //
               //      let token=localStorage.getItem('token');
               //      this.$http.get('/admin/clinic/add',{
               //          params:{
               //              token,
               //              apitype:1,
               //              id:this.$route.params.id,
               //              title:this.title,
               //              phone:this.phone,
               //              province:this.searchValue,
               //              city:this.searchValue2,
               //              area:this.searchValue3,
               //              lng:this.lng,
               //              lat:this.lat,
               //              address:this.address,
               //              province_code:this.province_code,
               //              city_code:this.city_code,
               //              area_code:this.area_code
               //          }
               //      }).then(response=>{
               //          console.log("这是编辑卫生所之后请求接口返回给我的数据开始...")
               //          console.log(response);
               //          //this.userList=response.data.result.list;
               //          // this.healthList=response.data.result.list;
               //          // this.total=Number(response.data.result.total);
               //          // this.id=response.data.list.id;
               //          console.log(response);
               //          if(response.data.status==1)
               //          {
               //              this.$message.success("编辑成功");
               //             this.$router.push("/home/healthcenter/healthcenterList")
               //          }else
               //          {
               //              this.$message.error(response.data.message);
               //              return;
               //          }
               //      })
               //  }
                goMapPage()
                {

                    if(this.title=="")
                    {
                        this.$message.error("请填写名称");
                        return;
                    }
                    if(this.phone=="")
                    {
                        this.$message.error("请填写电话");
                        return;
                    }

                    if(this.searchValue=="")
                    {
                        this.$message.error("请填写省份");
                        return;
                    }

                    if(this.searchValue2=="")
                    {
                        this.$message.error("请填写城市");
                        return;
                    }

                    if(this.searchValue3=="")
                    {
                        this.$message.error("请填写县城");
                        return;
                    }

                         this.center[0]=this.lng;
                         this.center[1]=this.lat;

                         //alert("你提交的province_code是"+this.province_code);

                         //提交内容
                        // this.$router.push("/home/healthcenter/healthcenterMap");
                      this.$router.push({
                        name:"healthcenterMapEdit",
                        params:{
                            id:this.$route.params.id,
                            title:this.title,
                            phone:this.phone,
                            province:this.searchValue,
                            city:this.searchValue2,
                            area:this.searchValue3,
                            lng:this.lng,
                            lat:this.lat,
                            address:this.address,
                            province_code:this.province_code,
                            city_code:this.city_code,
                            area_code:this.area_code
                        }
                    });

                      this.$router.afterEach((to,from,next)=>{
                          window.scrollTo(0,0);
                      })
                },
            },
        mounted()
        {
            // this.getCityList();
        },
        created()
        {

         //   alert("你好,你传递过来的id是:"+this.$route.params.id);
          //  alert("你好,你传递过来的title是:"+this.$route.params.title);
          //  alert("你好,你传递过来的phone是:"+this.$route.params.phone);
           // alert("你好,你传递过来的province是:"+this.$route.params.province);
          //  alert("你好,你传递过来的city是:"+this.$route.params.city);
          //  alert("你好,你传递过来的area是:"+this.$route.params.area);
          //  alert("你好,你传递过来的lng是:"+this.$route.params.lng);
         //   alert("你好,你传递过来的lat是:"+this.$route.params.lat);
          //  alert("你好,你传递过来的alladdress是:"+this.$route.params.alladdress);
         //   alert("你好,你传递过来的createtime是:"+this.$route.params.createtime);
         //   alert("你好,你传递过来的province_code是:"+this.$route.params.province_code);
          //  alert("你好,你传递过来的city_code是:"+this.$route.params.city_code);
         //   alert("你好,你传递过来的area_code是:"+this.$route.params.area_code);
            //this.id=this.$route.params.id;
            this.title=this.$route.params.title;
            this.phone=this.$route.params.phone;
            this.searchValue=this.$route.params.province;
            this.searchValue2=this.$route.params.city;
            this.searchValue3=this.$route.params.area;
            this.lng=this.$route.params.lng;
            this.lat=this.$route.params.lat;
            this.address=this.$route.params.address;
            this.alladdress=this.$route.params.alladdress;
            this.createtime=this.$route.params.createtime;
            this.province_code=this.$route.params.province_code;
            this.city_code=this.$route.params.city_code;
            this.area_code=this.$route.params.area_code;
            this.address2="("+this.lng.toString()+","+this.lat.toString()+")";
            this.center[0]=this.lng;
            this.center[1]=this.lat;

            // this.getCityList();
            // this.selectGet();
            this.getProvinceList();

        }


    }
</script>

<style lang="less">
    .myhealthcenterEdit
    {
        height:100%!important;
    }
    #seleId3,#seleId2,#seleId1
    {
        width:140px;
    }
    #kkBtn
    {
        width:120px;margin-left:0px;
    }
    .el-breadcrumb__item:last-child .el-breadcrumb__inner, .el-breadcrumb__item:last-child .el-breadcrumb__inner a, .el-breadcrumb__item:last-child
    .el-breadcrumb__inner a:hover, .el-breadcrumb__item:last-child .el-breadcrumb__inner:hover{
        font-weight:400;
        cursor: text;
        color:#00979C!important;
    }
    .el-form-item__label {
        font-weight:bold;
        font-size:20px;
    }
    #kknnvv
    {
        margin-left:0px;
    }
    .el-radio__input.is-checked .el-radio__inner {
        border-color: #00d3c2;
        background: #00d3c2;
    }
    .elText
    {
        height:auto
    }
    .el-textarea__inner {
        padding-top:50px;
        padding-bottom:50px;
        height:340px;
    }
    .specialColr
    {
        color:#009197;
    }
    .parCenter
    {
        width:90%;
        height:auto;
        /*background:red;*/
        margin:0 auto;
        margin-top:30px;
    }
    .particulars-container{
        height: 980px;
        .particulars-header{
            display: flex;
            height: 80px;
            line-height: 80px;
            align-items: center;
            font-size: 14px;
            color: #656565;
            padding-left: 40px;
            /*border-bottom: 1px solid #eee;*/
        }
        .particulars-info{
            height:auto;
            /*border-bottom: 1px solid #eee;*/

        }
    }


</style>
