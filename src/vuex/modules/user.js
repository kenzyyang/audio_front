const USER = 2;
const ADMIN = 1;
const SUPER_ADMIN = 0;

export default {
    state: {
        userName: '',
        token: '',
        role: USER,
        isLogin: false,
        isLoaded: false
    },
    mutations: {
        USER_LOGIN(state, data) {
            state.userName = data.userName;
            state.token = data.token;
            state.role = data.role;
            state.isLogin = true;
        },
        USER_LOGOUT(state) {
            state.userName = '';
            state.token = '';
            state.role = USER;
            state.isLogin = false;
        }
    },
    action: {}
};