import axios from "axios";
import { Message } from 'element-ui';
const service=axios.create({
    baseURL:"localhost:8080",
    timeout:5000,
})

//响应拦截器
service.interceptors.response.use((response)=>{
    const res=response.data;
    if(!res.success){
        Message({
            type:'error',
            message:res.message||'请求错误'
        });
        return Promise.reject(new Error(res.message||'请求错误'))
    }else{
        return res;
    }
},function(error){
    Message({
        type:'error',
        message:error.message||'请求错误'
    });
    return Promise.reject(error);
})
export default service;