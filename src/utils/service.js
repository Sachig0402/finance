import axios from 'axios'
import { Message } from 'element-ui'
// import { from } from 'core-js/fn/array';
import { getToken } from "@/utils/auth"
// import { get } from 'core-js/fn/dict';
const service = axios.create({
    baseURL: "localhost:8080", // url=base url+request url
    timeout: 5000 //请求超时,5秒就不再请求了
})


// 请求拦截:请求之前做什么事
// 在headers里加入了token
service.interceptors.request.use(//里面有两个函数,一个是请求成功执行的函数,第二个是请求失败执行的函数
    // 请求成功执行的函数
    (config) => {
        // console.log("这是请求拦截")
        if (getToken()) {
            config.headers['token'] = getToken()
        }
        return config
    },
    // 请求失败执行的函数
    (error) => {
        return Promise.reject(error)
    }
)


// 相应拦截 在响应被 then 或 catch 处理前拦截它们
service.interceptors.response.use(
    (response) => {
        // console.log("这里是响应拦截", response)
        const res = response.data
        if (!res.success) {
            Message({
                type: "error",
                message: res.message || '请求错误'
            })
            return Promise.reject(new Error(res.message || '请求错误'))
        } else {
            return res
        }
    },
    function (error) {
        Message({
            message: error.message,
            type: "error"
        })
        return Promise.reject(error)
    }
)




export default service