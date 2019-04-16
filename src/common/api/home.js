/**
 * @author:  kenzyyang
 * @date:  2019-4-16
 * @desc:  首页的所有api均从此文件导出
 * */
import axios from "axios";
// 测试阶段host写死
let host = 'http://localhost:3000';

/**
 * @method:  POST
 * @desc:  用户登录接口
 * @param:  userName string  用户名
 * @param:  password string  密码
 * */
const login = (data) => {
    const url = host + '/user/userLogin';
    const {userName, password} = data;
    const params = {
        userName,
        password
    };
    return axios.post(url, params);
};


export {
    login,

};