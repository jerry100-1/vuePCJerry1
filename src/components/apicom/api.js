import axios from 'axios'
const baseURL = 'http://ck.hongbao19.net/'
axios.defaults.baseURL = baseURL
axios.interceptors.request.use(function (config) {
    // 将token给到一个前后台约定好的key中，作为请求发送
    let token = sessionStorage.getItem('ms_token')
    // let token = '0a84fc8c8735baace94f6fdd5bc4592d'
    // console.log(config)
    // config.headers['Authorization'] = token
    // config.headers.common['Token'] = token
    // config.headers.common['Apitype'] = 1

    if (token) {
        config.data['token'] = token
        config.data['apitype'] = 1
    }
    return config
}, function (error) {
    return Promise.reject(error)
})

// // 获取支付设置
// export const getpaylist = params=>{
//     return axios.post("admin/payset/paylist",params).then(res=>res)
// }

// 获取轮播图片
export const getlunbotu = params=>{
    return axios.get("api/getlunbo").then(res=>res.data)
}
