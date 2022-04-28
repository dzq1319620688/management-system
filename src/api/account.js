import service from '@/api/service'

// 获取个人信息
export const account= (data) => {
  return service({
    url: '/account/one',
    method: 'get',
    data
  })
}

// 修改个人信息
export const oneUpdata= (data) => {
  return service({
    url: '/account/one/updata',
    method: 'get',
    data
  })
}

//添加用户信息
export const accountAdd= (data) => {
  return service({
    url: '/account/add',
    method: 'post',
    data
  })
}
//修改用户信息
export const accountUpdata= (data) => {
  return service({
    url: '/account/updata',
    method: 'post',
    data
  })
}
//删除用户信息
export const accountDelete= (data) => {
  return service({
    url: '/account/delete',
    method: 'post',
    data
  })
}