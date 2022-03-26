// 对axios进行二次封装
import axios from 'axios'
// 引入进度条 start，进度条开始；done，进度条结束
import nprogress from 'nprogress'
// 引入进度条样式
import 'nprogress/nprogress.css'

// 利用axios对象的方法create，去创建一个axios实例
// requests就是axios，只不过稍微配置一下
const requests = axios.create({
  baseURL: '/api',
  timeout: 5000
})
// 请求拦截器
requests.interceptors.request.use(
  config => {
    // config是配置对象，里面一个属性很重要，headers请求头
    // 进度条开始
    nprogress.start()
    return config
  },
  // 失败的回调
  err => {
    return Promise.reject(err)
  }
)
// 响应拦截器
requests.interceptors.response.use(
  // 成功的回调
  res => {
    // 进度条结束
    nprogress.done()
    return res.data
  },
  // 失败的回调
  err => {
    return Promise.reject(err)
  }
)

// 对外暴露
export default requests
