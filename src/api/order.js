import service from '@/api/service'


//修改订单信息
export const  orderUpdata= (data) => {
  return service({
    url: '/orderList/updata',
    method: 'post',
    data
  })
}

//修改订单状态
export const  orderUpStatus= (data) => {
    return service({
      url: '/orderList/upStatus',
      method: 'post',
      data
    })
}

// 获取订单报表信息
export const orderData= (data) => {
  return service({
    url: '/orderList/orderData',
    method: 'get',
    data
  })
}