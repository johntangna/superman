import http from 'utils/http'
/*   响应类型为  responseType : 'blob'，可用作查询用 */
export function uploadDemo(params){
  return http({
    url : '',
    method : 'post',
    data : params,
    headers : {
      "Content-Type" : "multipart/form-data"
    }
  })
}
