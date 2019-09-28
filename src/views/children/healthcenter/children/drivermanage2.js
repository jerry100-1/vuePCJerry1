import VueAMap from 'vue-amap' //地图
let amapManager = new VueAMap.AMapManager();
export default {
    data() {
        let self = this;
        return {
            form: {
                addresslnglat: '',
                alladdress: '',
                schoolname: '',
                wordshow: '',
                schoolmobile: '',
                money: '',
                person: '',
                storeMoney:''
            },
            imgs:[],

            imgs1:"",
            imageUrl1: '',
            img_list: [],
            img_list1: [],
            dialogImageUrl: '',
            dialogVisible: false,
            dialogImageUrl1: '',
            dialogVisible1: false,
            dialogVisiblemap: false,
            baseurl: '',
            imgnum: 6,
           // cid:this.$route.params.id,
            // 地图
            // zoom:6,
            // events:'',
            // center:[116.397428, 39.90923],
            // positions: {
            //     lng: '',
            //     lat: '',
            //     address: '',
            //     loaded: false
            // },
            amapManager,
            zoom: 12,
             address: '',
             center: [114.305208, 30.592921],
             lng: 114.305208,
             lat: 30.592921,
            markers: [{
                position:[114.305208, 30.592921]
            }],
            searchOption: {
                city: '',
                citylimit: false
            },
            events: {
                click(e) {
                    let {
                        lng,
                        lat
                    } = e.lnglat;
                    self.lng = lng;
                    self.lat = lat;
                    self.center = [self.lng, self.lat]

                    self.markers = [{
                        position: [self.lng, self.lat],
                        icon: '',
                        title: '',
                        events: {
                            click(o) {
                                // console.log(o)
                            }
                        }
                    }]
                    // 这里通过高德 SDK 完成。
                    var geocoder = new AMap.Geocoder({
                        radius: 1000,
                        extensions: "all"
                    });
                    // console.log(geocoder)
                    geocoder.getAddress([lng, lat], function (status, result) {
                        // console.log(result)
                        if (status === 'complete' && result.info === 'OK') {
                            if (result && result.regeocode) {
                                self.form.alladdress = result.regeocode.formattedAddress;
                                self.$nextTick();
                            }
                        }
                    });
                }
            },
            marker: {
                position: [121.5273285, 31.21515044],
                events: {
                    click: (e) => {
                        // console.log(e)
                    },
                    dragend: (e) => {
                        this.markers[0].position = [e.lnglat.lng, e.lnglat.lat]
                    }
                },
                visible: true,
                draggable: false
            },
            mywindow: {
                position: [121.5273285, 31.21515044],
                content: '<h4>该点数据信息</h4><div class="text item">Information A: ...</div><div class="text item">Information B: ...</div>',
                visible: true,
                events: {
                    close() {
                        this.mywindow.visible = false
                    }
                }
            },


        }
    },
    methods: {
        getaddress(){
            let that = this
            var geocoder = new AMap.Geocoder({
                radius: 1000,
                extensions: "all"
            });
            // console.log(geocoder)
            geocoder.getAddress(that.center, function (status, result) {
                // console.log(result)
                if (status === 'complete' && result.info === 'OK') {
                    if (result && result.regeocode) {
                        that.form.alladdress = result.regeocode.formattedAddress;
                        that.$nextTick();
                    }
                }
            });
        },
        onSearchResult(pois) {
            let latSum = 0;
            let lngSum = 0;
            console.log('1',pois)
            if (pois.length > 0) {
                pois.forEach(poi => {
                    let {lng, lat} = poi;
                    lngSum += lng;
                    latSum += lat;
                    this.markers[0].position=[poi.lng, poi.lat];
                });
                let center = {
                    lng: lngSum / pois.length,
                    lat: latSum / pois.length
                };
                this.center = [center.lng, center.lat];
                this.lng = center.lng
                this.lat = center.lat
            }
            let that = this
            var geocoder = new AMap.Geocoder({
                radius: 1000,
                extensions: "all"
            });
            // console.log(geocoder)
            geocoder.getAddress(that.center, function (status, result) {
                // console.log(result)
                if (status === 'complete' && result.info === 'OK') {
                    if (result && result.regeocode) {
                        that.form.alladdress = result.regeocode.formattedAddress;
                        that.$nextTick();
                    }
                }
            });

        },

        // getlist(){
        //     // console.log(this.$route.params.id)
        //     if(this.cid){
        //         this.$http.get(this.api + 'School/read/id/' + this.cid ,{
        //             params:{
        //                 id:this.cid
        //             }
        //         }).then(res=>{
        //             // console.log(res)
        //             this.form={
        //                 addresslnglat: '(' + res.data.result.schoollat + ' ，' + res.data.result.schoollng + ')',
        //                 alladdress: res.data.result.alladdress,
        //                 schoolname: res.data.result.schoolname,
        //                 wordshow: res.data.result.wordshow,
        //                 schoolmobile: res.data.result.schoolmobile,
        //                 money: res.data.result.money,
        //                 person: res.data.result.person,
        //                 storeMoney:res.data.result.storeMoney
        //
        //             }
        //             this.lat=res.data.result.schoollat
        //             this.lng=res.data.result.schoollng
        //             this.center=[this.lng, this.lat],
        //                 this.markers[0].position=[this.lng, this.lat]
        //             this.imageUrl1 = res.data.result.pic
        //             this.imgs1 = res.data.result.pic
        //             let img_arr = res.data.result.thumb
        //             this.imgs = res.data.result.thumb
        //             for (let i = 0; i < img_arr.length; i++) {
        //                 this.img_list.push({
        //                     name: '',
        //                     url: img_arr[i]
        //                 })
        //             }
        //         })
        //     }
        // },
        addlnglat() {
            this.dialogVisiblemap = false
            this.form.addresslnglat = '(' + this.lat + ' ，' + this.lng + ')'
        },
        getmap() {
            this.getaddress()
            this.dialogVisiblemap = true
        },
        goBackModify()
        {
          this.$router.push({
              name:"healthcenterAdd"
          })
        },
        commitAddress()
        {

         //   alert("提交的地址是"+this.form.alladdress);
            //alert("提交的经纬度是"+this.form.addresslnglat)
         //   alert("提交的经度是"+this.lng);
         //   alert("提交的纬度是"+this.lat);

                 let token=localStorage.getItem('token');
                 this.$http.get('/admin/clinic/add',{
                     params:{
                         token,
                         apitype:1,
                         title:this.$route.params.title,
                         phone:this.$route.params.phone,
                         province:this.$route.params.province,
                         city:this.$route.params.city,
                         area:this.$route.params.area,
                         lng:this.lng,
                         lat:this.lat,
                         address:this.form.alladdress,
                         province_code:this.$route.params.province_code,
                         city_code:this.$route.params.city_code,
                         area_code:this.$route.params.area_code
                     }
                 }).then(response=>{
                     console.log("这是编辑卫生所之后请求接口返回给我的数据开始...")
                     console.log(response);
                     //this.userList=response.data.result.list;
                     // this.healthList=response.data.result.list;
                     // this.total=Number(response.data.result.total);
                     // this.id=response.data.list.id;
                     console.log(response);
                     if(response.data.status==1)
                     {
                         this.$message.success("增加成功");
                        //  this.$router.push("/home/healthcenter/healthcenterList");
                        // // alert("执行前");
                        //  this.$router.push("/home/healthcenter/healthcenterList");
                         this.$router.push({
                             name:"healthcenterList",
                             // params:{
                             //
                             // }
                         })

                         //alert("执行后");
                     }else
                     {
                         this.$message.error(response.data.message);
                         return;
                     }
                 })


              // this.$router.push("/home/healthcenter/healthcenterEdit");
        }


    },

    created() {
        this.baseurl = this.api;


       // alert("你好,你接收 的lat是"+this.$route.params.lat);
       // alert("你好,你接收 的lng是"+this.$route.params.lng);

        // this.lat=this.$route.params.lat;
        // this.lng=this.$route.params.lng;
        // //
        // this.form.addresslnglat='('+this.$route.params.lng+','+this.$route.params.lat+')';
        // //
        // this.center[0]=this.$route.params.lng;
        // this.center[1]=this.$route.params.lat;
        // this.markers.positions[0]=this.$route.params.lng;
        // this.markers.positions[1]=this.$route.params.lat;
       // this.getlist()

        this.lat=this.$route.params.lat;
        this.lng=this.$route.params.lng;
        // // this.center[0]=this.lat;
        // // this.center[1]=this.lng;
        //
         this.form.addresslnglat='('+this.$route.params.lat+ ' , '+this.$route.params.lng +')';
        //
         this.form.alladdress=this.$route.params.address;
        //  this.center[0]=this.lat;
        //  this.center[1]=this.lng;
        // this.center[0]=this.lat;
        // this.center[1]=this.lng;
        // console.log(this.baseurl)
        // alert("你好,你接收 的id是"+this.$route.params.id);
        // alert("你好,你接收 的title是"+this.$route.params.title);
        // alert("你好,你接收 的phone是"+this.$route.params.phone);
        // alert("你好,你接收 的province是"+this.$route.params.province);
        // alert("你好,你接收 的city是"+this.$route.params.city);
        // alert("你好,你接收 的area是"+this.$route.params.area);
        // alert("你好,你接收 的address是"+this.$route.params.address);
        // alert("你好,你接收的province_code是"+this.$route.params.province_code);
        // alert("你好,你接收 的city_code是"+this.$route.params.city_code);
        // alert("你好,你接收 的area_code是"+this.$route.params.area_code);


    },
    mounted() {

    },
}
