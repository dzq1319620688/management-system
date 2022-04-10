import servise from '@/router/service'
import axios from 'axios'
const CancelToken= axios.CancelToken
//CancelToken是中断请求的办法。具体使用看https://www.axios-http.cn/docs/cancellation
export const getTableList = (url,params, _this) => {
  return servise({
    url,
    method: 'get',
    params,
    cancelToken: new CancelToken(function executor(c) {
      //将取消请求的方法存进传入的this中。
      _this.cancelAjax = c
    })
  })
}