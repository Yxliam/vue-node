import * as types from './types.js'

export default{
    handleType({commit},data){
        commit(types.HANDLE_TYPE,data);
    },
    handleList({commit},data){
        commit(types.HANDLE_ACTIVE,data);
    },
    handleSearch({commit},data){
        commit(types.SEARCH_TEXT,data)
    }
   
 
 }