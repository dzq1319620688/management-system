import service from '@/router/service'

// 登录接口
export const loginName= (data) => {
  return service({
    url: '/login',
    method: 'post',
    data
  })
}

export const menuList= (data) => {
  return service({
    url: '/menu',
    method: 'get',
    data
  })
}