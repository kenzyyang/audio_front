export default {
    state: {
        userName: '',
        token: '',
        isLogin: false,
        isLoaded: false
    },
    mutations: {
        USER_LOGIN(state, data) {
            state.userName = data.userName;
            state.token = data.token;
            state.isLogin = true;
        },
        USER_LOGOUT(state) {
            state.userName = '';
            state.token = '';
            state.isLogin = false;
        }
    },
    action: {}
};