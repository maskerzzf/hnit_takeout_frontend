import axios, { Axios, AxiosResponse, AxiosRequestConfig } from 'axios'
 
declare module 'axios' {
  interface AxiosResponse<T = any> {
    code?:number|string,
    description?:string,
    message?: string,
    data: T;
  }
  export function create(config?: AxiosRequestConfig): AxiosInstance}

const requests =  axios.create({
       // 每次请求的协议、IP地址。  设置该配置后，每次请求路径都可以使用相对路径，例如"/admin/login"
        baseURL: "/api",
        // 请求超时时间
        timeout: 10000,
        // 每次请求携带cookie
        withCredentials: true

})
requests.interceptors.request.use((config)=>{
  // if(window.sessionStorage.get('token')){
  //   config.headers.set('authorization',window.sessionStorage.get('token'))
  // }
    return config
}, (error) => {
    //对请求错误做点什么
    return error
  })
requests.interceptors.response.use((res)=>{
    return res.data
},(error)=>{
    // return Promise.reject(new Error('false'))
    return error
})
export default requests