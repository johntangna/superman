import http from 'utils/http'

export function refreshToken(){
  return http({
    url : '',
    method : 'post'
  })
}