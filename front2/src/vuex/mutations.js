import * as types from './types.js'

const mutations = {
    [types.HANDLE_TYPE]:(state,data)=>{
        state.type = data
    },
    [types.HANDLE_ACTIVE]:(state,data)=>{
        state.activeType = data
    },
    [types.SEARCH_TEXT]:(state,data)=>{
        state.search = data
    }
}

export default  mutations