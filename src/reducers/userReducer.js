// 1.定义默认数据
let initialState = {
    userId:'',
    userName:'',//实际项目与此不同
    userImage: 'https://p6-passport.byteacctimg.com/img/mosaic-legacy/3793/3114521287~300x300.image',
    userDesc:'前端工程师'
}

// action creators
export const actions = {
    // 异步action，执行登录验证
    login: (userInfo) => {
        return {type: 'CHANGE_USER',userName: userInfo.username,userId:userInfo.userId,userImage:userInfo.userImage}
    },
    logout:()=>{
        return {type:'LOGOUT'}
    }
};

// 2.Reducer
const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'CHANGE_USERIMAGE':
            return { ...state, userImage: action.userImage }
        case 'CHANGE_USERID':
            return { ...state,userId:action.userId}
        case 'CHANGE_USER':
            return { ...state,userName:action.userName,userId:action.userId}
        case 'LOGOUT':
            return {...state,userName:'',userId:''}
        default:
            return state
    }
}
// 3.导出
export default userReducer;