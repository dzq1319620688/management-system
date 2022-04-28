import service from '@/api/service'

//添加商品信息
export const waresAdd= (data) => {
  return service({
    url: '/waresList/add',
    method: 'post',
    data
  })
}
//修改商品信息
export const  waresUpdata= (data) => {
  return service({
    url: '/waresList/updata',
    method: 'post',
    data
  })
}
//删除商品信息
export const  waresDelete= (data) => {
  return service({
    url: '/waresList/delete',
    method: 'post',
    data
  })
}
//修改状态
export const  waresUpStatus= (data) => {
    return service({
      url: '/waresList/upStatus',
      method: 'post',
      data
    })
}