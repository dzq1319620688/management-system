import service from '@/router/service'

// 
export const account= (data) => {
  return service({
    url: '/account/one',
    method: 'get',
    data
  })
}