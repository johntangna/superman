import Cookie from 'js-cookie'

const TokenKey = 'access-token'
export function getCookie(key){
  return Cookie.get(key)
}
export function setCookie(key,token){
  return Cookie.set(key,cookie)
}
export function removeCookie(){
  return Cookie.remove(TokenKey)
}
export function getToken(){
  return Cookie.get(TokenKey)
}
export function setToken(token){
  return Cookie.set(TokenKey,token)
}
export function removeToken(){
  return Cookie.remove(TokenKey)
}