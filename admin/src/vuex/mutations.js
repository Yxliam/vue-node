import * as types from './types.js'

const mutations = {
    [types.LOGIN]:(state,data)=>{
        window.sessionStorage.setItem('token',data)
        state.token = data
    },
    [types.LOGOUT]:(state,data)=>{
        window.sessionStorage.removeItem('token')
        window.sessionStorage.removeItem('username')
        state.token = null;
    },
    [types.USERNAME]:(state,data)=>{
        window.sessionStorage.setItem('username',data)
        state.username = data
    }
}

export default  mutations