import * as types from './types.js'

export default{
   UserLogin({commit},data){
       commit(types.LOGIN,data);
   },
   UserLogout({commit}){
       commit(types.LOGOUT)
   },
   UserName({commit},data){
       commit(types.USERNAME,data)
   } 

}