/**
 *  @author:  kenzyyang
 *  @date:  2019-4-22
 *  @desc:  统一封装的axios，请求拦截
 * */
import axios from 'axios';
import store from '../../vuex/store';
import {Message} from 'element-ui'
let host;
if (/localhost/.test(location.href)) {
    host = 'http://localhost:3000';
} else {
    host = 'http://whbcsonorous.club';
}
// 基础设置
axios.defaults.baseURL = host;

axios.interceptors.request.use((request) => {
    request.headers['Authorization'] = store.state.user.token;
    return request;
});

axios.interceptors.response.use((response) => {
    // 认证失败
    if (response === undefined || response.status === 200 && response.data.code === -3) {
        Message.error('未登录或登录信息过期，请重新登录');
        store.commit('USER_LOGOUT');
        localStorage.clear();
    }
    return response;
}, (err) => {
    console.log(err);
});

export default axios;

