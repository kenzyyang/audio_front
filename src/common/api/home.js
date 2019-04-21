/**
 * @author:  kenzyyang
 * @date:  2019-4-16
 * @desc:  首页的所有api均从此文件导出
 * */
import axios from "axios";
// 密码加密手段，数据库不存明文，使用sha1 进行不可逆的密码加密
import Sha1 from 'sha1';

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
        password: Sha1(password)
    };
    return axios.post(url, params);
};

/**
 * @method:  POST
 * @desc:  用户注册接口
 * @param:  userName string  用户名
 * @param:  password string  密码
 * @param:  nickName string  用户昵称
 * @param:  email string 用户邮箱
 * */
const register = (data) => {
    const url = host + '/user/userRegister';
    const {userName, password, email, nickName} = data;
    const params = {
        userName,
        email,
        nickName,
        password: Sha1(password)
    };
    return axios.post(url, params);
};


export {
    login,
    register
};