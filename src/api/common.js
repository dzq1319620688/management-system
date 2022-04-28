import servise from '@/api/service'
import axios from 'axios'
const CancelToken= axios.CancelToken
//CancelToken是中断请求的办法。具体使用看https://www.axios-http.cn/docs/cancellation
//封装公共列表接口，并且增加节流功能，连续操作时，取消前一个请求，只返回最后一个
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