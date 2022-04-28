import service from '@/api/service'

// 登录接口
export const loginName= (data) => {
  return service({
    url: '/login',
    method: 'post',
    data
  })
}
//菜单接口
export const menuList= (data) => {
  return service({
    url: '/menu',
    method: 'get',
    data
  })
}

// 修改密码
export const upPasswordData= (data) => {
  return service({
    url: '/account/upPassword',
    method: 'get',
    data
  })
}